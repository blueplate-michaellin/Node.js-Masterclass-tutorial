/*
 *  Workers related tasks
 */

// Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');
var _logs = require('./logs');
var util = require ('util');
var debug = util.debuglog('workers');

// Instantiate the worker object
var workers = {};

// Look up all checks, get their data, send to a validator
workers.gatherAllChecks = function() {
  // Get all the checks that exists in the system
  _data.list('checks', function(err, checks) {
    if (!err && checks && checks.length > 0 ) {
      checks.forEach(function(check) {
        // REad int he check data
        _data.read('checks', check, function(err, originalCheckData){
          if (!err && originalCheckData) {
            // Pass the data to the check validator, and let function continue or log errors as needed
            workers.validateCheckData(originalCheckData);
          } else {
            debug('Error reading one of the checks data');
          }
        });
      });
    } else {
      debug('Error: Could not find any checks to process')
    }
  });
};

// Validate check data
workers.validateCheckData = function(originalCheckData) {
  originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData != null ? originalCheckData : {};
  originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
  originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' ? originalCheckData.userPhone : false;
  originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http', 'https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
  originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
  originalCheckData.method = typeof(originalCheckData.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
  originalCheckData.successCode = typeof(originalCheckData.successCode) == 'object' && originalCheckData.successCode instanceof Array && originalCheckData.successCode.length > 0 ? originalCheckData.successCode : false;
  originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number'&& originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >=1 && originalCheckData.timeoutSeconds <=5 ? originalCheckData.timeoutSeconds : false;

  // Set the keys that may not be set if the workers have never seen this check before
  originalCheckData.state = typeof(originalCheckData.state) == 'string' && ['up', 'down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
  originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number'&& originalCheckData.lastChecked > 0 ? originalCheckData.timeoutSeconds : false;

  // if all the checks pass, pass the data along in the next step of the process
  debug(originalCheckData.id, originalCheckData.userPhone, originalCheckData.protocol, originalCheckData.url, originalCheckData.method, originalCheckData.successCode, originalCheckData.timeoutSeconds)
  if (originalCheckData.id &&
    originalCheckData.userPhone &&
    originalCheckData.protocol &&
    originalCheckData.url &&
    originalCheckData.method &&
    originalCheckData.successCode &&
    originalCheckData.timeoutSeconds) {
      workers.performCheck(originalCheckData)
  } else {
    debug('Error: one of the checks is not properly formmated')
  }
};

// Perform the check, send the originalCheckData and the outcome to the next step
workers.performCheck = function(originalCheckData) {
  // Prepare the initial check outcome
  var checkOutcome = {
    'error': false,
    'responseCode': false
  };

  //Mark the outcome has not been sent yet
  var outcomeSent = false;

  // Parse the hostname and the path out of the original check data
  var parseUrl = url.parse(originalCheckData.protocol + '://' + originalCheckData.url, true);
  var hostName = parseUrl.hostname;
  var path = parseUrl.path; // using path, not pathname because we want to query string

  // Construct the request
  var requestDetails = {
    'protocol' : originalCheckData.protocol + ':',
    'hostname' : hostName,
    'method' : originalCheckData.method.toUpperCase(),
    'path' : path,
    'timeout': originalCheckData.timeoutSeconds * 1000
  };

  // Instantiate the request object (using either http / https module)
  var _moduleToUse = originalCheckData.protocol == 'http' ? http : https;
  var req = _moduleToUse.request(requestDetails, function(res) {
    // Grab the status of the sent request
    var status = res.statusCode;

    // Update the check outcome and pass the data along
    checkOutcome.responseCode = status;
    if (!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });
  // Bind to the error event to it dones't get thrown
  req.on('error', function(e) {
    // update the check outcome and pass data along
    checkOutcome.error = {
      'Error': true,
      'value' : e
    };
    if (!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to the timeout event
  req.on('timeout', function(e) {
    // update the check outcome and pass data along
    checkOutcome.error = {
      'Error': true,
      'value' : 'timeout'
    };
    if (!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  // End the request
  req.end();
};

// Process check outcome and update the check data as needed. Trigger an alert to user if needed
// Special logic for accommodating a check that has never been tested before.

workers.processCheckOutcome = function(originalCheckData, checkOutcome) {
  // Decide if the check is considered up or down
  var state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCode.indexOf(checkOutcome.responseCode) > -1? 'up' :'down';

  // Decide if an alert is warranted
  var alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

  // UPdate teh check data
  var newCheckData = originalCheckData;
  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  // log the outcome
  var timeOfCheck = Date.now();
  workers.log(originalCheckData,checkOutcome, state, alertWarranted, timeOfCheck);

  // Save the updates
  _data.update('checks', newCheckData.id, newCheckData, function(err) {
    if(!err) {
      // Send the new check to the next phase of the process if needed
      if (alertWarranted) {
        workers.alertUserToStatusChange(newCheckData);
      } else {
        debug('Check outcome has not changed, no alert needed');
      }
    } else {
      debug('Error trying to save update to one of the checks')
    }
  });
};

// Alert the user as to a change in their check status
workers.alertUserToStatusChange = function(newCheckData) {
  var msg = 'Alert: Your check for ' + newCheckData.method.toUpperCase() + ' ' + newCheckData.protocol + '://' + newCheckData.url + ' is currently' + newCheckData.state
  helpers.sendTwilioSms(newCheckData.userPhone, msg, function(err) {
    if (!err) {
      debug('success: user was alerted via sms: ' + msg);
    } else {
      debug('Error : Could not sent sms alert')
    }
  });
};

workers.log = function(originalCheckData,checkOutcome, state, alertWarranted, timeOfCheck) {
  // Form the log data
  var logData = {
    'check' : originalCheckData,
    'outcome' : checkOutcome,
    'state' : state,
    'alert' : alertWarranted,
    'time' : timeOfCheck
  };

  // Convert data to a string
  var logString = JSON.stringify(logData);

  // Determine the name of the log file
  var logFileName = originalCheckData.id;

  // Append log string to the file
  _logs.append(logFileName, logString, function(err) {
    if (!err) {
      debug('logging to file succeeded');
    } else {
      debug('logging to file failed');
    }
  })
}

// Timer to execute the work process once per minute
workers.loop = function() {
  setInterval(function() {
    workers.gatherAllChecks()
  }, 1000 * 60)
};

// Rotate (compress) the log files
workers.rotateLogs = function() {
  // Listing all the non-compressed log files in the .log folder
  _logs.list(false, function(err,logs) {
    if(!err && logs && logs.length > 0) {
      logs.forEach(function(logName) {
        // Compress data to a different file
        var logId = logName.replace('.log','');
        var newfileId = logId + '-' + Date.now();
        _logs.compress(logId, newfileId, function(err) {
          if (!err) {
            // Truncate the log
            _logs.truncate(logId, function(err) {
              if (!err) {
                debug('Success truncating log file');
              } else {
                debug('Error truncatng log file');
              }
            });
          } else {
            debug('Error compressing one fo the log files', err);
          }
        })
      });
    } else {
      debug('Error: cannot find any logs to rotate')
    }
  })
}

// Timer to execute the log-rotation process once per day
workers.logRotationLoop = function () {
  setInterval(function() {
    workers.rotateLogs()
  }, 1000 * 60 * 60 * 24 );
};

// Init script
workers.init = function() {
  // Send to console in yellow
  console.log('\x1b[33m%s\x1b[0m', 'Background workers are running');
  // Execute all the checks immediately
  workers.gatherAllChecks();
  // Call the loop so the checks will execute later on
  workers.loop();
  // Compress all the logs immediately
  workers.rotateLogs();
  // Call the compression loop so logs will be compressed later on
  workers.logRotationLoop();
};

// Export workers module
module.exports = workers;
