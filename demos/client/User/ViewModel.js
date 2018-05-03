import _ from 'lodash';

import { getBranch } from 'client/common/store';
import whenAllPromisesSettled from 'client/common/helpers/whenAllPromisesSettled';

// import child views that have data so call them for server-side rendering
import actions from './actions';
import Header from './Header';
import Footer from './Footer';


export const branchOptions = Object.freeze({
    parentPath: '/users',
    branchPath: 'main',
    actions,
});


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
            title: 'User Homepage',
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
                    reject(new Error('¯\_(ツ)_/¯'));
                }
            }, 300);

            _.assign(state, {
                isFetching: false,
                dataLoaded: success,
            });
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
        // create a branch object
        const branch = getBranch(branchOptions);
        const loadPromise = branch.dispatch({
            type: actions.SET_USER_DATA,
            payload: fetchData(),
        });

        // When called by server-side rendering, kick-off child-component loading as well.
        return metadata.isServerRendering
            ? whenAllPromisesSettled(
                loadPromise,
                // also tell smart child-components to load their data
                Header.loadComponentData(),
                Footer.loadComponentData(),
            )
            : loadPromise;
    }


    // return the vm API
    return {
        fetchData,
        loadComponentData,
    };
}
