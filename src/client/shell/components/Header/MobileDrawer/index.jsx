// Nav Drawer
// ===
//
// Off canvas drawer component that contains the mobile navigation menu
//


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import _ from 'lodash';

// Helpers
// ---
import {
    browser,
} from 'client/common/helpers';
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';


// UI components
// ---
import BaseComponent from 'client/common/components/BaseComponent';
import Icon from 'client/common/components/Icon';


// Styles
// ---
import './mobile-drawer.scss';


// Messages
// ---
const messageList = defineMessages({
    close: {
        id: 'common.close',
        description: 'foo',
        defaultMessage: 'Close',
    },
});

const drawerOpenClass = 'c-nav-drawer-is-open';
const mobileNavCutoff = 'sm';

class MobileDrawer extends BaseComponent {
    constructor(props) {
        super(props);

        this._bodyElm = browser.document.body;
    }

    componentWillReceiveProps(nextProps) {
        this.toggleDrawer(
            this.shouldDrawerBeOpen(nextProps.currentBreakpoint, nextProps.isDrawerOpen)
        );
    }

    shouldComponentUpdate(nextProps) {
        return (
            nextProps.isDrawerOpen !== this.props.isDrawerOpen
            || nextProps.currentBreakpoint !== this.props.currentBreakpoint
        );
    }

    componentDidMount() {
        const { props } = this;

        this.updateDrawer(
            this.shouldDrawerBeOpen(props.currentBreakpoint, props.isDrawerOpen)
        );
    }

    handleClose() {
        this.updateDrawer(false);
    }

    overlayTap(event) {
        if (event.currentTarget === event.target) {
            this.updateDrawer(false);
        }
    }

    shouldDrawerBeOpen(currentBreakpoint, isDrawerOpen) {
        const isRightBreakpoint = !adaptiveComponentHelper.greaterThan(
            mobileNavCutoff,
            currentBreakpoint
        );
        return isRightBreakpoint && isDrawerOpen;
    }

    toggleDrawer(doOpenDrawer) {
        return doOpenDrawer
            ? this._bodyElm.classList.add(drawerOpenClass)
            : this._bodyElm.classList.remove(drawerOpenClass);
    }

    updateDrawer(should) {
        const props = this.props;

        return should
            ? props.openDrawer()
            : props.closeDrawer();
    }

    render() {
        const { props } = this;
        const { formatMessage } = props.intl;

        return (
            <div
                className="bonobo c-nav-menu-mobile__wrapper"
                onClick={this.overlayTap}
            >
                {props.children}
                <button
                    type="button"
                    className="c-button c-nav-drawer__close"
                    onClick={this.handleClose}
                >
                    <Icon glyph="close" />
                    <span className="u-visually-hidden">
                        {formatMessage(messageList.close)}
                    </span>
                </button>
            </div>
        );
    }
}

const {
    any,
    bool,
    func,
    string,
} = PropTypes;

MobileDrawer.defaultProps = {
    closeDrawer: _.noop,
    currentBreakpoint: null,
    isDrawerOpen: false,
    openDrawer: _.noop,
};

MobileDrawer.propTypes = {
    children: any,
    closeDrawer: func,
    currentBreakpoint: string,
    intl: intlShape.isRequired,
    isDrawerOpen: bool,
    openDrawer: func,
};

export default injectIntl(MobileDrawer);
