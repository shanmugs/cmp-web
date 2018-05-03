var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

sections.amountForm = {
    selector: '#new_donation_details',
        commands: [{
        fillInForm: function (values) {
            client.perform(function (client) {
                var amount = values.amount || null;

                if (amount){
                    this.clearValue('@newDonationAmount')
                        .setValue('@newDonationAmount', amount);
                }

                //let setValue finish adding text:
                this.api.pause(100);
                
                return this;
                done();
            });
        },
    }],
    elements: {
        newDonationAmount: '#donation_details_amount',
        newDonationChooseFund: '#fund_selector',
        newDonationStripeSelect: '#stripe_cards_select',
        newDonationStripeName: '#stripe_card_name',
        employeeID: '#donation_details_employee_role_id',
        employeeMatch: '#donation_details_employee_role_id > option:nth-child(0)',
        continue: '[type="submit"]',
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
                done();
            });
        }
    }],
    elements: {
        
        newDonationStripeSelectNew: 'option[value="-1"]',
        newDonationStripeName: '#stripe_card_name',
        newDonationStripeNumber: '#stripe_card_number',
        newDonationStripeMonth: '#stripe_expiry_month',
        newDonationStripeYear: '#stripe_expiry_year',
        newDonationStripeCVV: '#stripe_cvv',
        submit: '#new_donation_details [type="submit"]'
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
};

sections.confirmPage = {
    selector: '#new_donation_confirm',
    commands: [{
    }],
    elements: {
        updateTaxReceiptLink: '.confirm-change',
        confirmButton: '#confirm-page-button'
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
        paymentContainer: '#transfer_details_payment_wrapper',
        recurringSpan: '#new_donation_details > div.form-wrapper.odd > div:nth-child(3) > span',
        sendMoneyRecurringDay: '#transfer_details_recurring_day_of_month > option:nth-child(2)',
        sendMoneyPaymentContainer: '#transfer_details_payment_wrapper',
        success: '.success-check',
        newDonationForm: '#new_donation_details',
        donationDetails: '#donation_details_recurring_day_of_month',
    }
}
