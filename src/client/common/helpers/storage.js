/* eslint-disable consistent-return */
import _ from 'lodash';

// NOTE: cannot import from index.js because IT imports THIS file; so that would be circular
import browser from './browser';
import redact from './redact';
import makeRandomId from './makeRandomId';


/**
 * @description The set of storageTypes that are available in the client.
 * @type {Array}
 */
const availableTypes = new Set();

/**
 * @description Whether to ignore a supplied storageType argument and always use cookies.
 * @type {boolean}
 */
let forceCookie;

/**
 * @description The superset of storageTypes this component supports.
 * @type {Array}
 */
const possibleTypes = [
    'cookie',
    'local',
    'session',
];

/**
 * @description Write a secure cookie for the current domain
 * @param  {string}  key The key for the cookie being created.
 * @param  {*}       val The value for the cookie being created.
 * @param  {boolean} [immortal] Whether the cookie should never effectively expire (`true`)
 * OR should be expired immediately (`false`). If neither apply, do not pass a value at all.
 * @return {string} The string of the created cookie
 */
function writeCookie(
    key,
    val,
    immortal,
) {
    let cookie = `${key}=${val};path=/;domain=${browser.location.host}`;

    switch (immortal) { // looking for strictly a boolean value
    case true:
        cookie += ';expires=Sat, 01 Jan 2050 00:00:00 GMT';
        break;
    case false:
        cookie += ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
        break;
    default: break;
    }

    cookie += ';secure';
    browser.document.cookie = cookie;

    return cookie;
}


function checkForceCookie() {
    return (
        availableTypes.size === 1
        && availableTypes.has('cookie')
    );
}

/**
 * @description Checks the availability/browser support for various types of storage.
 * @param  {string} [type] The storage to check: `'session'|'local'|'cookie'`. If an
 * unrecognised or no value is supplied, it checks all types this module supports.
 * @return {(boolean|Hash)} If a recognised storage type is supplied, a simple true/false; if an
 * unrecognised or no value is supplied, a map of module-supported storage with true/false values.
 */
function checkStorageAvailability(
    type,
) {
    let success = false;

    switch (type) {
    case 'cookie':
        if (!browser.navigator.cookieEnabled) return false;

        try {
            const key = makeRandomId();
            writeCookie(key, 'bar');

            success = _.includes(browser.document.cookie, `${key}=bar`);

            writeCookie(key, '', false); // cleanup
        } catch (e) {
            success = false;
        }

        break;
    case 'session': // intentional fall-through
    case 'local':
        try {
            const storage = browser.storage[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);

            success = true;
        } catch (e) {
            success = false;
        }

        break;
    default:
        _.each(possibleTypes, (type) => {
            checkStorageAvailability(type); // do NOT pass directly to _.each (aborts on `false`)
        });

        break;
    }

    const action = success
        ? 'add'
        : 'delete';

    availableTypes[action](type);

    forceCookie = checkForceCookie();

    return success;
}

/**
 * @description Cookies don't get explicitly deleted—they get expired, which causes the browser to
 * remove them. This function loops through every cookie and expires it.
 * @return {Array} A list of the names of cookies deleted.
 */
function deleteAllCookies() {
    const doc = browser.document;
    const cookies = doc.cookie.split('; ');
    const names = [];

    _.each(
        cookies,
        (cookie) => {
            const name = cookie.split('=')[0];

            names.push(name);
            doc.cookie = writeCookie(name, '', false);
        },
    );

    return names;
}

/**
 * @description Retrieve data from the browser's storage
 * @param {string} key The key of the data in storage
 * @param {string} storageType Where the data is stored: `'session'|'local'|'cookie'`. This
 * value is ignored if WebStorage is not supported.
 * @return {*}     The requested data or `undefined` if not found.
 */
