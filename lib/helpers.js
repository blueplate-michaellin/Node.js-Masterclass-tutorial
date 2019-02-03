/*
 * Helpers for various tasks
 *
 */

// Dependencies
var config = require('./config');
var crypto = require('crypto');
var querystring = require('querystring');
var https = require('https');
var path = require('path');
var fs = require('fs');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Create a random string with given length
helpers.createRandomString = function(strLength) {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    var possibleCharacters = 'abcdefghjklmnopqrstuvwxyz1234567890';
    //Start the final string
    var str = '';
    for (i=1; i <= strLength; i++) {
      // Get a random possible characters
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
      //Append this character to the final string
      str += randomCharacter;
    }
    // Return the final string
    return str;

  } else {
    return false;
  }
}

// Create a helper to send api request to twilio
helpers.sendTwilioSms = function (phone, content, callback) {
  // Validate parameters
  var phone = typeof(phone) == 'string' && phone.trim().length > 1 ? phone : false;
  var content = typeof(content) == 'string' && content.trim().length > 0 && content.trim().length < 1600 ? content : false;

  if (phone && content) {
    // Config the request payload
    var payload = {
      'From' : config.twilio.fromPhone,
      'To' : '+65' + phone,
      'Body' : content,
    }

    // Stringify the payload
    var stringPayload = querystring.stringify(payload);

    // Config the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.twilio.com',
      'method' : 'POST',
      'path' : '/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json',
      'auth' : config.twilio.accountSid + ':' + config.twilio.authToken,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(stringPayload)
      }
    };

    // Create request and send it off
    var req = https.request(requestDetails, function(res) {
      // Grab the status of the res
      var status = res.statusCode;
      // Callback successfully if request went through
      if (status == 200 || status == 201) {
        callback(false);
      } else {
        callback('Status code was returned' + statusCode);
      }
    });

    // bind to an error event, so it doesn't get thrown
    req.on('error', function(e){
      callback(e);
    });

    // Send off the payload
    req.write(stringPayload);

    // End request
    req.end();

  } else {
    callback('Unable to send sms using twilio. Something wrong with the phone number and the content')
  }
}

// Get the string content of a template
helpers.getTemplate = function(templateName, data, callback) {
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data!= null ? data : {};
  if (templateName) {
    var templateDir = path.join(__dirname, '/../templates/');
    fs.readFile(templateDir + templateName + '.html', 'utf8', function (err, str) {
      if (!err && str && str.length > 0) {
        // Do interpolation on the string
        var finalString = helpers.interpolate(str, data);
        callback(false, finalString);
      } else {
        callback('No template could be found');
      }
    })
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string and pass the provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = function(str, data, callback) {
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data!= null ? data : {};
  // Get the Header
  helpers.getTemplate('_header', data, function(err, headerString){
    if(!err && headerString) {
      helpers.getTemplate('_footer', data, function (err, footerString) {
        if (!err && footerString) {
          // Add them together
          var fullString = headerString + str + footerString;
          callback(false, fullString);
        } else {
          callback ('Could not find footer string')
        }
      });
    } else {
      callback('Could not find the header string')
    }
  });
}

// Take a given string and a data object and fine/replace all the key within it
helpers.interpolate = function (str, data) {
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data!= null ? data : {};

  // Add the templateGlobal to the data object. Prepending their key name with global
  for (var keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data['global.' + keyName] = config.templateGlobals[keyName];
    }
  }

  // For each key n the data object, insert its value into the string at the corresponding placeholder
  for (var key in data) {
    if (data.hasOwnProperty(key) && typeof(data[key]) == 'string') {
      var replace = data[key];
      var find = '{'+key+'}';
      str = str.replace(find, replace);
    }
  }
  return str;

};

// Get the content of a static (public) asset
helpers.getStaticAsset = function(fileName, callback) {
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if (fileName) {
    var publicDir = path.join(__dirname, '/../public/');
    fs.readFile(publicDir + fileName, function(err,data) {
      if (!err && data) {
        callback(false, data)
      } else {
        callback('No file could be found');
      }
    })
  } else {
    callback ('A valid file name was not spiecifed')
  }
};

// Export the module
module.exports = helpers;
