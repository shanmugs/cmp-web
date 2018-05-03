import _ from 'lodash';

// BabelPolyfill mocks maps by keeping an internal property called _c to keep track of values
// Lodash _.isMap() doesn't work on the polyfilled map
function isMap(obj) {
    return obj instanceof Map || _.isMap(obj);
}

export default isMap;
