var Path = require('path');
var walkSync    = require('walk-sync');
var globals   = {
  // These beforeEach/afterEach hooks report to browserstack that a given test fails
  // Currently not reliable, but will fix in CT-4773
  // beforeEach: function (browser, done) {
  //   if (this.test_settings.selenium_host === 'hub-cloud.browserstack.com') {
  //     return require('nightwatch-browserstack').storeSessionId(browser, done);
  //   }
  //   done();
  // },
  // afterEach: function (browser, done) {
  //   if (this.test_settings.selenium_host === 'hub-cloud.browserstack.com') {
  //     return require('nightwatch-browserstack').updateStatus(browser, done);
  //   }
  //   done();
  // }
};

var dirPath = Path.resolve(__dirname, './globals');


var globalsPath = walkSync(dirPath);

var filePath;
while (filePath = globalsPath.pop()) {
    var fileName = filePath.split('.')[0];

    globals[fileName] = require(dirPath + '/' + filePath);
}

// singleton pattern getter so we only process the envDependentState once
// and then call the cached version on each subsequent request
const envDependentState = require(dirPath + '/envDependentState.js');
const envReducer = require(dirPath + '/envReducer.js');

// Supported environments for the environment dependent state.
// when the reducer processes the envDependentState it will reduce down objects with these keys
// into one value with the key of the current test environment
//
// TODO: pull possible environments from data specified in nightwatch.json
const possibleEnvs = ['local', 'test', 'staging','production'];

globals.getAppTestState = function(env){
    if ('appTestState' in globals) {
        return globals.appTestState;
    } else {
        globals.appTestState = envReducer(envDependentState, env, possibleEnvs);
        return globals.appTestState;
    }
}

module.exports = globals;
