const path = require('path');
const https = require('https');

const _ = require('lodash');
const defaultConfig = require('electrode-confippet').config;
const proxy = require('http-proxy-middleware');

const { appPaths } = defaultConfig;

const isFileRequest = require(path.resolve(appPaths.server, 'helpers/isFileRequest'));
const isGeminiRoute = require(path.resolve(appPaths.client, 'common/helpers/isGeminiRoute')).default;
const URL = require(path.resolve(appPaths.client, 'common/helpers/Url')).default;
const logger = require(path.resolve(appPaths.server, 'helpers/logger'));

const railsAppUrlOrigin = new URL(defaultConfig.$('storeConfig.endpoints.railsAppUrlOrigin'));
const appUrlOrigin = new URL(defaultConfig.$('storeConfig.endpoints.appUrlOrigin'));
const useNginx = process.env.USE_NGINX;


// Sets up 3 inter-related middleware to proxy mobile Legacy Requests
module.exports = (app) => {
    // Configuration details can be found here:
    // https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options
    const isSecure = railsAppUrlOrigin.protocol === 'https:';
    const proxyConfig = {
        target: railsAppUrlOrigin.origin,
        logLevel: defaultConfig.$('storeConfig.logging.level'),
        changeOrigin: true,
        hostRewrite: appUrlOrigin.host,
        headers: {
            host: appUrlOrigin.host
        },
    };

    // Merge in config required for secure requests.
    if (isSecure) {
        const secureConfig = {
            secure: true,
            agent: https.globalAgent,

        };
        _.assign(proxyConfig, secureConfig)
    }

    // Proxy /assets requests to rails without a filter.
    app.use([
        '/assets',
        '/api',
        '/favicons',
    ], proxy(proxyConfig));

    app.use((req, rsp, next) => {
        if (
            !isFileRequest(req.originalUrl)
            && !isGeminiRoute(req.path)
        ) {
            const redirectUrl = new URL(
                req.originalUrl,
                useNginx
                    ? appUrlOrigin.origin
                    : railsAppUrlOrigin.origin,
            );
            logger.debug(
                '[Gemini Proxy Middleware] %s is unknown to Gemini. Redirecting to %s',
                req.path,
                redirectUrl
            );

            rsp.redirect(redirectUrl);
        }
        else next();
    });
}
