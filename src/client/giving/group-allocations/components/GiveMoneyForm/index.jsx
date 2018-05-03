/*
    GiveMoney Form Component
*/

import React from 'react';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import {
    Form,
    Grid,
    Icon,
    Message,
    Popup,
} from 'semantic-ui-react';
import BaseComponent from 'client/common/components/BaseComponent';
import {
    isInputLengthLessThanOneThousand,
    isValidPositiveNumber,
    isAmountMoreThanOneDollor,
    isAmountLessThanOneBillion,
} from 'client/giving/common/helpers/giving-form-validation';
import {
    errorMessages,
    messages,
} from 'client/giving/common/messages';

const messageList = defineMessages({
    donorGiveFromPopup: {
        description: 'Popup message for donor to select Give from account',
        defaultMessage: 'We’re asking you to select an account because you administer more than one CHIMP Account.  Note that Group accounts with a Matching Campaign are not listed because they can only give directly to a charity.',
        id: 'groups.donorGiveFromPopup',
    },
    groupMessagePopup: {
        description: 'Popup message for Group from donor',
        defaultMessage: 'This message will appear in the group’s public feed, so say something nice.',
        id: 'groups.groupMessagePopup',
    },
});

class GiveMoneyForm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            giftAmount: '',
            giveFrom: '',
            messageForGroup: '',
            noteToSelf: '',
            validity: {
                isAmountLessThanMax: true,
                isAmountMoreThanMin: true,
                isValidPositiveNumber: true,
                isNoteToSelfValid: true,
                isMessageForGroupValid: true,
                isAmountBlank: false,
            },
        };
    }

    // Handling input change to set the state value
    handleInputChange(event) {
        const {
            name,
            value,
        } = event.target;

        this.setState({
            [name]: value,
        });
    }

    // Validate form controls
    validateForm() {
        const validity = {};
        validity.isAmountLessThanMax = isAmountLessThanOneBillion(this.state.giftAmount);
        validity.isAmountMoreThanMin = isAmountMoreThanOneDollor(this.state.giftAmount);
        validity.isValidPositiveNumber = isValidPositiveNumber(this.state.giftAmount);
        validity.isNoteToSelfValid = isInputLengthLessThanOneThousand(this.state.noteToSelf);
        validity.isMessageForGroupValid =
        isInputLengthLessThanOneThousand(this.state.messageForGroup);
        validity.isAmountBlank = this.state.giftAmount === '';
        this.setState({ validity });
    }

    // Button form submit
    handleSubmit(event) {
        this.validateForm();
        event.preventDefault();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const messageForGroupCharsLeft = `${1000 - this.state.messageForGroup.length} characters left`;
        const noteToSelfCharsLeft = `${1000 - this.state.noteToSelf.length} characters left`;
        const cardListOptions = [{
            key: 'new', value: 'new', text: 'Select a source account', data: '',
        }, {
            key: '1', value: '1', text: 'Chimp’s Account (Balance: $0.00)', data: '',
        }, { key: '2', value: '2', text: 'a third time’s Account (Balance: $0.00)' }];
        return (
            <Form onSubmit={this.handleSubmit}>
                <Grid columns={3}>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="groupName">{formatMessage(messages.giveGroupLabel)}</label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.Input
                                name="groupName"
                                id="groupName"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="giftAmount">{formatMessage(messages.amountLabel)}</label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.Input
                                error={
                                    !this.state.validity.isAmountLessThanMax
                                    || !this.state.validity.isAmountMoreThanMin
                                    || this.state.validity.isAmountBlank
                                    || !this.state.validity.isValidPositiveNumber}
                                icon="dollar"
                                iconPosition="left"
                                name="giftAmount"
                                id="giftAmount"
                                onChange={this.handleInputChange}
                                value={this.state.giftAmount}
                            />
                            <Message
                                visible={!this.state.validity.isAmountLessThanMax}
                                error
                                content={formatMessage(errorMessages.invalidMaxAmountError)}
                            />
                            <Message
                                visible={!this.state.validity.isAmountMoreThanMin}
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
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="giveFrom">{formatMessage(messages.giveFromLabel)}</label>
                        </Grid.Column>
                        <Grid.Column className="field" width={10}>
                            <Form.Select
                                options={cardListOptions}
                                placeholder="Select a source account"
                                value={this.state.value}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Popup
                                content={formatMessage(messageList.donorGiveFromPopup)}
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
                            <label htmlFor="messageForGroup">{formatMessage(messages.forGroupLabel)}</label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.TextArea
                                autoHeight
                                name="messageForGroup"
                                id="messageForGroup"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.generalInputPlaceHolder)}
                                value={this.state.messageForGroup}
                                error={!this.state.validity.isMessageForGroupValid}
                            />
                            <div style={{ color: '#C1C0C0', textAlign: 'right' }}>{messageForGroupCharsLeft}</div>
                            <Message
                                visible={!this.state.validity.isMessageForGroupValid}
                                error
                                content={formatMessage(errorMessages.invalidLengthError)}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Popup
                                content={formatMessage(messageList.groupMessagePopup)}
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
                            <label htmlFor="noteToSelf">{formatMessage(messages.noteToSelfLabel)}</label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.TextArea
                                autoHeight
                                name="noteToSelf"
                                id="noteToSelf"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.noteToSelfPlaceHolder)}
                                value={this.state.noteToSelf}
                                error={!this.state.validity.isNoteToSelfValid}
                            />
                            <div style={{ color: '#C1C0C0', textAlign: 'right' }}>{noteToSelfCharsLeft}</div>
                            <Message
                                visible={!this.state.validity.isNoteToSelfValid}
                                error
                                content={formatMessage(errorMessages.invalidLengthError)}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}>
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
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column width={4}>
                            <Form.Button color="blue">{formatMessage(messages.continueButton)}</Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

export default injectIntl(GiveMoneyForm);
