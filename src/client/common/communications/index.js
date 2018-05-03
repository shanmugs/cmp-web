import _ from 'lodash';

import * as store from 'client/common/store';
import * as helpers from 'client/common/helpers';

import * as app from 'server/app';

import formatReqBody from './formatReqBody';
import jsonToQueryString from './jsonToQueryString';
import RequestError, {
    statusMap,
    messages,
} from './RequestError';
import getEndpointDetails from './getEndpointDetails';

const { window } = helpers.browser;
const endpoints = store.getState('/config/endpoints');

const options = {
    requestTimeout: 4000, // ms (4 sec)
};

// Hash to cache app-state data for requests
const requestStateCache = {}; // data keyed by reqId
let lastRequestId = 0; // incremented value

const bodilessReqs = ['GET', 'HEAD'];
const acceptableBodyTypes = ['object', 'undefined'];

/**
 * Get app-state data from globals and cache it.
 * If there is an error, we can log state at time of request.
 *
 * @param {number} reqId Incremented lastRequestId
 */
function cacheAppStateBeforeRequest(reqId) {
    // cache current state in case request fails
    requestStateCache[reqId] = {
        location: _.pick(helpers.browser.location, [
            'protocol',
            'port',
            'host',
            'hash',
            'search',
            'pathname',
            'href',
            'origin',
        ]),
        navigator: _.pick(helpers.browser.navigator, [
            'onLine',
        ]),
        document: _.pick(helpers.browser.document, [
            'referrer',
        ]),
        timestamp: (new Date()).toISOString(),
    };
}

/**
 * Validate options, format data.
 * @param  {Integer} reqId Client-generated, arbitrary id for keeping track of requests (logging).
 * @param  {Object}  opts  Options with which to configure the request.
 * @return {Request}       A new Request instance to pass to Fetch.
 */
function prepReq(reqId, opts) {
    const config = _.extend({
        cache: 'default',
        endpoint: '',   // REST endpoint URL, with or without params, eg: /:id
        format: 'JSON',
        headers: helpers.isRenderingOnServer
            // @todo check if this can/should read from `opts`: hydrate already passes true
            ? { cookie: app.getSSRCookies(opts.sessionId) } // set in server/…/hydrate
            : {},
        method: 'GET',
        params: {}, // params to append to endpoint path (optional)
    },  opts);
    const body = config.data;
    const method = config.method = config.method.toUpperCase();
    const dataFormat = config.format.toUpperCase();
    // const securityData = helpers.security.getSecurityTokenData();

    const reqOpts = {
        // redirect: 'manual', // follow, manual, error
        // referrer: 'client', // client, no-referrer, [url]
        cache: config.cache, // default, reload, no-cache, no-store, more...
        credentials: 'include', // omit, include, same-origin
        headers: new Headers(config.headers),
        method,
        mode: 'cors', // same-origin, navigate, no-cors, cors, cors-with-forced-preflight
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
    };

    if (_.includes(bodilessReqs, method) && body) {
        console.warn(
            `${method} requests cannot contain a body, and has therefore been discarded.`
        );
        delete config.data;
    } else {
        const realTypeBody = helpers.realtypeof(body);

        if (!_.includes(acceptableBodyTypes, realTypeBody)) throw new RequestError({
            error: (
                `Invalid request body: Expected ${
                    acceptableBodyTypes.join(', ')
                } but got ${realTypeBody}.`
            ),
            status: 0,
            url: config.endpoint,
        });

        /**
         * @todo Remove this after Auth is sorted
         */
        // We always add CSRF security token to post-data; both legacy and API
        // (A CSRF header will also be added below)
        // const { param, token } = securityData;

        // if (token) { // add-or-update helpers.security param
        //     body[param] = token;
        // }

        reqOpts.body = formatReqBody(body, dataFormat)
    }

    const endpointDetails = getEndpointDetails(config.endpoint);

    if (_.get(endpointDetails, 'segments.apiVersion') === 2) {
        reqOpts.headers.set('content-type', 'application/vnd.api+json');

        const authToken = helpers.storage.get('authToken', 'session');
        if (authToken) reqOpts.headers.set('Authorization', `Token token=${authToken}`);
    }

    // // Always add a CSRF security header, if we have a token
    // if (securityData.token) {
    //     reqOpts.headers.append(securityData.header, securityData.token);
    // }

    const endpoint = (
        endpointDetails.url
        + jsonToQueryString(config.params)
    );

    return new Request(endpoint, reqOpts);
}

