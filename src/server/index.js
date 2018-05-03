'use strict';

if (process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
}

const path = require('path');
// Polyfill fetch for SSR, but not in the browser
require('isomorphic-fetch');

const sass = require('node-sass');

// const SSRCaching = require('electrode-react-ssr-caching');

const { config } = require('electrode-confippet');
const { appPaths } = config;

const logger = require('./helpers/logger');

process.on('SIGINT', () => {
  process.exit(0);
});

/**
 * Generic handler for promises that throw an error that is not caught by a .catch() block.
 * Outputs a stack-trace in terminal so can see where and why the error was thrown.
 */
process.on('unhandledRejection', function(reason, prom) {
    logger.error('Unhandled Promise Rejection: ');
    logger.error(reason);
    logger.error(reason.stack);
});

const archetype = require('electrode-archetype-react-app/config/archetype');

const support = require('electrode-archetype-react-app/support');

require.extensions['.scss'] = () => {
  return;
};

// Electrode caching module is not compatible with React 16
// @see electrode-io/electrode-react-ssr-caching#31
//
// const cacheConfig = {
//   components: {
//     SSRCachingTemplateType: {
//       strategy: 'template',
//       enable: true
//     },
//     SSRCachingSimpleType: {
//       strategy: 'simple',
//       enable: true
//     }
//   }
// };

support
  .load({
    babelRegister:  {
      resolveModuleSource: require('babel-resolver')(appPaths.src)
    },
    cssModuleHook: {
      extensions: ['.scss',' .css'],
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      preprocessCss: data => sass.renderSync({
        data,
        includePaths: [path.resolve(appPaths.client, 'common')]
      }).css
    },
  })
  .then(() => {
    // SSRCaching.enableCaching();
    // SSRCaching.setCachingConfig(cacheConfig);

    require('./express-server')(config);  // eslint-disable-line
  });
