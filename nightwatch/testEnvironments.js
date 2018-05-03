/* This script constructs the available nightwatch Environments
 * it loops over every environment and creates distinct configurations for every supported browser
 * on that environment.
 */

const _ = require('../node_modules/lodash');

const sharedGlobals = {
    "waitForConditionTimeout": 60000,
};

// LocalEnvironments refers to an environment running on a developers computer.  localEnvs
// are separated out so that the nightwatch runner can identify locally hosted environments
// and run browserstack-local to expose it via a URL that Browserstack Automate can hit.
const localEnvs = {
  "fe-local" : {
    globals : sharedGlobals,
    launch_url : "http://chimp.test:3000/",
    desiredCapabilities: {
      "browserstack.local": true,
    },
  },
  "platform-dev": {
    "globals" : sharedGlobals,
    "launch_url" : "http://chimp.test/",
    desiredCapabilities: {
      "browserstack.local": true,
    },
  },
}

const remoteEnvs = {
  "fe-stage" : {
    "globals" : sharedGlobals,
    "launch_url" : "https://chimp-staging-proxy.herokuapp.com/",
  },
  "fe-dev" : {
    "globals" : sharedGlobals,
    "launch_url" : "https://chimp-dev-proxy.herokuapp.com/",
  },
  "edgy" : {
    "globals" : sharedGlobals,
    "launch_url" : "https://chimp:giveandletgive@edge.24467.org/",
  },
  "lab" : {
    "globals" : sharedGlobals,
    "launch_url" : "https://chimp:giveandletgive@lab.24467.org/",
  },
  staging: {
      launch_url: "https://chimp:giveandletgive@24467.org/",
      globals: sharedGlobals
  },
  prod: {
      launch_url: "https://chimp.net/",
      globals: sharedGlobals
  },
};

// Configuration for running tests on local machine instead of browserstack, included here
// so that it appears when running `node nightwatch list` in the terminal
const debugEnv = {
  debug: {
    globals: _.merge({},
      {
        "env": "local",
      },
      sharedGlobals
    ),
    "launch_url": "http://chimp.test:3000/",
    "selenium_port"  : 4444,
    "selenium_host"  : "localhost",
    "silent": true,
    "screenshots" : {
      "enabled" : false,
      "path" : ""
    },
    "desiredCapabilities": {
      "browserName": "chrome",
      "javascriptEnabled": true,
      "acceptSslCerts": true
    }
  }
}

/*) Available capabilities are applied to every environment. And are structured like so:
 *[
 *  {
 *       type: 'desktop' | 'mobile', // These have different object shapes so need to differentiate
 *       os: String,
 *       version: String,
 *       browsers: {
 *           BrowserName: boolean | [VersionNumber, ...],
 *           ...
 *      }
 *   },
 *   { other OS/Mobile ...},
 *   ...
 * ]
 * Generate a Nightwatch environment which can be called with
 * `node nightwatch --env <envName>-<OS>-<BrowserName>-<VersionNumber>`
 * BrowserName values can be `true` if you just want to support the latest, or an array of valid
 * version numbers. Consult https://www.browserstack.com/automate/nightwatch#setting-os-and-browser
 * for valid OS/Browser/Version strings.
 */
const availableCapabilities = [
  {
    type: 'desktop',
    os: 'Windows',
    version: '10',
    browsers: {
        Chrome: true,
        Firefox: true,
        Edge: [14.0, 15.0],
        IE: true,
    }
  },
  {
    type: 'desktop',
    os: 'OS X',
    version: 'Sierra',
    browsers: {
        Chrome: true,
        Firefox: true,
        Safari: true,
    }
  },
  {
    type: 'mobile',
    platform: 'ANDROID',
    devices: [
        {
            name: 'Samsung Galaxy S5',
            browserName: 'android',
        }
    ],
  },
];

// defaultCabapilities are applied to every config, and have the environments desiredCapabilities
// merged into them while being built.
const defaultCapabilities = {
  "browserstack.debug": true,
  "browserstack.local": false,
  "javascriptEnabled": true,
  "acceptSslCerts": true,
};

