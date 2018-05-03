require('dotenv').config();
const path = require('path');

const _merge = require('lodash/merge');

module.exports = function (config, settings){
    const entryFile = path.resolve(__dirname, './entry.js');
    const reportConfig = {
        dir: process.env.CIRCLE_ARTIFACTS
    };

    settings.files = [entryFile];

    settings.preprocessors = {};
    settings.preprocessors[entryFile] = ['webpack', 'sourcemap'];

    if (reportConfig.dir) _merge(settings.coverageReporter, {
        dir: reportConfig.dir,
    });

    config.set(settings)
}
