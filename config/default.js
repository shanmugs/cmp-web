const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const appPaths = { root: process.cwd() };

// When running locally yarn run dev process.env.NODE_ENV == 'development' even if
// in your .env file NODE_ENV is set to production.
// When running in a hosted environment this is read from configuration variables.
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');

    dotenv.config();

    const envFile = path.resolve(appPaths.root, `.env.${process.env.NODE_ENV}`);

    if (fs.existsSync(envFile)) {
        _.merge(
            process.env,
            dotenv.parse(fs.readFileSync(envFile))
        );
    }

    winston.log(
        'Configured application using dotenv',
        {
            NODE_ENV: process.env.NODE_ENV,
        }
    );
}

const defaultListenPort = 3000;

appPaths.src = path.resolve(appPaths.root, 'src');
appPaths.client = path.resolve(appPaths.src, 'client');
appPaths.server = path.resolve(appPaths.src, 'server');

// Read in all files from ./partials to merge them in mergePartials()
const partialDir = path.resolve(__dirname, './partials/');
const partials = _.map(fs.readdirSync(partialDir), (file) => {
    return require(path.resolve(partialDir, file));
});

const portFromEnv = () => {
    if (process.env.NODE_ENV === 'production' && process.env.USE_NGINX) {
        fs.closeSync(fs.openSync('/tmp/app-initialized', 'w'));
        return '/tmp/nginx.socket';
    }

    const x = parseInt(process.env.PORT, 10);

    return _.isNumber(x)
        ? x
        : defaultListenPort;
};

const mergePartials = (configObj) => _.merge({}, configObj, ...partials);

/**
 * NO sensitive configuration variables are to be used here.
 */
const storeConfig = () => {
    // TODO: CT-4342 Update default hosts/endpoints to actual prod values
    const initConfig = {
        endpoints: {
            apiBasePath: process.env.API_BASE_PATH,
            appUrlOrigin: process.env.APP_URL_ORIGIN,
            assetsUrlOrigin: process.env.ASSETS_URL_ORIGIN,
            chimpApiUrlOrigin: process.env.CHIMP_API_URL_ORIGIN,
            railsAppUrlOrigin: process.env.RAILS_APP_URL_ORIGIN,
            staticAssetsUrlOrigin: process.env.STATIC_ASSETS_URL_ORIGIN,
            stripeKey: process.env.STRIPE_KEY,
            stripeURL: process.env.STRIPE_URL,
        },
        env: process.env.NODE_ENV,
        // locale will be overridden by the response from the data endpoint
        locales: {
            current: process.env.DEFAULT_LOCALE || 'en',
        },
        logging: {
            level: process.env.LOG_LEVEL || 'error',
            newRelicApplicationID: process.env.NEW_RELIC_APPLICATION_ID,
            newRelicPublicLicenseKey: process.env.NEW_RELIC_PUBLIC_LICENSE_KEY,
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
        // This value is temporarily added until Auth is done.
        CURRENT_USER_ID: process.env.CURRENT_USER_ID,
    };
    return mergePartials(initConfig);
};

module.exports = {
    storeConfig: storeConfig(),
    plugins: {
        inert: {
            enable: true,
        },
        electrodeStaticPaths: {
            enable: true,
            options: {
                pathPrefix: 'dist',
            },
        },
        webapp: {
            module: 'electrode-react-webapp/lib/express',
            options: {
                bundleChunkSelector: path.resolve(__dirname, './utils/chunk-selector'),
                pageTitle: 'CHIMP',
                paths: {
                    '*': {
                        content: {
                            module: path.resolve(appPaths.server, 'views/index-view'),
                        },
                    },
                },
            },
        },
    },
    connections: {
        default: {
            host: process.env.HOST,
            address: process.env.HOST_IP || '0.0.0.0',
            port: portFromEnv(),
            routes: {
                cors: true,
            },
            state: {
                ignoreErrors: true,
            },
        },
    },
    appPaths,
};
