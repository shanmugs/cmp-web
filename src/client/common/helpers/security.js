import _ from 'lodash';

// CSRF Token Cache
const securityData = {
    token: '',
    param: 'authenticity_token', // form-field name
    header: 'x-csrf-token',     // lower-cased for Node-Fetch; 'X-CSRF-Token'
};

// return a clone of data to ensure it cannot be mutated
const getSecurityTokenData = () => _.clone(securityData);

/**
 * Extract CSRF security-token from array of meta-tags and cache for future use.
 *
 * @param metaTags
 * @returns {{token: (Element|string), param: (Element|string), header: string}}
 */
const extractSecurityMetaTags = metaTags => (
    _.filter(metaTags, (tag) => {
        if (tag.name === 'csrf-token') {
            securityData.token = tag.content;
            return false;
        }
        if (tag.name === 'csrf-param') {
            securityData.param = tag.content;
            return false;
        }
        return true;
    })
);

export default {
    extractSecurityMetaTags,
    getSecurityTokenData,
}
