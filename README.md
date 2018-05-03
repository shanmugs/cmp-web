# Chimp Web App

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> The Netflix of charity

## Installation

Check your globally installed Node version:

```sh
node -v
```

If the version displayed is _less than_ 8.5.0, then run this:

```sh
$ nodenv install 8.5.0 && nodenv rehash
```

Install the packages:

```sh
$ yarn install
```

To test the installation and initialize generated assets, run:

```sh
$ yarn run build
```

Watch for errors displayed in red.


## Usage

### Dev mode

Transpile the source code, enable hot-reloading (and file watching), and start the Babel dev server:

```sh
# .env
NODE_ENV="development"
```

```sh
# Always ensure your node_modules folder is clean
$ yarn cache clean && rm -rf node_modules
```

```sh
# Installs all dependencies and devDependencies. This is needed for building the app.
$ yarn install
```

```sh
$ yarn run dev
```

### Prod mode

Build the app and start the app server (does not update whilst running when source-code changes):

```sh
# .env
NODE_ENV="production"
```

```sh
# Always ensure your node_modules folder is clean
$ yarn cache clean && rm -rf node_modules
```

```sh
# Installs all dependencies and devDependencies. This is needed for building the app.
$ yarn install
```

```sh
$ yarn run build && yarn run start
```

