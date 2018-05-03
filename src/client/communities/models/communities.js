/* eslint-disable import/extensions, import/no-unresolved, key-spacing, no-multi-spaces */

// import _ from 'lodash';

import server from 'client/common/communications';


/**
 * @constructor
 * @returns {Object}
 */
function Model() {
    // self-instantiate when 'new' keyword not used
    if (!(this instanceof Model)) {
        return new Model();
    }

    // internal process state
    const state = {
        fetchingNames: {},
    };

    // all Community requests use the same API root-path
    const communitiesAPI = 'communities';

    function getCommunitiesAPIPath() {
        return communitiesAPI;
    }

    /**
     * Public getter method for primary community data.
     * This may return data from a cache in future. (eg: indexedDB)
     *
     * @param {string} slug
     * @returns {Promise}
     */
    function getCommunityData(slug, metadata) {
        // if already fetching this data, return existing promise
        return state.fetchingNames[slug] || (state.fetchingNames[slug] = server
            .get(`${communitiesAPI}/${slug}`, metadata)
            .then((resp) => (resp || {}))
            .catch((err) => {
                throw err || { message: 'Unknown Error' };
            })
            .then((...args) => {
                delete state.fetchingNames[slug];
                return args;
            }));
    }


    function postJoinForm(endpoint, formData) {
        return server.post(endpoint, formData);
    }


    // return the model API
    return {
        getCommunityData,
        postJoinForm,
        getCommunitiesAPIPath,
    };
}


const model = new Model();

export {
    model as default,
    Model,
};
