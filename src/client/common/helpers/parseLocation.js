import log from './miniLogger'; // NOTE: importing main logger creates a circular dependency
import URL from './Url';

const rgxHost   = /.+\/\//;
const rgxPath = new RegExp('^.*?//.+?(?::[0-9]+)?/(.*)$', 'i');

/**
 * Helper to parse relative path from absolute path _if_ is an internal URL
 * location is considered external if it doesn't come from
 * the appUrlOrigin || chimpApiUrlOrigin || railsAppUrlOrigin set in ENV variables
 *
 * @param {string} url
 * @returns {{ location: string, isExternal: boolean }}
 */
const parseLocation = (url, endpoints) => {
    const type = typeof url;
    if (type !== 'string') return log(
        true,
        'error',
        new TypeError(`[Helpers.parseLocation] First argument must be a string but got: ${type}`)
    );

    let isExternal  = false;
    let location    = url.trim();

    const appUrlOrigin = new URL(endpoints.appUrlOrigin).host;
    const chimpApiUrlOrigin = new URL(endpoints.chimpApiUrlOrigin).host;
    const railsAppUrlOrigin = new URL(endpoints.railsAppUrlOrigin).host;
    const rgxAppUrlOrigin = new RegExp(appUrlOrigin, 'i');
    const rgxChimpApiUrlOrigin = new RegExp(chimpApiUrlOrigin, 'i');
    const rgxRailsAppUrlOrigin = new RegExp(railsAppUrlOrigin, 'i');

    isExternal = (
        !rgxAppUrlOrigin.test(url)
        && !rgxChimpApiUrlOrigin.test(url)
        && !rgxRailsAppUrlOrigin.test(url)
        && rgxHost.test(url)
    );

    if (!isExternal) {
        // strip hostname from path
        const match = location.match(rgxPath);
        if (match && match.length > 1) {
            location = `/${match[1]}`;
        }
    }

    return {
        isExternal,
        url: location,
    };
};

export default parseLocation;
