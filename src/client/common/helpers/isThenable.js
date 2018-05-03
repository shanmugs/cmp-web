import _ from 'lodash';

function isThenable(obj) {
    return obj && _.isObject(obj) && _.isFunction(obj.then);
}

export default isThenable;
