import _ from 'lodash';

import comms from 'client/common/communications';
import realtypeof from 'client/common/helpers/realtypeof';
import setDataToPayload from 'client/users/helpers/setUserData';
import storage from 'client/common/helpers/storage';

import { getBranch } from 'client/common/store';

const types = _.keyBy([
    'FETCH_USER',
    'SET_USER',
]);


const login = async (credentials) => {
    const fsa = {
        type: types.SET_USER,
        payload: {
            isAuthenticated: false,
        },
    };

    if (credentials) {
        const result = await comms.post('/users/login', {
            data: credentials,
        });

        if (realtypeof(result) === 'error') {
            fsa.error = result;
        } else {
            fsa.payload.isAuthenticated = true;
            storage.set('authToken', result.authToken, 'session');
        }
    }

    return getBranch({
        branchPath: '/users/current',
        actions: types,
    }).dispatch(fsa);
};

const checkUserId = (userId) => {
    if (realtypeof(userId) !== 'number') {
        return new TypeError(`[Users.Actions] Fetch User aborted! userId must be a number but got${userId}`);
    }
};

const fetchUser = async (userId) => {
    const isBadUserId = checkUserId(userId);
    if (isBadUserId) return Promise.reject(isBadUserId);
    const fsa = {
        type: types.FETCH_USER,
        payload: {
            id: userId,
        },
    };

    const userData = await comms.get(`/users/${userId}`, {
        params: {
            include: [
                'administeredBeneficiaries',
                'administeredCompanies',
                'administeredCampaigns',
                'administeredGroups',
                'beneficiaryAdminRoles',
                'companyAdminRoles',
                'chimpAdminRole',
                'donorRole',
            ],
        },
    });
    if (realtypeof(userData) === 'error') fsa.error = userData;
    else {
        const { data } = userData;
        const { activeRoleId } = data.attributes;
        let adminRoleId = null;
        _.merge(fsa.payload, {
            campaigns: [],
            currentAccount: {},
            groups: [],
            isAdmin: false,
            otherAccounts: [],

            // This will be removed when authentication is done and
            // will call the 'fetchUser' only is isAuthenticated is true
            isAuthenticated: true,
        });
        if (!_.isEmpty(data.relationships.chimpAdminRole.data)) {
            fsa.payload.isAdmin = true;
            adminRoleId = data.relationships.chimpAdminRole.data.id;
        }
        if (!_.isEmpty(userData.included)) {
            const { included } = userData;
            const accounts = [];
            const contexts = [];
            included.map((item) => {
                const {
                    attributes,
                    id,
                    type,
                } = item;
                if (type === 'groups') {
                    fsa.payload.groups.unshift(setDataToPayload(attributes, type));
                } else if (type === 'campaigns') {
                    fsa.payload.campaigns.unshift(setDataToPayload(attributes, type));
                } else if (type === 'roles') {
                    const { roleType } = attributes;
                    const entityType = _.snakeCase(roleType).split('_')[0];
                    if (entityType.slice(-1) === 'y') {
                        contexts.push({
                            entityId: attributes[`${entityType}Id`],
                            accountType: (entityType === 'beneficiary') ? 'charity' : entityType,
                            roleId: id,
                        });
                    } else if (entityType === 'donor') {
                        const donor = {
                            accountType: 'personal',
                            avatar: data.attributes.avatar,
                            balance: `$${data.attributes.balance}`,
                            location: `/contexts/${id}`,
                            name: data.attributes.displayName,
                        };
                        if (id == activeRoleId
                            || adminRoleId == activeRoleId) {
                            fsa.payload.currentAccount = donor;
                        } else {
                            fsa.payload.otherAccounts.unshift(donor);
                        }
                    }
                } else {
                    accounts[id] = (setDataToPayload(attributes, type));
                }
            });
            _.map(contexts, (context) => {
                const { roleId } = context;
                const account = accounts[context.entityId];
                if (!_.isEmpty(account)) {
                    account.location = `/contexts/${roleId}`;
                    account.accountType = context.accountType;
                    if (roleId == activeRoleId) {
                        fsa.payload.currentAccount = account;
                    } else {
                        fsa.payload.otherAccounts.push(account);
                    }
                }
            });
        }
    }
    return getBranch({
        actions: types,
        branchPath: '/users/current',
    }).dispatch(fsa);
};


export {
    fetchUser,
    login,
    types,
};
