// Dependencies
var fs = require ('fs');
var path = require ('path');

// Container for the module
var lib = {};

// Base directory for data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// write data to a file
lib.create = function (dir, file, data, callback) {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);

        //write to file and close it
        fs.writeFile(fileDescriptor, stringData, function(err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback('Error closing new file');
              }
            })
          } else {
            callback('Error writing to new file');
          }
        })
      } else {
        callback('Could not create new file, it may already exist');
      }
    });
};

// read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file +'.json', 'utf-8', function(err, data) {
    callback(err, data);
  })
};

// update data inside a file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Truncate the file
      fs.ftruncate(fileDescriptor, function(err) {
        if (!err) {
          //write to file and close it
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback (false);
                } else {
                  callback ('Error closing the file');
                }
              })
            } else {
              callback ('Error writing to existing file');
            }
          })
        } else {
          callback('Error truncating file');
        }
      })
    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  })
};

// delete a file
lib.delete = function(dir, file, callback) {
  // unlink file
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err) {
    if (!err) {
      callback (false);
    } else {
      callback ('Error deleting file');
    }
  })
}

// Export the module
module.exports = lib;
