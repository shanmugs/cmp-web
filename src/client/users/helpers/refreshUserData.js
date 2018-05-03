import _ from 'lodash';
import { getBranch } from 'client/common/store';

import userModel from '../models/user';
import actions from './actions';
import branchConfig from './branchConfig';


/**
 * Trigger a refresh of user data from API
 * @param  {string}  userId NOT IMPLEMENTED: the id of the user's data to refresh.
 * @param  {Object} [metadata]  Route data so we know what page we need to fetch
 * @return {Promise} Wrapper around the fetch request
 */
const refreshUserData = (userId, metadata) => {
    branchConfig.branchPath = `data/${userId || 'current'}`;
    const branch = getBranch(branchConfig);

    return new Promise((resolve, reject) => userModel
        .fetchAccountData(userId, metadata)
        .then((data) => {
            branch
                .dispatch({
                    type: actions.SET_USER_DATA,
                    payload: data,
                    error: false,
                });

            resolve(data);
        })
        .catch((error) => {
            branch
                .dispatch({
                    type: actions.SET_USER_DATA,
                    payload: error,
                    error: true,
                });

            reject(error);
        })
    );
};

export default refreshUserData;
