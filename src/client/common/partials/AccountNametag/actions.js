import _ from 'lodash';

// import beneficiaries from 'client/beneficiaries/actions';
// import communities from 'client/communities/actions';
// import companies from 'client/companies/actions';
// import groups from 'client/groups/actions';
// import users from 'client/users/actions';

import accountTypes from './types';

// tmp
// @todo GIVEA-283 Requires integration
const fetchAccounts = id => Promise.resolve([
    {
        avatar: false,
        displayName: 'Fetch Mock',
        id,
    },
]);
const beneficiaries = {
    fetchAccounts,
};
const communities = {
    fetchAccounts,
};
const companies = {
    fetchAccounts,
};
const groups = {
    fetchAccounts,
};
const users = {
    fetchAccounts,
};
// \ tmp

// do NOT export these
// they should be accessed directly via their own domain
const actions = {
    beneficiaries,
    communities,
    companies,
    groups,
    users,
};

const plurals = _.zipObject(accountTypes, _.keys(actions));

/**
 * Dynamically alias the applicable domain's fetch action.
 * @param  {string} options.accountId The domain-specific account id to be fetched
 * @param  {string} options.type      The domain/account type to fetch. Used to select domain's
 * action.
 * @return {Promise} The promise returned by the domain's action (should be from a dispatch).
 */
// @today GIVEA-283 Specs for this
const fetchAccount = ({ accountId, type }) => {
    const domain = plurals[type];

    if (!domain) Promise.reject(
        new TypeError(`[AccountNametag::fetchAccount] Unknown domain: ${type} not in ${plurals}`),
    );

    return actions[domain].fetchAccounts(accountId);
};

export {
    fetchAccount,
};
