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

            // if fundType passed pass it to the choseFund method
            if (fundType) {
                this.chooseFund(fundType)
            }

            if (recipients) {
                this.clearValue('@recipients')
                    .setValue('@recipients', recipients);
            }

            //let setValue finish adding text:
            this.api.pause(200);
                
            return this;
        },

    }],
    elements: {
        newTransferChooseFund: '#fund_selector',
        newTransferAmount: '#transfer_details_amount',
        continue: '[type="submit"]',
        recipients: '#transfer_details_emails_string'
    }
},

sections.stripePay = {
    selector: '#stripe_cc_form_fields',
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

            //let setValue finish adding text:
            this.api.pause(100);
                
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


sections.confirmGift = {
    selector: '#new_transfer_confirm',
    commands: [{
    }],
    elements: {
        matchConfirmHeading: '.form-wrapper.pam > h6:nth-child(7)',
        //this selector isn't ideal, but we're unable to use something
        //different without changing the dom
        updateTaxReceiptLink: '.confirm-change',
        confirmButton: '#confirm-page-button'
    }
},

module.exports = {
    url: function () {
        return this.api.launchUrl + 'give/to/friend/new';
    },
    sections: sections,
    elements: {
        accountNav: '.c-header-account-dropdown__trigger-avatar',
        newTransferDetails: '#new_transfer_details',
    }
}