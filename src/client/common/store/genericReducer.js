/* eslint-disable no-multi-spaces, key-spacing, brace-style */
import _ from 'lodash';
// import immutable from 'seamless-immutable';

import {
    createObjectBranch,
} from './utils';


// TEMPORARY HELPER UNTIL IMMUTABLES IMPLEMENTED
function clone(obj, deep = false) {
    return obj.asMutable
        ? obj.asMutable({ deep })
        : deep
            ? _.cloneDeep(obj)
            : _.clone(obj);
}


export default function payloadToState(state, action, opts = {}) {
    // accept data in either the payload key (FSA format) or the root
    const payload   = action.payload;
    const data      = payload || action;
    const meta      = action.meta || {};
    const path      = opts.path || '/';
    const allOpts   = _.assign({}, opts, meta);

    // if using entire action-as-data then remove the 'type' key, if exists
    if (!payload) {
        delete data.type;
    }

    return createObjectBranch(state, path, data, allOpts);

    // const clearData = meta.clear || (_.isPlainObject(data) && !_.isEmpty(data));

    /*
    if (meta.clear) {
        newState = {};
    }
    else if (deep || meta.deep) {
        // newState = state.asMutable({ deep: true });
        newState = clone(state, true);
        _.merge(newState, data);
    }
    else {
        // newState = state.asMutable();
        newState = clone(state);
        _.mergeDeep(newState, data);
    }

    // TODO: improve merging method - loop keys one by one and handle as needed
    if (clearData) {
        if (meta.clear) {
            newState = {};
        }
        else if (deep || meta.deep) {
            // newState = state.asMutable({ deep: true });
            newState = clone(state, true);
            _.merge(newState, data);
        }
        else {
            // newState = state.asMutable();
            newState = clone(state);
            _.assign(newState, data);
        }

        // state.merge(data, { deep: !!deep });

        // newState = immutable(newState);
    }

    return newState || state;
    */


    /*
     var     nextState = state.asMutable({ deep: !!deep });
     /!*
     for (let key of data) {
     state.set(key, data[ key ]);
     }
     *!/
     // add current data-state - use assign for a shallow copy
     _.assign(nextState, action.payload);

     return immutable(nextState, { deep: false });
     */
}
