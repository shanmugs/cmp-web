var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

sections.transferForm = {
    selector: '#new_transfer_details',
        commands: [{
        fillInForm: function (values) {
            client.perform(function (client) {
                var amount = values.amount || null;

                if (amount){
                    this.clearValue('@newTransferAmount')
                        .setValue('@newTransferAmount', amount);
                }
                done();
            });
            return this;
        },
    }],
    elements: {
        newTransferAmount: '#transfer_details_amount',
        submit: '[type="submit"]',
    }
},

sections.trpForm = {
    selector: '#new_donation_trp',
    commands: [{
        fillInForm: function (values) {
            client.perform(function (client) {
                var fullName = values.fullName || null;
                var addressOne = values.addressOne || null;
                var addressTwo = values.addressTwo || null;
                var city = values.city || null;
                var postCode = values.postCode || null;
                var country = values.country || null;


                if (fullName){
                    this.clearValue('@trpFullName')
                        .setValue('@trpFullName', fullName);
                }

                if (addressOne) {
                    this.clearValue('@trpAddressOne')
                        .setValue('@trpAddressOne', addressOne);
                }

                if (addressTwo) {
                    this.clearValue('@trpAddressTwo')
                        .setValue('@trpAddressTwo', addressTwo);
                }

                if (city) {
                    this.clearValue('@trpCity')
                        .setValue('@trpCity', city);
                }

                if (postCode) {
                    this.clearValue('@trpPostCode')
                        .setValue('@trpPostCode', postCode);
                }

                if (country) {
                    this.clearValue('@trpCountry')
                        .setValue('@trpCountry', country);
                }

                done();
            });

            return this;
        }
    }],
    elements: {
        trpFullName: '#donation_trp_full_name',
        trpAddressOne: '#donation_trp_address_one',
        trpAddressTwo: '#donation_trp_address_two',
        trpCity: '#donation_trp_city',
        trpPostCode: '#donation_trp_postal_code',
        trpProvince: '#donation_trp_province',
        trpCountry: '#donation_trp_country',
        trpFullNameError: '#donation_trp_full_name ~ div.alert-label',
        trpAddressOneError: '#donation_trp_address_one ~ div.alert-label',
        trpCityError: '#donation_trp_city ~ div.alert-label',
        trpPostCodeError: '#donation_trp_postal_code ~ div.alert-label',
        trpProvinceError: '#donation_trp_province ~ div.alert-label',
        trpSubmitBtn: '#new_donation_trp > button',
    }
},

sections.stripeForm = {
    selector: '#stripe_cc_form_fields',
    commands: [{
        fillInForm: function (values) {
            client.perform(function (client) {
                var cardNumber = values.cardNumber || null;
                var fullName = values.fullName || null;
                var expMonth = values.expMonth || null;
                var expYear = values.expYear || null;
                var cvv = values.cvv || null;


                if (cardNumber){
                    this.clearValue('@newTransferStripeNumber')
                        .setValue('@newTransferStripeNumber', cardNumber);
                }

                if (fullName) {
                    this.clearValue('@newTransferStripeName')
                        .setValue('@newTransferStripeName', fullName);
                }

                if (expMonth) {
                    this.clearValue('@newTransferStripeMonth')
                        .setValue('@newTransferStripeMonth', expMonth);
                }

                if (expYear) {
                    this.clearValue('@newTransferStripeYear')
                        .setValue('@newTransferStripeYear', expYear);
                }

                if (cvv) {
                    this.clearValue('@newTransferStripeCVV')
                        .setValue('@newTransferStripeCVV', cvv);
                }

                done();
            });

            return this;
        }
    }],
    elements: {
        newTransferStripeName: '#stripe_card_name',
        newTransferStripeNumber: '#stripe_card_number',
        newTransferStripeMonth: '#stripe_expiry_month',
        newTransferStripeYear: '#stripe_expiry_year',
        newTransferStripeCVV: '#stripe_cvv',
        submit: '#new_transfer_details [type="submit"]'
    }
},

