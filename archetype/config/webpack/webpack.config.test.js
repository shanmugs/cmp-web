'use strict';

const path = require('path');

const _merge = require('lodash/merge');
const webpack = require('webpack');


const generateStylesConfig = require('./utils/generateStylesConfig');
const baseWebPack = require('./webpack.config.base');
const {
    appPaths,
    outputFileNames,
} = baseWebPack;


module.exports = baseWebPack(
    _merge(
        {
            devtool: 'inline-source-map',
            node: {
                process: true,
            },
            resolve: {
                alias: {
                    ClientSpecUtils: path.resolve(appPaths.root, 'test/client/utils.js'),
                    react: path.join(appPaths.root, 'node_modules', 'react'),
                },
            },
        },
        generateStylesConfig(appPaths, outputFileNames)
    )
);