function get(
    key,
    storageType = 'session',
) {
    const type = forceCookie
        ? 'cookie'
        : storageType;

    if (
        !_.isString(key)
        || !key.length
        || (!availableTypes.has(type) && type !== 'any')
    ) return;

    let val;

    switch (type) {
    case 'any':
        // use native loop so can abort when value found
        for (const thisType of availableTypes) {
            const result = get(key, thisType);
            if (!_.isUndefined(result)) {
                val = result;
                break;
            }
        }
        break;
    case 'cookie': // eslint-disable-line no-case-declarations
        const match = browser.document.cookie.match(new RegExp(`(^|)${key}=([^;]+)`));
        val = _.last(match);
        break;
    case 'session':
    case 'local':
        val = browser.storage[type][key];
        break;
    default:
        break;
    }

    if (val) {
        try {
            val = JSON.parse(val);
        } catch (e) {} // eslint-disable-line no-empty
    }

    return val;
}

/**
 * @description Store data in the browser's storage
 * @param {string} key The key for the data to store
 * @param {*}   val The data to store. **Note** This method will abort if this value is `undefined`
 * or `null` (an empty string is okay).
 * @param {string} [storageType] The preferred storage type (`'session'|'local'|'cookie'`); this
 * method will use cookie if WebStorage is not available.
 * @param {boolean} [immortal] Whether the cookie should expire the current session or live
 * effectively forever. If storageType is not `'cookie'` and WebStorage is supported, this argument
 * is ignored. If a cookie is being set and it should expire normally do NOT pass anything for this
 * argument: `false` will expire the cookie immediately (effectively, it will never be set).
 * @return {*} Either the data stored or the cookie set or nothing.
 */
function set(
    key,
    val,
    storageType = 'session',
    immortal,
) {
    const type = forceCookie
        ? 'cookie'
        : storageType;

    if (
        _.isNil(val)
        || !_.isString(key)
        || !key.length
        || !availableTypes.has(type)
    ) return Promise.reject();

    return redact(val).then((redactedData) => {
        const redactedVal = JSON.stringify(redactedData);

        switch (type) {
        case 'cookie':
            return writeCookie(key, redactedVal, immortal);
        case 'session':
        case 'local':
            browser.storage[type][key] = redactedVal;
            return redactedVal;
        default:
            return;
        }
    });
}

/**
 * @description Remove an item from storage OR wipe the whole storage for the site
 * @param {string} key The key in the store which should be retrieved
 * @param {string} [storageType] The store from which to retrieve. **Note** If only 1 argument is
 * passed and its value is a valid storageType, unset will remove _all_ data for that store.
 *
 * **CAUTION** If only 1 argument is passed and its value is `'all'`, the data for ALL stores will
 * be removed.
 *
 * Good:
 ```js
 storage.unset('foo', 'session')
 storage.unset('cookies')
 ``` Bad:
 ```js
 * storage.unset('foo')
 storage.unset('cookie')
 ```
 */
function unset(
    key,
    storageType,
) {
    if (
        !_.isString(key)
        || !key.length
    ) return;

    const availableList = Array.from(availableTypes);

    const doWipe = _.isUndefined(storageType);
    if (doWipe) {
        storageType = key === 'all' // eslint-disable-line no-param-reassign
            ? key
            : _.find(
                availableList,
                availableType => availableType === key.slice(0, -1),
            );
    }
    const type = forceCookie
        ? 'cookie'
        : storageType;

    switch (type) {
    case 'cookie':
        if (doWipe) return deleteAllCookies();
        return writeCookie(key, '', false);
    case 'session':
    case 'local': // eslint-disable-line no-case-declarations
        const storage = browser.storage[type];

        if (doWipe) return storage.clear();
        return storage.removeItem(key);
    case 'all':
        return _.each(availableList, availableType => unset(`${availableType}s`));
    default:
        return;
    }
}

checkStorageAvailability();

const storage = {
    get availableTypes() { return Array.from(availableTypes) },
    get,
    refreshAvailableTypes() {
        checkStorageAvailability();

        return storage.availableTypes;
    },
    set,
    unset,
};

export default storage;
