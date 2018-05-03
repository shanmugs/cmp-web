import Promise from 'bluebird';
import 'isomorphic-fetch';
import _ from 'lodash';
import Intl from 'intl';

// NOTE: cannot import from index.js because IT imports THIS file; so that would be circular
import { isRenderingOnServer } from './appInfo';

import URL from './Url';


/**
 * Polyfill window properties and return the new window for export
 *
 * @window object, current window object
 * @return object
 */
function polyfillWindow(passedWindow) {
    if (!passedWindow.Intl) {
        // No `Intl`, so use and load the polyfill.
        passedWindow.Intl = Intl;
    }

    return passedWindow;
};
/* eslint-disable no-undef */

/**
 * Browser object is imported by other code because window is undefined when running inside Node
 * This normalizes browser info to simplify handling both client & server environments
 *
 * @type object
 * @todo Make a more robust mock
 */
const browser = isRenderingOnServer

    // Create browser object using MOCK browser-window data
    ? {
        window: {
            matchMedia: _.noop,
            Intl,
        },
        document: {},
        history: {},
        language: 'en',
        location: {
            hash: '',
            search: '',
            pathname: '',
            port: '',
            hostname: '',
            host: '',
            protocol: '',
            origin: '',
            href: '',
            ancestorOrigins: '',
            assign: _.noop,
            reload: _.noop,
            replace: _.noop,
        },
        navigator: {
            language: 'en', // NOTE: this value often like: "en-US" or "fr-CA"
        },
        screen: {},
        storage: {
            local: {},
            session: {},
        },
    }

    // Create browser object using REAL browser-window data
    : {
        window: polyfillWindow(window),
        document: window.document,
        history: window.history,
        location: window.location,
        navigator: window.navigator,
        screen: window.screen,
        storage: {
            local: window.localStorage,
            session: window.sessionStorage,
        },
        // NOTE: server-provided 'locale' is in Redux-store - this is only 'browser info'
        language: window.navigator.userLanguage
               || window.navigator.language
               || window.navigator.languages[0],
    };

if (isRenderingOnServer) {
     // Helper methods to mock cookie behavior
    const mockDoc = {
        get cookie() {
            const cookieItems = [...this._cookies];
            return _.map(cookieItems, item => item.join('=')).join('; ');
        },

        set cookie(input) {
            if (!input) return;
            const [key, val] = input.split(/=(.+)/);

            if (val && val[0] === ';') this._cookies.delete(key.trim());
            else this._cookies.set(key.trim(), val);
        },

        clearCookies() {
            this._cookies.clear();
        },
    };

    Object.defineProperty(mockDoc, '_cookies', {
        value: new Map(),
    });

    _.extend(browser.document, mockDoc);
} else {
    _.forEach([Element, CharacterData, DocumentType],
        ({ prototype }) => {
        if (!prototype.hasOwnProperty('remove')) // CT-4708
            Object.defineProperty(prototype, 'remove', {
                value: function remove() {
                    this.parentNode.removeChild(this);
                }
            });
    });
}

// Polyfills
browser.window.Promise = browser.window.Promise || Promise; // CT-4367 for SSR & IE11
browser.window.URL = browser.window.URL || URL;

// necessary for ssr & spec
browser.window.fetch = fetch;
browser.window.setTimeout = setTimeout;

export default browser;
