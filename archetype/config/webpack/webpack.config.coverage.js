'use strict';

const _merge = require('lodash/merge');
const webpack = require('webpack');


const generateStylesConfig = require('./utils/generateStylesConfig');
const baseWebPack = require('./webpack.config.base');
const {
    appPaths,
    outputFileNames,
} = baseWebPack;


module.exports = baseWebPack(
    _merge({
            node: {
                process: true,
            }
        },
        generateStylesConfig(appPaths, outputFileNames)
    )
);
