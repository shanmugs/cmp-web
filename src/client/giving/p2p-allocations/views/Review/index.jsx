import React from 'react';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Breadcrumb,
    Button,
    Container,
    Divider,
    Grid,
    Header,
    List,
    Segment,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';

import accountTypes from 'client/common/partials/AccountNametag/types';
import Callout from '../../../components/Callout';
import AllocationAccounts from '../../components/AllocationAccounts';


const {
    arrayOf,
    number,
    oneOf,
    oneOfType,
    shape,
    string,
} = PropTypes;

const i18n = defineMessages({
    allocationAmountLabel: {
        description: 'Label for the amount being allocated',
        defaultMessage: 'Give',
        id: 'allocations.amountLabel',
    },
    allocationsNonrefundable: {
        description: 'Note to user that gifts cannot be refunded',
        defaultMessage: 'Gifts sent are non-refundable.',
        id: 'allocations.nonrefundable',
    },
    allocationRecipientAmountBreakdown: {
        description: 'Label for the amount being allocated',
        defaultMessage: '({currency}{amount} × {recipientCount} recipients plus match)',
        id: 'allocations.recipientAmountBreakdown',
    },
    commonChange: {
        description: 'alter something',
        defaultMessage: 'change',
        id: 'common.change',
    },
    commonFrom: {
        description: 'Who is giving',
        defaultMessage: 'from',
        id: 'common.from',
    },
    commonEmpty: {
        description: 'No content',
        defaultMessage: 'No content',
        id: 'common.empty',
    },
    commonTo: {
        description: 'Who is giving',
        defaultMessage: 'to',
        id: 'common.to',
    },
    makeChanges: {
        description: 'Link text to bring user to an edit form',
        defaultMessage: 'make changes',
        id: 'common.makeChanges',
    },
    noteToRecipients: {
        description: 'A message from sender includes with the allocation to the recipient',
        defaultMessage: 'Note to recipient(s)',
        id: 'allocations.noteToRecipients',
    },
    noteToSelf: {
        description: 'A private message sender attaches to the allocation for only him/her -self',
        defaultMessage: 'Note to self',
        id: 'allocations.noteToSelf',
    },
    or: {
        description: 'Indicate an alternative option',
        defaultMessage: 'or',
        id: 'common.or',
    },
    sendGift: {
        description: 'CTA for completing the P2P allocation',
        defaultMessage: 'Send gift',
        id: 'allocations.sendGift',
    },
});

/**
 * Display a summary of the Allocation for donor to confirm. Data does not change in this view.
 */
class AllocationReviewView extends BaseComponent {
    constructor(props) {
        super(props);

        const state = _.pick(props, [
            'currency',
            'notes',
            'amount',
            'recipients',
            'sources',
            'taxReceiptProfile',
        ]);
        state.totalAllocation = _.reduce(
            state.sources,
            (total, { amount }, i) => {
                state.sources[i].amount = `${state.currency}${amount}`;

                return (total + amount);
            },
            0,
        );
        state.recipientCount = state.recipients.length;
        state.recipientAmount = (state.totalAllocation / state.recipientCount);
        _.each(state.recipients, (recipient) => {
            recipient.amount = `${state.currency}${state.recipientAmount}`;
        });

        this.state = state;
    }

