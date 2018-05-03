'use strict';

require('babel-core/register');
require('babel-polyfill');

/**
 * Test setup for client-side tests.
 *
 * Intended for:
 * - Karma tests: `npm run test-client`
 * - Browser tests: `http://localhost:3000/test/client/test.html`
 */
/*globals window:false*/
const chai = require('chai');
require('bluebird');

/*
 * We need a global sinon to maintain compatibility
 * with existing test suites. However, this will be
 * removed in the future and is being tracked by
 * https://gecgithub01.walmart.com/electrode/electrode-archetype-react-component/issues/10
 */
window.sinon = require('sinon');

// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports
window.expect = chai.expect;

// Plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-shallowly'));

// Mocha (part of static include).
window.mocha.setup({
  ui: 'bdd',
  bail: false,
});

// Preload test state, which is automatically picked up by the store.
const appConfig = require('../../../config/testState.js');
window.__PRELOADED_STATE__ = appConfig;

// --------------------------------------------------------------------------
// Bootstrap
// --------------------------------------------------------------------------
// Use webpack to include all app code _except_ the entry point so we can get
// code coverage in the bundle, whether tested or not.
// NOTE: No need to specify src even in src mode since webpack should handle that already
// const srcReq = require.context('client', true, /^((?!app).)*\.jsx?$/);
// srcReq.keys().map(srcReq);

// Use webpack to infer and `require` tests automatically only for test/client
const testsReq = require.context('client', true, /\.spec.jsx?$/);
testsReq.keys().map(testsReq);

// Only start mocha in browser.
if (!window.__karma__) {
  window.mocha.run();
}
