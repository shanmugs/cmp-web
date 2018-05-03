/*
    Add Money Form Component
*/

import React from 'react';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import _ from 'lodash';
import {
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Popup,
    Select,
} from 'semantic-ui-react';
import {
    isInputLengthLessThanOneThousand,
    isValidPositiveNumber,
    isAmountMoreThanOneDollor,
    isAmountLessThanOneBillion,
} from 'client/giving/common/helpers/giving-form-validation';

import BaseComponent from 'client/common/components/BaseComponent';
import CreditCard from 'client/giving/components/CreditCard';
import {
    messages,
    errorMessages,
} from 'client/giving/common/messages';
import {
    cardListOptions,
    donationMatchList,
    addingToOptions,
    onWhatDayList,
} from 'client/giving/common/helpers/giving-form-data';

const messageList = defineMessages({
    donationAddingToPopup: {
        description: 'Popup message for donation adding from multiple accounts',
        defaultMessage: 'You administer more than one CHIMP Account, so choose the one you want to add money to now.',
        id: 'donations.donationAddingToPopup',
    },
    automaticDonationPopup: {
        description: 'Popup message for Group from donor',
        defaultMessage: 'If you choose this it means the amount you’re adding now will automatically be added to your account every month. It’s a great way to make sure you have money on hand when you’re inspired to give.',
        id: 'donations.automaticDonationPopup',
    },
    donationsNoteToSelfPopup: {
        description: 'Popup message for self',
        defaultMessage: 'This is just to remind yourself why you added money today. (Example: I got a raise today, and I want to share my good karma.)',
        id: 'donations.donorNoteToSelfPopup',
    },
    donationsMatchfPopup: {
        description: 'Popup message for donation match',
        defaultMessage: 'If there’s an opportunity for this money to be matched, it will appear here. A request will go to the matching party (your employer, for example) who can then choose to match it according to their policy.',
        id: 'donations.donationsMatchfPopup',
    },
    donationRecurringDateNote: {
        description: 'Giving On what day Note',
        defaultMessage: 'Your first recurring donation will happen on {recurringDate}.',
        id: 'donations.donationRecurringDateNote',
    },
    donationMatchNote: {
        description: 'Giving Donation match note',
        defaultMessage: '{companyName} has matched $0.00 on the $0.00 you’ve donated in {donationMonth}.',
        id: 'donations.donationMatchNote',
    },
    donationMatchPolicyNote: {
        description: 'Giving Donation match policy note',
        defaultMessage: '{companyName}’s policy is to match 81 cents per dollar donated, up to $98.00 per month.',
        id: 'donations.donationMatchPolicyNote',
    },
});


