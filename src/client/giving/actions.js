import _ from 'lodash';

import {
    getBranch,
    getState,
} from 'client/common/store';

import comms from 'client/common/communications';
import realtypeof from 'client/common/helpers/realtypeof';

const { stripeKey } = getState('/config/endpoints');
const types = _.keyBy([
    'GET_TAX_RECEIPT_PROFILE',
    'GIVE_CREDIT_CARD_TOKEN',
    'P2P_TAX_RECEIPT',
]);
const paymentInstrumentToken = (token) => {
    const data = {
        type: types.GIVE_CREDIT_CARD_TOKEN,
        payload: {
            paymentInstrumentTokenID: token,
        },
    };

    return getBranch({
        branchPath: '/giving/paymentInstruments/token',
        actions: types,
    }).dispatch(data);
};

const createToken = (cardDetails) => {
    Stripe.setPublishableKey(stripeKey);
    Stripe.card.createToken(cardDetails, (status, response) => {
        if (response.error) {
            return Promise
                .reject(response.error)
                .then((err) => {
                    console.error(err);
                    return err;
                });
        }
        return paymentInstrumentToken(response.id);
    });
};

const updateTaxReceiptProfile = async (updatedState, previousState) => {
    const fsa = {
        payload: {},
        type: types.P2P_TAX_RECEIPT,
    };
    let result = {
        data: updatedState,
    };
    // Checking if creating a new one or just updating the exisitng.
    // if there is a previousState need to check whether data is edited or not.
    if (!_.isEmpty(previousState)) {
        // if there is any change in the data with the previous state.
        if (!_.isEqual(updatedState.attributes, previousState.attributes)
            && _.isEqual(updatedState.id, previousState.id)) {
            const params = {
                data: {
                    id: updatedState.id,
                    attributes: _.pick(
                        updatedState.attributes,
                        ['fullName', 'addressOne', 'addressTwo', 'city', 'province', 'country', 'postalCode'],
                    ),
                    type: updatedState.type,
                },
            };
            result = await comms.patch(`/taxReceiptProfiles/${updatedState.id}`, {
                data: params,
            });
        }
    } else {
    // creating a new tax recepit profile
        const params = {
            data: updatedState,
        };
        result = await comms.post('/taxReceiptProfiles', {
            data: params,
        });
    }
    if (realtypeof(result) === 'error') {
        fsa.error = result;
    } else {
        fsa.payload = result;
    }
    return getBranch({
        actions: types,
        branchPath: '/giving/views',
    }).dispatch(fsa);
};

const getTaxReceiptProfile = async (userId) => {
    if (realtypeof(userId) !== 'number') {
        const isBadUserId = new TypeError(`getTaxReceiptProfile aborted! userId must be a number but got${userId}`);
        return Promise.reject(isBadUserId);
    }
    const fsa = {
        payload: {
        },
        type: types.GET_TAX_RECEIPT_PROFILE,
    };
    const taxProfileData = await comms.get(`/users/${userId}`, {
        params: {
            include: [
                'taxReceiptProfiles',
            ],
        },
    });
    if (realtypeof(taxProfileData) === 'error') fsa.error = taxProfileData;
    else {
        fsa.payload.data = (!_.isEmpty(taxProfileData.included)) ? taxProfileData.included : [];
    }
    return getBranch({
        actions: types,
        branchPath: '/giving/taxreceiptprofile',
    }).dispatch(fsa);
};

export {
    createToken,
    getTaxReceiptProfile,
    types,
    updateTaxReceiptProfile,
};

