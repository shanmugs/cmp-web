/* eslint-disable no-multi-spaces, key-spacing, brace-style, no-use-before-define */
import _ from 'lodash';
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';

import thunkMiddleware from 'redux-thunk';
// import promiseMiddleware from 'redux-promise';
// import createLogger from 'redux-logger';
// import Immutable from 'seamless-immutable';
// import { createSelector } from 'reselect';

import shallowEqual from './shallowEqual';
import connectBranch from './connectBranch';
import genericReducer from './genericReducer';
import {
    createObjectBranch,
    getObjectBranch,
    toFluxStandardActionFormat,
    isThenable,
    toConstantFormat,
    stringifyPreloadedState,
    fixPreloadedState,
} from './utils';

// NOTE: importing main logger creates a circular dependency
import log from 'client/common/helpers/miniLogger';


const enableStoreDebugLogging = false;

const isRenderingOnServer = typeof window === 'undefined';
// const isImmutable = Immutable.isImmutable;

const resetStateAction  = '__RESET_ALL_STATE__';    // used only for tests
const branchInitAction  = '__INIT_BRANCH_STATE__';  // standard action; uses genericReducer
const genericActionType = 'GENERIC_ACTION_TYPE';    // standard action; uses genericReducer


let storeReducers   = {};   // SEE addStoreReducer
let branchRegistry  = {};
let prevStoreState  = {};


// CSRF Token Cache
const securityData = {
    token: '',
    param: 'authenticity_token', // form-field name
    header: 'x-csrf-token',     // lower-cased for Node-Fetch; 'X-CSRF-Token'
};

// return a clone of data to ensure it cannot be mutated
const getSecurityTokenData = () => _.clone(securityData);

/**
 * Extract CSRF security-token from array of meta-tags and cache for future use.
 *
 * @param metaTags
 * @returns {{token: (Element|string), param: (Element|string), header: string}}
 */
const extractSecurityMetaTags = metaTags => (
    _.filter(metaTags, (tag) => {
        if (tag.name === 'csrf-token') {
            securityData.token = tag.content;
            return false;
        }
        if (tag.name === 'csrf-param') {
            securityData.param = tag.content;
            return false;
        }
        return true;
    })
);


const addStoreReducer = (action, reducer) => {
    const type = _.isObjectLike(action)
        ? action.type
        : action;

    if (type && _.isFunction(reducer)) {
        storeReducers[type] = reducer;
    }
};

const removeStoreReducer = (action, reducer) => {
    const type = _.isObjectLike(action)
        ? action.type
        : action;

    if (
        type
        && (!reducer || storeReducers[type] === reducer)
    ) {
        delete storeReducers[type];
    }
};

const rootReducer = (state, action) => {
    // enforce CONSTANT_FORMAT for actions, convert from camelCase, etc.
    const type = toConstantFormat(action.type || ''); // MUST exist
    const reducer = storeReducers[type]; // SHOULD exist

    const meta = action.meta || {};
    const statePath = meta.path; // root if not specified

    let nextStoreState = state;

    if (!type) {
        log(enableStoreDebugLogging, 'warn', 'Dispatched action does not contain an action-type');
    }
    // IGNORE branch-state initialization
    else if (/^(REDUX_INIT|@@redux\/INIT|@@INIT)/.test(type)) {
        // do nothing
    }
    else if (/^@@router/.test(type)) {
        // do nothing
    }
    else if (type === branchInitAction || type === genericActionType) {
        nextStoreState = createObjectBranch(
            state,
            statePath,
            action.payload,
        );
    }
    else if (type === resetStateAction) {
        nextStoreState = _.cloneDeep(initialStoreState); // TODO: immutable state
    }
    else if (reducer) {
        nextStoreState = reducer(nextStoreState, action);
    }
    else {
        log(enableStoreDebugLogging, 'error', `Action not registered: ${type}`);
    }

    prevStoreState = nextStoreState;
    return prevStoreState;
};


