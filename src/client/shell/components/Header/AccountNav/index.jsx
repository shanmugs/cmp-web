// Header Account Nav. This component is the contents of the Dropdown under the avatar in the
// authenticated nav bar
// ===

// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import { legacyRoutes } from 'client/routes';

// UI components
// ---
import ListPreview from 'client/common/components/ListPreview';
import LinkList from 'client/shell/components/LinkList';
import Modal from 'client/common/components/Modal';
import BalanceSummary from 'client/users/components/BalanceSummary';
import Icon from 'client/common/components/Icon';

// Helpers
// --
import helpers from 'client/common/helpers/helpers';
import BaseComponent from 'client/common/components/BaseComponent';

// Styles
// ---
import './account-nav.scss';

// Messages
// ---
const messageList = defineMessages({
    settingsHeading: {
        id: 'header.accountNav.settingsHeading',
        description: 'foo',
        defaultMessage: 'Settings',
    },
    beneficiaryAccountSettings: {
        id: 'header.accountNav.settingsLinks.settings',
        description: 'foo',
        defaultMessage: 'Account Settings',
    },
    companyAccountSettings: {
        id: 'header.accountNav.settingsLinks.company.settings',
        description: 'foo',
        defaultMessage: 'Company Account Settings',
    },
    companyAccountTaxReceipt: {
        id: 'header.accountNav.settingsLinks.company.taxReceipt',
        description: 'foo',
        defaultMessage: 'Company Tax Receipts',
    },
    companyAccountTools: {
        id: 'header.accountNav.settingsLinks.company.tools',
        description: 'foo',
        defaultMessage: 'Company Giving Tools',
    },
    accountSettings: {
        id: 'header.accountNav.settingsLinks.settings',
        description: 'foo',
        defaultMessage: 'Account Settings',
    },
    accountTaxReceipt: {
        id: 'header.accountNav.settingsLinks.taxReceipt',
        description: 'foo',
        defaultMessage: 'Tax Receipts',
    },
    accountTools: {
        id: 'header.accountNav.settingsLinks.tools',
        description: 'foo',
        defaultMessage: 'Giving Tools',
    },
    userGreeting: {
        id: 'header.accountNav.userGreeting',
        description: 'foo',
        defaultMessage: 'Hello, {name}!',
    },
    campaignHeader: {
        id: 'header.accountNav.campaignHeader',
        description: 'foo',
        defaultMessage: 'Manage Campaigns',
    },
    groupsHeader: {
        id: 'header.accountNav.groupsHeader',
        description: 'foo',
        defaultMessage: 'Manage Giving Groups',
    },
    viewAll: {
        id: 'header.accountNav.viewAll',
        description: 'foo',
        defaultMessage: 'View All',
    },
    switchAccounts: {
        id: 'header.accountNav.switchAccount',
        description: 'foo',
        defaultMessage: 'Switch Accounts',
    },
    accountMenuLabel: {
        id: 'header.accountNav.a11y.accountMenu',
        description: 'foo',
        defaultMessage: 'Account Menu',
    },
    logout: {
        id: 'common.logout',
        description: 'foo',
        defaultMessage: 'Logout',
    },
    chimpAdmin: {
        id: 'common.chimpAdmin',
        description: 'foo',
        defaultMessage: 'CHIMP Admin',
    },
});

class HeaderAccountNav extends BaseComponent {
    switchToAccountSwitcher() {
        // this.props.switchComponent is defined in //plugins/component-switcher and passed to
        // this component as a way of navigating to the account switcher.
        if (typeof this.props.switchComponent !== 'undefined') {
            this.props.switchComponent(1);
        }
    }

    closeDropdown() {
        helpers.window.closeDropdowns();
    }

    renderSwitchAccountButton() {
        const { otherAccounts } = this.props;
        const { formatMessage } = this.props.intl;

        const switchAccounts = formatMessage(messageList.switchAccounts);

        let switchAccountButton = null;
        if (typeof otherAccounts !== 'undefined' && otherAccounts.length > 0) {
            switchAccountButton = (
                <button
                    type="button"
                    className="c-button c--icon c--small"
                    onClick={this.switchToAccountSwitcher}
                >
                    <span className="u-visually-hidden">{switchAccounts}</span>
                    <Icon glyph="switch" />
                </button>
            );
        }
        return switchAccountButton;
    }

    renderViewAllButton(header, list) {
        const { formatMessage } = this.props.intl;

        const modifiedList = [];

        const viewAll = formatMessage(messageList.viewAll);

        // Renames keys in list to support the format that LinkList accepts
        list.forEach((item) => {
            modifiedList.push({
                name: item.name,
                location: item.link,
            });
        });

        const viewAllButton = (
            <button
                type="button"
                onClick={this.closeDropdown}
                className="c-button c--pop c--small"
            >
                {viewAll}
            </button>
        );

        const modalContent = (
            <div>
                <LinkList
                    className="c--large u-margin-start-lg"
                    links={modifiedList}
                />
            </div>
        );

        return (
            <Portal
                closeOnEsc
                closeOnOutsideClick
                openByClickOn={viewAllButton}
                className="bonobo"
            >
                <Modal
                    header={header}
                    content={modalContent}
                />
            </Portal>
        );
    }

