'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const { storeConfig } = require('electrode-confippet').config;
const isDev = storeConfig.env === 'development';

const cssLoaderOptions = {
    // If you are having trouble with urls not resolving add this setting.
    // See https://github.com/webpack-contrib/css-loader#url
    url: false,
    minimize: true,
    sourceMap: true,
};

/**
 * Generate Webpack config relevant for styles.
 *
 * This gets consumed by ./registerCustomStyles
 * @param  {Object} appPaths          Paths to pieces of the app
 * @param  {[type]} outputFileNames The filenames to use when outputting files.
 * @return {Object}                 A piece of a webpack config object (to be merged)
 */
module.exports = function generateStylesConfig(appPaths, outputFileNames) {
    const suiStylesExtractor = new ExtractTextPlugin({
        allChunks: true,
        disable: isDev,
        filename: outputFileNames.suiStyles,
    });
    const suiStyleRule = {
        _name: 'semantic-styles',
        _type: 'style',
        test: /\.less$/,
        use: suiStylesExtractor.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: cssLoaderOptions,
                },
                {
                    loader: 'less-loader',
                    options: {
                        includePaths: [
                            path.resolve(appPaths.client, 'common/styles/semantic-ui'),
                            path.resolve(appPaths.root, 'node_modules')
                        ],
                        sourceMap: true,
                    },
                },
            ],
        }),
    };

    const geminiStylesExtractor = new ExtractTextPlugin({
        allChunks: true,
        disable: isDev,
        filename: outputFileNames.appStyles,
    });
    const geminiStyleRule = {
        _name: 'gemini-styles',
        _type: 'style',
        test: /\.scss$/,
        use: geminiStylesExtractor.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: cssLoaderOptions,
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        options: {
                            sourceMap: true,
                        },
                        plugins: () => [
                            autoprefixer(), // options set in package.json
                        ]
                    }
                },
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve(appPaths.client, 'common'),
                            path.resolve(appPaths.root, 'node_modules'),
                        ],
                        sourceMap: true,
                    },
                },
            ],
        }),
    };

    return {
        module: {
            rules: [
                suiStyleRule,
                geminiStyleRule,
            ],
        },
        plugins: [
            suiStylesExtractor,
            geminiStylesExtractor,
            new CopyWebpackPlugin([
                {
                  from: path.resolve(appPaths.client, 'static/**/*')
                },
            ]),
            new webpack.LoaderOptionsPlugin({
                options:{
                    context: appPaths.src
                    // ^ Necessary to prevent path error:
                    // https://github.com/jtangelder/sass-loader/issues/285#issuecomment-248382611
                }
            }),
        ],
    };
}
