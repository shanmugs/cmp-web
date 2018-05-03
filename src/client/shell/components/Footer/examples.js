const examples = [];

examples.push({
    description: 'Global Footer',
    style: {},
    config: {
        routes: {
            root: '/',
            logIn: '/login',
            signUp: '/users/new',
            createGroup: '/groups/new',
            donate: '/donations/new',
            give: '/give',
            send: '/give/to/friend/new',
            fees: '/fees',
            careers: '/careers',
            contactUs: '/contact',
            about: '/about',
            privacy: '/privacy',
            accountAgreement: '/chimp-account-agreement',
            helpCenter: 'http://help.chimp.net/',
            trust: '/trust',
            press: '/press',
            terms: '/terms',
        },
    },
});

module.exports = examples;
