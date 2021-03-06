/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

// Define all the handlers
var handlers = {};

// Ping
handlers.ping = function(data,callback){
    callback(200);
};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404, {'2':'2'});
};

/*
 * HTML Handlers
 */

// Index handler
handlers.index = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Uptime Monitoring - Made Simple',
      'head.description' : 'We offer free http/https all kind. we send u text to let you know',
      'body.class' : 'index'
    };



    // Read in a template as a string
    helpers.getTemplate('index', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Create account
handlers.accountCreate = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an account',
      'head.description' : 'Signup is easy and only takes a few seconds',
      'body.class' : 'accountCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Create new Session
handlers.sessionCreate = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your Account',
      'head.description' : 'Please enter your phone number and password to access your account',
      'body.class' : 'sessionCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged OUt',
      'head.description' : 'You have been logged out of your account',
      'body.class' : 'sessionDeleted'
    };

    // Read in a template as a string
    helpers.getTemplate('sessionDeleted', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Edit account
handlers.accountEdit = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };

    // Read in a template as a string
    helpers.getTemplate('accountEdit', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Account has ben deleted
handlers.accountDeleted = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Account has been deleted',
      'body.class' : 'accountDeleted'
    };

    // Read in a template as a string
    helpers.getTemplate('accountDeleted', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Create checks
handlers.checksCreate = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a new check',
      'body.class' : 'checksCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('checksCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// View all checks
handlers.checksList = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };

    // Read in a template as a string
    helpers.getTemplate('checksList', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// Edit checks
handlers.checksEdit = function(data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    };

    // Read in a template as a string
    helpers.getTemplate('checksEdit', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html')
          } else {
            callback (500, undefined, 'html');
          }
        });
      } else {
        callback (500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined,'html')
  }
};

