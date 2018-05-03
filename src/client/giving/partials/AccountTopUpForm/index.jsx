/**
 * Account Topup Form Component
 *
 * @see https://internal-release.24467.org/give/to/friend/new
 */

import React from 'react';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import {
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Popup,
    Select,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import {
    connectBranch,
    getState,
} from 'client/common/store';
import CreditCard from 'client/giving/components/CreditCard';
import { createToken } from 'client/giving/actions';
import {
    cardListOptions,
    donationMatchList,
} from 'client/giving/common/helpers/giving-form-data';

const { stripeURL } = getState('/config/endpoints');

const messageList = defineMessages({
    accountTopUpHeaderLabel: {
        id: 'giving.accountTopUpHeaderLabel',
        description: 'foo',
        defaultMessage: 'Top up your account balance to give this gift',
    },
    addAmount: {
        id: 'giving.addAmount',
        description: 'foo',
        defaultMessage: 'Add',
    },
    creditCardName: {
        id: 'giving.creditCardName',
        description: 'foo',
        defaultMessage: 'Credit Card Name',
    },
    donationMatch: {
        id: 'giving.donationMatch',
        description: 'foo',
        defaultMessage: 'Donation Match',
    },
    donationMatchHelp: {
        id: 'giving.donationMatchHelp',
        description: 'foo',
        defaultMessage: 'If there is an opportunity for this money to be matched, it will appear here. A request will go to the matching party (your employer, for example) who can then choose to match it according to their policy.',
    },
    testCreditCardLabel: {
        id: 'giving.testCreditCardLabel',
        description: 'foo',
        defaultMessage: 'User a test credit card',
    },
    testCreditCardListLabel: {
        id: 'giving.testCreditCardListLabel',
        description: 'foo',
        defaultMessage: 'Show Test Cards',
    },
});


class AccountTopUpForm extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedCardDetails: {},
            isTestsEnbled: false,
            errorMessage: '',
            creditCardVisible: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        createToken({
            number: this.state.selectedCardDetails.cardNumber,
            cvc: this.state.selectedCardDetails.cvv,
            exp_month: this.state.selectedCardDetails.expiryMonth,
            exp_year: this.state.selectedCardDetails.expiryYear,
        });
    }
    handleTestCreditCardList() {
        this.setState({
            isTestsEnbled: !this.state.isTestsEnbled,
        });
    }
    handleTestCreditCard() {
        this.setState({
            creditCardVisible: true,
            selectedCardDetails: testcard,
        });
    }
    handleSelectChange(event, { options, value }) {
        let creditCardVisible = true;
        let selectedCardDetails = {
            cardNumber: '',
            cvv: '',
            expiryMonth: '',
            expiryYear: '',
            nameOnCard: '',
        };

        if (value !== 'new') {
            const selectedCard = _.some(options, value);

            creditCardVisible = false;
            selectedCardDetails = _.pluck(_.get(selectedCard, '[0].data'), [
                'cardNumber',
                'cvv',
                'expiryMonth',
                'expiryYear',
                'nameOnCard',
            ]);
        }

        this.setState({
            creditCardVisible,
            selectedCardDetails,
        });
    }

    // call Credit card component onChange method
    handleCreditCardDataChange(CardDetails) {
        const selectedCardDetails = _.assign(this.state.selectedCardDetails, CardDetails);
        this.setState({
            selectedCardDetails,
        });
    }
    // Getting Error message from Credit card component
    handleErrorMessage(msg) {
        let errorMessage = '';
        if (msg) {
            errorMessage = msg;
        }
        this.setState({
            errorMessage,
        });
    }
    CreditCards() {
        return (
            <Select
                onChange={this.handleSelectChange}
                options={cardListOptions}
                placeholder="Select Credit Card"
                value={this.state.value}
            />
        );
    }

    render() {
        const {
            formatMessage,
        } = this.props.intl;
        const {
            errorMessage,
            creditCardVisible,
            selectedCardDetails,
        } = this.state;

        return (
            <Form>
                <Helmet>
                    <script
                        src={stripeURL}
                        type="text/javascript"
                    />
                </Helmet>
                <Grid
                    divided="vertically"
                >
                    <Grid.Row>
                        <Grid.Column>
                            <Header
                                as="h3"
                            >
                                {formatMessage(messageList.accountTopUpHeaderLabel)}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Grid
                                columns={3}
                            >
                                <Grid.Row
                                    verticalAlign="middle"
                                >
                                    <Grid.Column
                                        className="field"
                                        width={4}
                                    >
                                        <label
                                            htmlFor="AddAmount"
                                        >
                                            {formatMessage(messageList.addAmount)}
                                        </label>
                                    </Grid.Column>
                                    <Grid.Column
                                        width={10}
                                    >
                                        <Form.Input
                                            icon="dollar"
                                            iconPosition="left"
                                            id="addAmount"
                                            name="addAmount"
                                            onChange={this.handleInputChange}
                                            value={this.state.addAmount}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row
                                    verticalAlign="middle"
                                >
                                    <Grid.Column
                                        className="field"
                                        width={4}
                                    >
                                        <label
                                            htmlFor="donationMatch"
                                        >
                                            {formatMessage(messageList.donationMatch)}
                                        </label>
                                    </Grid.Column>
                                    <Grid.Column
                                        width={10}
                                    >
                                        <Form.Field>
                                            <Select
                                                options={donationMatchList}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column
                                        width={2}
                                    >
                                        <Popup
                                            content={formatMessage(messageList.donationMatchHelp)}
                                            position="right center"
                                            trigger={
                                                <Icon
                                                    color="blue"
                                                    name="question circle"
                                                    size="large"
                                                />
                                            }
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row
                                    verticalAlign="middle"
                                >
                                    <Grid.Column
                                        className="field"
                                        width={4}
                                    >
                                        <label
                                            htmlFor="creditCardName"
                                        >
                                            {formatMessage(messageList.creditCardName)}
                                        </label>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Form.Field>
                                            {this.CreditCards()}
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>                                
                                <Grid.Row>
                                    <Grid.Column
                                        className="field"
                                        width={4}
                                    />
                                    <Grid.Column
                                        className="field"
                                        width={10}
                                    >
                                        { !!errorMessage &&
                                            <Message
                                                color="red"
                                            >
                                                {
                                                    errorMessage
                                                }
                                            </Message>
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    { !!creditCardVisible &&
                                        <CreditCard
                                            onChange={this.handleCreditCardDataChange}
                                            data={selectedCardDetails}
                                            errorMessage={this.handleErrorMessage}
                                        />
                                    }
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                        verticalAlign="middle"
                    >
                        <Grid.Column
                            width={4}
                        >
                            <Form.Button
                                color="blue"
                                onClick={this.handleSubmit}
                            >Continue
                            </Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

export default injectIntl(connectBranch(AccountTopUpForm, {
    mapPathsToProps: {
        CredtiCardToken: '/giving/paymentInstruments/token',
    },
}));
