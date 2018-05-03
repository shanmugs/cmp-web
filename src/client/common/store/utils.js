/* eslint-disable brace-style, no-multi-spaces */
import _ from 'lodash';



function pathToArray(path) {
    if (_.isArray(path)) {
        return path;
    }
    if (_.isObjectLike(path)) {
        return Object.keys(path);
    }
    if (_.isString(path)) {
        const trimEnds = /(^\/|\/$)/g; // trim spaces and slashes
        const pathDividers = /\s*[ ,;:->|/]\s*/g;
        // eslint-disable-next-line no-param-reassign
        path = _.trim(path).replace(trimEnds, '');
        if (path.length) {
            // split path segments at dividers
            return path.replace(pathDividers, '/').split('/');
        }
    }
    return [];
}


function createObjectBranch(obj, path, data, opts = {}) {
    const keys      = pathToArray(path);
    const lastIdx   = keys.length - 1;
    const lastKey   = keys[lastIdx];
    let newObj      = _.cloneDeep(obj);
    let prevBranch  = newObj;

    for (let i = 0; i < lastIdx; i++) { // eslint-disable-line no-plusplus
        const key = keys[i];
        // avoid blank keys, in case of a bad path
        if (key) {
            if (!prevBranch[key] || !_.isPlainObject(prevBranch[key])) {
                prevBranch[key] = {};
            }
            prevBranch = prevBranch[key];
        }
    }

    const lastBranch    = lastKey ? prevBranch[lastKey] : newObj;
    const branchExists  = lastBranch && _.isPlainObject(lastBranch);
    const dataIsHash    = data && _.isPlainObject(data);

    if (opts.delete && !data) {
        // DELETE BRANCH-KEY
        if (lastKey) {
            delete prevBranch[lastKey];
        }
    }
    else if (opts.replace || !branchExists || !dataIsHash) {
        // REPLACE KEY DATA/VALUE
        if (lastKey) {
            prevBranch[lastKey] = _.isUndefined(data) ? {} : data;
        } else {
            newObj = dataIsHash ? data : {};
        }
    }
    else if (opts.deep || !path) {
        // DEEP MERGE (default if path NOT specified)
        _.merge(lastBranch, data);
    }
    else {
        // SHALLOW MERGE (default if path specified)
        _.assign(lastBranch, data);
    }

    return _.isEqual(newObj, obj) ? obj : newObj;
}

function getObjectBranch(obj, path) {
    return (!path || path === '/')
        ? obj
        : _.get(obj, pathToArray(path));
}

function toFluxStandardActionFormat(type, payload, meta) {
    if (_.isObjectLike(type) || _.isFunction(type)) {
        // return a shallow-clone of original action so caller can modify it easier
        return _.clone(type);
    }

    const action = { type };
    if (payload) action.payload = payload;
    if (meta)    action.meta = meta;
    return action;
}

function isThenable(obj) {
    return obj && _.isObject(obj) && _.isFunction(obj.then);
}

function toConstantFormat(str) {
    if (!_.isString(str) || str === str.toUpperCase()) {
        return str;
    }

    /** Used to match words composed of alphanumeric characters. Excerpted from Lodash */
    const asciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    const words = str.match(asciiWord) || [];
    return words.join('_').toUpperCase();
}


/**
 * Utility called by Redux-Router-Engine when doing server-side rendering
 * This replaces the default helper that just does a simple JSON.stringify
 *
 * @param {Object} state    The hydrated Redux-state hash created on the server
 * @returns {string}
 */
function stringifyPreloadedState(state) {
    // Stringified state (JSON) will be written into the HEAD of the document,
    // This MUST NOT contain HTML tags or the browser will interpret it as body content
    // Therefore we must escape any tag-brackets it contains to ensure this doesn't happen
    // We will process ONLY 'content' keys inside the legacy/views branch of state
    let newState = state;

    if (state.legacy && !_.isEmpty(state.legacy.views)) {
        // ensure we don't modify the real state object
        newState = _.clone(state);
        newState.legacy.views = _.cloneDeep(state.legacy.views);
        findAndEscapeStrings(newState.legacy.views); // eslint-disable-line
    }

    return `window.__PRELOADED_STATE__ = ${JSON.stringify(newState)};`;
}

/**
 * SUB-ROUTINE of stringifyPreloadedState(); recursively find & escape HTML strings
 *
 * @param {Object} obj  The Redux-state object created during server-side rendering
 */
function findAndEscapeStrings(obj) {
    /* eslint-disable no-param-reassign */
    _.forOwn(obj, (val, key) => {
        if (val && _.isString(val)) {
            obj[key] = val
                .replace(/</g, '{|{')
                .replace(/>/g, '}|}');
        }
        else if (_.isPlainObject(val)) {
            findAndEscapeStrings(val);
        }
    });
    /* eslint-enable no-param-reassign */
}

/**
 * Utility called by the store to reverse the escaping we did when the state was created
 * This replaces the default helper that just does a simple JSON.stringify
 *
 * @param {Object} state    The preloaded state hash created by the server
 * @returns {Object}
 */
function fixPreloadedState(state) {
    if (!state) {
        return {};
    }

    let parsedState = state;

    // Undo the escaping done on the server by stringifyPreloadedState (above)
    // It is OK to modify the object passed so no cloning is necessary
    if (state.legacy && !_.isEmpty(state.legacy.views)) {
        parsedState = _.cloneDeep(state);
        findAndUnescapeStrings(parsedState.legacy.views); // eslint-disable-line
    }

    return parsedState;

    function findAndUnescapeStrings(obj) {
        /* eslint-disable no-param-reassign */
        _.forEach(obj, (val, key) => {
            if (val && _.isString(val)) {
                obj[key] = val
                    .replace(/{\|{/g, '<') // placeholder was inserted by findAndEscapeStrings
                    .replace(/}\|}/g, '>'); // ditto
            }
            else if (_.isPlainObject(val)) {
                findAndUnescapeStrings(val);
            }
        });
        /* eslint-enable no-param-reassign */
    }
}


export {
    pathToArray,
    createObjectBranch,
    getObjectBranch,
    toFluxStandardActionFormat,
    isThenable,
    toConstantFormat,
    stringifyPreloadedState,
    fixPreloadedState,
};
