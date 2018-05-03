/**
 * Root object for global app methods.
 */
import 'babel-core/register';
import 'babel-polyfill';

import _ from 'lodash';

import { initIntl } from 'client/common/language';
import { login } from 'client/users/actions';
// import { default as logger } from '../helpers/logger';

/**
 * This method is executed only during SSR.
 *
 * Method called when app starts up, to run all necessary initialization sub-routines.
 * This method centralizes code so easy to see all startup processes in one place.
 */
function init(req) {
    const cookie = _.get(req, 'headers.cookie', '');
    setSSRCookie(req.sessionId, cookie);

    initIntl();

    // return refreshUserData(null, { sessionId: req.sessionId })
    //     .catch((err) => {
    //         logger.error(err);

    //         return err;
    //     });
    return login();
};

// Because in one page render we'll make multiple calls, push all set cookies to array send them as
// an array when requested
let _activeSessions = {};
function _hasSession(id) {
    return !!(_activeSessions[id] && !_.isEmpty(_activeSessions[id]))
}

function setSSRCookie(id, cookies) {
    // Clears out the session NODE cookie when going through logout flow Otherwise all logged out
    // sessions, bloat the _activeSessions hash over the liftime of the server.
    if (cookies === null) {
        clearSSRCookie(cookies);
        return;
    }

    if (_hasSession(id)) {
        _activeSessions[id].push(cookies);
    } else {
        _activeSessions[id] = [cookies];
    }
}

function getSSRCookies(id) {
    return (_hasSession(id))
        ? _activeSessions[id]
        : [];
}

function clearSSRCookie(id) {
    if (_hasSession(id)) {
        delete _activeSessions[id];
    }
}

export {
    init,
    setSSRCookie,
    getSSRCookies,
    clearSSRCookie,
};
