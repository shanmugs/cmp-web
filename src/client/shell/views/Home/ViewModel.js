import _ from 'lodash';

import { getBranch } from 'client/common/store';

import communitiesModel from 'client/communities/models/communities';

// import child views that have data so call them for server-side rendering
import actions from './actions';


export const branchOptions = {
    branchPath: '/home',
    prefetchAction: 'SET_HOME_DATA',
    actions,
};

export default function ViewModel() {
    // self-instantiate when 'new' keyword not used
    if (!(this instanceof ViewModel)) {
        return new ViewModel();
    }

    // internal process state
    const state = {
        // track data-loading state
        isFetching: false,
        dataLoaded: false,
    };


    /**
     * Standard data-fetching method.
     *
     * @returns {Promise}
     */
    function fetchData(community = 'chimp-community') {
        state.isFetching = true;

        // Use the communities-model to fetch data
        return communitiesModel.getCommunityData(community)
            .then((data) => {
                _.assign(state, {
                    isFetching: false,
                    dataLoaded: true,
                });
                return data;
            })
            .then(data => ({
                data,
                isFetching: false,
                didInvalidate: false,
            }));
    }


    /**
     * @param {Object} [metadata]   Router or other data that may affect what data to load
     * @return {Promise}            Resolve promise when ALL requests complete, successful or not
     */
    function loadComponentData(metadata) {
        // create a branch object
        const branch = getBranch(branchOptions);
        return branch.dispatch({
            type: actions.SET_HOME_DATA,
            payload: fetchData(),
        });
    }


    // return the vm API
    return {
        fetchData,
        loadComponentData,
    };
}
