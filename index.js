/*
 * Primary file for the API
 *
 */

 //Dependencies
 var http = require('http');
 var https = require('https');
 var url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;
 var config = require('./config');
 var fs = require('fs');
 var _data = require('./lib/data');

 // Test
 _data.delete('test', 'newFile', function(err) {
   console.log('this was the error', err);
 })


 // Instaniate the http server
var httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res);
});

// Start the server
httpServer.listen(config.httpPort, function() {
 console.log("The server is listening on port " + config.httpPort);
});

// Instaniate HTTPS createServer
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req, res);
});
// Start https server
httpsServer.listen(config.httpsPort, function() {
 console.log("The server is listening on port " + config.httpsPort);
});

// All the server logic for both the http and https createServer
var unifiedServer = function(req, res) {
  // Get the URL and parse it
  var parseUrl = url.parse(req.url, true);

  // Get the path
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  var queryStringObject = parseUrl.query;

  // get the HTTP method
  var method = req.method.toLowerCase();

  // Get the header as an object
  var headers = req.headers;

  // Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();

    // Choose the hnadler this request should go to
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

    // Construct data object to handlers
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    }

    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      // Use the status code called back by the handler or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // Use the payload call back by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);


      // Log the request path
      console.log('We are returning this response: ', statusCode, payloadString);
    });
  });
}

// Define handelrs
var handlers = {};

// Ping handlers

handlers.ping = function (data, callback) {
  callback(200);
}

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404)
};

// Define a request router
var router = {
  'ping': handlers.ping
};