    render() {
        const { formatMessage } = this.props.intl;
        const {
            currency,
            notes,
            amount,
            recipientCount,
            recipients,
            sources,
            taxReceiptProfile,
            totalAllocation,
        } = this.state;

        return (
            <Grid
                as="main"
                className="v-p2p-allocation u-margin-bottom-lg u-margin-top-lg"
                columns={2}
                container
                stretched
            >
                <Grid.Row>
                    <Grid.Column
                        mobile={16}
                        computer={12}
                    >
                        <Container
                            textAlign="center"
                        >
                            <Breadcrumb size="small">
                                <Breadcrumb.Section
                                    link
                                >
                                    {formatMessage({ id: 'giving.breadcrumbGive' })}
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider
                                    icon="caret right"
                                />
                                <Breadcrumb.Section
                                    active
                                >
                                    {formatMessage({ id: 'giving.breadcrumbReview' })}
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider
                                    icon="caret right"
                                />
                                <Breadcrumb.Section
                                    link
                                >
                                    {formatMessage({ id: 'giving.breadcrumbDone' })}
                                </Breadcrumb.Section>
                            </Breadcrumb>
                        </Container>

                        <Header
                            as="h1"
                            textAlign="center"
                        >
                            {formatMessage({ id: 'giving.breadcrumbReview' })}
                        </Header>

                        <Segment
                            padded
                            secondary
                            textAlign="center"
                        >
                            <Grid
                                columns={3}
                                stackable
                            >
                                <Grid.Column>
                                    <Header
                                        as="h3"
                                    >
                                        {formatMessage(i18n.commonFrom)}
                                    </Header>
                                    <AllocationAccounts
                                        formatMessage={formatMessage}
                                        accounts={sources}
                                        type="sender"
                                    />
                                </Grid.Column>
                                <Grid.Column
                                    verticalAlign="middle"
                                >
                                    <Callout
                                        emphasis="positive"
                                        focus={currency + totalAllocation}
                                        heading={formatMessage(i18n.allocationAmountLabel)}
                                    >
                                        {recipientCount > 1 &&
                                            <p data-insertion="total-split">
                                                {formatMessage(
                                                    i18n.allocationRecipientAmountBreakdown,
                                                    {
                                                        currency,
                                                        amount,
                                                        recipientCount,
                                                    },
                                                )}
                                            </p>
                                        }
                                    </Callout>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header
                                        as="h3"
                                        content={formatMessage(i18n.commonTo)}
                                    />
                                    <AllocationAccounts
                                        formatMessage={formatMessage}
                                        accounts={recipients}
                                        type="recipient"
                                    />
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <List
                            divided
                            relaxed="very"
                            size="large"
                        >
                            <List.Item data-insertion="trp-name">
                                <List.Icon name="file text outline" />
                                <List.Content>
                                    <List.Header
                                        content={
                                            formatMessage({
                                                id: 'taxReceiptProfile.taxReceiptRecipientLabel',
                                            })
                                        }
                                    />
                                    <List.Description>
                                        <div>{taxReceiptProfile.name}</div>
                                        <div>{taxReceiptProfile.address}</div>
                                        <Link to="/give/to/friend/tax-receipt-profile">
                                            {formatMessage(i18n.commonChange)}
                                        </Link>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            {!!notes.toRecipients && <List.Item
                                description={
                                    notes.toRecipients
                                    || formatMessage(i18n.commonEmpty)
                                }
                                data-insertion="note-to-recipient"
                                header={formatMessage(i18n.noteToRecipients)}
                                icon="sticky note"
                            />}
                            {!!notes.toSelf && <List.Item
                                description={
                                    notes.toSelf
                                    || formatMessage(i18n.commonEmpty)
                                }
                                data-insertion="note-to-self"
                                header={formatMessage(i18n.noteToSelf)}
                                icon="sticky note"
                            />}
                        </List>

                        <Divider hidden />

                        <Button
                            as={Link}
                            color="blue"
                            content={formatMessage(i18n.sendGift)}
                            fluid
                            to="/give/to/friend/success"
                        />

                        <Divider hidden />

                        <Container textAlign="center">
                            { /* eslint-disable
                                jsx-a11y/anchor-is-valid,
                                react/jsx-closing-tag-location
                              */ }
                            <p>{formatMessage(i18n.or)} <Link to="/give/to/friend">
                                {formatMessage(i18n.makeChanges)}</Link>
                            </p>
                            { /* eslint-enable
                                jsx-a11y/anchor-is-valid,
                                react/jsx-closing-tag-location
                              */ }
                            <p>
                                {formatMessage(i18n.allocationsNonrefundable)}
                            </p>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                        {
                            // sidebar here
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

// @todo GIVEA-283 Remove after APIs are wired up.
AllocationReviewView.defaultProps = {
    amount: 50.00,
    currency: '$',
    notes: {
        toRecipients: 'Happy birthday!',
        toSelf: '',
    },
    recipients: [
        {
            accountId: 'e6d874d4',
            displayName: 'Joseph Dobson',
            type: 'user',
        },
        {
            accountId: 'fdb965bb',
            displayName: 'Emily Hetherington',
            type: 'user',
        },
        {
            displayName: 'shawnchoishere@helloworldmakecanadagreatagain.ca',
            type: 'email',
        },
    ],
    sources: [
        {
            accountId: '75611007',
            amount: 82.00,
            displayName: 'Jane Prescott',
            type: 'user',
        },
        {
            amount: 50.00,
            displayName: 'Jane Prescott',
            processor: 'visa',
            truncatedPaymentId: 4242,
            type: 'card',
        },
        {
            amount: 18.00,
            displayName: 'Jane Prescott',
            type: 'crypto',
        },
        {
            accountId: 'af3a5661',
            amount: 50.00,
            displayName: 'CHIMP',
            type: 'community',
        },
    ],
    taxReceiptProfile: {
        address: '3308 Ash Street, Vancouver, BC V5Z 3E3',
        name: 'Jane Prescott',
    },
};
AllocationReviewView.propTypes = {
    amount: number,
    currency: string,
    notes: shape({
        noteToRecipients: string,
        noteToSelf: string,
    }),
    recipients: arrayOf(shape({
        accountId: oneOfType([
            string,
            number,
        ]),
        displayName: string.isRequired,
        type: oneOf([
            'email',
            ...accountTypes,
        ]).isRequired,
    })).isRequired,
    sources: arrayOf(shape({
        accountId: oneOfType([
            string,
            number,
        ]),
        amount: number,
        displayName: string.isRequired,
        processor: string,
        type: string.isRequired,
    })).isRequired,
    taxReceiptProfile: shape({
        address: string.isRequired,
        name: string.isRequired,
    }).isRequired,
};

export default injectIntl(AllocationReviewView);
