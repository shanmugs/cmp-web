#!/usr/bin/env node

var Nightwatch = require('nightwatch');
var browserstack = require('browserstack-local');
var browserstack_local_process;
var path = require('path');
var _ = require('lodash');

try {
  process.mainModule.filename = path.resolve(process.cwd(), './node_modules/.bin/nightwatch');

  // Code to start browserstack local before start of test
  console.log("Connecting local");
  Nightwatch.browserstack_local_process = browserstack_local_process = new browserstack.Local();
  browserstack_local_process.start({'key': process.env.BROWSERSTACK_KEY }, function(error) {
    if (error) throw error;

    console.log('Connected. Now testing...');
    Nightwatch.cli(function(argv) {
      Nightwatch.CliRunner(argv)
        .setup(null, function(){
          // Code to stop browserstack local after end of parallel test
          browserstack_local_process.stop(_.noop);
        })
        .runTests(function(){
          // Code to stop browserstack local after end of single test
          browserstack_local_process.stop(_.noop);
        });
    });
  });

  process.on('SIGINT', function() {
    console.log("Caught interrupt signal, Shutting down browserstack_local_process");
    browserstack_local_process.stop(_.noop);
    process.exit(1);
  });

} catch (ex) {
  console.log('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  browserstack_local_process.stop(_.noop);
  process.exit(1);
}
