// Account Preview Component
// ===
//
// Displays Account Avatar and Name (truncated with ellipsis when too long)
// along with account type label and account balance (except for charities).


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import classNames from 'classnames';


// Styles
// ---
import './account-preview.scss';


// Messages
// ---
const messageList = defineMessages({
    companyAccount: {
        id: 'header.acccountNav.companyLabel',
        description: 'foo',
        defaultMessage: 'Company Account',
    },
    personalAccount: {
        id: 'header.acccountNav.personalLabel',
        description: 'foo',
        defaultMessage: 'Personal Account',
    },
    charityAccount: {
        id: 'header.acccountNav.charityLabel',
        description: 'foo',
        defaultMessage: 'Charity Account',
    },
});


const AccountPreview = (props) => {
    const { className, avatar, balance, isCurrent, name, accountType, intl } = props;
    const { formatMessage } = intl;

    const accountPreviewClasses = classNames(
        'c-account-preview',
        className,
        {
            'c--current': isCurrent,
            'c--personal': accountType === 'personal',
            'c--company': accountType === 'company',
            'c--charity': accountType === 'charity',
        }
    );

    // Determine Label based on Account Type
    let accountLabel = '';

    switch (accountType) {
    case 'personal':
        accountLabel = formatMessage(messageList.personalAccount);
        break;
    case 'company':
        accountLabel = formatMessage(messageList.companyAccount);
        break;
    case 'charity':
        accountLabel = formatMessage(messageList.charityAccount);
        break;
    default:
        accountLabel = '';
    }

    return (
        <div className={accountPreviewClasses}>
            <img
                className="c-account-preview__avatar"
                src={avatar}
                alt="Account Avatar"
            />
            <div className="c-account-preview__content">
                <div className="c-account-preview__name">{name}</div>
                <div className="c-account-preview__details">
                    <div className="c-account-preview__balance">
                        {balance}
                    </div>
                    <div className="c-account-preview__type">
                        {accountLabel}
                    </div>
                </div>
            </div>
        </div>
    );
};

AccountPreview.defaultProps = {
    className: '',
    isCurrent: false,
};

AccountPreview.propTypes = {
    accountType: PropTypes.oneOf(['company', 'charity', 'personal']),
    avatar: PropTypes.string,
    balance: PropTypes.string,
    className: PropTypes.string,
    intl: intlShape.isRequired,
    isCurrent: PropTypes.bool,
    name: PropTypes.string,
};

export default injectIntl(AccountPreview);