## Environment Variables
Name | Description
------------------------ | ---------------------------------------------------------------------------------------------
API_BASE_PATH | The Base Path to CHIMP APIs.
APP_HOSTNAME | The app's hostname. Used only when USE_NGINX is TRUE.
APP_PROXY_URL | URL used to for NGINX configuration.
APP_URL_ORIGIN | The URL origin of this application.
ASSETS_URL_ORIGIN | The URL origin of the Assets Host.
BLOG_PROXY_URL | NGINX configuration variable.  Sets CHIMP's blog URL.
CHIMP_API_URL_ORIGIN | The URL origin of CHIMP API.
DEFAULT_LOCALE | The default locale of the application.
GIVING-IN-CANADA_PROXY_URL | NGINX configuration variable.  Sets CHIMP's markeing URL.
HEROKU_API_TOKEN | The API token needed to configure Heroku Review Apps.
LOG_LEVEL | The minimum log level to record. Does not apply to client side logger.
NEW_RELIC_APPLICATION_ID | New Relic's ID for the specific application. See [New Relic Browser](https://docs.newrelic.com/docs/browser/new-relic-browser/configuration/copy-browser-monitoring-license-key-app-id)
NEW_RELIC_PUBLIC_LICENSE_KEY | The public key provided by New Relic Browser. See [New Relic Browser](https://docs.newrelic.com/docs/browser/new-relic-browser/configuration/copy-browser-monitoring-license-key-app-id)
NEW_RELIC_LICENSE_KEY | The secret New Relic license key. This key is inserted automatically by the add on so do not rename this config variable.
NODE_ENV | Always "production" for Heroku environments.
NODE_MODULES_CACHE | Heroku configuration variable. "TRUE" to cache packages between builds. See [Cache behaviour](https://devcenter.heroku.com/articles/nodejs-support#cache-behavior).
NPM_CONFIG_PRODUCTION | Possibly still being used by Electrode when building assets. False to install
devDependencies required to build the app.
RAILS_APP_PROXY_URL | URL used to for NGINX configuration.
RAILS_APP_URL_ORIGIN | The URL origin of the Legacy Rails Application.
STATIC_ASSETS_URL_ORIGIN | The URL origin of the Static Asset Host.
STATIC_FILES_OFF | "TRUE" to test your app server locally in production mode.
STRATEGIES_PROXY_URL | NGINX configuration variable.  Sets CHIMP's CIS URL.
STRIPE_KEY | The public key needed to communicate with Stripe.
STRIPE_URL | The URL to Stripe's javascript snippet.
USE_NGINX | "TRUE" if app uses NGINX to proxy requests. SET to "FALSE", for local development.
YARN_PRODUCTION | Heroku configuration variable. Analogous to NPM_CONFIG_PRODUCTION. "TRUE" to only install packages listed in `dependencies` of `package.json`. "FALSE" to install `dependencies` and `devDependencies`

## Using [Heroku Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps)

To spin up a Review App for a PR:
1. Submit a pull-request against the `develop` branch.
2. Click `Create Review App` in the Heroku pipeline under the corresponding PR / Review App.

Review Apps are configured via [`app.json`](https://github.com/ChimpTech/chimp-web-client/blob/develop/app.json). Environment variables that should be inherited from `gemini-dev-client` have `"required": true` set, and can be overwritten by the review app by specifying `"value": "some-value"`. A post-deploy script runs via Heroku CLI (credentials are kept in `.netrc`) which configures the app to use the Review App Heroku url (APP_URL_ORIGIN, ASSETS_URL_ORIGIN, APP_HOSTNAME).

## High-level Application Overview

Gemini uses the [Electrode](https://docs.electrode.io/overview/what-is-electrode.html) framework to boilerplate much of the behind-the-scenes infrastructure.

### Project Structure

> **Note!** Make sure you have already built the app using `npm run dev`

|Name|Description|
|----|-----------|
|[`archetype/`](https://docs.electrode.io/chapter1/intermediate/app-archetype/)|Contains Electrode build and runtime configuration for the app|
|`archetype/config/karma/`|Configure Karma (test runner)|
|[`archetype/config/webpack/`](https://docs.electrode.io/chapter1/intermediate/app-archetype/webpack-config.html)|Configure Electrode's webpack|
|[`config/`](https://docs.electrode.io/chapter1/advanced/stand-alone-modules/confippet.html#electrode-setup)|Contains Confippet configurations (used by Express, Redux, and WebPack)|
|`config/initializers/`||
|`config/partials/`|Confippet partials (these get injected into the Redux Store during initialisation)|
|`config/default.js`|Default Confippet configuration (this is the only one that gets used / works)|
|`config/default.json`|Don't use|
|`config/production.js`|Don't use|
|`config/production.json`|Don't use|
|`config/testState.js`|Confippet configuration used for tests|
|`demos/`|Delete me|
|`dist/`¹|Contains code compiled by WebPack for distribution (used in "production" mode)|
|`lib/`¹|Contains code transpiledcompiled by Babel for hot-reloading (used in "development" mode)|
|`nightwatch/`|Contains integration tests|
|`node_modules/`¹|Contains all your npm dependencies|
|`src/`|Contains Gemini's source-code (see [CONTRIBUTING.md](./CONTRIBUTING.md))|
|`.editorConfig`|IDE configuration (ex use spaces instead of tabs)|
|`.env`|Sets environment variables for running Gemini locally (ignored when deployed)|
|`.isomorphic-loader-config.json`¹|File generated by Electrode from WebPack output|
|`.node-version`|Used by [`nodenv`](https://github.com/nodenv/nodenv) to determine the version of NodeJS to be used for this project (instead of using package.json's node config)|
|`gulpfile.js`|Purpose|
|`nightwatch.conf.js`|Purpose|
|`nightwatch.js`|Purpose|
|[`package.json`](https://docs.npmjs.com/files/package.json)|Gemini package's npm configuration (can also contain configurations used by many npm packages, such as Babel)|
|[`Procfile`](https://devcenter.heroku.com/articles/procfile)|Heroku dyno configuration|

¹ ignored by Git

## License

 © 2017 Chimp Technology Inc. All rights reserved.


[npm-image]: https://badge.fury.io/js/chimp.svg
[npm-url]: https://npmjs.org/package/chimp
[travis-image]: https://travis-ci.org/ChimpTech/chimp.svg?branch=master
[travis-url]: https://travis-ci.org/ChimpTech/chimp
[daviddm-image]: https://david-dm.org/ChimpTech/chimp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ChimpTech/chimp
