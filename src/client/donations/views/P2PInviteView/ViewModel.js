import _ from 'lodash';

import { getBranch } from 'client/common/store';

// import child views that have data so call them for server-side rendering
import { p2p as p2pModel } from 'client/donations/models';

import actions from './actions';


const branchOptions = {
    parentPath: '/donations/views',
    branchPath: 'p2pInvite',
    actions,
};

/**
 * @constructor
 * @returns {Object}
 */
class ViewModel {
    /**
     * Method used ONLY for server-side rendering; kick-off all requests.
     * If view has children with their own data, then call their vm's too.
     *
     * @param {Object} [metadata]   Router or other data that may affect what data to load
     * @return {Promise}            Resolve promise when ALL requests complete, successful or not
     */
    static loadComponentData(metadata = {}) {
        const branch = getBranch(branchOptions);

        return new Promise((res) => p2pModel.fetchP2p(metadata.params.token, metadata)
                .catch(err => ({
                    hasErrors: true,
                    error: err,
                }))
                .then((p2pData) => {
                    res(
                        branch.dispatch({
                            type: actions.SET_P2PINVITE_VIEW_DATA,
                            payload: { p2pData },
                            error: p2pData.hasErrors,
                        }),
                    );
                }),
        );
    }
}

export {
    ViewModel as default,
    branchOptions,
};
