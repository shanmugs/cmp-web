/**
 * GiveMoneyForm Component
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import { // list alphabetically for grok-ability
    Form,
    Grid,
    Icon,
    Message,
    Popup,
} from 'semantic-ui-react';

import {
    errorMessages,
    messages,
} from 'client/giving/common/messages';
import BaseComponent from 'client/common/components/BaseComponent';
import {
    isInputLengthLessThanOneThousand,
    isValidPositiveNumber,
    isAmountMoreThanOneDollor,
    isAmountLessThanOneBillion,
    isValidEmailList,
    isInputBlank,
} from 'client/giving/common/helpers/giving-form-validation';
import 'client/giving/common/common.scss';

/* TODO: Remove all inline style and replace it with proper
class once we have the UI specification from UX */
class GiveMoneyForm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            giftAmount: '',
            recipients: '',
            messageForRecipients: '',
            noteToSelf: '',
            validity: {
                isValidEmail: true,
                isAmountLessThanOneBillion: true,
                isAmountMoreThanOneDollor: true,
                isValidPositiveNumber: true,
                isNoteToSelfValid: true,
                isMessageForRecipientsValid: true,
                isAmountBlank: false,
            },
        };
    }

    /* ToDo: Consider using ReduxForm to handle form validation */
    validateForm() {
        const validity = {};
        validity.isValidEmail = isValidEmailList(this.state.recipients);
        validity.isAmountLessThanOneBillion = isAmountLessThanOneBillion(this.state.giftAmount);
        validity.isAmountMoreThanOneDollor = isAmountMoreThanOneDollor(this.state.giftAmount);
        validity.isValidPositiveNumber = isValidPositiveNumber(this.state.giftAmount);
        validity.isNoteToSelfValid = isInputLengthLessThanOneThousand(this.state.noteToSelf);
        validity.isMessageForRecipientsValid = isInputLengthLessThanOneThousand(this.state.messageForRecipients);
        validity.isAmountBlank = isInputBlank(this.state.giftAmount);
        this.setState({ validity });
    }

    isValidGiftAmount() {
        return (
            !this.state.validity.isAmountLessThanOneBillion ||
            !this.state.validity.isAmountMoreThanOneDollor ||
            this.state.validity.isAmountBlank ||
            !this.state.validity.isValidPositiveNumber
        );
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

    handleSubmit(event) {
        this.validateForm();
        event.preventDefault();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const messageForRecipientsCharsLeft = `${1000 - this.state.messageForRecipients.length} characters left`;
        const notToSelfCharsLeft = `${1000 - this.state.noteToSelf.length} characters left`;
        return (
            <Form onSubmit={this.handleSubmit} >
                <Grid
                    columns={3}
                >
                    <Grid.Row
                        verticalAlign="middle"
                    >
                        <Grid.Column
                            mobile={4}
                            computer={3}
                        >
                            <label
                                className="label"
                            >
                                {formatMessage(messages.amountLabel)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Input
                                error={this.isValidGiftAmount()}
                                icon="dollar"
                                iconPosition="left"
                                name="giftAmount"
                                id="giftAmount"
                                onChange={this.handleInputChange}
                                value={this.state.giftAmount}
                            />
                            <Message
                                visible={!this.state.validity.isAmountLessThanOneBillion}
                                error
                                content={formatMessage(errorMessages.invalidMaxAmountError)}
                            />
                            <Message
                                visible={!this.state.validity.isAmountMoreThanOneDollor}
                                error
                                content={formatMessage(errorMessages.invalidMinAmountError)}
                            />
                            <Message
                                visible={this.state.validity.isAmountBlank}
                                error
                                content={formatMessage(errorMessages.blankError)}
                            />
                            <Message
                                visible={!this.state.validity.isValidPositiveNumber}
                                error
                                content={formatMessage(errorMessages.invalidNumberError)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                        verticalAlign="middle"
                    >
                        <Grid.Column
                            mobile={4}
                            computer={3}
                        >
                            <label
                                className="label"
                            >
                                {formatMessage({ id: 'giving.p2pAllocations.recipient' })}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.TextArea
                                error={!this.state.validity.isValidEmail}
                                name="recipients"
                                id="recipients"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.emailInputPlaceHolder)}
                                value={this.state.recipients}
                            />
                            <Message
                                visible={!this.state.validity.isValidEmail}
                                error
                                content={formatMessage(errorMessages.invalidEmailError)}
                            />
                        </Grid.Column>
                        <Grid.Column
                            mobile={1}
                            computer={2}
                        >
                            <Popup
                                content={formatMessage(messages.recipientPopup)}
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
                            mobile={4}
                            computer={3}
                        >
                            <label
                                className="label"
                            >
                                {formatMessage({ id: 'giving.p2pAllocations.forRecipient' })}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.TextArea
                                error={!this.state.validity.isMessageForRecipientsValid}
                                name="messageForRecipients"
                                id="messageForRecipients"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.generalInputPlaceHolder)}
                                value={this.state.messageForRecipients}
                            />
                            <div style={{ color: '#C1C0C0', textAlign: 'right' }}>{messageForRecipientsCharsLeft}</div>
                            <Message
                                visible={!this.state.validity.isMessageForRecipientsValid}
                                error
                                content={formatMessage(errorMessages.invalidLengthError)}
                            />
                        </Grid.Column>
                        <Grid.Column
                            mobile={1}
                            computer={2}
                        >
                            <Popup
                                content={formatMessage(messages.forRecipientPopup)}
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
                            mobile={4}
                            computer={3}
                        >
                            <label
                                className="label"
                            >
                                {formatMessage({ id: 'giving.noteToSelfLabel' })}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.TextArea
                                error={!this.state.validity.isNoteToSelfValid}
                                name="noteToSelf"
                                id="noteToSelf"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.noteToSelfPlaceHolder)}
                                value={this.state.noteToSelf}
                            />
                            <div style={{ color: '#C1C0C0', textAlign: 'right' }}>{notToSelfCharsLeft}</div>
                            <Message
                                visible={!this.state.validity.isNoteToSelfValid}
                                error
                                content={formatMessage(errorMessages.invalidLengthError)}
                            />
                        </Grid.Column>
                        <Grid.Column
                            mobile={1}
                            computer={2}
                        >
                            <Popup
                                content={formatMessage(messages.givingNoteToSelfPopup)}
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
                        <Grid.Column>
                            <Form.Button
                                color="blue"
                            >
                                {formatMessage(messages.continueButton)}
                            </Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

export default injectIntl(GiveMoneyForm);
