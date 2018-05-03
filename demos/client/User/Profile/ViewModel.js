import _ from 'lodash';

import { getBranch } from 'client/common/store';

import actions from './actions';

export const branchOptions = {
    parentPath: '/users',
    branchPath: 'profile',
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
     * Standard data-isFetching method. Should be _dispatched_ using custom middleware.
     *
     * @returns {Promise}
     */
    function fetchData() {
        const data = {
            title: 'User Profile',
            content: 'This is mocked data!',
        };

        state.isFetching = true;

        // MOCK an API request with a timeout
        return new Promise((resolve, reject) => {
            // randomly choose whether to resolve or reject this promise
            // const success = Math.floor(Math.random() * 100) % 2 < 1;
            const success = true;
            _.delay(() => {
                if (success) {
                    resolve(data);
                } else {
                    reject();
                }
            }, 300);

            _.assign(state, {
                isFetching: false,
                dataLoaded: success,
            });
        });
    }


    /**
     * @param {Object} [metadata]   Router or other data that may affect what data to load
     * @return {Promise}            Resolve promise when ALL requests complete, successful or not
     */
    function loadComponentData(metadata) {
        // create a branch object
        const branch = getBranch(branchOptions);
        return branch.dispatch({
            type: actions.SET_USER_PROFILE_DATA,
            payload: fetchData(),
        });
    }


    // return the vm API
    return {
        fetchData,
        loadComponentData,
    };
}
