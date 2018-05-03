import _ from 'lodash';
import realtypeof from './realtypeof';

const defaultSanitizeKeys = [
    'creditCardNumber',
    'password',
];

const convertEachItemToRegex = (list) => (
    _.map(
        list,
        (word) => (new RegExp(`(\\[|^)${word}(\\]|$)`, 'i')),
    )
);


/**
 * @description Traverse an object and remove (replaces with `'*'`) the values for the specified
 *  keys (ex `password`).
 * @param  {Object}  data                 The object to sanitize
 * @param  {Array}   [moreSanitizeKeys]   A list of additional keys' values to sanitize
 * @param  {Object}  [opts]               The object to sanitize
 * @return {Promise}  A hash identical to the input, but without values in the specified keys
 */
const redact = (
    data,
    moreSanitizeKeys,
    opts = {},
) => {
    return new Promise((resolve, reject) => {
        const realtype = realtypeof(data);
        switch (realtype) {
            case 'string': return resolve(data);
            case 'object': break;
            case 'error': break;
            default: return reject({
                error: new TypeError('Redact helper supports only plain objects'),
                realtype,
                data
            });
        }

        let blacklist = convertEachItemToRegex(defaultSanitizeKeys);
        const recurseDepth = opts.recurseDepth || 100; // 100 = practical infinity

        if (_.isArray(moreSanitizeKeys)) {
            blacklist = _.concat(blacklist, convertEachItemToRegex(moreSanitizeKeys));
        }

        // redact sensitive data, recursively
        return resolve(redactLevel(data, 0));

        /**
         * Subroutine to redact values whose hash-key matches the blacklist
         * This method is called recursively for all hash and array values
         *
         * @param {(Array|Object)} obj  Data that (potentially) needs redacting
         * @param {number} prevDepth    Recursive depth processed so far
         * @returns {(Array|Object)}    A redacted COPY of the passed obj
         */
        function redactLevel(obj, prevDepth) {
            const depth = prevDepth + 1;
            const cleanedData = _.isArray(obj) ? [] : {};

            _.forEach(obj, (val, keyOrIndex) => {
                let cleanVal = val;

                // only recurse into array and hash values; ignore 'object' like a date
                if (_.isArray(val) || _.isPlainObject(val)) {
                    if (depth < recurseDepth) {
                        // recurse into this nested object and redact it as needed
                        cleanVal = redactLevel(val, depth);
                    }
                } // eslint-disable-line brace-style
                // only need to test hash-keys against blacklist (ignore array items)
                // eslint-disable-next-line brace-style
                else if (_.isString(keyOrIndex)) {
                    for (const re of blacklist) { // eslint-disable-line no-restricted-syntax
                        if (re.test(keyOrIndex)) {
                            cleanVal = '*';
                            break;
                        }
                    }
                }

                cleanedData[keyOrIndex] = cleanVal;
            });

            return cleanedData;
        }
    });
};

export default redact;
