/**
 * Module dependencies
 */
var Logger = require('../../node_modules/nightwatch/lib/util/logger.js');
var Nightwatch = require('nightwatch');

try {
  Nightwatch.cli(function(argv) {
    Nightwatch.runner(argv);
  });
} catch (ex) {
  Logger.error('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  process.exit(2);
}