    renderAccountSettings() {
        const settingLinks = [];
        const {
            currentAccount, isAdmin, intl,
        } = this.props;
        const { formatMessage } = intl;
        const {
            templates,
        } = legacyRoutes;

        if (currentAccount.accountType === 'company') {
            settingLinks.push({
                name: formatMessage(messageList.companyAccountSettings),
                location: templates.companyAccountSettings(currentAccount.slug),
            });
            settingLinks.push({
                name: formatMessage(messageList.companyAccountTaxReceipt),
                location: templates.companyTaxReceipts(currentAccount.slug),
            });
            settingLinks.push({
                name: formatMessage(messageList.companyAccountTools),
                location: templates.companyGivingTools(currentAccount.slug),
            });
        } else if (currentAccount.accountType === 'charity') {
            settingLinks.push({
                name: formatMessage(messageList.accountSettings),
                location: templates.beneficiariyAccountSettings(currentAccount.slug),
            });
        } else {
            settingLinks.push({
                name: formatMessage(messageList.accountSettings),
                location: legacyRoutes.accountSettings,
            });
            settingLinks.push({
                name:
                formatMessage(messageList.accountTaxReceipt),
                location: legacyRoutes.accountTaxReceipt,
            });
            settingLinks.push({
                name: formatMessage(messageList.accountTools),
                location: legacyRoutes.accountTools,
            });
        }

        if (isAdmin) {
            settingLinks.push({
                name: formatMessage(messageList.chimpAdmin),
                location: legacyRoutes.adminDashboard,
            });
        }

        settingLinks.push({
            name: formatMessage(messageList.logout),
            location: legacyRoutes.logout,
        });

        return (
            <div className="c-header-account-nav__section">
                <h3 className="u-margin-bottom-md">
                    {formatMessage(messageList.settingsHeading)}
                </h3>
                <LinkList links={settingLinks} itemClass="u-margin-bottom-sm" />
            </div>
        );
    }

    render() {
        const {
            groups,
            campaigns,
            currentAccount,
            intl,
        } = this.props;

        const { formatMessage } = intl;
        const balance = currentAccount.balance;

        const groupsHeader = formatMessage(messageList.groupsHeader);

        const campaignHeader = formatMessage(messageList.campaignHeader);

        let userGreeting = formatMessage(messageList.userGreeting, { name: currentAccount.name });
        if (
            currentAccount.accountType === 'corporate' ||
            currentAccount.accountType === 'benificiary'
        ) {
            userGreeting = currentAccount.name;
        }

        return (
            <div className="c-header-account-nav">
                <h2 className="u-visually-hidden">
                    {formatMessage(messageList.accountMenuLabel)}
                </h2>
                <div className="c-header-account-nav__header">
                    <div className="c-header-account-nav__greeting">
                        {userGreeting}
                    </div>
                    {this.renderSwitchAccountButton()}
                </div>

                {
                    currentAccount.accountType !== 'charity'
                    && <BalanceSummary
                        balance={balance}
                        type={currentAccount.accountType}
                    />
                }

                {this.renderAccountSettings()}

                {
                    (!!groups.length && (currentAccount.accountType === 'personal'))
                    && <div className="c-header-account-nav__section">
                        <ListPreview
                            className="c-header-account-nav__group-list"
                            items={groups}
                            heading={groupsHeader}
                            button={this.renderViewAllButton(groupsHeader, groups)}
                            itemClass="u-margin-bottom-sm"
                        />
                    </div>
                }

                {
                    (!!campaigns.length && (currentAccount.accountType === 'personal'))
                    && <div className="c-header-account-nav__section">
                        <ListPreview
                            className="c-header-account-nav__group-list"
                            items={campaigns}
                            heading={campaignHeader}
                            button={this.renderViewAllButton(campaignHeader, campaigns)}
                            buttonClass="c--small"
                            itemClass="u-margin-bottom-sm"
                        />
                    </div>
                }
            </div>
        );
    }
}

HeaderAccountNav.defaultProps = {
    groups: [],
    campaigns: [],
};

HeaderAccountNav.propTypes = {
    intl: intlShape.isRequired,
    // SwitchComponent function is provided by a direct ComponentSwitcher plugin parent */
    isAdmin: PropTypes.bool,
    currentAccount: PropTypes.shape({
        name: PropTypes.string,
        accountType: PropTypes.oneOf([
            'company',
            'charity',
            'personal',
        ]),
        slug: PropTypes.string,
    }),
    switchComponent: PropTypes.func,
    groups: PropTypes.arrayOf(PropTypes.object),
    campaigns: PropTypes.arrayOf(PropTypes.object),
    otherAccounts: PropTypes.array,
};

export default injectIntl(HeaderAccountNav);
