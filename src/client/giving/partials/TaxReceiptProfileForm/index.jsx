/**
 * TaxReceiptProfileForm Component
 *
 * @see https://internal-release.24467.org/give/to/friend/new
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { // list alphabetically for grok-ability
    Form,
    Grid,
    Icon,
    Message,
    Popup,
} from 'semantic-ui-react';

import {
    connectBranch,
    getState,
} from 'client/common/store';
import { updateTaxReceiptProfile } from 'client/giving/actions';
import {
    errorMessages,
    messages,
} from 'client/giving/common/messages';
import {
    hasMinTwoChars,
    hasMinFiveChars,
    isInputBlank,
} from 'client/giving/common/helpers/giving-form-validation';
import {
    canadaProvinceOptions,
    countryOptions,
    usStateOptions,
} from 'client/common/constants';
import BaseComponent from 'client/common/components/BaseComponent';
import 'client/giving/common/common.scss';

// This value is temporarily added until Auth is done.
const CURRENT_USER_ID = getState('/config/CURRENT_USER_ID');

class TaxReceiptProfileForm extends BaseComponent {
    constructor(props) {
        super(props);
        const userId = Number(CURRENT_USER_ID);
        this.state = {
            validity: {
                isValidAddress: true,
                isValidCity: true,
                isValidFullName: true,
                isValidPostalCode: true,
                isValidProvince: true,
            },
            showFormData: true,
        };
        if (!_.isEmpty(props.data)) {
            this.state.data = _.merge({}, props.data);
            this.state.showFormData = false;
        } else {
            this.state.data = {
                attributes: {
                    addressOne: '',
                    addressTwo: '',
                    city: '',
                    country: countryOptions[0].value,
                    fullName: '',
                    postalCode: '',
                    province: '',
                },
                type: 'taxReceiptProfiles',
                relationships: {
                    accountHoldable: {
                        data: {
                            id: userId,
                            type: 'user',
                        },
                    },
                },
            };
        }
    }

    handleInputChange(e, { value, name }) {
        const currentData = { ...this.state.data };
        currentData.attributes[name] = value;
        this.setState({
            data: currentData,
        });
    }

    handleDisplayForm() {
        this.setState({
            showFormData: true,
        });
    }

    validateForm() {
        const validity = {};
        validity.isValidProvince = !isInputBlank(this.state.data.attributes.province);
        validity.isValidFullName = hasMinTwoChars(this.state.data.attributes.fullName);
        validity.isValidAddress = hasMinTwoChars(this.state.data.attributes.addressOne);
        validity.isValidCity = hasMinTwoChars(this.state.data.attributes.city);
        validity.isValidPostalCode = hasMinFiveChars(this.state.data.attributes.postalCode);
        this.setState({ validity });
        return Object.keys(validity).some(k => !validity[k]);
    }

    handleSubmit(event) {
        const isNotValid = this.validateForm();
        event.preventDefault();
        if (!isNotValid) {
            updateTaxReceiptProfile(this.state.data, this.props.data);
        }
    }

    displayForm() {
        const { formatMessage } = this.props.intl;
        const { attributes } = this.state.data;
        let provinceOptions = canadaProvinceOptions;
        let provinceMessage = messages.province;
        let postalCodeMessage = messages.postalCode;
        if (attributes.country !== countryOptions[0].value) {
            provinceOptions = usStateOptions;
            provinceMessage = messages.state;
            postalCodeMessage = messages.zip;
        }
        this.state.data.attributes.province = (
            _.find(provinceOptions, { value: attributes.province }))
            ? attributes.province : '';
        attributes.province = this.state.data.attributes.province;
        return (
            <Form>
                { !!this.state.showFormData &&
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
                                {formatMessage(messages.fullName)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Input
                                error={!this.state.validity.isValidFullName}
                                id="fullName"
                                name="fullName"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.fullNamePlaceHolder)}
                                value={attributes.fullName}
                            />
                            <Message
                                visible={!this.state.validity.isValidFullName}
                                error
                                content={formatMessage(errorMessages.minTwoCharsError)}
                            />
                        </Grid.Column>
                        <Grid.Column
                            mobile={1}
                            computer={2}
                        >
                            <Popup
                                content={formatMessage(messages.fullNamePopup)}
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
                                {formatMessage(messages.address)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Input
                                error={!this.state.validity.isValidAddress}
                                id="addressOne"
                                name="addressOne"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.addressPlaceHolder)}
                                value={attributes.addressOne}
                            />
                            <Message
                                visible={!this.state.validity.isValidAddress}
                                error
                                content={formatMessage(errorMessages.minTwoCharsError)}
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
                                {formatMessage(messages.secondAddress)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Input
                                id="addressTwo"
                                name="addressTwo"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.secondAddressPlaceHolder)}
                                value={attributes.addressTwo}
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
                                {formatMessage(messages.city)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Input
                                error={!this.state.validity.isValidCity}
                                id="city"
                                name="city"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.cityPlaceHolder)}
                                value={attributes.city}
                            />
                            <Message
                                visible={!this.state.validity.isValidCity}
                                error
                                content={formatMessage(errorMessages.minTwoCharsError)}
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
                                {formatMessage(messages.country)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Dropdown
                                fluid
                                id="country"
                                name="country"
                                options={countryOptions}
                                onChange={this.handleInputChange}
                                selection
                                value={attributes.country}
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
                                {formatMessage(postalCodeMessage)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Input
                                error={!this.state.validity.isValidPostalCode}
                                id="postalCode"
                                name="postalCode"
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.postalCodePlaceHolder)}
                                value={attributes.postalCode}
                            />
                            <Message
                                visible={!this.state.validity.isValidPostalCode}
                                error
                                content={formatMessage(errorMessages.minFiveCharsError)}
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
                                {formatMessage(provinceMessage)}
                            </label>
                        </Grid.Column>
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            <Form.Dropdown
                                error={!this.state.validity.isValidProvince}
                                fluid
                                id="province"
                                name="province"
                                options={provinceOptions}
                                onChange={this.handleInputChange}
                                placeholder={formatMessage(messages.provincePlaceHolder)}
                                selection
                                value={attributes.province}
                            />
                            <Message
                                visible={!this.state.validity.isValidProvince}
                                error
                                content={formatMessage(errorMessages.blankError)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                }
                { !this.state.showFormData &&
                <Grid>
                    <Grid.Row
                        verticalAlign="middle"
                    >
                        <Grid.Column
                            mobile={4}
                            computer={3}
                        />
                        <Grid.Column
                            mobile={11}
                            computer={10}
                        >
                            {formatMessage(messages.changeAddressText)}
                            <a
                                className="achPointer achPading"
                                onClick={this.handleDisplayForm}
                            >
                                {formatMessage(messages.makeChangesText)} 
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                }
                <Grid>
                    <Grid.Row
                        verticalAlign="middle"
                    >
                        <Grid.Column>
                            <Form.Button
                                color="blue"
                                onClick={this.handleSubmit}
                            >{formatMessage(messages.continueButton)}
                            </Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }

    render() {
        return (
            this.displayForm()
        );
    }
}

export default injectIntl(connectBranch(TaxReceiptProfileForm, {
    mapPathsToProps: {
        TaxReceiptProfileFormData: '/giving/views',
    },
}));
