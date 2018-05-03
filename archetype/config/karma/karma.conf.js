require('dotenv').config();
const path = require('path');

module.exports = function (config, settings) {
    const entryFile = path.resolve(__dirname, './entry.js');
    settings.files = [entryFile];
    settings.preprocessors = {};
    settings.preprocessors[entryFile] = ['webpack', 'sourcemap'];
    config.set(settings);
};
