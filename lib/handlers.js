/*
 *  Request Handlers
 */

// Dependencies
var _data = require('./data');
var helpers = require ('./helpers');


// Define handelrs
var handlers = {};

// users
handlers.users = function(data, callback) {
  var acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method] (data,callback);
  } else {
    callback (405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstname, last name, phone, password, tosAgreement
// Option data: No
handlers._users.post = function(data, callback) {
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? data.payload.tosAgreement : false

  console.log(firstName, lastName, phone, password, tosAgreement);

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure user doesn't already exist
    _data.read('users', phone, function(err, data) {
        if (err) {
          var hashedPassword = helpers.hash(password);

          // Create user object
          if (hashedPassword) {
            var userObject = {
              'firstName' : firstName,
              'lastName': lastName,
              'phone': phone,
              'hashedPassword': hashedPassword,
              'tosAgreement': true
            };

            // Store the user
            _data.create('users',phone,userObject, function(err) {
              if (!err) {
                callback(200)
              } else {
                console.log(err);
                callback(500, {'Error': 'Could not create new user'})
              }
            });
          } else {
            callback(500, {'Error': 'Could not has the user password'})
          }
        } else {
          callback(500, {'Error': 'A user with that phone number already exists'})
        }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'});
  }
};

// Users - get
// Required data: phone
// Optional data: none
// only let authenticated user access their object.
handlers._users.get = function(data, callback) {
  // check phone number provided is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim() > 1 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // look up user
    _data.read('users',phone, function(err,data) {
      if (!err && data) {
        // Remove hashedPassword from the userobject before returning to requestor
        delete data.hashedPassword;
        callback(200, data);
      } else {
        callback(404);
      }
    })
  } else {
    callback (400, {'Error': 'Missing required field'})
  }
};

// Users - put
// required data: phone
// optional data: firstName, lastName, password (at least 1 must be specified)
// Only let an authenticaed user to update their own object
handlers._users.put = function(data, callback) {
  // check for the required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim() > 1 ? data.payload.phone.trim() : false;
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false

  // Error if phone is invalid
  if (phone) {
    if (firstName || lastName || password) {
      _data.read('users', phone, function(err, userData) {
        if (!err && userData) {
          // update necessary fields
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = helpers.hash(password);
          }
          //Store new update
          _data.update('users', phone, userData, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, {'Error': 'Could not update the user'})
            }
          })
        } else {
          callback(400, {'Error': 'The specified user does not exist'})
        }
      })
    } else {
      callback(400, {'Error': 'Missing fields to update'});
    }
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
};

// Users - delete
// require field: phone
// only let authenticaed user delete their object
// clean up any other file assicated with this user
handlers._users.delete = function(data, callback) {
  // check phone number provided is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim() > 1 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // look up user
    _data.read('users',phone, function(err,data) {
      if (!err && data) {
        _data.delete('user', phone, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, {'Error': 'Could not delete specified user'})
          }
        })
      } else {
        callback(400, {'Error': 'Could not find the specified user'});
      }
    })
  } else {
    callback (400, {'Error': 'Missing required field'})
  }

};

// Ping handlers

handlers.ping = function (data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404)
};

// export module
module.exports = handlers
