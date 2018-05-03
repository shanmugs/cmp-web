'use strict';

const path = require('path');

const _get = require('lodash/get');
const _filter = require('lodash/filter');
const _mergeWith = require('lodash/mergeWith');

const {
    appPaths,
    storeConfig,
} = require('electrode-confippet').config;

const generateStylesConfig = require('./utils/generateStylesConfig');
const overrideStyles = require('./utils/overrideStyles');

const isBundling = false;
const isDev = storeConfig.env === 'development';


const outputFileNames = {
    appScripts: {
        chunkFilename: `[name]${isDev ?  '' : '.[chunkhash]'}.js`,
        filename: `[name].bundle${isDev ?  '.dev' : '.[chunkhash]'}.js`,
    },
    appStyles: `[name]${isDev ?  '.style' : '.[contenthash]'}.css`,
    suiStyles: `semantic-ui${isDev ?  '.style' : '.[contenthash]'}.css`,
};


const geminiOverrides = {
    entry: {
        gemini: [
            'babel-polyfill',
            path.resolve(appPaths.client, 'app.jsx')
        ],
    },
    output: {
        chunkFilename: outputFileNames.appScripts.chunkFilename,
        filename: outputFileNames.appScripts.filename,
        // publicPath: '/assets/',
    },
    plugins: [
        /*
        new require('circular-dependency-plugin')({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: appPaths.root,
        })
         */
    ],
    target: 'web',
};

const customMerger = (a, b) => {
    return (Array.isArray(a) && Array.isArray(b))
        ? [].concat(a).concat(b)
        : undefined;
};

/**
 * A function that builds Webpack config used by Electrode. This contains common config shared by
 * all environments. Specific environments have their own files and call this function to compile
 * them.
 * @param  {Object} envOverrides Environment-specific overrides
 * @return {Function}
 */
function webpackConfigBuilder(envOverrides = {}) {
    /**
     * @param  {Object}   composer Electrode's webpack-config-composer
     * @param  {Object}   options  Webapp options
     * @param  {Function} compose  Merges Electrode's config with custom config.
     * @return {Object}   Webpack config
     * @see https://github.com/electrode-io/electrode/tree/master/packages/webpack-config-composer
     */
    return function overrideElectrodeWebapp(composer, options, compose) {
        const customStyles = _filter(_get(envOverrides, 'module.rules'), ['_type', 'style']);

        overrideStyles(customStyles, composer);

        const config = compose();

        _mergeWith(
            config,
            geminiOverrides,
            envOverrides,
            customMerger
        );

        return config;
    }
};
// provide these available to env-specific configs
Object.assign(webpackConfigBuilder, {
    appPaths,
    isBundling,
    outputFileNames,
});

module.exports = webpackConfigBuilder;
