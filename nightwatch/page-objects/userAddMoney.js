var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

sections.amountForm = {
    selector: '#new_donation_details',
        commands: [{
        fillInForm: function (values) {
            var amount = values.amount || null;

            if (amount){
                this.clearValue('@newDonationAmount')
                    .setValue('@newDonationAmount', amount);
            }

            //let setValue finish adding text:
            this.api.pause(100);
                
            return this;
        },
    }],
    elements: {
        newDonationAmount: '#donation_details_amount',
        newDonationChooseFund: 'select#fund_selector',
        newDonationChooseFundFirst: 'select#fund_selector > optgroup:nth-child(2) > option',
        newDonationChooseCommunityFund: 'select#fund_selector > optgroup:nth-child(3) > option:nth-child(1)',
        newDonationStripeSelect: '#stripe_cards_select',
        newDonationStripeSelectNew: 'option[value="-1"]',
        newDonationStripeSelectFirst: '#stripe_cards_select option:nth-of-type(1)',
        newDonationStripeName: '#stripe_card_name',
        employeeID: '#donation_details_employee_role_id',
        employeeMatch: '#donation_details_employee_role_id',
        continue: '[type="submit"]',

    }
},

sections.stripeForm = {
    selector: '#stripe_cc_form_fields',
    commands: [{
        fillInForm: function (values) {
            var cardNumber = values.cardNumber || null;
            var fullName = values.fullName || null;
            var expMonth = values.expMonth || null;
            var expYear = values.expYear || null;
            var cvv = values.cvv || null;

            this


            if (cardNumber){
                this.clearValue('@newDonationStripeNumber')
                    .setValue('@newDonationStripeNumber', cardNumber);
            }

            if (fullName) {
                this.clearValue('@newDonationStripeName')
                    .setValue('@newDonationStripeName', fullName);
            }
            
            if (expMonth) {
                this.clearValue('@newDonationStripeMonth')
                    .setValue('@newDonationStripeMonth', expMonth);
            }

            if (expYear) {
                this.clearValue('@newDonationStripeYear')
                    .setValue('@newDonationStripeYear', expYear);
            }

            if (cvv) {
                this.clearValue('@newDonationStripeCVV')
                    .setValue('@newDonationStripeCVV', cvv);
            }

            //let setValue finish adding text:
            this.api.pause(100);
                
            return this;
        }
    }],
    elements: {
        newDonationStripeSelect: '#stripe_cards_select',
        newDonationStripeSelectNew: 'option[value="-1"]',
        newDonationStripeSelectFirst: '#stripe_cards_select option:nth-of-type(1)',
        newDonationStripeName: '#stripe_card_name',
        newDonationStripeNumber: '#stripe_card_number',
        newDonationStripeMonth: '#stripe_expiry_month',
        newDonationStripeYear: '#stripe_expiry_year',
        newDonationStripeCVV: '#stripe_cvv'
    }
},

sections.matchModule = {
    selector: '#donation_matching_module',
    commands: [{
    }],
    elements: {
        communityMessage: '.donation-match__company-message',
        communityHeading: '.donation-match__company-heading',
        communityLogo: '.donation-match__logo',
        communityBanner: '.donation-match__banner'
    }
},

sections.taxReceiptForm = {
    selector: '.qa-trp-form-container',
    commands: [{
    }],
    elements: {
        receiptMenu: '#receipt-toggle',
        receiptMenu2: '#receipt-toggle > option:nth-child(2)',
        taxReceiptForm: '#new_donation_trp',
        continueBtn: '#new_donation_trp [type="submit"]',
    }
}

sections.confirmPage = {
    selector: '#new_donation_confirm',
    commands: [{
    }],
    elements: {
        matchConfirmHeading: '.form-wrapper.pam > h6:nth-child(7)',
        //this selector isn't ideal, but we're unable to use something
        //different without changing the dom
        updateTaxReceiptLink: '.confirm-change',
        confirmButton: '#confirm-page-button',
        disabledConfirmButton: '#confirm-page-button[disabled=true]'
    }
};


module.exports = {
   url: function() {
        return this.api.launchUrl + 'donations/new';
    },
    sections: sections,
    commands: [{
    }],
    elements: {
        newDonationForm: '#new_donation_details',
        success: '.success-check',


    }
}
