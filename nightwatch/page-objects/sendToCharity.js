var appSections = require('./global/appSections');
var sections = appSections;
// could add additional sections here with sections.sectionName = { selector: '.selectoClass'}

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
            var amount = values.amount || null;
            var fundType = values.fundType || null;
            var recipients = values.recipients || null;
            
            if (amount){
                this.clearValue('@newTransferAmount')
                    .setValue('@newTransferAmount', amount);
            }
            
            if (recipients) {
                this.clearValue('@recipients')
                    .setValue('@recipients', recipients);
            }

            // if fundType passed pass it to the choseFund method
            if (fundType) {
                this.chooseFund(fundType)
            }

            //let setValue finish adding text:
            this.api.pause(100);

            return this;
        }
    }],
    elements: {
        newTransferChooseFund: '#fund_selector',
        newTransferAmount: '#transfer_details_amount',
        amountError: '#transfer_details_amount + .alert-label',
        continue: '[type="submit"]',
        recipients: '#transfer_details_emails_string',

    }
},

sections.stripePay = {
    selector: '#transfer_details_payment_wrapper',
    commands: [{
        fillInForm: function (values) {
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
        }
    }],
    elements: {
        newTransferStripeSelect: '#stripe_cards_select',
        newTransferStripeName: '#stripe_card_name',
        newTransferStripeNumber: '#stripe_card_number',
        newTransferStripeMonth: '#stripe_expiry_month',
        newTransferStripeYear: '#stripe_expiry_year',
        newTransferStripeCVV: '#stripe_cvv',
        submit: '#new_transfer_details [type="submit"]'
    },
},

    sections.trpForm = {
    selector: '#new_donation_trp',
    commands: [{
        fillInForm: function (values) {
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


sections.confirmGift = {
    selector: '#new_transfer_confirm',
    commands: [{
    }],
    elements: {
        matchConfirmHeading: '.form-wrapper.pam > h6:nth-child(7)',
        //this selector isn't ideal, but we're unable to use something
        //different without changing the dom
        updateTaxReceiptLink: '.confirm-change',
        confirmButton: '#confirm-page-button',
        feeText: '#new_transfer_confirm > div.form-wrapper.pam > h2:nth-child(4)',
        //this selector isn't ideal, but we're unable to use something
        //different without changing the dom
    }
},

module.exports = {
    url: function () {
        return this.api.launchUrl + 'send/to/charity/the-canadian-red-cross-society-la-societe-canadienne-de-la-croix-rouge/gift/new';
    },
    sections: sections,
    elements: {
        accountNav: '.c-header-account-dropdown__trigger-avatar',
        newTransferDetails: '#new_transfer_details',
        taxReceiptForm: '#new_donation_trp',
        coverFees: 'label.check-copy.fees_check'

    }
}