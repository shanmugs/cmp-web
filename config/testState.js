// Static config file consumed by the unit test entry file. This entry file is run in the browser
// and thus doesn't have access to the ENV variables in the dynamically built config file.
// We should figure out how to execute the dynamic config and pass it to the test entry point.

// https://github.com/karma-runner/karma/issues/2066 suggests that it's possible

var baseConfig = {
    config: {
        endpoints: {
            apiBasePath: '/api/v',
            appUrlOrigin: 'http://app.host.tst',
            assetsUrlOrigin: 'http://asset.host.tst',
            chimpApiUrlOrigin: 'http://chimp-api.host.tst',
            railsAppUrlOrigin: 'http://chimp.host.tst',
            staticAssetsUrlOrigin: 'http://static.host.tst',
            v2: [
                '/version2',
            ],
        },
        env: 'test',
        // locale will be overridden by the response from the data endpoint
        locales: {
            current: 'en',
        },
        logging: {
            level: 'debug',
        },
        legacy: {
            headers: {
                'x-requested-with': {
                    ajax: 'LegacyAjaxRequest',
                    content: 'LegacyContentRequest',
                }
            }
        },
        routes: {
            langToggle: '?lang=fr',
            root: '\/',
            logIn: '\/login',
            signUp: '\/users\/new',
            createGroup: '\/groups\/new',
            dashboard: '\/dashboard',
            donate: '\/donations\/new',
            give: '\/give',
            send: '\/give\/to\/friend\/new',
            fees: '\/fees',
            careers: '\/careers',
            contactUs: '\/contact',
            about: '\/about',
            privacy: '\/privacy',
            accountAgreement: '\/chimp-account-agreement',
            helpCenter: 'http:\/\/help.chimp.net\/',
            trust: '\/trust',
            press: '\/press',
            terms: '\/terms'
        },
        homeRoute: '/home',
        // Marketing routes listed here kick out to the railsHostUrl
        marketingRoutes: [
            '/home',
            '/2015',
            '/about',
            '/accounts',
            '/brand',
            '/careers',
            '/charities',
            '/chimp-account-agreement',
            '/chimp-foundation',
            '/community-account-agreement',
            '/community',
            '/contact',
            '/discover',
            '/education',
            '/events',
            '/families',
            '/fees',
            '/funding-organizations',
            '/fundraising',
            '/get-started',
            '/giving-groups',
            '/individuals',
            '/investment-account-agreement',
            '/matchco-agreement',
            '/our-story',
            '/philanthropists',
            '/press',
            '/privacy',
            '/qualified-recipient-agreement',
            '/sports',
            '/team',
            '/terms',
            '/trust',
            '/types-of-donations',
            '/ways-to-give',
            '/workplace',
        ],
    },
    layout: {
        breakpoints: {
                currentBreakPoint: 'md',
        },
    },
    users: {
        data: {
            current: {
                isAuthenticated: true,
            }
        }
    }
};

module.exports = baseConfig;
