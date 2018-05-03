// Layout View
// ===
//
// Base Layout for the application
//


// Vendor components
// ---
// Import plugins from our node_modules directory

import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
} from 'react-intl';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import {
    Container,
    Grid,
} from 'semantic-ui-react';


// Helpers
// ---

import { connectBranch } from 'client/common/store';
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';
import helpers from 'client/common/helpers/helpers';


// UI Components
// ---

import ErrorView from 'client/shell/views/ErrorView';
import Header from 'client/shell/components/Header';
import Footer from 'client/shell/components/Footer';
import HelpCentre from 'client/shell/components/HelpCentre';

import actions from './actions';
import branchOptions from './branchOptions';

import NewRelicBrowser from 'client/utils/NewRelicBrowser';


const {
    bool,
    func,
    shape,
    string,
} = PropTypes;

// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messages = defineMessages({
    headTitle: {
        description: 'foo',
        defaultMessage: 'Your giving account for charity. Support the causes you love - Chimp',
        id: 'common.headTitle',
    },
    metaDescription: {
        description: 'foo',
        defaultMessage: 'Manage all areas of your giving. Give to any Canadian charity, ' +
        'get instant tax receipts, build a charitable balance, and fundraise with others.',
        id: 'common.metaDescription',
    },
});


const layoutDefaults = {
    header: true, // (true|false|[footer-name])
    footer: true, // (true|false|[footer-name])
    sidebar: false, // (true|false)
};

const View = ({
    children,
    className,
    currentBreakpoint,
    currentUser,
    enableSidebar,
    formatMessage,
}) => {
    const wrapperProps = {
        className: `layout__content view${className}`,
        id: 'app-container',
    };
    let inner = null;

    if (enableSidebar) {
        wrapperProps.container = true;
        wrapperProps.padded = 'vertically';
        wrapperProps.stackable = true;

        inner = (
            <Grid.Row
                centered
                columns={2}
            >
                <Grid.Column
                    as="main"
                    computer={12}
                    mobile={16}
                >
                    {children}
                </Grid.Column>
                <Grid.Column
                    computer={4}
                    mobile={16}
                >
                    {
                        // WP_ENABLE_DEBUGGING &&
                    }
                    <HelpCentre
                        currentBreakpoint={currentBreakpoint}
                        currentUser={currentUser}
                        formatMessage={formatMessage}
                    />
                </Grid.Column>
            </Grid.Row>
        );
    } else {
        wrapperProps.stretched = true;

        inner = (
            <Grid.Column
                as="main"
            >
                {children}
            </Grid.Column>
        );
    }

    return (
        <Grid {...wrapperProps}>
            {inner}
        </Grid>
    );
};

View.defaultProps = {
    currentBreakpoint: 'xs',
    enableSidebar: true,
};
View.propTypes = {
    currentBreakpoint: string,
    currentUser: shape({
        email: string,
        fullName: string,
    }).isRequired,
    enableSidebar: bool,
    formatMessage: func.isRequired,
};


/**
 * @constructor
 * @returns {Component}
 */

class Layout extends BaseComponent {
    constructor(props, context) {
        super(props, context);

        const viewRoute = this.props.router.routes[1];
        const params = viewRoute && viewRoute.params;
        const config = params && params.layout;
        this.layoutConfig = _.assign({}, layoutDefaults, config);
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
        // TEST: this component NEVER updates
        // return false;
    }

    // Shady Potatoes for Sticky Footer classes
    // Until Electrode provides us with hooks to add classes to these elements,
    // here we are.
    componentDidMount() {
        helpers.document.body.classList.add('layout');
        helpers.document.getElementsByClassName('js-content')[0].classList.add('layout');

        this.props.dispatch({
            type: actions.SET_BREAKPOINT,
            payload: { currentBreakpoint: adaptiveComponentHelper.getCurrentBreakpoint() },
        });
        adaptiveComponentHelper.registerAdaptiveComponent('Layout', this.updateBreakpointState);
    }

    updateBreakpointState(currentBreakpoint) {
        // Callback to update the state when a breakpoint is crossed.
        this.props.dispatch({
            type: actions.SET_BREAKPOINT,
            payload: { currentBreakpoint },
        });
    }

    render() {
        const { props } = this;

        const {
            error,
            currentBreakpoint,
            currentUser,
        } = props; // error data set in Redux???
        const config = this.layoutConfig; // from router-params, set in constructor
        const { formatMessage } = props.intl;
        const childComponent = error
            ? <ErrorView {...props} />
            : props.children;

        const viewPathClassName = _.replace(props.location.pathname, /\//g, '-');

        return (
            <div className="app-container layout">
                <Helmet>
                    <title>{formatMessage(messages.headTitle)}</title>
                    <meta name="description" content={formatMessage(messages.metaDescription)} />
                    <meta name="theme-color" content="#024474" />
                    <meta name="application-name" content="CHIMP" />
                    <meta name="msapplication-square150x150logo" content="/mstile-150x150.png" />
                    <meta name="format-detection" content="telephone=no" />

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    {NewRelicBrowser.initScript()}
                </Helmet>

                { config.header &&
                    <Header
                        {...props}
                        className="layout__header"
                    />
                }


                <View
                    className={viewPathClassName}
                    currentBreakpoint={currentBreakpoint}
                    currentUser={currentUser}
                    enableSidebar={config.sidebar}
                    formatMessage={formatMessage}
                >
                    {childComponent}
                </View>

                { config.footer &&
                    <Footer
                        className="layout__header"
                    />
                }
            </div>
        );
    }
}

export default connectBranch(Layout, branchOptions);
