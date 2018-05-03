import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Vendor components
// ---
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

// Helpers
// ---
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';
import helpers from 'client/common/helpers/helpers';
import { legacyRoutes } from 'client/routes';

// UI components
// ---
import Icon from 'client/common/components/Icon';
import HeaderLogo from 'client/shell/components/Header/Logo';
import { InnerWrapper } from 'client/common/components/Layout';
import GeminiLink from 'client/common/components/GeminiLink';

import NavMenu from './NavMenu';
import SearchLink from './SearchLink';


// Messages
// ---
const messageList = defineMessages({
    signUp: {
        id: 'common.signUp',
        description: 'foo',
        defaultMessage: 'Sign Up',
    },
    login: {
        id: 'common.logIn',
        description: 'foo',
        defaultMessage: 'Log In',
    },
});

class NonAuth extends BaseComponent {
    Nav({ navItems, currentBreakpoint, lightText }) {
        const navProps = { items: navItems };
        let components = null;
        if (adaptiveComponentHelper.greaterThan('sm', currentBreakpoint)) {
            const navClass = classNames({
                'c--light-text': lightText,
            });

            navProps.currentBreakpoint = currentBreakpoint;
            navProps.className = navClass;

            components = <NavMenu {...navProps} />;
        }

        return components;
    }

    NavButtons({ currentBreakpoint, buttons }) {
        let returnComponent = null;
        if (currentBreakpoint === 'xs' || currentBreakpoint === 'sm') { // Mobile
            returnComponent = (
                <div className="c-header__button-wrapper">
                    {buttons.signUp}
                    {buttons.search}
                    {buttons.menu}
                </div>
            );
        }

        // Desktop
        if (adaptiveComponentHelper.greaterThan('sm', currentBreakpoint)) {
            returnComponent = (
                <div className="c-header__button-wrapper">
                    {buttons.search}
                    {buttons.login}
                    {buttons.signUp}
                </div>
            );
        }

        return returnComponent;
    }

    LoginButton({ lightText, intl }) {
        const { formatMessage } = intl;
        const loginBtnClass = classNames(
            'c-button',
            'c--pop',
            'u-margin-end-md',
            { 'c--light': lightText },
        );
        const logInButton = (
            <Link to="/users/login" className={loginBtnClass}>
                {formatMessage(messageList.login)}
            </Link>
        );

        return logInButton;
    }

    MenuButton({ openDrawer, isDrawerOpen }) {
        return (
            <button
                type="button"
                className="c-button c-header__menu-button"
                onClick={openDrawer}
                /* animate out the menu button on opening the drawer */
                style={{ opacity: (isDrawerOpen) ? 0 : 1 }}
            >
                Menu
                <Icon glyph="hamburger" />
            </button>
        );
    }

    SignUpButton({ currentBreakpoint, lightText, intl }) {
        const { formatMessage } = intl;

        const isMobile = (currentBreakpoint === 'xs' || currentBreakpoint === 'sm');
        const cssClass = classNames(
            'c-button',
            'c--pop',
            {
                'c--filled u-margin-end-md': isMobile,
                'c--light-inverted': !isMobile && lightText,
                'c--filled': !isMobile && !lightText,
            },
        );

        return (
            <Link to="/users/new" className={cssClass}>
                {formatMessage(messageList.signUp)}
            </Link>
        );
    }

    render() {
        if (helpers.isSSR) return null;

        const {
            Nav,
            NavButtons,
            SignUpButton,
            MenuButton,
            LoginButton,
            props,
        } = this;

        const buttons = {
            search: <SearchLink {...props} />,
            login: <LoginButton {...props} />,
            menu: <MenuButton {...props} />,
            signUp: <SignUpButton {...props} />,
        };

        return (
            <InnerWrapper className="c-header__inner-wrapper">
                <HeaderLogo hardRefresh />
                <Nav
                    lightText={props.lightText}
                    currentBreakpoint={props.currentBreakpoint}
                    navItems={props.navItems}
                />
                <NavButtons
                    currentBreakpoint={props.currentBreakpoint}
                    lightText={props.lightText}
                    buttons={buttons}
                />
            </InnerWrapper>
        );
    }
}


NonAuth.defaultProps = {
    lightText: false,
    navItems: [],
    overlay: false,
    isDrawerOpen: false,
};

NonAuth.propTypes = {
    intl: intlShape.isRequired,
    openDrawer: PropTypes.func.isRequired,
    isDrawerOpen: PropTypes.bool,
    currentBreakpoint: PropTypes.string,
    lightText: PropTypes.bool,
    navItems: PropTypes.array,
    rootURL: PropTypes.string,
    searchEndpoint: PropTypes.string,
};

export default injectIntl(NonAuth);
