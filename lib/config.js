/*
 * Create and export config variables
 */

 // Container for all the environments
 var environments = {};

 // Staging (default) environments
 environments.staging = {
   'httpPort': 3000,
   'httpsPort': 3001,
   'envName': 'staging',
   'hashingSecret': 'thisisASecret'
 };

 // production environments
 environments.production = {
   'httpPort': 5000,
   'httpsPort': 5001,
   'envName': 'production',
   'hashingSecret': 'thisisalsoASecret'
 };

// Determine which environment was pass as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to Staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
