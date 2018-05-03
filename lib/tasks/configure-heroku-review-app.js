/**
 * This script is used by Heroku called by postdeploy step in app.json
 */

const appName = process.argv[2];

const Confippet = require('electrode-confippet');

const CONFIG = Confippet.config;

const herokuApiToken = process.env.HEROKU_API_TOKEN;

const Heroku = require('heroku-client');

const herokuApi = new Heroku({ token: herokuApiToken });

const herokuAppHostName = `${appName}.herokuapp.com`;
const herokuAppUrlOrigin = `http://${herokuAppHostName}`;

const logger = require('../../src/server/helpers/logger');


logger.info(
    'Configure Heroku Review App',
    {
        heroku_app_name: herokuAppUrlOrigin,
    }
);

herokuApi.patch(
    `/apps/${appName}/config-vars`,
    {
        body: {
            APP_HOSTNAME: herokuAppHostName,
            APP_PROXY_URL: `${herokuAppUrlOrigin}/`,
            APP_URL_ORIGIN: herokuAppUrlOrigin,
            ASSETS_URL_ORIGIN: `${herokuAppUrlOrigin}`,
        },
    }
).then((app) => {
    logger.info('Review app succesfully configured!!!');
}).catch(logger.error);
