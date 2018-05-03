var Path = require('path');
var nightwatchDir = Path.resolve(__dirname, 'nightwatch');
var _ = require('lodash');
var environments = require('./nightwatch/testEnvironments').all;

module.exports = (function(settings) {
    _.merge(settings.test_settings, environments)
    settings.test_workers = {
        "enabled": true,
        "workers": 3
    };
    return settings;
})(require(nightwatchDir + '/nightwatch.json'));