/*
 * Primary request interface
 *
 * This method sets a client-side timeout, which may abort the request when the timer runs out, in
 * which case, the returned promise will reject.
 *
 * @param {Object} opts Options with which to configure the request.
 * @param {Object} [opts.data] Data to be sent in the request body
 * @param {string} opts.endpoint Where to make the request
 * @param {string} [opts.format='JSON'] The format of the data for the request body
 * @param {Object} [opts.params] URL/search/GET parameters
 * @param {string} [opts.method='GET'] HTTP request method
 * @param {string} [opts.sessionID] Session ID passed from server/…/hydrate during SSR.
 * @return Promise
 */
function send(opts) {
    return new Promise(reqExecutor)
        .catch((err) => {
            console.error(err.stack);
            throw err;
        });

    // keep everything inside promise-closure to ensure vars do not change during async
    function reqExecutor(resolve, reject) {
        const reqId = ++lastRequestId; // eslint-disable-line no-plusplus

        cacheAppStateBeforeRequest(reqId); // cache current state of browser immediately before req

        const req = prepReq(reqId, opts);

        /**
         * Fetch API doesn't support timeout yet
         * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
         */
        const timer = new Promise((timerResolve, timerReject) => {
            requestStateCache[reqId].timeout = window.setTimeout(
                (reqReject, url) => reqReject(new RequestError({
                    error: 'Client-side timeout triggered before API responded.',
                    status: 408,
                    url,
                })),
                opts.requestTimeout || options.requestTimeout,
                // params to pass to setTimeout's callback
                timerReject,
                req.url
            );
        });

        const call = window.fetch(req)
            .then((rsp) => {
                if (helpers.isRenderingOnServer) {
                    // Rails can respond with mutliple cookies, set them all and let SSR cookies
                    // filter duplicates
                    rsp.headers.forEach((value, name) => {
                        if (name === 'set-cookie') app.setSSRCookie(opts.sessionId, value);
                    });
                }
                // else {
                //     // Triggering this code on the server causes initial auth requests to trigger
                //     // additional requests (because isAuthenticated is null before fethching auth data)

                //     // Multiple BE requests to the same resource in a response cycle causes the dreaded
                //     // session bug!
                //     const wasAuthenticated = store.getState('/users/current').isAuthenticated;
                //     const isAuthenticated = JSON.parse(rsp.headers.get('x-logged-in'));

                //     if (wasAuthenticated !== isAuthenticated) {
                //         users.setUserAuth({isAuthenticated});

                //         if (isAuthenticated) users.refreshUserData();
                //     }
                // }

                return rsp;
            })
            .then(async (rsp) => {
                if (rsp.ok) return rsp;

                /**
                 * Check for server-provided error(s)
                 */
                let data;
                try {
                    data = await rsp.json(); // throws SyntaxError when no response body
                } catch (err) {
                    data = { error: 'No response body' };
                }

                throw new RequestError({url: req.url, status: rsp.status, ...data});
            })
            .then(async (rsp) => {
                let data;
                try { // response body may be empty
                    data = await rsp.json(); // throws SyntaxError when no response body
                } catch (err) {
                    data = {}; // normalise and let caller decide whether it's a problem
                }

                return data;
            });

        Promise.race([timer, call])
            .then(resolve)
            .catch(reject)
            .then((...args) => {
                clearTimeout(requestStateCache[reqId].timeout);
                delete requestStateCache[reqId];
                return args;
            });
    }
}

/**
 * Hook up convenience methods
 * @param  {string} method   The HTTP method to use.
 * @param  {string} endpoint The URL (or path) to send the request.
 * @param  {Object} [config] Request configuration (see `send()`).
 * @return {Promise}         A Promise wrapper.
 */
function alias(method, endpoint, config = {}) {
    const opts = _.assign({}, config, {
        method,
        endpoint,
    });

    return send(opts);
}

const server = {
    send,
    // TODO: Test (..args) => ('GET', ...args) syntax for passing arguments; works in logger.js
    // Provide convenience methods for specific api call types
    delete(endpoint, config) { return alias('DELETE', endpoint, config) },
    get(endpoint, config)    { return alias('GET', endpoint, config) },
    patch(endpoint, config)   { return alias('PATCH', endpoint, config) },
    post(endpoint, config)   { return alias('POST', endpoint, config) },
    put(endpoint, config)    { return alias('PUT', endpoint, config) },
};

export {
    server as default,
    acceptableBodyTypes,
};
