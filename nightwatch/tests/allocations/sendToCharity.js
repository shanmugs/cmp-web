
module.exports = {
    '@tags': ['staging', 'critical-stage', 'gemini'],

    'setUp': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        var dashboard = browser.page.dashboard();

        dashboard
            .waitForElementVisible('@accountNav');

        var toCharity = browser.page.sendToCharity();

        toCharity
            .navigate();
    },

	'Verify user can allocate 5.00 to a charity from their personal fund': function(browser) {
        var toCharity = browser.page.sendToCharity();
        var transferForm = toCharity.section.transferForm;

        transferForm
            .fillInForm({
                amount: '5.00',
                fundType: 'personal',
            });

        toCharity
            .submitForm('@newTransferDetails')
            .expect.section('@confirmGift').to.be.visible;


        browser.end();
    },

    'Verify user can\'t allocate less than 5.00 to a charity from their personal fund': function(browser) {
        var toCharity = browser.page.sendToCharity();
        var transferForm = toCharity.section.transferForm;

        transferForm
            .fillInForm({
                amount: '1.00',
                fundType: 'personal',
            });

        toCharity
            .submitForm('@newTransferDetails');

        transferForm
            .waitForElementVisible('@amountError');

        browser.end();
    },

    'Verify user can allocate to a charity using a new credit card': function(browser) {
        var toCharity = browser.page.sendToCharity();
        var transferForm = toCharity.section.transferForm;
        var stripePay = toCharity.section.stripePay;
        var confirmGift = toCharity.section.confirmGift;
        var trpForm = toCharity.section.trpForm;

        transferForm
            .fillInForm({
                amount: '9999.00',
                fundType: 'personal',
            });

        stripePay
            .waitForElementVisible('@newTransferStripeSelect')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card')
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        toCharity
            .submitForm('@newTransferDetails');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

         toCharity
            .submitForm('@taxReceiptForm')
            .expect.section('@confirmGift').to.be.visible;

        browser.end();
    },

    'Verify user can allocate to a charity and cover the fees': function(browser) {
        var toCharity = browser.page.sendToCharity();
        var transferForm = toCharity.section.transferForm;
        var confirmGift = toCharity.section.confirmGift;
        var trpForm = toCharity.section.trpForm;

        transferForm
            .fillInForm({
                amount: '5.00',
                fundType: 'personal',
            });

        toCharity
            .triggerTouch('@coverFees')
            .submitForm('@newTransferDetails');

         toCharity
            .expect.section('@confirmGift').to.be.visible;

        confirmGift
            .verify.containsText('@feeText', 'in fees so the recipient receives 100% of your gift')

        browser.end();
    },

    'Verify user can set up a recurring Transfer to a charity': function(browser) {
        var sendMoney = browser.page.sendRecurringCharity();
        var transferForm = sendMoney.section.transferForm;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer');

        browser.end();
    },

    'Verify user can request a match for a recurring Transfer to a charity': function(browser) {
       var sendMoney = browser.page.sendRecurringCharity();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .click('@employeeMatch')
            .submitForm('@continueTransferForm')

        sendMoney.expect.section('@confirmTransfer').to.be.visible;

        confirmTransfer
            .waitForElementVisible('@matchConfirmHeading')
            .verify.containsText('@matchConfirmHeading', 'Matched by');

        browser.end();
    },

};