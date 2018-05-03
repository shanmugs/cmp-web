// Header Container to hook header up to the globalStore
// ===
//
// Responsive global header component
//
import React from 'react';
import PropTypes from 'prop-types';
import {
    connectBranch,
    getState,
} from 'client/common/store';
import _ from 'lodash';

// Vendor components
// ---
import classNames from 'classnames';

// Helpers
// ---
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import { fetchUser } from 'client/users/actions';
import Overlay from 'client/common/components/Overlay';
import actions from './actions';
import Auth from './HeaderAuth';
import getNavData from './navData';
import MobileDrawer from './MobileDrawer';
import MobileNav from './MobileNav';
import NonAuth from './HeaderNonAuth';

// Component Styles
// ---
import './header.scss';
// This value is temporarily added until Auth is done.
const CURRENT_USER_ID = getState('/config/CURRENT_USER_ID');

class Header extends BaseComponent {
    componentDidMount() {
        // TODO: Remove when auth is done
        const userId = Number(CURRENT_USER_ID);
        fetchUser(userId);
    }

    componentWillUnmount() {
        adaptiveComponentHelper.deregisterAdaptiveComponent(this);
    }

    closeDrawer() {
        this.props.dispatch({
            type: actions.CLOSE_DRAWER,
            payload: { isDrawerOpen: false },
        });
    }

    openDrawer() {
        this.props.dispatch({
            type: actions.OPEN_DRAWER,
            payload: { isDrawerOpen: true },
        });
    }


    render() {
        const {
            authentication,
            branch,
            searchEndpoint,
            className,
            currentBreakpoint,
            isDrawerOpen,
            lightText,
            overlay,
        } = this.props;

        const navItems = getNavData(this.props.intl);

        // CT-1706
        // !overlay check disabling authentication header on marketing pages until we've got
        // the marketing authenticated header built
        const Content = authentication.isAuthenticated && !overlay
            ? Auth
            : NonAuth;
        const isNotMobile = adaptiveComponentHelper.greaterThan('sm', currentBreakpoint);

        const headerClass = classNames(
            className,
            'c-header',
            {
                'c--over-hero': (isNotMobile && overlay),
                'c--light-text': (isNotMobile && lightText),
            },
        );

        return (
            <header role="banner" className={headerClass}>
                <Content
                    authentication={authentication}
                    currentBreakpoint={currentBreakpoint}
                    isDrawerOpen={isDrawerOpen}
                    lightText={lightText}
                    navItems={navItems}
                    openDrawer={this.openDrawer}
                    searchEndpoint={searchEndpoint}
                />
                <MobileDrawer
                    closeDrawer={this.closeDrawer}
                    currentBreakpoint={currentBreakpoint}
                    isDrawerOpen={isDrawerOpen}
                    openDrawer={this.openDrawer}
                >
                    <MobileNav
                        items={navItems}
                    />
                </MobileDrawer>
            </header>
        );
    }
}

const {
    array,
    bool,
    func,
    objectOf,
    shape,
    string,
} = PropTypes;

Header.defaultProps = {
    authentication: {
        isAuthenticated: false,
    },
    className: '',
    isDrawerOpen: false,
    lightText: false,
    overlay: false,
};

Header.propTypes = {
    authentication: shape({
        isAuthenticated: bool,
    }),
    className: string,
    isDrawerOpen: bool,
    lightText: bool,
    overlay: bool,
};

export default connectBranch(Header, {
    rootPath: '/shell/components/header',
    branchPath: 'main',
    mapPathsToProps: {
        authentication: '/users/current',
    },
    actions,
});
