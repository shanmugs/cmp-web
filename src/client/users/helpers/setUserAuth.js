import _ from 'lodash';
import { getBranch } from 'client/common/store';

import userModel from '../models/user';
import actions from './actions';
import branchConfig from './branchConfig';


/**
 * Trigger a set user's auth state from API
 * @param  {string}  userId NOT IMPLEMENTED: the id of the user's data to clear.
 * @return {Promise} Wrapper around the fetch request
 */
const setUserAuth = ({userId, isAuthenticated}) => {
    branchConfig.branchPath = `data/${userId || 'current'}`;
    const branch = getBranch(branchConfig);

    branch.dispatch({
        type: actions.SET_USER_DATA,
        payload: { isAuthenticated },
    });
};

export default setUserAuth;
