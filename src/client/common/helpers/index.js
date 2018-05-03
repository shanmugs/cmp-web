/**
 * Package index; all (or most for now) helpers exposed as named objects for importing
 * This abstracts the internal structure of the helpers folder to allow easier refactoring
 */

import {
    isRenderingOnServer,
    getDataSourceUrl,
} from './appInfo';

/* eslint-disable no-multi-spaces */
import browser          from './browser';
import isMap from './isMap';
import isJQMMobile from './isJQMMobile';
import isThenable from './isThenable';
import helpers          from './helpers';
import makeRandomId     from './makeRandomId';
import parseLocation from './parseLocation';
import realtypeof from './realtypeof';
import redact           from './redact';
import redirect         from './redirect';
import security          from './security';
import storage          from './storage';
import trimSlashes      from './trimSlashes';
import URL from './Url';
import whenAllPromisesSettled from './whenAllPromisesSettled';
/* eslint-enable no-multi-spaces */

export {
    browser,
    // userLanguage, // DEPRECATED; use browser.language or store.config.locale
    isMap,
    isJQMMobile,
    isThenable,
    helpers,
    isRenderingOnServer,
    makeRandomId,
    parseLocation,
    getDataSourceUrl,
    realtypeof,
    redact,
    redirect,
    security,
    storage,
    trimSlashes,
    URL,
    whenAllPromisesSettled,
};
