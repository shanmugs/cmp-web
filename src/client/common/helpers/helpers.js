/**
 * Helpers file - DEPRECATED
 * This file has been replaced by index.js that uses named-exports instead of helper-methods
 * Need to keep this version of helpers.js until all existing imports of it are refactored.
 * @see https://chimptech.atlassian.net/browse/CT-4381
*/
// TEMPORARY IMPORTS SO CAN RE-EXPORT; until other files updated to import directly
// NOTE: cannot import from index.js because IT imports THIS file; so that would be circular
import browser from './browser';
import makeRandomId from './makeRandomId';
import redact from './redact';
import redirect from './redirect';

import {
    isRenderingOnServer,
    getDataSourceUrl,
} from './appInfo';


// NOTE: components will now import 'browser' so like browser.window instead of helpers.window
// Need these temp vars so we can export them without conflicting with the native objects
const doc = browser.document;
const lang = browser.language;
const loc = browser.location;
const nav = browser.navigator;
const scr = browser.screen;
const sto = browser.storage;
const win = browser.window;


export default {
    isRenderingOnServer,
    isSSR: isRenderingOnServer, // TEMPORARY ALIAS
    makeRandomId,
    getDataSourceUrl,
    redact,
    redirect,
    browser,
    document: doc,
    location: loc,
    navigator: nav,
    screen: scr,
    storage: sto,
    window: win,
    userLanguage: lang,
};
