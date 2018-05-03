import _ from 'lodash';

import * as helpers from 'client/common/helpers';
import { getState } from 'client/common/store';

const endpoints = getState('/config/endpoints');
const CURRENT_USER_ID = getState('/config/CURRENT_USER_ID');

const {
    apiBasePath,
    v2,
} = endpoints;
const leadingSlashes = /^\/+/; // 1+ slashes
const trailingSlash = /\/$/;

/**
 * @typedef  {Object} ExternalUrlDetails
 * @property {Boolean} isExternal Whether a gemini route.
 * @property {String} url A URL string.
 */

/**
 * @typedef  {Object} InternalUrlDetails
 * @extends  {ExternalUrlDetails}
 * @property {String} apiBasePath The path to prepend to pathname.
 * @property {Integer} apiVersion The API version to use.
 * @property {String} origin The URL's origin segment
 * @property {String} pathname The URL's pathname segment
 * @property {String} url The full URL string (href).
 */

/**
 * Analyses the supplied URL and supplies details about it.
 * @param  {String} url An absolute or relative URL.
 * @return {(ExternalUrlDetails|InternalUrlDetails)}
 */
function getEndpointDetails(url) {
    const output = helpers.parseLocation(url, endpoints);

    if (output.isExternal) {
        return output;
    }

    // Changing 'USERID' with current user id;
    // @todo : GIVEA-264 (robust system of handling api v1 vs v2 calls)
    const version2 = v2.map((x) => { return x.replace(/USERID/g, CURRENT_USER_ID); });
    const segments = output.segments = {
        apiBasePath,
        apiVersion: _.reduce(version2, (a, b) => a || RegExp(b).test(output.url), false) ? 2 :1,
        origin: helpers.getDataSourceUrl(),
        pathname: `/${output.url.replace(trailingSlash, '').replace(leadingSlashes, '')}`,
    };
    output.url = `${segments.origin}${apiBasePath}${segments.apiVersion}${segments.pathname}`;

    return output;
}

export default getEndpointDetails;