defaultCapabilities['browserstack.user'] = process.env.BROWSERSTACK_USER || '';
defaultCapabilities['browserstack.key'] = process.env.BROWSERSTACK_KEY || '';


// create up a --env command name given the configuration object;
function createEnvName(config){
    const browser = config.desiredCapabilities;
    let name = config.globals.env;
    name += (browser.os) ? `_${browser.os}` : ''
    name += (browser.platform) ? `_${browser.platform}` : ''
    name += (browser.os_version) ? `_${browser.os_version}` : ''
    name += (browser.device) ? `_${browser.device}` : ''
    name += (browser.browserName) ? `_${browser.browserName}` : ''
    name += (browser.browser_version) ? `_${browser.browser_version}` : '';

    name = _.toLower(name);
    name = _.replace(name, /\s/g, '-');
    return name;
}

// Creates a build name to be used to group all tests run from the same nightwatch command
function createBuildName(envName) {
    const date = new Date().toUTCString();
    return envName + ' ' + date;
}

function createEnvironmentConfigs(envs) {
  return _.reduce(envs, function(returnObj, config, envName) {
    config.globals.env = envName;

    const desiredCapabilities = (_.isEmpty(config.desiredCapabilities))
        ? {}
        : config.desiredCapabilities;

    desiredCapabilities.build = createBuildName(envName);

    const envConfig = {
        launch_url: config.launch_url,
        globals: config.globals,
        selenium_port: 80,
        selenium_host: "hub-cloud.browserstack.com",
        desiredCapabilities: _.merge({}, defaultCapabilities, desiredCapabilities),
    };

    const browserEnvironments = createBrowserConfigs(envName, envConfig);
    return _.merge(returnObj, browserEnvironments);
  }, {});
};

function createMobileConfig(capability, envConfig) {
    const platformConfig = _.cloneDeep(envConfig);
    platformConfig.desiredCapabilities.platform = capability.platform;

    return _.reduce(capability.devices, function(mobileEnvs, device) {
        const deviceConfig = _.cloneDeep(platformConfig);
        deviceConfig.desiredCapabilities.device = device.name;
        deviceConfig.desiredCapabilities.browserName = device.browserName;

        const name = createEnvName(deviceConfig);
        mobileEnvs[name] = deviceConfig;
        return mobileEnvs;
    }, {});
}

function createDesktopConfig(capability, envConfig) {
    const osConfig = _.cloneDeep(envConfig);
    osConfig.desiredCapabilities.os = capability.os;
    osConfig.desiredCapabilities.os_version = capability.version;

    return _.reduce(capability.browsers, function(desktopEnvs, value, browser) {
      const browserConfig = _.cloneDeep(osConfig);
      browserConfig.desiredCapabilities.browserName = browser;

      if(_.isArray(value)) {
        _.each(value, function(versionNumber) {
          const versionConfig = _.cloneDeep(browserConfig);
          versionConfig.desiredCapabilities.browser_version = versionNumber;

          const name = createEnvName(versionConfig);
          desktopEnvs[name] = versionConfig;
        });
      } else {
        const name = createEnvName(browserConfig);
        desktopEnvs[name] = browserConfig;
      }

      return desktopEnvs;
    }, {});

}

function createBrowserConfigs(envName, envConfig) {
  return _.reduce(availableCapabilities, function(browserEnvs, capability) {
    let envs = {};
    if(capability.type === 'desktop') {
        envs = createDesktopConfig(capability, envConfig);
    } else if(capability.type === 'mobile') {
        envs = createMobileConfig(capability, envConfig);
    }
    return _.merge(browserEnvs, envs);
  }, {});
};

const local = createEnvironmentConfigs(localEnvs);
const remote = createEnvironmentConfigs(remoteEnvs);
const debug = debugEnv;

//expose remote and local configurations seperatly, and all for convenience
module.exports.remote = remote;
module.exports.local = local;
module.exports.debug = debug;
module.exports.all = _.merge({}, local, remote, debug);

