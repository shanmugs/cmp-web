import _ from 'lodash';

// Load their config files into react-intl
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import { addLocaleData } from 'react-intl';

import {
    getBranch,
    getState,
} from 'client/common/store';

// Import all messages File
// import defaultMessages from '../language/defaultMessages.json'; UNUSED
import enMessages from './enMessages.json';
import frMessages from './frMessages.json';

// By some odd Quirk of how React-intl works, this can't be called in the
// initIntl method. Must executed as this file is imported to properly register the Locales
addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

// convert array to a hash with keys matching values
const actions = _.keyBy([
    'SET_LOCALE_DATA',
]);

const branchConfig = {
    branchPath: '/intl',
    actions,
};

// Fallback given a setLocale call is made with an invalid locale code
const defaultLocale = 'en';
let branch = getBranch(branchConfig);

// Source of truth, containing all messages. for the application
// TODO: method to split out required messages so they're only loaded when needed
const messagesMap = {
    en: enMessages,
    fr: frMessages,
};

/**
 * Called in helpers.appInit hook, and pulls the language set by the server as the default lang
 */
function initIntl() {
    // Necessary to make sure the server sets the locale data when SSR
    branch = getBranch(branchConfig);

    // Pulls configuration from server and sets the default language
    const localeFromConfig = getState('/config/locales/current');
    setLocale(localeFromConfig); // eslint-disable-line no-use-before-define
}


/**
 * Dispatch the action to update /intl with the correct message hash, based on  the 2 letter locale
 * code
 *
 * @locale {string} 2 char locale string (en, fr)
*/
function setLocale(locale) {
    // Fallback to the default local if locale doesn't exist in messagesMap
    if (!messagesMap[locale]) {
        locale = defaultLocale; // eslint-disable-line no-param-reassign
    }

    branch.dispatch({
        type: actions.SET_LOCALE_DATA,
        payload: {
            locale,
            messages: messagesMap[locale],
        },
    });
}

/**
 * Dispatch that toggles between en/fr locales and updates the /intl branch
 *
 * @returns { Promise } Thunk dispatch to update the store intl branch.
*/
function toggleLocale() {
    const nextLocale = (branch.getState().locale === 'en')
      ? 'fr'
      : 'en';

    setLocale(nextLocale);
}

// Public API of the helper
export {
    toggleLocale,
    initIntl,
};
