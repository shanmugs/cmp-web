/**
 * This is the server side entry point for the React app.
 */
const path = require('path');
const _ = require('lodash');
const React = require('react');
const ReduxRouterEngine = require('electrode-redux-router-engine');

const { appPaths } = require('electrode-confippet').config;

const createReduxStore = require(path.resolve(appPaths.server, 'middleware/store')).hydrate;
const logger = require(path.resolve(appPaths.server, 'helpers/logger'));

const {
    whenAllPromisesSettled,
    isThenable,
} = require(path.resolve(appPaths.client, 'common/helpers'));
const {
    stringifyPreloadedState,
} = require(path.resolve(appPaths.client, 'common/store'));

const logError = (req, err) => {
    logger.error(err.stack);
}

module.exports = (req) => {
    const app = (req.server && req.server.app) || req.app;
    const { routes } = require(
        path.resolve(
            appPaths.client,
            'Router'
        )
    );

    if (!app.routesEngine) {
        app.routesEngine = new ReduxRouterEngine({
            routes,
            createReduxStore,
            stringifyPreloadedState,
            logError,
        });
    }

    return app.routesEngine.render(req)
        // .then(output => {console.log(output)})
        .catch((err) => {logger.error(err); return err});
};
