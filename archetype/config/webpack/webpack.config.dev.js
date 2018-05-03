'use strict';

const _merge = require('lodash/merge');


const generateStylesConfig = require('./utils/generateStylesConfig');
const baseWebPack = require('./webpack.config.base');
const {
    appPaths,
    outputFileNames,
} = baseWebPack;


module.exports = baseWebPack(
    _merge({
            devtool: 'cheap-module-eval-source-map', // any 'source-map'-like devtool is possible
        },
        generateStylesConfig(appPaths, outputFileNames)
    )
);
