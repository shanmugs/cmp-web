/**
 * Credit Card Component
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import Payment from 'payment';
import {
    Form,
    Grid,
    Image,
    Popup,
    Table,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import cvvImg from 'client/common/images/ccv-diagram.png';
import {
    messages,
    errorMessages,
} from 'client/giving/common/messages';
import 'client/giving/common/common.scss';

const {
    validateCardNumber,
    validateCardExpiry,
    validateCardCVC,
} = Payment.fns;

const headerRow = [
    'Type',
    'Number',
    'Behaviour',
];
const renderBodyRow = ({
    type, number,
    behaviour,
}, i) => ({
    key: type || `row-${i}`,
    cells: [
        type || 'No name specified',
        number ? { key: 'number', content: number } : 'Unknown',
        behaviour ? { key: 'behaviour', content: behaviour } : 'None',
    ],
});
// TODO: Move this test credit cards list
// JIRA TICKET : GIVEA-240
const testCardList = [
    { type: 'VISA', number: '4242424242424242', behaviour: 'Approved' },
    { type: 'VISA debi', number: '4000056655665556', behaviour: 'Approved' },
    { type: 'Visa - Brazil', number: '4000000760000002', behaviour: 'Approved' },
    { type: 'Mastercard', number: '5555555555554444', behaviour: 'Approved' },
    { type: 'Mastercard debit', number: '5200828282828210', behaviour: 'Approved' },
    { type: 'Mastercard prepaid', number: '5105105105105100', behaviour: 'Approved' },
    { type: 'AMEX', number: '378282246310005', behaviour: 'Approved' },
    { type: 'Discover', number: '6011111111111117', behaviour: 'Approved' },
    { type: 'Diners Club', number: '30569309025904', behaviour: 'Approved' },
    { type: 'JCB', number: '3530111333300000', behaviour: 'Approved' },
];

class CreditCard extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showTestCards: false,
            showTestCardClicked: false,
            showTestCardLabel: ' Show Test Cards',
            cardNumber: '',
            nameOnCard: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
        };
    }
    /**
     * Synchronise form data with React state
     * @param  {Event} event The Event instance object.
     * @param  {object} { name, value } The data instance object.
     * @return {Void}
     */
    handleInputChange(event) {
        const {
            name,
            value,
        } = event.target;

        this.setState({
            [name]: value,
        });
    }
    /**
     * Synchronise form data with React state
     * @param  {Event} event The Event instance object.
     * @return {Void}
     */
    handleBlur(event) {
        const {
            name,
            value,
        } = event.target;

        this.setState({ [name]: value });

        this.validate(name, value);
    }
    /**
     * Determine whether the supplied field is valid.
     * @param  {String} field The credit card field name
     * @param  {any} value    The field's value
     * @return {(True|Void)}  Boolean `true` when the field is valid; else nothing.
     */
    validate(field, value) {
        const { formatMessage } = this.props.intl;
        let isError = false;
        switch (field) {
        case 'cardNumber':
            if (!validateCardNumber(value)) {
                isError = true;
            }
            break;
        case 'expiryYear':
            if (!validateCardExpiry(this.state.expiryMonth, value)) {
                isError = true;
            }
            break;
        case 'cvv':
            if (!validateCardCVC(value)) {
                isError = true;
            }
            break;
        default: break;
        }
        let message = '';
        !!isError && (
            message = formatMessage(errorMessages[field])
        );
        this.props.errorMessage(message);
    }

    testCreditCardList() {
        return (
            <Table
                celled
                headerRow={headerRow}
                renderBodyRow={renderBodyRow}
                tableData={testCardList}
            />
        );
    }

    // @todo GIVEB-106 Move this test credit card
    handleTestCreditCard() {
        this.setState({
            cardNumber: 4242424242424242,
            nameOnCard: 'John',
            expiryMonth: 11,
            expiryYear: 2020,
            cvv: 145,
        });
    }

    handleTestCreditCardList() {
        this.setState({
            showTestCardClicked: !this.state.showTestCardClicked,
            showTestCardLabel: this.state.showTestCardClicked ? ' Show Test Cards' : ' Hide Test Cards',
            showTestCards: !this.state.showTestCardClicked,
        });
    }

    render() {
        const {
            formatMessage,
        } = this.props.intl;
        const {
            showTestCards,
            showTestCardLabel,
            cardNumber,
            nameOnCard,
            expiryMonth,
            expiryYear,
            cvv,
        } = this.state;

        return (
            <Form>
                <Grid columns={3}>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={10}>
                            <a
                                className="achPointer"
                                onClick={this.handleTestCreditCard}
                            >
                                {formatMessage(messages.testCreditCardLabel)}
                            </a> |
                            <a
                                className="achPointer"
                                onClick={this.handleTestCreditCardList}
                            >
                                {formatMessage(messages.testCreditCardListLabel, {
                                    showtestcardlabel: showTestCardLabel,
                                })}
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                    {
                        !!showTestCards && (
                            <Grid>
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column className="field" width={16}>
                                        <label htmlFor="showCreditCardList">
                                            {formatMessage(messages.testCreditCardListMessage)}
                                        </label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column className="field" width={16}>
                                        <Form.Field>
                                            {this.testCreditCardList()}
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                    }
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="cardNumber">
                                {
                                    formatMessage(messages.cardNumberLabel)
                                }
                            </label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.Input
                                icon={(cardNumber) ? Payment.fns.cardType(cardNumber) : 'payment'}
                                iconPosition="left"
                                id="cardNumber"
                                onBlur={this.handleBlur}
                                onChange={this.handleInputChange}
                                name="cardNumber"
                                value={cardNumber}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="nameOnCard">
                                {
                                    formatMessage(messages.nameOnCardLabel)
                                }
                            </label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Form.Input
                                id="nameOnCard"
                                onBlur={this.handleBlur}
                                onChange={this.handleInputChange}
                                name="nameOnCard"
                                value={nameOnCard}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="expDate">
                                {
                                    formatMessage(messages.expiryDateLabel)
                                }
                            </label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input
                                id="expiryMonth"
                                onBlur={this.handleBlur}
                                onChange={this.handleInputChange}
                                name="expiryMonth"
                                value={expiryMonth}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form.Input
                                id="expiryYear"
                                onBlur={this.handleBlur}
                                onChange={this.handleInputChange}
                                name="expiryYear"
                                value={expiryYear}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column className="field" width={4}>
                            <label htmlFor="cvv">
                                {
                                    formatMessage(messages.cvvLabel)
                                }
                            </label>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Popup
                                position="right center"
                                on="focus"
                                trigger={
                                    <Form.Input
                                        id="cvv"
                                        onBlur={this.handleBlur}
                                        onChange={this.handleInputChange}
                                        name="cvv"
                                        value={cvv}
                                    />
                                }
                            >
                                <Popup.Content>
                                    <Image src={cvvImg} />
                                </Popup.Content>
                            </Popup>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

CreditCard.defaultProps = {
    onChange: _.noop,
    errorMessage: _.noop,
};

export default injectIntl(CreditCard);

