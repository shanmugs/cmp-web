//
// This is the client side entry point for the React app.
//

import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from 'client/common/store';
import {
    browser,
} from 'client/common/helpers';

import Router from './Router';

// Libs
import 'client/common/styles/semantic-ui/semantic.less';
import 'client/common/styles/styles.scss';
import 'client/utils/modernizr-custom';
import 'client/utils/my-sprite';

/**
 * Electrode calls window.webappStart on document ready (once the js-content is created).
 */
browser.window.webappStart = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router/>
        </Provider>,
        browser.document.getElementsByClassName('js-content')[0],
    );
};

browserHistory.listen(() => {
    browser.document.body.scrollTop = 0;
});
