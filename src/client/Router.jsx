import React from 'react';
import {
    Router,
    browserHistory,
} from 'react-router';
import _ from 'lodash';

// Views
// **ATTENTION** Ensure the import is added to `views{}`
//
// import AccountTopUp from 'client/giving/views/AccountTopUp';
// import AddMoney from 'client/giving/donations/views/AddMoney';
// import AllocationReviewView from 'client/giving/p2p-allocations/views/Review';
// import CommunityJoin from 'client/communities/views/Join';
// import DonationSucessView from 'client/giving/donations/views/Success';
import GiveErrorView from 'client/giving/views/Error';
// import GiveMoney from 'client/giving/p2p-allocations/views/GiveMoney';
// import GiveMoneyGroup from 'client/giving/group-allocations/views/GiveMoney';
import Layout from 'client/shell/views/Layout';
// import P2pInvite from 'client/donations/views/P2PInviteView';
// import P2pSuccessView from 'client/giving/p2p-allocations/views/P2pSuccessView';
// import TaxReceiptProfile from 'client/giving/views/TaxReceiptProfile';
// import UserDashboard from 'client/users/views/Dashboard';
// import UserLogin from 'client/users/views/Login';
// import UserNew from 'client/users/views/SignUp';
import miniLogger from 'client/common/helpers/miniLogger';
import { routes } from 'client/routes';
import { getState } from 'client/common/store';


// avoid circular dep amount views, routes.js, and isGeminiLink
const views = {
    // AccountTopUp,
    // AddMoney,
    // AllocationReviewView,
    // CommunityJoin,
    // DonationSucessView,
    GiveErrorView,
    // GiveMoney,
    // GiveMoneyGroup,
    Layout,
    // P2pInvite,
    // P2pSuccessView,
    // TaxReceiptProfile,
    // UserDashboard,
    // UserLogin,
    // UserNew,
};

let logLevel;
const requireAuth = (nextState, replace) => {
    if (!getState('/users/current').isAuthenticated) {
        const pathname = '/users/login';
        const nextPathname = nextState.location.pathname;

        if (!logLevel) logLevel = getState('/config/logging/level');

        miniLogger(
            // logLevel === 'debug',
            true,
            'info',
            '[Gemini Router] Nonauthenticated access to %s rejected. Redirecting to %s',
            nextPathname,
            pathname,
        );
        replace({
            pathname,
            state: { nextPathname },
        });
    }
};
const requireNonAuth = (nextState, replace) => {
    if (getState('/users/current').isAuthenticated) {
        const pathname = '/users/login';
        const nextPathname = nextState.location.pathname;

        if (!logLevel) logLevel = getState('/config/logging/level');

        miniLogger(
            // logLevel === 'debug',
            true,
            'info',
            '[Gemini Router] Authenticated access to %s rejected. Redirecting to %s',
            nextPathname,
            pathname,
        );
        replace({
            pathname: '/dashboard',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};
const assignRouteViewRecursively = (route) => {
    const view = views[route.component];

    if (typeof view === 'undefined') return;

    route.component = view;

    switch (_.get(route, 'params.authRequired')) {
    case true:
        route.onEnter = requireAuth;
        break;
    case false:
        route.onEnter = requireNonAuth;
        break;
    default: break;
    }

    if (route.childRoutes) _.each(route.childRoutes, assignRouteViewRecursively);
};

_.each(routes, assignRouteViewRecursively);

const SiteRouter = () => (
    <Router
        history={browserHistory}
        routes={routes}
    />
);

export {
    SiteRouter as default,
    routes,
};
