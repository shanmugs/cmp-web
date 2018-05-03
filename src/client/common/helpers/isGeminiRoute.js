import _ from 'lodash';

import * as routesModule from 'client/routes';

/**
 * The path potentially contains url parameters (ex `userId`), which are delimited by a colon (`:`)
 * which will need to be replaced with actual values.
 * @param  {String} pathname The url template to explode
 * @return {Array}           The parameters, placed within the array at the position in which they
 * occured within the template path. This may result in empty elements within the returned array.
 * @example
 * `/foo/:id` → `[,'id']`
 * **Note**: Element `0` is empty because it did not contain a parameter.
 */
const findParams = (pathname) => {
    const segments = _.tail(pathname.split('/'));

    return _.reduce(segments, (r, segment, i) => {
        if (segment[0] !== ':') return r;

        r[i] = segment;

        return r;
    }, []);
};

/**
 * Attempt to apply/replace parameter names within `pathname` with values. This method blindly
 * replaces url segments (delimited by `/`) with values from `params` according to index.
 * @param  {String} pathname The pathname to which values should be added.
 * @param  {Array}  params   The URL parameter values for replacing.
 * @return {String}          The new pathname with replaced values.
 * @example
 * pathname: `/foo/:id`
 * params: `[,123]`
 * returns: `/foo/123`
 */
const matchParams = (pathname = '', params = []) => {
    const segments = _.tail(pathname.split('/'));

    for (let i = params.length-1; i > -1; i--) {
        if (params[i]) segments[i] = params[i];
    }

    return segments.join('/');
};

/**
 * Recurse the `routes` object until a match is found (or the list is exhausted).
 * @param  {String} parentRoutePath [description]
 * @param  {String} pathname        [description]
 * @param  {String} route.path        The whitelisted route's property.
 * @param  {Array}  route.childRoutes The whitelisted route's children.
 * @return {Boolean|Undefined}        True when the provided pathname is whitelisted.
 */
const recurseRoutes = ({
    parentRoutePath = '',
    pathname = '',
    route: {
        path: subRoute = '',
        childRoutes = []
    }
}) => {
    const route = `${parentRoutePath}${subRoute}`;
    const params = findParams(route);
    const path = (params.length)
        ? `${parentRoutePath}${matchParams(pathname, params)}`
        : pathname;

    if (path === route) {
        parentRoutePath = '';

        return true;
    }

    if (childRoutes.length) {
        parentRoutePath += subRoute;

        if (
            // child (and non-absolute) routes do need a `'/'` delimiter added before being added
            // to the parent path (otherwise the result is something like `/foobar` instead of
            // `/foo/bar`)
            parentRoutePath.slice(-1) !== '/'
        ) parentRoutePath += '/';

        return _.find(childRoutes, (route) => recurseRoutes({parentRoutePath, pathname, route}));
    }
};

/**
 * Determine whether the provided path is a known ("whitelisted") route for the Gemini app.
 * @param  {String} pathname The url pathname to test.
 * @return {Boolean}         True when the provided pathname is whitelisted.
 */
const isGeminiRoute = (pathname = '') => {
    const isMatch = _.find(routesModule.routes, (route) => recurseRoutes({
        pathname,
        route,
    }));

    return !!isMatch;
};

export default isGeminiRoute;
