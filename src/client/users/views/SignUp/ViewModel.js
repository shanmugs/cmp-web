import _ from 'lodash';

import { getBranch } from 'client/common/store';
// import whenAllPromisesSettled from 'client/common/helpers/whenAllPromisesSettled';

import communitiesModel from 'client/communities/models/communities';
import userModel from 'client/users/models/user';

const signUpPost = userModel.endpoints.signUpPost;

import actions from './actions';

/* eslint-disable key-spacing */
const branchOptions = Object.freeze({
    parentPath: '/users/views',
    rootPath:   'new',
    branchPath: 'main',
    actions,
});
/* eslint-enable key-spacing */

// Community to load if none specified...
const defaultCommunitySlug = 'chimp-community';

/**
 * @constructor
 * @returns {Object}
 */
class ViewModel {
    /**
     * Standard data-isFetching method. Should be _dispatched_ using custom middleware.
     *
     * @returns {Promise}
     */
    static getData() {
        return communitiesModel.getCommunityData(defaultCommunitySlug)
            .then(data => data);
    }

    /**
     * Method used ONLY for server-side rendering; kick-off all requests.
     * If view has children with their own data, then call their vm's too.
     *
     * @param {Object} [metadata]   Router or other data that may affect what data to load
     * @return {Promise}            Resolve promise when ALL requests complete, successful or not
     */
    static loadComponentData(metadata = {}) {
        // create a branch object
        const branch = getBranch(branchOptions);

        return new Promise((res) => {
            return ViewModel.getData(defaultCommunitySlug, metadata)
                .catch(err => ({
                    hasErrors: true,
                    error: err,
                }))
                .then((data) => {
                    res(
                        branch.dispatch({
                            type: actions.SET_DEFAULT_CHIMP_COMMUNITY_DATA,
                            payload: data,
                            error: data.hasErrors,
                        })
                    );
                });
        });
    }
}

export {
    ViewModel as default,
    branchOptions,
    signUpPost,
};