class AddMoneyForm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            addingTo: '',
            automaticDonation: false,
            companyName: '',
            creditCard: '',
            creditCardVisible: false,
            creditCardDetails: false,
            donationAmount: '',
            donationMatch: false,
            donationMatchNote: false,
            donationMonth: '',
            donationMatchAmount: '',
            errorMessage: '',
            noteToSelf: '',
            onWhatDay: '',
            paymentSectionVisible: false,
            recurringDate: '',
            selectedCardDetails: {},
            validity: {
                isAmountLessThanMax: true,
                isAmountMoreThanMin: true,
                isValidPositiveNumber: true,
                isNoteToSelfValid: true,
                isAmountBlank: false,
            },
        };
    }

    handleInputChange(event) {
        const {
            name,
            value,
        } = event.target;

        this.setState({
            [name]: value,
        });
    }

    // @todo: GIVEB-119 This needs to be made common as this will be added to Beneficiary allocation
    setDateForRecurring(date) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const month = currentDate.getDate() < date ?
            monthNames[currentDate.getMonth()] : monthNames[currentDate.getMonth() + 1];
        return (`${month} ${date}, ${currentDate.getFullYear()}`);
    }

    handleChekboxChanged(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let onWhatDay = '';
        let recurringDate = '';

        if (value) {
            onWhatDay = '1';
            recurringDate = this.setDateForRecurring('1');
        }
        this.setState({
            [name]: value,
            onWhatDay,
            recurringDate,
        });
    }

    handleRecurringChanged(event, data) {
        this.setState({
            onWhatDay: data.value,
            recurringDate: this.setDateForRecurring(data.value),
        });
    }

    handleAddingToChanged(event, data) {
        if (data.value > 0) {
            this.setState({
                addingTo: data.value,
                companyName: 'Company A',
                donationMatch: true,
                donationMonth: 'March',
                donationMatchAmount: '1',
                donationMatchNote: true,
                paymentSectionVisible: true,
            });
        } else {
            this.setState({
                addingTo: '',
                companyName: '',
                creditCardVisible: false,
                donationMatch: false,
                donationMonth: '',
                donationMatchAmount: '',
                donationMatchNote: false,
                paymentSectionVisible: false,
                selectedCardDetails: {},
            });
        }
    }

    // @todo GIVEB-108 Need to bind the data to donation match dropdown from API
    // and on selection change need to load message based on the response
    handleDonationMatchChanged(event, data) {
        let companyName = '';
        let donationMonth = '';
        let donationMatchNote = false;

        if (data.value !== '2') {
            companyName = 'Company A';
            donationMonth = 'March';
            donationMatchNote = true;
        }
        this.setState({
            companyName,
            donationMonth,
            donationMatchNote,
            donationMatchAmount: data.value,
        });
    }

    creditCards() {
        return (
            <Select
                onChange={this.handleCreditCardChange}
                options={cardListOptions}
                placeholder="Select Credit Card"
                value={this.state.creditCard}
            />
        );
    }

    handleCreditCardChange(event, { options, value }) {
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
            creditCard: value,
        });
    }

    handleCreditCardDataChange(cardDetails) {
        const selectedCardDetails = _.assign(this.state.selectedCardDetails, cardDetails);
        this.setState({
            selectedCardDetails,
        });
    }

    handleErrorMessage(msg) {
        let errorMessage = '';
        if (msg) {
            errorMessage = msg;
        }
        this.setState({
            errorMessage,
        });
    }

    validateForm() {
        const validity = {};
        validity.isAmountLessThanMax = isAmountLessThanOneBillion(this.state.donationAmount);
        validity.isAmountMoreThanMin = isAmountMoreThanOneDollor(this.state.donationAmount);
        validity.isValidPositiveNumber = isValidPositiveNumber(this.state.donationAmount);
        validity.isNoteToSelfValid = isInputLengthLessThanOneThousand(this.state.noteToSelf);
        validity.isAmountBlank = this.state.donationAmount === '';
        this.setState({ validity });
    }

    handleSubmit(event) {
        this.validateForm();
        event.preventDefault();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const {
            addingTo,
            automaticDonation,
            companyName,
            creditCardVisible,
            donationAmount,
            donationMatch,
            donationMatchNote,
            donationMonth,
            donationMatchAmount,
            errorMessage,
            noteToSelf,
            onWhatDay,
            paymentSectionVisible,
            recurringDate,
            selectedCardDetails,
            validity,
        } = this.state;
        const noteToSelfCharsLeft = `${1000 - noteToSelf.length} characters left`;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Grid columns={3}>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="donationAmount">
                                {formatMessage(messages.amountLabel)}
                            </label>
                        </Grid.Column>
                        <Grid.Column className="field" width={10}>
                            <Form.Input
                                error={!validity.isAmountLessThanMax
                                    || !validity.isAmountMoreThanMin
                                    || validity.isAmountBlank
                                    || !validity.isValidPositiveNumber}
                                icon="dollar"
                                iconPosition="left"
                                id="donationAmount"
                                name="donationAmount"
                                onChange={this.handleInputChange}
                                value={donationAmount}
                            />
                            <Message
                                content={formatMessage(errorMessages.invalidMaxAmountError)}
                                error
                                visible={!validity.isAmountLessThanMax}
                            />
                            <Message
                                content={formatMessage(errorMessages.invalidMinAmountError)}
                                error
                                visible={!validity.isAmountMoreThanMin}
                            />
                            <Message
                                content={formatMessage(errorMessages.blankError)}
                                error
                                visible={validity.isAmountBlank}
                            />
                            <Message
                                content={formatMessage(errorMessages.invalidNumberError)}
                                error
                                visible={!validity.isValidPositiveNumber}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="addingTo">
                                {formatMessage(messages.addingToLabel)}
                            </label>
                        </Grid.Column>
                        <Grid.Column className="field" width={10}>
                            <Form.Select
                                id="addingTo"
                                name="addingTo"
                                onChange={this.handleAddingToChanged}
                                options={addingToOptions}
                                placeholder="Select a destination account"
                                value={addingTo}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Popup
                                content={formatMessage(messageList.donationAddingToPopup)}
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
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="automaticDonation">
                                {formatMessage(messages.automaticDonationLabel)}
                            </label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.Group inline>
                                <Form.Checkbox
                                    checked={automaticDonation}
                                    className="ui checkbox"
                                    id="automaticDonation"
                                    name="automaticDonation"
                                    onChange={this.handleChekboxChanged}
                                />
                                <label htmlFor="automaticDonation">
                                    {formatMessage(messages.recurringMontlyDonationLabel)}
                                </label>
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Popup
                                content={formatMessage(messageList.automaticDonationPopup)}
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
                    {
                        !!automaticDonation && (
                            <Grid.Row verticalAlign="middle">
                                <Grid.Column className="field" width={4}>
                                    <label htmlFor="onWhatDay">
                                        {formatMessage(messages.donationOnWhatDayLabel)}
                                    </label>
                                </Grid.Column>
                                <Grid.Column className="field" width={10}>
                                    <Form.Select
                                        id="onWhatDay"
                                        name="onWhatDay"
                                        options={onWhatDayList}
                                        onChange={this.handleRecurringChanged}
                                        value={onWhatDay}
                                    />
                                    <label>
                                        {formatMessage(
                                            messageList.donationRecurringDateNote,
                                            { recurringDate },
                                        )}
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    }
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="noteToSelf">
                                {formatMessage(messages.noteToSelfLabel)}
                            </label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.TextArea
                                autoHeight
                                id="noteToSelf"
                                name="noteToSelf"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.noteToSelfPlaceHolder)}
                                value={noteToSelf}
                            />
                            <div style={{ color: '#C1C0C0', textAlign: 'right' }}>
                                {noteToSelfCharsLeft}
                            </div>
                            <Message
                                content={formatMessage(errorMessages.invalidLengthError)}
                                error
                                visible={!validity.isNoteToSelfValid}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Popup
                                content={formatMessage(messageList.donationsNoteToSelfPopup)}
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
                    {
                        !!donationMatch && (
                            <Grid.Row verticalAlign="middle">
                                <Grid.Column className="field" width={4}>
                                    <label htmlFor="donationMatchAmount">
                                        {formatMessage(messages.donationMatchLabel)}
                                    </label>
                                </Grid.Column>
                                <Grid.Column className="field" width={10}>
                                    <Form.Select
                                        id="donationMatchAmount"
                                        name="donationMatchAmount"
                                        onChange={this.handleDonationMatchChanged}
                                        options={donationMatchList}
                                        value={donationMatchAmount}
                                    />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Popup
                                        content={formatMessage(messageList.donationsMatchfPopup)}
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
                        )
                    }
                    {
                        !!donationMatchNote && (
                            <Grid.Row verticalAlign="middle">
                                <Grid.Column className="field" width={4} />
                                <Grid.Column className="field" width={10}>
                                    <label>
                                        {formatMessage(messageList.donationMatchNote, {
                                            companyName,
                                            donationMonth,
                                        })}
                                    </label>
                                    <label>
                                        {formatMessage(messageList.donationMatchPolicyNote, {
                                            companyName,
                                        })}
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    }
                    {
                        !!paymentSectionVisible && (
                            <Grid>
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column className="field">
                                        <Header as="h2">Payment</Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column className="field" width={4}>
                                        <label htmlFor="creditCard">
                                            {formatMessage(messages.creditCardLabel)}
                                        </label>
                                    </Grid.Column>
                                    <Grid.Column className="field" width={10}>
                                        <Form.Field>
                                            {this.creditCards()}
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                {
                                    !!errorMessage && (
                                        <Grid.Row>
                                            <Grid.Column className="field" width={4} />
                                            <Grid.Column className="field" width={10}>
                                                <Message color="red">
                                                    { errorMessage }
                                                </Message>
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                                }
                                {
                                    !!creditCardVisible && (
                                        <Grid.Row verticalAlign="middle">
                                            <Grid.Column width={16}>
                                                <CreditCard
                                                    data={selectedCardDetails}
                                                    errorMessage={this.handleErrorMessage}
                                                    onChange={this.handleCreditCardDataChange}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                                }
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column width={4}>
                                        <Form.Button color="blue">{formatMessage(messages.continueButton)}</Form.Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                    }
                </Grid>
            </Form>
        );
    }
}

export default injectIntl(AddMoneyForm);
