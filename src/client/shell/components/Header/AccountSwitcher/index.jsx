// Header Account Nav
// ===
// This component is the contents of the Dropdown under the avatar in the
// authenticated nav bar


// Vendor Components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';


// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';


// UI components
// ---
import AccountPreview from 'client/shell/components/AccountPreview';
import List from 'client/shell/components/AccountPreview/List';


// Styles
// ---
import './account-switcher.scss';


// Messages
// ---
const messageList = defineMessages({
    switchAccountHeading: {
        id: 'header.accountNav.switchAccount',
        description: 'foo',
        defaultMessage: 'Switch Accounts',
    },
    more: {
        id: 'header.accountNav.switch.moreLabel',
        description: 'foo',
        defaultMessage: 'See more Accounts',
    },
    cancel: {
        id: 'common.cancel',
        description: 'foo',
        defaultMessage: 'Cancel',
    },
});

class HeaderAccountSwitcher extends BaseComponent {
    switchToAccountNav() {
        this.props.switchComponent(0);
    }

    render() {
        const {
            accountType,
            avatar,
            balance,
            name,
        } = this.props.currentAccount;

        const { otherAccounts, intl } = this.props;
        const { formatMessage } = intl;

        return (
            <div className="c-header-account-switcher">
                <div className="c-header-account-switcher__header">
                    <div className="c-header-account-switcher__greeting">
                        <h3>{formatMessage(messageList.switchAccountHeading)}</h3>
                    </div>
                    <button
                        className="c-button c--small"
                        onClick={this.switchToAccountNav}
                    >
                        {formatMessage(messageList.cancel)}
                    </button>
                </div>
                <AccountPreview
                    avatar={avatar}
                    balance={balance}
                    name={name}
                    accountType={accountType}
                    isCurrent
                />
                <List
                    items={otherAccounts}
                    moreLink={formatMessage(messageList.more)}
                    heading={formatMessage(messageList.switchAccountHeading)}
                />
            </div>
        );
    }
}

HeaderAccountSwitcher.defaultProps = {
    switchComponent: () => {},
};

HeaderAccountSwitcher.propTypes = {
    intl: intlShape.isRequired,
    switchComponent: PropTypes.func,
    currentAccount: PropTypes.shape({
        accountType: PropTypes.oneOf(['company', 'charity', 'personal']),
        avatar: PropTypes.string,
        balance: PropTypes.string,
        name: PropTypes.string,
    }),
    otherAccounts: PropTypes.arrayOf(
        PropTypes.shape({
            avatar: PropTypes.string,
            balance: PropTypes.string,
            location: PropTypes.string,
            name: PropTypes.string,
            accountType: PropTypes.oneOf(['company', 'charity', 'personal']),
        })
    ),
};

export default injectIntl(HeaderAccountSwitcher);
