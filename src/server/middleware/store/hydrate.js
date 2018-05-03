const path = require('path');
const _ = require('lodash');
const React = require('react');

const { appPaths } = require('electrode-confippet').config;

const {
    whenAllPromisesSettled,
    isThenable,
} = require(path.resolve(appPaths.client, 'common/helpers'));

const store = require(path.resolve(appPaths.client, 'common/store')).default;
const logger = require(path.resolve(appPaths.server, 'helpers/logger'));

/**
 * [description]
 * @param  {String}  path        [description]
 * @param  {Object}  renderProps [description]
 * @return {Promise}             [description]
 */
const fetchAllComponentData = (req, {components, params}) => {
    const metadata = {
        path: req.path,
        sessionId: req.sessionId,
        params,
        isServerRendering: true, // flag so viewModel can use special handling
    };

    // check EACH component loaded by router for a prefetch method
    // eslint-disable-next-line no-restricted-syntax
    const promises = _.reduce(
        components,
        (accumulator, componentOrConnector) => {
            const component = componentOrConnector.prototype instanceof React.Component
                ? componentOrConnector
                : componentOrConnector().props._component_;

            logger.info(`hydrate::fetchAllComponentData Server Rendering ${component.name}`)

            if (!!component.loadComponentData) {
                // kick-off loading and cache promise returned
                const maybePromise = component.loadComponentData(metadata);
                if (!isThenable(maybePromise)) {
                    throw new Error(
                        `${component.name} rendered without data because it resolved too late. ` +
                        'A loadComponentData method MUST return a promise for the data to be ' +
                        'available.'
                    );
                }

                maybePromise
                    .then((data) => {
                        logger.debug('Request resolved the following data:');
                        logger.debug(data);
                    })
                    .catch((err) => {
                        logger.warn(
                            'hydrate::fetchAllComponentData Failed to fetch state for: ' +
                            component.name
                        );
                        throw err;
                    });

                accumulator.push(maybePromise);
            }

            return accumulator;
        },
        []
    );

    // return a promise that will settle when ALL data is loaded
    return whenAllPromisesSettled(promises);
};

/**
 * [description]
 * @param  {Object}  req   The Express request object
 * @param  {Object}  match The ReduxRouterEngine match object
 * @return {Promise}       A promise that resolves to the hydrated store.
 */
const hydrate = (req, {renderProps}) => fetchAllComponentData(
        req,
        renderProps
    )
    .then(() => store);

module.exports = hydrate;
