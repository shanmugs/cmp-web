// User Balance Summary Component
// ===
//
// Displays Account balance and a link to Add Money


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import { Link } from 'react-router';
import { legacyRoutes } from 'client/routes';
import GeminiLink from 'client/common/components/GeminiLink';


// Styles
// ---
import './balance-summary.scss';


const messageList = defineMessages({
    addMoneyCTA: {
        id: 'header.accountNav.UserBalanceSummary.cta',
        description: 'foo',
        defaultMessage: 'Add Money',
    },
    inYourAccount: {
        id: 'header.accountNav.inYourAccount',
        description: 'foo',
        defaultMessage: 'in your Account',
    },
});


const UserBalanceSummary = (props) => {
    const { className, type, balance } = props;
    const { formatMessage } = props.intl;

    const componentClass = classNames(
        'c-user-balance-summary',
        'u-flex',
        'u-flex--items-center',
        className,
        {
            'c--personal': type === 'personal',
            'c--company': type === 'company',
        },
    );
    const inYourAccount = formatMessage(messageList.inYourAccount);
    const ctaMessage = formatMessage(messageList.addMoneyCTA);
    return (
        <div className={componentClass}>
            <span className="u-fw-b u-margin-end-sm qa-user-balance-summary-amount">
                {balance}
            </span>
            <span className="c-user-balance-summary__description">
                {inYourAccount}
            </span>
            <GeminiLink
                className="c-button c--light c--pop u-flex-expand-left"
                path={legacyRoutes.donate}
            >
                {ctaMessage}
            </GeminiLink>
        </div>
    );
};

UserBalanceSummary.defaultProps = {
    className: '',
};

UserBalanceSummary.propTypes = {
    intl: intlShape.isRequired,
    className: PropTypes.string,
    balance: PropTypes.string,
    type: PropTypes.string,
};

export default injectIntl(UserBalanceSummary);
