import _ from 'lodash';

import realtypeof from 'client/common/helpers/realtypeof';
import Url from 'client/common/helpers/Url';

/**
 * Utility for flattening a hash into a query string.
 * @param  {Object} obj Hash of parameters to flatten
 * @return {string}     Either a valid query string (starting with '?'), or an empty string.
 */
const jsonToQueryString = (obj = {}) => {
    const queryString = _.map(
        obj,
        (val, k) => {
            const key = _.camelCase(k);
            if (val) {
                let value;
                if (realtypeof(val) === 'array') {
                    value = val.map((x, y) => x.replace(' ', '+'));
                } else {
                    value = val.replace(' ', '+');
                }
                return `${key}=${encodeURI(value)}`;
            }
            return key;
        },
    ).join('&');

    try {
        new Url(`http://example.com?${queryString}`);
    } catch (err) {
        return new URIError('Provided parameters cannot be converted to a valid query string.');
    }

    return queryString
        ? `?${queryString}`
        : queryString;
};

export default jsonToQueryString;
