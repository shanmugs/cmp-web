// Vendor Components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import { Link } from 'react-router';

// Vendor components
// ---
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

// UI components
// ---
import BaseComponent from 'client/common/components/BaseComponent';
import AskUs from 'client/shell/components/AskUs';
import Icon from 'client/common/components/Icon';
import MegaNav from 'client/shell/components/MegaNav';
import Modal from 'client/common/components/Modal';
import { InnerWrapper } from 'client/common/components/Layout';
import AccountDropdown from './AccountDropdown';
import GiveDropdown from './GiveDropdown';
import HeaderLogo from './Logo';
import SearchLink from './SearchLink';


const messageList = defineMessages({
    navModalHeader: {
        id: 'nav-modal.header',
        description: 'foo',
        defaultMessage: 'Chimp improves the experience of giving. Here\'s how we do it.',
    },
    menuLabel: {
        id: 'common.menu',
        description: 'foo',
        defaultMessage: 'Menu',
    },
});

class Auth extends BaseComponent {
    NavButton({ navItems, intl }) {
        const { formatMessage } = intl;

        const navButton = (
            <button type="button" className="c-button c--icon u-margin-end-md">
                <span className="u-visually-hidden">{formatMessage(messageList.menuLabel)}</span>
                <Icon glyph="hamburger" />
            </button>
        );

        const modalContent = (
            <div className="pure-g pure-g--gutters">
                <div className="pure-u-5-8">
                    <MegaNav items={navItems} />
                </div>
                <div className="pure-u-3-8">
                    <AskUs />
                </div>
            </div>
        );

        return (
            <Portal closeOnEsc closeOnOutsideClick openByClickOn={navButton} className="bonobo">
                <Modal
                    header={formatMessage(messageList.navModalHeader)}
                    content={modalContent}
                />
            </Portal>
        );
    }

    render() {
        const props = this.props;
        const { NavButton } = this;

        return (
            <InnerWrapper className="c-header__inner-wrapper">
                <HeaderLogo />
                <div className="c-header__button-wrapper">
                    <SearchLink {...props} />
                    <NavButton {...props} />
                    <GiveDropdown {...props.authentication} />
                    <AccountDropdown {...props.authentication} />
                </div>
            </InnerWrapper>
        );
    }
}

const {
    array,
    arrayOf,
    bool,
} = PropTypes;

Auth.propTypes = {
    intl: intlShape.isRequired,
    isDrawerOpen: bool,
    lightText: bool,
    navItems: array,
};


export default injectIntl(Auth);
