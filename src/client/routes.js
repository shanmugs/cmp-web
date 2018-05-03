import legacyRoutes from './legacyRoutes';


// Nightwatch uses HEAD requests when preforming tests, Applying this to the routes lets the
// ReduxRouterEngine know that it can respond to these requests, otherwise it throws an error
const methods = 'get,head';

const routes = [{
    path: '/',
    component: 'Layout',
    methods,
    childRoutes: [
        {
            path: 'give/error',
            component: 'GiveErrorView',
            params: { layout: { header: false } },
            methods,
        },
        // {
        //     path: 'give/to/friend/new',
        //     component: 'GiveMoney',
        //     params: { layout: { sidebar: true } },
        //     methods,
        // },
        // {
        //     path: 'give/to/group/new',
        //     component: 'GiveMoneyGroup',
        //     methods,
        // },
        // {
        //     path: 'give/to/friend/account-top-up',
        //     component: 'AccountTopUp',
        //     methods,
        // },
        // {
        //     path: 'give/to/friend/tax-receipt-profile',
        //     component: 'TaxReceiptProfile',
        //     methods,
        // },
        // {
        //     path: 'donations/new',
        //     component: 'AddMoney',
        //     methods,
        // },
        // {
        //     path: 'donations/success',
        //     component: 'DonationSucessView',
        //     methods,
        // },
        // {
        //     path: 'give/to/friend/success',
        //     component: 'P2pSuccessView',
        //     methods,
        // },
        // {
        //     path: 'give/to/friend/review',
        //     component: 'AllocationReviewView',
        //     methods,
        // },
        // {
        //     path: 'users/dashboard',
        //     component: 'UserDashboard',
        //     // params: { authRequired: true },
        //     methods,
        // },
        // {
        //     path: 'users/login',
        //     component: 'UserLogin',
        //     // params: { authRequired: false },
        //     methods,
        // },
        // {
        //     path: 'users/new',
        //     component: 'UserNew',
        //     // params: { authRequired: false },
        //     methods,
        // },
        // {
        //     path: 'claim/gift/:token',
        //     component: 'P2pInvite',
        //     params: { layout: { header: false } },
        //     methods,
        // },
        // {
        //     path: 'communities/:slug/join',
        //     component: 'CommunityJoin',
        //     params: { layout: { header: false } },
        //     methods,
        // },
        // {
        //     path: 'companies/:slug/join',
        //     component: 'CommunityJoin',
        //     params: { layout: { header: false } },
        //     methods,
        // },
    ],
}];

/* eslint-disable import/prefer-default-export */
export {
    routes,
    legacyRoutes,
};
