import * as _ from 'lodash';
import { defineMessages } from 'react-intl'; // IntlProvider, FormattedMessage

/**
 * Communication Request-Error Messages
 * TODO: These messages are NOT copied into global messages file
 * (React-Intl is designed to work only inside React components)
 */
const messages = defineMessages({
    // Forms will usually use the formErrors returned by the server for this code
    ABORTED: {
        id: 'communications.errors.aborted',
        defaultMessage: 'The request was aborted. Give it another try.',
        description: 'foo',
    },
    BAD_REQUEST: {
        id: 'communications.errors.badRequest',
        defaultMessage: 'Your request was not understood.',
        description: 'foo',
    },
    BAD_RESPONSE: {
        id: 'communications.errors.badResponse',
        defaultMessage: 'The response to your request could not be understood.',
        description: 'foo',
    },
    FORBIDDEN: {
        id: 'communications.errors.forbidden',
        defaultMessage: 'Your request was rejected. Ensure you are logged in and try again.',
        description: 'foo',
    },
    // Not Found probably means an invalid endpoint URL
    GENERAL: {
        id: 'communications.errors.general',
        defaultMessage: 'Something went wrong. Please try again.',
        description: 'foo',
    },
    GONE: {
        id: 'communications.errors.gone',
        defaultMessage: 'Unable to find the requested information.',
        description: 'foo',
    },
    INVALID_DATA: {
        id: 'communications.errors.invalidData',
        defaultMessage: 'Something went wrong. Please try again.',
        description: 'foo',
    },
    // Not currently used, but should test accuracy of navigator.isOnline
    NO_INTERNET: {
        id: 'communications.errors.noInternet',
        defaultMessage: 'No Internet detected. Check your Internet connection and try again.',
        description: 'foo',
    },
    NOT_FOUND: {
        id: 'communications.errors.notFound',
        defaultMessage: 'Something went wrong. Please try again.',
        description: 'foo',
    },
    REDIRECT: {
        id: 'communications.errors.redirect',
        defaultMessage: 'The page you have requested has moved.',
        description: 'foo',
    },
    SERVER_ERROR: {
        id: 'communications.errors.serverError',
        defaultMessage: 'Something went wrong. Please try again.',
        description: 'foo',
    },
    TIMEOUT: {
        id: 'communications.errors.timeout',
        defaultMessage: 'The Chimp website did not respond. Give it another try.',
        description: 'foo',
    },
    UNAUTHORIZED: {
        id: 'communications.errors.unauthorized',
        defaultMessage: 'You are not authorized to access the requested information.',
        description: 'foo',
    },
});


// server status codes are normalized to standard keywords
// TODO: determine which codes are used by backend, and why
const statusMap = {
    0: 'ABORTED',
    204: 'REDIRECT',        // Browsers intercept 302-Redirect so using 204 (NO_CONTENT) instead
    302: 'REDIRECT',        // REF: the REAL redirect code - impossible to receive this!
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    408: 'TIMEOUT',
    410: 'GONE',
    422: 'INVALID_DATA',    // Unprocessable Entity (WebDAV)
    500: 'SERVER_ERROR',

    aborted:        'ABORTED',
    general:        'GENERAL', // generic/unspecified error code
    noInternet:     'NO_INTERNET',
    badResponse:    'BAD_RESPONSE',
};

/**
 * Find and return the best error message based on the error.
 * Returns a React.Intl message-object so it can be translated
 *
 * @param {string} [statusText]   - CONSTANT_LIKE error code
 * @returns {(Object|undefined)}  - Message object that caller can translate
 */
function getIntlErrorMessage(statusText) {
    return statusText === 'OK'
        ? undefined
        : (messages[statusText] || messages.GENERAL);
}


/**
 * Custom, normalized error-object returned for all failures
 *
 * @constructor
 * @param {Object} data         - Response or other object containing info
 * @param {string} [errorCode]  - statusText (optional)
 */
class RequestError extends Error {
    constructor(data, errorCode, ...rest) {
        super(data, errorCode, ...rest);

        const status = data.status || 0;
        const statusText = errorCode || statusMap[status] || statusMap.general;
        const { url } = data;

        _.extend(this, {
            error: data.error, // general request error
            errors: data.errors, // sub-keys: .form_errors and/or .field_errors
            intlMessage: getIntlErrorMessage(statusText),
            message: data.message,
            name: 'RequestError',
            status,
            statusText,
            url,
        });
    }
}


export {
    RequestError as default,
    statusMap,
    messages
};
