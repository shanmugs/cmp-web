import _ from 'lodash';

const legacyRoutes = {
    about: '/about',
    accountAgreement: '/chimp-account-agreement',
    accountSettings: '/user/edit',
    accountTaxReceipt: '/user/tax-receipts',
    accountTools: '/user/giving-tools',
    adminDashboard: '/chimp-admin/dashboard',
    careers: '/careers',
    contactUs: '/contact',
    createGroup: '/groups/new',
    dashboard: '/dashboard',
    donate: '/donations/new',
    fees: '/fees',
    give: '/give',
    helpCenter: '/help',
    langToggle: '?lang=fr',
    login: '/login',
    logout: '/logout',
    press: '/press',
    privacy: '/privacy',
    root: '/',
    search: '/search',
    send: '/give/to/friend/new',
    templates: {
        beneficiariyAccountSettings: (charity) => `/admin/beneficiaries/${charity}/info`,
        communityPage: (id) => `/communities/${id}`,
        companyAccountSettings: (company) => `/companies/${company}/edit`,
        companyTaxReceipts: (company) => `/companies/${company}/tax-receipts`,
        companyGivingTools: (company) => `/companies/${company}/giving-tools`,
        companyPage: (id) => `/companies/${id}`,
        contexts: (id) => `/contexts/${id}`,
        groupPage: (id) => `/groups/${id}`,
    },
    terms: '/terms',
    trust: '/trust',
};

/**
 * Determine whether the supplied path is an instance of a known templated legacy route.
 *
 * @param  {String} path The needle to find in the haystack of legacy routes.
 * @return {Bool}        Whether the given path is a legacy route.
 */
const checkLegacyTemplate = (path) => {
    return !!_.find(legacyRoutes.templates, (sub) => {
        const urlPieces = _.reverse(_.compact(path.split('/')));
        const urlParam = urlPieces.length === 3
            ? urlPieces[1]
            : urlPieces[0];

        return path === sub(urlParam);
    });
};

export {
    legacyRoutes as default,
    checkLegacyTemplate,
};