// TODO: move generic helpers into util.js to keep this file small
const pathToCleanString = (data) => {
    const path = _.isArray(data)
        ? data.join('/')
        : (data || '');

    return _.trim(path)
    // ensure path has not duplicate or trailing slashes
        .replace(/\/{2,}/g, '/')
        .replace(/\/$/, '')
        // some assets requests have quotes around the path; strip these
        .replace(/^("|%22)/, '')
        .replace(/("|%22)$/, '');
};

const isRelativePath = path => (path[0] !== '/');

/**
 * Create a complete path from the root of Redux state from path-segments.
 * Segments can be passed in either metadata or config params.
 *
 * Path-segments are assembled in this sequence
 * - parentPath     The path used by the parent-component; normally that branch's rootPath
 * - rootPath       The root-path for this view or component, which all children branch from
 * - branchId       Components like Community can create separate sub-branches for each item-id
 *
 * @param config
 * @param metadata
 * @returns {string}    The complete path
 */
const createRootPath = (config, metadata = {}) => {
    if (_.isString(config)) {
        config = { rootPath: config }; // eslint-disable-line no-param-reassign
    }

    // paths passed in metadata have priority over same key in config
    const branchId      = pathToCleanString(metadata.branchId || config.branchId);
    const rootPath      = pathToCleanString(metadata.rootPath || config.rootPath);
    const parentPath    = pathToCleanString(metadata.parentPath || config.parentPath);
    let path            = ''; // start with an empty path

    // prepend branchId, if exists
    if (branchId && isRelativePath(path)) {
        path = `${branchId}/${path}`;
    }

    // prepend rootPath, if exists
    if (rootPath && isRelativePath(path)) {
        path = `${rootPath}/${path}`;
    }

    // prepend parentPath, if exists
    if (parentPath) {
        path = `${parentPath}/${path}`;
    }

    // strip leading slash if one exists so is easier to split & iterate
    path = path.replace(/^\//, '');

    return pathToCleanString(path);
};

/**
 * Create a complete path from the root of Redux state from path-segments.
 * Segments can be passed in either metadata or config params.
 *
 * Path-segments are assembled in this sequence
 * - rootPath       The root-path for this view or component, which all children branch from
 * - branchPath     The sub/path for a specific component. For a view, this may be "main"
 *
 * @param config
 * @param metadata
 * @returns {*}
 */
const createBranchPath = (config, metadata = {}) => {
    if (_.isString(config)) {
        config = { branchPath: config }; // eslint-disable-line no-param-reassign
    }

    // The complete branch path is the rootPath PLUS the branch path
    const rootPath = createRootPath(config, metadata);
    const branchPath = pathToCleanString(config.branchPath);
    const path = `${rootPath}/${branchPath}`;

    return pathToCleanString(path);
};

const addBranchToRegistry = (branch) => {
    const path = branch.getBranchPath();

    // ensure root-branch is not overwritten
    if (path || !branchRegistry.root) {
        branchRegistry[path || 'root'] = branch;
    }
};

function removeBranchFromRegistry(obj) {
    const path = _.isString(obj)
        ? obj
        : obj.branchPath;

    // root-branch CANNOT be removed
    if (path && path !== 'root') {
        delete branchRegistry[path];
    }
}


const defaultBranchConfig = {
    branchPath:         '',     // if does NOT start with '/', then path is RELATIVE to parentPath
    parentPath:         '',     // this is IGNORED if branchPath is ABSOLUTE, eg: '/something'
    branchIdParamKey:   '',     // router-param value to use as branchId for auto-pathing
    bindStateChanges:   true,   // re-render if branchPath changes
    mapPathsToProps:    {},     // map other paths to prop-keys
    //  onboarding:     '/user/state/onboarding', // EXAMPLE
    actions:            [],     // a hash -or- array, MUST_BE_IN_CONSTANT_FORMAT
    reducers:           {},     // reducers hash keyed by action-type/name
    initialState:       null,   // data to set in Redux before component mounts
    initReducers:       false,  // [true|false|name|array] fire custom reducers; true = all
    destroyOnUnmount:   false,  // this option is used only by the connectBranch component
    onInit:             null,   // callback; after data set but before component mounts
};

/**
 * A Branch object works like a Redux store that is locked to a specific state-branch
 * A new branch can only be created by calling getBranch(); to avoid duplicate branches.
 *
 * @constructor
 * @param {Object} options  Hash of configuration options
 * @returns {Object}        Branch instance
 */
const Branch = (options) => {
    if (_.isString(options)) {
        options = { branchPath: options }; // eslint-disable-line no-param-reassign
    }

    const config            = _.assign({}, defaultBranchConfig, options);
    const rootPath          = createRootPath(config);
    const branchPath        = createBranchPath(config);
    const branchActions     = {};
    const branchReducers    = {};
    let isDestroyed         = false; // eslint-disable-line no-unused-vars

    /* TODO: DEBUG server issue of creating branches for images!?
     * Cannot properly test because asset-loading fixes are in another branch;
     * So leave this code for testing once everything is merged.
    if (/\/assets/.test(branchPath)) {
        throw new Error(config);
    }
    */

    /**
     * This method is called to init the branch on creation.
     * Also called by resetStore to re-init the rootBranch after clearing store data.
     */
    function init() {
        initActionsAndReducers();
        initBranchState();

        if (config.onCreate) {
            config.onCreate(thisBranch);
        }
    }

    function initActionsAndReducers() {
        const actions = config.actions || [];

        // SKIP if this called by reset because actions are already set
        if (_.isEmpty(branchActions)) {
            if (_.isArray(actions)) {
                _.forEach(actions, (type) => {
                    branchActions[type] = type;
                });
            }
            else {
                _.forEach(actions, (val, key) => {
                    const type = val && _.isString(val) ? val : key;
                    branchActions[type] = type;
                });
            }
        }

        // add all actions to the storeReducers map, pointing back to runBranchReducerIfExists
        // this will allow us to modify the state TO & FROM the branch reducers
        _.forEach(branchActions, (type) => {
            // init all actions to use the generic-reducer by setting to 'default'
            branchReducers[type] = 'default';
            // register action so THIS BRANCH will be called when it is dispatched
            addStoreReducer(type, runBranchReducerIfExists);
        });

        // update branchReducers with passed reducers, if any were pass!
        const reducers  = config.reducers || {};
        const errorRoot = /^(.*)?_ERROR$/;
        _.forEach(reducers, (reducer, key) => {
            // normalize reducer key-name to CONSTANT_FORMAT if a matching action not found
            const type = branchActions[key]
                ? key
                : toConstantFormat(key);
            // Error reducers need to match the 'root type', eg: "DO_INIT_ERROR" -> "DO_INIT"
            if (branchActions[type] || branchActions[type.match(errorRoot)[1]]) {
                branchReducers[type] = reducer;
            }
            else {
                log(enableStoreDebugLogging, 'warn', `No matching action for reducer "${key}"`);
            }
        });
    }

    function initBranchState() {
        // Add initial-state before calling any reducers so defaults are already set
        dispatch({
            type: branchInitAction,
            payload: config.initialState || {},
            branchPath, // special key used by genericReducer
        });

        if (config.initReducers) {
            // TODO: call one or more config.reducers to init state?
        }
    }

    function getBranchProps(state) {
        // get the branch-state
        const branchState = getObjectBranch(state, branchPath) || {};
        const mappedPaths = config.mapPathsToProps || {};
        _.forEach(mappedPaths, (path, key) => {
            branchState[key] = getObjectBranch(state, path);
        });

        return branchState;
    }

    function destroy() {
        isDestroyed = true;
        // remove branch from registry
        removeBranchFromRegistry(thisBranch);
        // unregister all branch actions/reducers
        _.forEach(branchActions, action => removeStoreReducer(action, runBranchReducerIfExists));
    }


    function runBranchReducerIfExists(state, action) {
        const type  = action.type;
        let reducer = branchReducers[type] || branchReducers[`${type}_SUCCESS`];

        // IF IS AN ERROR, check for an error-only reducer
        // if it exists, then IT is responsible for returning the new state
        if (action.error) {
            reducer = branchReducers[`${type}_ERROR`] || reducer;
        }

        if (reducer) {
            if (reducer === 'default') {
                reducer = genericReducer;
            }

            // get the branch-state
            // NOTE: action.meta.path may be passed, like LegacyContent because multiple paths
            // use the same actions, so the branch that initialized reducers will handle them all.
            const meta = action.meta || {};
            const statePath = meta.path || branchPath;
            const curBranchState = getObjectBranch(state, statePath) || {};
            const newBranchState = reducer(curBranchState, action);

            if (newBranchState !== curBranchState) {
                return createObjectBranch(
                    state,
                    statePath,
                    newBranchState,
                );
                // return state.setIn( // TODO: use immutable state
                //      statePath,
                //      reducer(stateSlice, action)
                // );
            }
        }

        // if no matching reducer OR reducer didn't change anything, return same state
        return state;
    }

    function dispatch(...args) {
        const action    = toFluxStandardActionFormat(...args); // returns a shallow-clone of action/args
        const payloadType = typeof action.payload;
        const isPromise = isThenable(action.payload);
        const isThunk   = _.isFunction(action);

        // ensure meta.path is set for: runBranchReducerIfExists & genericReducer
        let meta = action.meta || {};
        if (!meta.path) {
            // if action.meta already exists, shallow-clone so original object is not changed
            if (action.meta) {
                meta = _.clone(meta);
            }
            action.meta = meta;
            action.meta.path = branchPath;
        }

        log(enableStoreDebugLogging, 'info', 'dispatch Action Type', action.type);
        log(enableStoreDebugLogging, 'info', 'dispatch Action Payload', action.payload);

        if (!isThunk && !action.type) {
            throw new Error(
                `Dispatch action is missing a "type" property.\nACTION: ${action}`,
            );
        }
        if (
            payloadType !== 'object'
            && !isPromise
            && !isThunk
        ) throw new Error([
                'Dispatch\'s payload must be a promise or object.',
                'Payload:',
                action.payload,
                'is a/an',
                payloadType
            ].join(' '));
        if (isPromise) {
            // if a pending action is specified for promise, dispatch it
            if (meta.pending) {
                store.dispatch(toFluxStandardActionFormat(meta.pending));
            }
            // now dispatch the promise action
            return action.payload
                .then((data) => {
                    // The associated reducer may return an error-response.
                    // If so, throw the error to allow the catch() handler below to process it
                    if (data.error) {
                        throw _.isBoolean(data.error)
                            ? (data.payload || data)
                            : data.error;
                    } else {
                        // dispatch; replace original action.payload with data returned by promise
                        store.dispatch({ ...action, payload: data });
                        return data;
                    }
                })
                .catch(error => (
                    // DO NOT dispatch errors - let calling code decide how to handle
                    // If was a viewModel promise, it could have converted the error

                    // THROW the error so calling code can chain .catch() to handle it
                    // If an error-string (or blank), convert it to an error-object
                    // This will automatically provide a stack-trace for debugging
                    (!error || _.isString(error))
                        ? new Error(error || 'Unspecified Error')
                        : error
                ));
        }

        // If NOT a promise then DISPATCH NORMALLY
        // IF a Thunk-function, then a promise will be returned
        const thunkPromise = store.dispatch(action);
        // return a resolved promise for consistency with promise-actions
        // pass this branch's state-data, which is already updated by dispatch we just did
        return isThunk
            ? thunkPromise
            : Promise.resolve(getState());
    }


    // MUST include ownProps arg so new props will trigger a re-render
    function mapStateToProps(state) { // , ownProps
        // find branchPath, then add mapProps paths
        return getBranchProps(state);
    }

    function mapDispatchToProps() { // dispatchMethod, ownProps
        return {
            dispatch,
            branch: thisBranch,
        };
    }

    function mergeProps(stateProps, dispatchProps, ownProps) {
        return _.assign({}, ownProps, stateProps, dispatchProps);
    }

    function getConnectOptions() {
        return {
            pure: true,
            // areStatesEqual - Compares new store-state to old (strictEqual ===)
            areStatesEqual: (next, prev) => {
                // TODO: debug output
                const isDeepEqual = _.isEqual(next, prev);
                const isShallowEqual = shallowEqual(next, prev);
                if (isShallowEqual && !isDeepEqual) {
                    // debugging output
                    log(enableStoreDebugLogging, 'warn', 'Unexpected Redux-connect.areStatesEqual result.');
                }
                return isDeepEqual;
            },
            // areStatesEqual:      () => false, // _.isEqual, // deepEqual
            // areOwnPropsEqual - Compares new props to old (shallowEqual)
            // areOwnPropsEqual:    () => false,
            // areStatePropsEqual - Compares new mapStateToProps to old (shallowEqual)
            // areStatePropsEqual:  () => false,
            // areMergedPropsEqual - Compares new mergeProps to old (shallowEqual)
            // areMergedPropsEqual: () => false,
        };
    }


    /**
     * Return the complete path of this branch starting at the Redux Root.
     *
     * @returns {string}
     */
    function getBranchPath() {
        return branchPath;
    }

    /**
     * Return the complete path of this branch's rootPath starting at the Redux Root
     * If branch options didn't specify a rootPath, then rootPath is same as branchPath
     *
     * @returns {string}
     */
    function getRootPath() {
        return rootPath;
    }

    function getState(path) {
        return getObjectBranch(store.getState(), path || branchPath);
    }

    function fork(opts) {
        return getBranch(opts, { parentPath: branchPath });
    }

    // TODO: this should be forkRoot() now
    function forkParent(opts) {
        return getBranch(opts, {
            parentPath: branchPath.slice(0, branchPath.length - 1),
        });
    }

    init();

    const thisBranch = {
        // freeze read-only data-objects so if code tries to change them, it will throw an error
        config:  Object.freeze(_.clone(config)),
        actions: Object.freeze(_.cloneDeep(branchActions)),
        reset: init,    // called by resetStore method (below)
        dispatch,
        getState,
        getRootPath,
        getBranchPath,
        destroy,
        fork,
        forkParent,
        addStoreReducer,
        removeStoreReducer,

        // expose connect() helpers
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        getConnectOptions,

        // also expose the generic helper method on the store/branch object
        getBranch,

        // expose global store methods
        replaceReducer: _.noop,     // just for consistency with store object
        subscribe:      store.subscribe,
        Symbol:         store.Symbol,
    };

    return thisBranch;
};


/* eslint-disable no-undef, no-underscore-dangle */
const serverProvidedState = isRenderingOnServer
    ? {}
    : _.clone(window.__PRELOADED_STATE__ || {}); // shallow clone
/* eslint-enable no-undef, no-underscore-dangle */

// cache initialState in case we want to re-init, like for test
// fixPreloadedState will undo HTML-encoding done to allow the JSON to be written into page
const initialStoreState = fixPreloadedState(serverProvidedState); // eslint-disable-line

const middlewares = [
    thunkMiddleware,
    // createLogger(),
];

const enhancers = [
    applyMiddleware(...middlewares),
];

const composeEnhancers = (
        process.env.NODE_ENV !== 'production'
        && typeof window === 'object'
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    )
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
    })
    : compose;

// create the REAL Redux store - only accessible internally; See rootBranch
const store = createStore(
    rootReducer,
    initialStoreState,
    composeEnhancers(...enhancers),
);


/**
 * @returns {Object}    The Redux state object - root or a branch. This should be immutable.
 */
const getState = (path) => {
    const state = store.getState();
    return (path && path !== '/')
        ? getObjectBranch(state, path)
        : state;
};


/**
 * Exported helper method for getting/creating a branch
 *
 * @param {Object} options      See Branch spec
 * @param {Object} [metadata]   Optional parent-path
 * @returns {Branch}            An existing or new Branch instance
 */
function getBranch(options, metadata = {}) {
    const path = createBranchPath(options, metadata);

    let branch = path
        ? branchRegistry[path]
        : branchRegistry.root;

    if (!branch) {
        branch = Branch(options);
        addBranchToRegistry(branch);
    }

    return branch;
}


const rootBranch = getBranch({
    branchPath:         '',
    rootPath:           '/',
    bindStateChanges:   false,
    actions:            ['ADD_INITIAL_STATE'], // special action used when initializing store
});


/**
 * Re/init all store-related objects, including the rootBranch (store).
 * Called only on node-server to ensure store resets on each request
 *
 * @returns {Branch}
 */
const resetStore = () => {
    branchRegistry  = {};
    storeReducers   = {};

    store.dispatch({ type: resetStateAction });

    rootBranch.reset();
    addBranchToRegistry(rootBranch);

    return rootBranch;
};


// DEBUG: log state in browser/development; useful for debugging & testing
log(enableStoreDebugLogging, 'browser', 'serverProvidedState:', serverProvidedState);


export {
    rootBranch as default,
    resetStore, // use to FORCE store re-init
    getState,
    getBranch,
    connectBranch,
    shallowEqual,
    stringifyPreloadedState,
    extractSecurityMetaTags,
    getSecurityTokenData,
};
