import _ from 'lodash';

import { getBranch } from 'client/common/store';
// import whenAllPromisesSettled from 'client/common/helpers/whenAllPromisesSettled';

import model from 'client/communities/models/communities';
import actions from './actions';

/* eslint-disable key-spacing */
export const branchOptions = Object.freeze({
    parentPath:         '/communities/views',
    rootPath:           'join',
    branchPath:         'main',
    branchIdParamKey:   'slug',
    actions,
    mapPathsToProps: {
        breakpoints: '/layout/breakpoints',
    },
});
/* eslint-enable key-spacing */


/**
 * @constructor
 * @returns {Object}
 */
export default function ViewModel() {
    // self-instantiate when 'new' keyword not used
    if (!(this instanceof ViewModel)) {
        return new ViewModel();
    }

    // Community to load if none specified...
    const defaultCommunitySlug = 'chimp-community';
    let communityId;


    /**
     * Standard data-isFetching method. Should be _dispatched_ using custom middleware.
     *
     * @returns {Promise}
     */
    function getData(slug) {
        return model.getCommunityData(slug)
            // data currently does not include slug or ID, so add the slug
            .then((data) => {
                communityId = data.id; // set community id
                _.assign(data, { slug });
                return data;
            });
    }


    /**
     * Method used ONLY for server-side rendering; kick-off all requests.
     * If view has children with their own data, then call their vm's too.
     *
     * @param {Object} [metadata]   Router or other data that may affect what data to load
     * @return {Promise}            Resolve promise when ALL requests complete, successful or not
     */
    function loadComponentData(metadata = {}) {
        const branchConfig = _.clone(branchOptions);
        let slug = metadata; // router-slug = community-url-name

        if (_.isPlainObject(metadata) && metadata.params) {
            slug = metadata.params.slug; // params = router-params
        }

        // the slug/name is used as the branchId for state-data
        // [parentPath][rootPath][branchId] = 'community.views.join.30-day-adventures'
        if (slug) {
            branchConfig.branchId = slug;
        }

        // create a branch object
        const branch = getBranch(branchConfig);
        // Either dispatch a successful data response from the model,
        // or { hasErrors: true, error: <errorCode> } If getData fails for some reason
        // ( non-200 response codes )
        return new Promise((res) => {
            return getData(slug || defaultCommunitySlug)
                .catch(err => ({
                    hasErrors: true,
                    error: err,
                }))
                .then((data) => {
                    res(
                        branch.dispatch({
                            type: actions.SET_COMMUNITY_DATA,
                            payload: data,
                            error: data.hasErrors,
                        })
                    );
                });
        });
    }


    // return the vm API
    return {
        getData,
        loadComponentData,
        // pass through simple string-getter method; no logic or requests
        // Until refactored, this must be passed to the Signup & Login sub-components
        getCommunitiesAPIPath: model.getCommunitiesAPIPath,
    };
}