// favicon
handlers.favicon = function (data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {
    // Read favicon data
    helpers.getStaticAsset('favicon.ico', function (err, data) {
      if (!err && data) {
        // Callback the data
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405)
  }
};

// Public assets
handlers.public = function (data, callback) {
  // Reject any request that is not a GET
  if (data.method == 'get') {
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if (trimmedAssetName.length > 0) {
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if(!err && data) {
          // Determine the content type, default to plain text
          var contentType = 'plain';
          if (trimmedAssetName.indexOf('.css') > 1) {
            contentType = 'css';
          }
          if (trimmedAssetName.indexOf('.png') > 1) {
            contentType = 'png';
          }
          if (trimmedAssetName.indexOf('.jpg') > 1) {
            contentType = 'jpg';
          }
          if (trimmedAssetName.indexOf('.ico') > 1) {
            contentType = 'favicon';
          }

          // Callback the _data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    }
  } else {
    callback(405)
  }
};

/*
 * JSON API handlers
 */

// Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users  = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    // Make sure the user doesnt already exist
    _data.read('users',phone,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',phone,userObject,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that phone number already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }

};

// Required data: phone
// Optional data: none
handlers._users.get = function(data,callback){
  // Check that phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verfiy the given token from header is valid for th phone number
    handlers._tokens.verifyToken(token, phone, function(tokenisValid) {
     if (tokenisValid) {
       // Lookup the user
       _data.read('users',phone,function(err,data){
         if(!err && data){
           // Remove the hashed password from the user user object before returning it to the requester
           delete data.hashedPassword;
           callback(200,data);
         } else {
           callback(404,{'3':'3'});
         }
       });
     } else {
       callback(403, {'Error': 'Missing required token in hader, or token is invalid'})
     }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Required data: phone
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = function(data,callback){
  // Check for required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if phone is invalid
  if(phone){
    // Error if nothing is sent to update
    if(firstName || lastName || password){
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      handlers._tokens.verifyToken(token, phone, function(tokenisValid) {
       if (tokenisValid) {
         // Lookup the user
         _data.read('users',phone,function(err,userData){
           if(!err && userData){
             // Update the fields if necessary
             if(firstName){
               userData.firstName = firstName;
             }
             if(lastName){
               userData.lastName = lastName;
             }
             if(password){
               userData.hashedPassword = helpers.hash(password);
             }
             // Store the new updates
             _data.update('users',phone,userData,function(err){
               if(!err){
                 callback(200);
               } else {
                 console.log(err);
                 callback(500,{'Error' : 'Could not update the user.'});
               }
             });
           } else {
             callback(400,{'Error' : 'Specified user does not exist.'});
           }
         });
       } else {
         callback(403, {'Error': 'Missing required token in hader, or token is invalid'})
       }
     });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }

};

// Required data: phone

handlers._users.delete = function(data,callback){
  // Check that phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  console.log(phone);
  if(phone){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token, phone, function(tokenisValid) {
      if (tokenisValid) {
        // Lookup the user
       _data.read('users',phone,function(err,userData){
         if(!err && userData){
           _data.delete('users',phone,function(err){
             if(!err){
               // Delete each of the checks associated with the user
               var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
               var checksToDelete = userChecks.length;
               if (checksToDelete > 0) {
                 var checksDeleted = 0;
                 var deletionErrors = false;
                 // Loop through the checks
                 userChecks.forEach(function(checkId) {
                   // Delete the check
                   _data.delete('checks',checkId, function(err) {
                     if(err) {
                       deletionErrors=true;
                     }
                     checkDeletd++;
                     if(checkDeleted == checksToDelete) {
                       if(!deletionErrors) {
                         callback(200);
                       } else {
                         callback(500, {'Error': 'Errors encountered while attempting to delete the checks'})
                       }
                     }
                   })
                 });
               } else {
                 callback(200);
               }
             } else {
               callback(500,{'Error' : 'Could not delete the specified user'});
             }
           });
         } else {
           callback(400,{'Error' : 'Could not find the specified user.'});
         }
       });
      } else {
        callback(403, {'Error': 'Missing required token in hader, or token is invalid'})
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens acceptableMethods
handlers._tokens = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback) {
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if (phone && password) {
    // Lookup the user who matches that phone number
    _data.read('users', phone, function(err, userData) {
      if (!err && userData) {
        // Hash the sent password and compare it to the password stored in the user object
        var harshedPassword = helpers.hash(password);
        if (harshedPassword == userData.hashedPassword) {
          // if valid, create a new token with a random name with expriation time in1 hour
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'phone': phone,
            'id': tokenId,
            'expires': expires
          };

          // Store the token
          _data.create('tokens', tokenId, tokenObject, function(err) {
            if(!err) {
              callback(200, tokenObject);
            } else {
              callback(500, {'Error': 'Could not create the new token'});
            }
          })
        } else {
          callback (400, {'Error': 'Password did not match with the specified user\'s stored password'})
        }
      } else {
        callback(400, {'Error': 'Could not find the specified user'});
      }
    })
  } else {
    callback(400, {"Error": "Missing required fields"});
  }
};

// Tokens - get
// Required data: ID
// Optional data: none
handlers._tokens.get = function(data,callback) {
  // Check id is valid
  console.log(data.queryStringObject.id)
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  console.log(id);
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200, tokenData);
      } else {
        callback(404, {'4':'4'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }

};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback) {
  // Check
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if (id && extend) {
    // look up the token
    _data.read('tokens', id, function(err, tokenData) {
      if(!err && tokenData) {
        // Check to make sure token isn't expired
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() * 1000 * 60 * 60
          _data.update('tokens', id, tokenData, function (err) {
            if(!err) {
              callback(200);
            } else {
              callback(500, {'Error': 'Could not update the token\'s expiration'})
            }
          })
        } else {
          callback(400, {'Error': 'The token has expired'})
        }
      } else {
        callback(400, {'Error': 'Specified token does not exist'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field(s) or field(s) are invalid'})
  }


};

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback) {
  //check if id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the user
    _data.read('tokens',id,function(err,data){
      if(!err && data){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Verify if given token is currently valid for a given user

handlers._tokens.verifyToken = function(id, phone, callback) {
  // Look up token
  _data.read('tokens', id, function (err, tokenData) {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true)
      } else {
        callback(false)
      }
    } else {
      callback(false)
    }
  })
};

// Checks
handlers.checks = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the checks methods
handlers._checks = {};

// checks - post
// Required data: protocol, url, method, successCode, timeoutSeconds
// Optional data: nona

handlers._checks.post= function (data, callback) {
  // Validate inputs
  var protocol = typeof(data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.protocol.trim().length > 0 ? data.payload.url : false;
  var method = typeof(data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCode = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if (protocol && url && method && successCode && timeoutSeconds) {
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup users by reading the token
    _data.read('tokens', token, function(err, tokenData) {
      if (!err && tokenData) {
        var userPhone = tokenData.phone;
        //Look up the user data
        _data.read('users', userPhone, function(err, userData) {
          if(!err && userData) {
            var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            // Verify that the user has less than the max checks per user
            if (userChecks.length < config.maxChecks) {
              // Create a random id for the check
              var checkId = helpers.createRandomString(20);

              //Create the check object, and include the user's phone
              var checkObject = {
                'id': checkId,
                'userPhone': userPhone,
                'protocol': protocol,
                'url': url,
                'method': method,
                'successCode': successCode,
                'timeoutSeconds': timeoutSeconds
              };

              //Save the object
              _data.create('checks',checkId,checkObject, function(err) {
                if(!err) {
                  // Add the checkid to user object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  //Save the new user data
                  _data.update('users', userPhone, userData, function(err) {
                    if(!err) {
                      // Return the data the new check
                      callback(200, checkObject);
                    } else {
                      callback(500, {'Error': 'Could not update the user with the new check'})
                    }
                  })
                } else {
                  callback(500, {'Error': 'Could not create the new check'})
                }
              })
            } else {
              callback(400, {'Error': 'The user already has the maximum number of checks ('+config.maxChecks+')'})
            }
          } else {
            callback(403)
          }
        })
      } else {
        callback(403)
      }
    })
  } else {
    callback(400, {'Error': 'Missing required input , or inputs are invalid'})
  }
}

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

  if(id){
    // Look up the checks
    _data.read('checks', id, function(err, checkData) {
      if (!err && checkData) {
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verfiy the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenisValid) {
         if (tokenisValid) {
           // Return the check data
           callback(200, checkData)
         } else {
           callback(403)
         }
       });
      } else {
        callback(404, {'1':'1'})
      }
    });
  } else {
    callback(404,{'Error': 'Missing required field'});
  }
};

// Checks - put
// Required data: id
// Optional data: protocol, url, method, timeoutSeconds
handlers._checks.put = function(data, callback) {
  // Check that id is valid
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  // Check the optional fields
  var protocol = typeof(data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.protocol.trim().length > 0 ? data.payload.url : false;
  var method = typeof(data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCode = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  // Check to make sure id is valid
  if (id) {
    // Check to make sure one or more optional field has been sent
    if (protocol || url || successCode || timeoutSeconds) {
      // Lookup the check
      _data.read('checks', id, function(err, checkData) {
        if (!err && checkData) {
          // Get the token from the headers
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verfiy the given token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenisValid) {
           if (tokenisValid) {
             // Update the check where necessary
             if (protocol) {
               checkData.protocol = protocol;
             }
             if (url) {
               checkData.url = url;
             }
             if (method) {
               checkData.method = method;
             }
             if (successCode) {
               checkData.successCode = successCode;
             }
             if (timeoutSeconds) {
               checkData.timeoutSeconds = timeoutSeconds;
             }

             // Store the new updatre
             _data.update('checks', id, checkData, function(err) {
               if (!err) {
                 callback (200);
               } else {
                 callback (500, {'Error': 'Could not update the check'});
               }
             })
           } else {
             callback(403, {'Error': 'Token ID is not valid'});
           }
         });
        } else {
          callback(400, {'Error': 'Check ID did not exist'});
        }
      });
    } else {
      callback(400,{'Error': 'Missing fields to update'})
    }
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}

// Checks - delete
// Required data: id
// Optional data: none
handlers._checks.delete = function(data,callback){
  // Check that phone number is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Look up the check
    _data.read('checks', id, function(err, checkData) {
      if(!err && checkData) {
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenisValid) {
          if (tokenisValid) {
            // Delete the check data
            _data.delete('checks', id, function(err){
              if(!err) {
                // Lookup the user
               _data.read('users',checkData.userPhone,function(err,userData){
                 if(!err){
                   var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

                   //Remove the delete check from their list of Checks
                   var checkPosition = userChecks.indexOf(id);
                   if (checkPosition > -1) {
                     userChecks.splice(checkPosition,1);
                     // Resave the user's data
                     userData.checks = userChecks;
                     _data.update('users',checkData.userPhone, userData,function(err){
                       if(!err){
                         callback(200);
                       } else {
                         callback(500,{'Error' : 'Could not update the specified user'});
                       }
                     });
                   } else {
                     callback(500, {'Error': 'Could not find the check on the user object, so could not remove it'})
                   }
                 } else {
                   callback(500,{'Error' : 'Could not find the user who created the check.Unable to delete.'});
                 }
               });
              } else {
                callback(500, {'Error': 'Could not delete the check data'})
              }
            });
          } else {
            callback(403)
          }
        });
      } else {
        callback(400, {'Error': 'The specified check ID does not exist'})
      }
    })
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Export the handlers
module.exports = handlers;
