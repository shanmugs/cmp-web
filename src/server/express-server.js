const Promise = require('bluebird');
const express = require('express');

const uuid = require('uuid');
const app = express();
const path = require('path');
const _ = require('lodash');
const { config } = require('electrode-confippet');

const outputPath = path.join(
    __dirname,
    '../..', // <----- move up 2 dirs
    config.$('plugins.electrodeStaticPaths.options.pathPrefix')
);
const proxy = require('./middleware/proxy');
const store = require('./middleware/store');

const { appPaths } = config;

const isFileRequest = require(path.resolve(appPaths.server, 'helpers/isFileRequest'));
const helpers = require(path.resolve(appPaths.client, 'common/helpers'));
const logger = require(path.resolve(appPaths.server, 'helpers/logger'));

const { getState } = require(path.resolve(appPaths.client, 'common/store'));

const logRequest = () => {
    app.use((req, rsp, next) => {
        logger.info(`Request to ${req.originalUrl}`);
        next();
    });
};

// Apply identifier to incoming requests from browser so that all subsequent data requests can be
// tagged. And cookies for each data response can be sent back to the matching request
const tagRequest = () => {
    app.use((req, rsp, next) => {
        req.sessionId = uuid.v1();
        next();
    });
}

const resolveFavicon = () => {
    // Webpack dev mode doesn't output the favicons so just shutdown the requests when running
    // `gulp dev` or  `gulp hot`
    if (process.env.WEBPACK_DEV) {
        const faviconMatchers = /android-chrome|apple-touch-icon|favicon|firefox_app|manifest/;
        app.get(faviconMatchers, (req, res) => {
            res.sendStatus(204);
        });
    } else {
        // In non webpack-dev-server apps, make favicons available from '/'
        app.use(express.static(path.join(outputPath, 'js/static')));
    }
};

const syncSession = (rsp) => {
    if (isFileRequest(rsp.req.originalUrl)) return;
    const appInit = require(path.resolve(appPaths.server, 'app'));
    const cookie = appInit.getSSRCookies(rsp.req.sessionId) || 'syncSession::SESSION_NOT_FOUND';

    // Cleanup session, otherwise sessions will persists indefinitly
    appInit.clearSSRCookie(rsp.req.sessionId);

    rsp.set('Set-Cookie', cookie);
};

const decorateResponseSend = () => {
    app.use((req, rsp, next) => {
        const originalSend = rsp.send;
        function decoratedSend(chunk) {
            syncSession(rsp);
            originalSend.apply(this, arguments);
        }

        rsp.send = decoratedSend;

        next();
    });
};

const configureProxy = () => {
    proxy(app);
};

const setStaticPaths = () => {
    app.use(express.static(outputPath));
};

const setRouteHandler = () => {
    const webapp = p => (p.startsWith('.') ? path.resolve(p) : p);
    // eslint-disable-next-line
    const registerRoutes = require(webapp(config.$('plugins.webapp.module')));

    return registerRoutes(
        app,
        config.$('plugins.webapp.options')
    );
};

const startServer = () => new Promise((resolve, reject) => {
    const port = config.$('connections.default.port') || 3000;

    if (!port) logger.warn(`⚠️\tAppServer: No port supplied in config…using fallback: ${port}`);

    app.listen(port, (err) => {
        if (err) {
            logger.error('\n\n', '💥\t', err, '\n\n',);
            reject(err);
        } else {
            //eslint-disable-next-line
            logger.info(`AppServer: Listening on port ${port}`);
            resolve();
        }
    });
});

module.exports = function server(userConfig, callback) {
    const promise = Promise.resolve(userConfig)
        .then(logRequest)
        .then(tagRequest)
        .then(resolveFavicon)
        .then(setStaticPaths)
        .then(configureProxy)
        .then(() => {app.use(store.init)})
        .then(decorateResponseSend)
        .then(setRouteHandler)
        .then(startServer);

    return callback ? promise.nodeify(callback) : promise;
};