sections.claimForm = {
    selector: '#new_claim_account',
    commands: [{
        fillInForm: function (values) {
                var firstName = values.firstName || null;
                var lastName = values.lastName || null;
                var email = values.email || null;
                var password = values.password || null;

                this

                if (email){
                    this.clearValue('@claimAccountEmail')
                        .setValue('@claimAccountEmail', email);
                }

                if (firstName) {
                    this.clearValue('@claimAccountFirstName')
                        .setValue('@claimAccountFirstName', firstName);
                }

                if (lastName) {
                    this.clearValue('@claimAccountLastName')
                        .setValue('@claimAccountLastName', lastName);
                }

                if (password) {
                    this.clearValue('@claimAccountPass')
                        .setValue('@claimAccountPass', password);
                }

            return this;
        }
    }],
    elements: {
        claimAccountPrompt: '#new_claim_account > div.upgrade-content > div.form-row.otd-checkbox',
        claimAccountEmail: '#claim_account_email',
        claimAccountFirstName: '#claim_account_first_name',
        claimAccountLastName: '#claim_account_last_name',
        claimAccountPass: '#claim_account_password',
        claimAccountBtn: '#new_claim_account > button',
        claimAccountCheckbox: '.upgrade-content > div.form-row.otd-checkbox > div > span',
        claimAccountEmailError: '#claim_account_email ~ div.alert-label',
        claimAccountFirstNameError: '#claim_account_first_name ~ div.alert-label',
        claimAccountLastNameError: '#claim_account_last_name ~ div.alert-label',
        claimAccountPassError: '#claim_account_password ~ div.alert-label',
        claimAccountError: '#create_account_fields > div.form-row.form-alert.error > div',
    }
},

module.exports = {
    url: function(type, name) {
        // you can pass just a type for default, or you can pass a specific group or charity name
        // for campaigns use 'group' because the url structure is identical
        var defaultCharityName = 'the-canadian-red-cross-society-la-societe-canadienne-de-la-croix-rouge';
        var defaultGroupName = 'triathlon-for-a-cause';


            var type = type || 'group';

            if (type === 'group'){
                name = name || defaultGroupName;
            return this.api.launchUrl + `give/to/group/${name}/new`;

            }

            if (type == 'charity') {
                name = name || defaultCharityName;
            return this.api.launchUrl + `send/to/charity/${name}/gift/new`;
            }
    },
    sections: sections,
    commands: [{
        navigate: function(type, name){
            
                this.api.url(this.url(type, name));

            return this;
        },
    }],
    elements: {
        matchConfirmHeading: 'div.sidebar > div:nth-child(2) > div > h2',
        //this selector isn't ideal, but we're unable to use something
        //different without changing the dom
        groupActivity: '.activity-inner-wrap > h5',
        editPrivacyLink: '#anonymous-selector > div > h5.mlm.ptl.mtm.privacy-group-title > a',
        displayAmountCheckbox: '#anonymous-selector > div > div.privacy-group > div:nth-child(3) > span.checkbox.checked',
        continueClaimForm: '#new_claim_account',
        continueTRPForm: '#new_donation_trp',
        continueTransferForm: '#new_transfer_details',
        submitTransferForm: '#new_transfer_confirm',
        continue: '[type="submit"]',
        groupNewGiftBtn: '#new_transfer_details > button',
        groupGiftAmountError: '#new_transfer_details div.alert-label',
        newTransferAmount: '#transfer_details_amount',
        newTransferChooseFund: '#fund_selector',
        sendMoneyPaymentContainer: '#transfer_details_payment_wrapper',
        submit: '[type="submit"]',
        newTransferConfirm: '#new_transfer_confirm',
        newTransferArrow: '#new_transfer_confirm .arrow-number',
        successCheck: '.success-check',
        amountDisplay: '.form-wrapper h4',
        newTransferStripeNameError: '#stripe_card_name + div.alert-label',
        newTransferStripeNumberError: '#stripe_card_number + div.alert-label',
        newTransferStripeMonthError: '#stripe_expiry_month ~ div.alert-label',
        newTransferStripeYearError: '#stripe_expiry_year ~ div.alert-label',
        newTransferStripeCVVError: '#stripe_cvv ~ div.alert-label',
        confirmChangeAddress: '.confirm-change',
        confirmMakeChanges: '#new_transfer_confirm > p > a',
        confirmBtn: '#confirm-page-button',
        giveSuccessNotice: '.success-title',
        successCheck: '.success-check',
        backToGroupLink: '#feed > div.inner > div.form-wrapper > div.clear.ptl.mtl > div > a',
        claimAccountActivationNotice: '#feed > div.inner > div.form-wrapper > div.clear.ptl.mtl > p',
    }
}
