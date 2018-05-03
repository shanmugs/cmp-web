const path = require('path');
const { config } = require('electrode-confippet');
const { appPaths } = config;

const isFileRequest = require(path.resolve(appPaths.server, 'helpers/isFileRequest'));
const {
    resetStore,
} = require(path.resolve(appPaths.client, 'common/store'));
const logger = require(path.resolve(appPaths.server, 'helpers/logger'));

const syncConfig = config.$('storeConfig');

const init = (req, rsp, next) => {
    if (isFileRequest(req.originalUrl)) {
        next();
        return;
    }

    const store = resetStore();

    return store.dispatch({
            type: 'ADD_INITIAL_STATE',
            payload: { config: syncConfig },
        })
        // now dispatch config-dependent actions...
        .then(() => {
            // Have to require this in the .then() block so that the initial store is Hydrated for the
            // app init method to
            const app = require(appPaths.server + '/app/index.js');
            return app.init(req)
                .then((data) => {
                    logger.debug('App initialized with the following data:');
                    logger.debug(data);
                    return data;
                });
        })
        .then(() => {next()});
};

module.exports = init;

