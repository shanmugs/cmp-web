var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

sections.transferForm = {
    selector: '#new_transfer_details',
        commands: [{
        chooseFund: function(fundType) {
            // Cound make a default type by presetting the fund when we initilize the variable
            var fund = '';
            if (fundType === 'personal') {
                fund = `Chimp's Account`;
            } else if (fundType === 'community') {
                fund = `Absolute's Account`;
            }
            // Not sure why @syntax not working. But you can access the selectors directly
            // with the following syntax
            this.api.selectOptionByText(this.elements.newTransferChooseFund.selector, fund);
        },


        fillInForm: function (values) {
            client.perform(function (client) {
            var amount = values.amount || null;
            var fundType = values.fundType || null;

            if (amount){
                this.clearValue('@newTransferAmount')
                    .setValue('@newTransferAmount', amount);
            }

            // if fundType passed pass it to the choseFund method
            if (fundType) {
                this.chooseFund(fundType)
            }

            return this;
             done();
        });
        },
    }],
    elements: {
        newTransferChooseFund: '#fund_selector',
        newTransferAmount: '#transfer_details_amount',
        submit: '[type="submit"]',
    }
},

sections.stripePay = {
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

            return this;
            done();
        });
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

            return this;
            done();
        });
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

sections.confirmTransfer = {
    selector: '#new_transfer_confirm',
    commands: [{
    }],
    elements: {
        matchConfirmHeading: '.form-wrapper.pam > h6:nth-child(7)',
        //this selector isn't ideal, but we're unable to use something
        //different without changing the dom
        updateTaxReceiptLink: '.confirm-change',
        confirmButton: '#confirm-page-button',
        newTransferArrow: '.arrow-number',
    }
},


module.exports = {
    url: function test(groupName){
    
        var defaultGroupName = 'syrian-refugee-sponsorship-rainbow-railroad';

            groupName = groupName || defaultGroupName;
            return this.api.launchUrl + `give/to/group/${groupName}/new`;

    },
    sections: sections,
    commands: [{
        navigate: function(groupName){
            this.api.url(this.url(groupName));
            return this;
        },

        confirmSubmit: function () {

            this
                .waitForElementPresent( '@confirmSubmit' );
            //pause before clicking the button to reduce timing failures
            this
                .api.pause(100);
            this
                .click('@confirmSubmit');

            return this;
        }
    }],
    elements: {
        continueTRPForm: '#new_donation_trp',
        continueTransferForm: '#new_transfer_details',
        newTransferStripeSelect: '#stripe_cards_select',
        recurringGiftsTable: '#recurring-gifts-table',
        recurringGiftsTableTR: '#recurring-gifts-table > tbody tr:nth-of-type(1)',
        recurringGiftsTableCampaign: '#recurring-gifts-table > tbody > tr:nth-child(1) > td:nth-child(1)',
        recurringGiftsTableDelete: '#recurring-gifts-table > tbody tr:nth-of-type(1) .delete-recurring-money-transfer',
        recurringGiftsDeleteModal: '#modal-delete',
        newTransferAmount: '#transfer_details_amount',
        newTransferChooseFund: '#fund_selector',
        newTransferChooseCommunityFund: '#fund_selector > optgroup:nth-child(3) > option:nth-child(1)',
        sendMoneyRecurringDay: '#transfer_details_recurring_day_of_month > option:nth-child(2)',
        sendMoneyPaymentContainer: '#transfer_details_payment_wrapper',
        sendMoneySelectTaxReceiptRecipient: '#receipt-toggle',
        sendMoneySelectTaxReceipt: '#receipt-toggle > option:nth-child(2)',
        sendMoneyTaxReceiptSubmit: '#new_donation_trp > button',
        employeeID: '#transfer_details_employee_role_id',
        employeeMatch: '#transfer_details_employee_role_id > option:nth-child(2)',
        submit: '[type="submit"]',
        successCheck: '.success-check',
        amountDisplay: '.success-check ~ div h4',
    }
}
