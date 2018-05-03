#!/usr/bin/env node
const _ = require('lodash');
require('dotenv').config();
const yargs = require('yargs');


if (!process.env.BROWSERSTACK_USER || !process.env.BROWSERSTACK_KEY) {
  console.log('\n\nPlease provide a BROWSERSTACK_KEY and BROWSERSTACK_USER ENV vars to run nightwatch tests on Browserstack');
  console.log('Login to BrowserStack automate and get your key from https://www.browserstack.com/automate/nightwatch#integration-with-browserstack\n\n');
  process.exit(1);
}

const allEnvs = require('./nightwatch/testEnvironments').all;
const localEnvs = require('./nightwatch/testEnvironments').local;
const debugEnv = require('./nightwatch/testEnvironments').debug;

yargs
    .command('run', 'Run Nightwatch. Pass any supported nightwatch flags or commands', _.noop, function(argv) {
        if (_.get(localEnvs, argv.env, false)) {
            // If local Env detected, user the browserstack local script file
            require('./nightwatch/bin/nightwatch.local.js');
        } else {
            // Otherwise run the normal nightwatch runner
            require('./nightwatch/bin/runner.js');
        }
    })
    .command({
        command: '* [env]',
        aliases: ['list [env]'],
        desc: 'List all environments, or pass a specific environment to get detailed config details',
        handler: function(argv) {
            if (argv.env) {
                const envConfig = _.get(allEnvs, argv.env, '');
                const output = (envConfig)
                    ? `${argv.env} = ${JSON.stringify(envConfig)}`
                    : `${argv.env} Is not a valid configuration, use 'node nightwatch list' to see supported envs`

                console.log(output);
            } else {
                console.log('The following test environments are available,');
                console.log('Run them with `node nightwatch run --env <envName>`');
                console.log('Or you can list the detailed environment config with `node nightwatch list <envName>`');
                console.log(_.keys(allEnvs));
            };
        }
    })
    .help()
    .argv

