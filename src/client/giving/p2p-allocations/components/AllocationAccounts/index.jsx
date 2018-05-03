import React from 'react';
import {
    defineMessages,
} from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Header,
    Icon,
    Table,
} from 'semantic-ui-react';

import AccountNametag, {
    accountTypes,
} from 'client/common/partials/AccountNametag';


const {
    arrayOf,
    func,
    number,
    oneOf,
    oneOfType,
    shape,
    string,
} = PropTypes;

const i18n = defineMessages({
    applePay: {
        description: 'The Apple account used',
        defaultMessage: '{displayName}\'s Apple account ({amount})',
        id: 'accounts.applePay',
    },
    card: {
        description: 'The Credit Card used',
        defaultMessage: '{displayName}\'s {processor} ending with {truncatedPaymentId} ({amount})',
        id: 'accounts.creditCard',
    },
    community: {
        description: 'The Credit Card used',
        defaultMessage: '{displayName} community matching ({amount})',
        id: 'accounts.community',
    },
    company: {
        description: 'The Credit Card used',
        defaultMessage: '{displayName} company matching ({amount})',
        id: 'accounts.company',
    },
    crypto: {
        description: 'The Digital Wallet used',
        defaultMessage: '{displayName}\'s digital wallet ({amount})',
        id: 'accounts.crypto',
    },
    email: {
        description: 'The email used',
        defaultMessage: '{displayName}\'s email',
        id: 'accounts.email',
    },
    googlePay: {
        description: 'The Google Wallet used',
        defaultMessage: '{displayName}\'s Google wallet ({amount})',
        id: 'accounts.googlePay',
    },
    group: {
        description: 'The Credit Card used',
        defaultMessage: '{displayName} group matching ({amount})',
        id: 'accounts.group',
    },
    paypal: {
        description: 'The Paypal account used',
        defaultMessage: '{displayName}\'s Paypal account ({amount})',
        id: 'accounts.paypal',
    },
    user: {
        description: 'The Credit Card used',
        defaultMessage: '{displayName}\'s account ({amount})',
        id: 'accounts.user',
    },
    recipientUser: {
        description: 'The Credit Card used',
        defaultMessage: '{displayName}\'s account',
        id: 'accounts.recipientUser',
    },
});


const cardProcessors = [
    'amex',
    'discover',
    'mastercard',
    'stripe',
    'visa',
];

const sizes = [
    'mini',
    'tiny',
    'small',
    'large',
    'big',
    'huge',
    'massive',
];
const downSizeAvatar = (size) => {
    const i = _.indexOf(sizes, size);

    return ~i
        ? sizes[i - 1]
        : size;
};

/**
 * Display an icon representing the provided payment type.
 * @param  {string} [props.accountId] If payment type is an account, its indentifier.
 * @param  {string} [props.processor] If the payment type is a credit card, the processing agent.
 * @param  {string} [props.size]      A valid SUIR size. Defaults to SUIR's default.
 * @param  {string} props.type        The payment type.
 * @return {JSX}
 */
const PaymentIcon = ({
    accountId,
    processor,
    size,
    type,
}) => {
    if (_.includes(accountTypes, type)) return (
        <AccountNametag
            account={{
                displayName: false,
                accountId,
                type,
            }}
            size={downSizeAvatar(size)}
        />
    );

    let name = '';

    switch (type) {
        case 'applePay':
            name = 'apple';
            break;
        case 'card':
            name = (_.includes(cardProcessors, processor))
                ? processor
                : 'credit card alternative';
            break;
        case 'crypto':
            name = 'btc';
            break;
        case 'email':
            name = 'at';
            break;
        case 'googlePay':
            name = 'google wallet';
            break;
        case 'paypal':
            name = 'paypal';
            break;
        default:
            break;
    }

    return (
        <Icon
            name={name}
            size={size}
        />
    );
};
/* eslint-disable react/require-default-props */
// these are all optional, so defining `undefined` in defaultProps is stupid
PaymentIcon.propTypes = {
    accountId: string,
    processor: oneOf(cardProcessors),
    size: string,
    type: string.isRequired,
};

/**
 * Create message for recipient(s) or sender(s) for an allocation.
 * @param  {object} props.accounts[i]     One entry of recipient(s)/sender(s) accounts.
 * @param  {function} props.formatMessage React-intl's formatMessage.
 * @param  {string} props.type            Sender/Recipient.
 * @return {string}
 */
const i18nMessage = (account, formatMessage, type) => {
    const i18nKey = (
        type === 'recipient'
        && account.type === 'user'
    )
        ? 'recipientUser'
        : account.type;

    return formatMessage(
        i18n[i18nKey],
        {
            ...account,
        },
    );
};
/* eslint-enable react/require-default-props */

/**
 * Display recipient(s) or sender(s) for an allocation.
 * @param  {array} props.accounts         A list of recipient(s)/sender(s) accounts.
 * @param  {function} props.formatMessage React-intl's formatMessage.
 * @param  {string} props.type            Sender/Recipient.
 * @return {JSX}
 */
const AllocationAccounts = ({ accounts, formatMessage, type }) => {
    if (accounts.length === 1) {
        const [ account ] = accounts;

        return (
            <React.Fragment>
                <PaymentIcon
                    {...account}
                    key={0}
                    size="huge"
                />
                <Header
                    as="h4"
                    content={i18nMessage(account, formatMessage, type)}
                    data-insertion={`${type}-list-item`}
                    key={account.displayName}
                />
            </React.Fragment>
        );
    }

    return (
        <Table
            basic="very"
            collapsing
            unstackable
        >
            <Table.Body>
                {_.map(accounts, (account, i) => (
                    <Table.Row
                        key={i}
                    >
                        <Table.Cell
                            textAlign="center"
                        >
                            <PaymentIcon
                                {...account}
                                size="big"
                            />
                        </Table.Cell>
                        <Table.Cell data-insertion={`${type}-list-item`}>
                            {i18nMessage(account, formatMessage, type)}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
AllocationAccounts.propTypes = {
    accounts: arrayOf(shape({
        amount: string.isRequired,
        displayName: string.isRequired,
        truncatedPaymentId: oneOfType([
            number,
            string,
        ]),
        type: string.isRequired,
    })).isRequired,
    formatMessage: func.isRequired,
    type: oneOf([
        'recipient',
        'sender',
    ])
};

export {
    AllocationAccounts as default,
    PaymentIcon, // for testing
};
