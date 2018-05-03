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

        var sendMoney = browser.page.sendMoneyRecurring();

        sendMoney
            .navigate('syrian-refugee-sponsorship-rainbow-railroad')
            .waitForElementVisible('@newTransferAmount');

    },


 'Verify user can set up a personal recurring Transfer to a campaign': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
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

  'Verify user can set up a personal recurring Transfer to a group': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        
        sendMoney
            .navigate('pink-shirt-day')
            .waitForElementVisible('@newTransferAmount');

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


    'Verify user can top up personal account with a new credit card': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
        var transferForm = sendMoney.section.transferForm;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@trpForm').to.be.visible;

        browser.end();
    },

    'Verify user can request a match for a personal recurring Transfer to a campaign': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
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

     'Verify user can request a match for a personal recurring Transfer to a group': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        sendMoney
            .navigate('pink-shirt-day')
            .waitForElementVisible('@newTransferAmount');

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

    'Verify user can select a personal existing tax receipt profile': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
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
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm')
            .waitForElementVisible('@sendMoneySelectTaxReceiptRecipient')
            .click('@sendMoneySelectTaxReceipt')
            .submitForm('@continueTRPForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;
        
        browser.end();
    },

    'Verify user can select a new personal tax receipt profile': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
        var transferForm = sendMoney.section.transferForm;
        var trpForm = sendMoney.section.trpForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm')
            .waitForElementVisible('@sendMoneySelectTaxReceiptRecipient')
            .selectOptionByText('@newTransferStripeSelect', 'Add a new tax receipt recipient');

        trpForm
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        sendMoney
            .submitForm('@continueTRPForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;
        
        browser.end();
    },

    'Verify personal confirmation page displays amount': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;

        confirmTransfer
            .verify.containsText('@newTransferArrow', '$25.00');
        
        browser.end();
    },

    'Verify personal success page is displayed': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;

        confirmTransfer
            .verify.containsText('@newTransferArrow', '$25.00')
            .waitForElementVisible('@confirmButton')
            .triggerTouch('@confirmButton');

        sendMoney
            .waitForElementVisible('@successCheck')
            .waitForElementVisible('@amountDisplay')
            .verify.containsText('@amountDisplay', '$25.00');

        browser.end();
    },

    'Verify personal recurring gift is displayed on monthly giving page': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '10.17',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;


        confirmTransfer
            .verify.containsText('@newTransferArrow', '$10.17')
            .waitForElementVisible('@confirmButton')
            .triggerTouch('@confirmButton');

        sendMoney
            .waitForElementVisible('@successCheck')
            .verify.containsText('@amountDisplay', '$10.17')
            .click('.form-wrapper [href="/user/recurring-gifts"]')
            .waitForElementVisible('@recurringGiftsTable')
            .verify.containsText('@recurringGiftsTableCampaign', 'Syrian Refugee Sponsorship Rainbow Railroad (Campaign)')
            .verify.containsText('@recurringGiftsTableTR', '$10.17')
            .verify.containsText('@recurringGiftsTableTR', '1st');
        browser.end();
    },

    'Verify personal recurring gift can be deleted': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '5.78',
                fundType: 'personal',
            });
        
        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;


        confirmTransfer
            .verify.containsText('@newTransferArrow', '$5.78')
            .waitForElementVisible('@confirmButton')
            .triggerTouch('@confirmButton');

        sendMoney
            .waitForElementVisible('@successCheck')
            .verify.containsText('@amountDisplay', '$5.78');

        browser.url(browser.launch_url + 'user/recurring-gifts');

        sendMoney
            .waitForElementVisible('@recurringGiftsTable')
            .verify.containsText('@recurringGiftsTableCampaign', 'Syrian Refugee Sponsorship Rainbow Railroad (Campaign)')
            .click('@recurringGiftsTableDelete')
            .waitForElementVisible('@recurringGiftsDeleteModal')
            .click('#delete-description + button')
            .waitForElementVisible('@recurringGiftsTable')
            .verify.doesNotContainText('@recurringGiftsTableTR', '$5.78');
        
        browser.end();
    },

     'Verify user can set up a community recurring Transfer to a campaign': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer');

        browser.end();
    },

    'Verify user can set up a community recurring Transfer to a group': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;

        sendMoney
            .navigate('pink-shirt-day')
            .waitForElementVisible('@newTransferAmount');

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer');

        browser.end();
    },

    'Verify user can top up community account with a new credit card': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
        var transferForm = sendMoney.section.transferForm;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@trpForm').to.be.visible;

        browser.end();
    },

    'Verify user can select an existing community tax receipt profile': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm')
            .waitForElementVisible('@sendMoneySelectTaxReceiptRecipient')
            .click('@sendMoneySelectTaxReceipt')
            .submitForm('@continueTRPForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;
        
        browser.end();
    },

    'Verify community confirmation page displays amount': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;

        confirmTransfer
            .verify.containsText('@newTransferArrow', '$25.00');
        
        browser.end();
    },

    'Verify community success page is displayed': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;

        confirmTransfer
            .verify.containsText('@newTransferArrow', '$25.00')
            .waitForElementVisible('@confirmButton')
            .triggerTouch('@confirmButton');

        sendMoney
            .waitForElementVisible('@successCheck')
            .waitForElementVisible('@amountDisplay')
            .verify.containsText('@amountDisplay', '$25.00');

        browser.end();
    },

    'Verify community recurring gift is displayed on monthly giving page': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '10.17',
                fundType: 'community',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;


        confirmTransfer
            .verify.containsText('@newTransferArrow', '$10.17')
            .waitForElementVisible('@confirmButton')
            .triggerTouch('@confirmButton');

        sendMoney
            .waitForElementVisible('@successCheck')
            .verify.containsText('@amountDisplay', '$10.17');

        browser.url(browser.launch_url + 'companies/absolute/recurring-gifts');

        sendMoney
            .waitForElementVisible('@recurringGiftsTable')
            .verify.containsText('@recurringGiftsTableCampaign', 'Syrian Refugee Sponsorship Rainbow Railroad (Campaign)')
            .verify.containsText('@recurringGiftsTableTR', '$10.17')
            .verify.containsText('@recurringGiftsTableTR', '1st');
        browser.end();
    },

    'Verify community recurring gift can be deleted': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var transferForm = sendMoney.section.transferForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;

        transferForm
            .fillInForm({
                amount: '5.78',
                fundType: 'community',
            });
        
        sendMoney
            .click('@sendMoneyRecurringDay')
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;


        confirmTransfer
            .verify.containsText('@newTransferArrow', '$5.78')
            .waitForElementVisible('@confirmButton')
            .triggerTouch('@confirmButton');

        sendMoney
            .waitForElementVisible('@successCheck')
            .verify.containsText('@amountDisplay', '$5.78');

        browser.url(browser.launch_url + 'companies/absolute/recurring-gifts');

        sendMoney
            .waitForElementVisible('@recurringGiftsTable')
            .verify.containsText('@recurringGiftsTableCampaign', 'Syrian Refugee Sponsorship Rainbow Railroad (Campaign)')
            .click('@recurringGiftsTableDelete')
            .waitForElementVisible('@recurringGiftsDeleteModal')
            .click('#delete-description + button')
            .waitForElementVisible('@recurringGiftsTable')
            .verify.doesNotContainText('@recurringGiftsTableTR', '$5.78');
        
        browser.end();
    },

    'Verify new user can create a recurring allocation with a new credit card': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
        var transferForm = sendMoney.section.transferForm;
        var login = browser.page.login();
        var header = login.section.header;

        // Test Broken By CT-5072

        //Because setup pre-logs you in with the standard test account,
        //Here we log out the standard account and log in with the special "clean"
        //Account used for this test.
        header.logout();

        login
            .navigate()
            .fillInForm('chimpautomation+freshuser@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        sendMoney
            .navigate('syrian-refugee-sponsorship-rainbow-railroad')
            .waitForElementVisible('@newTransferAmount');

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .waitForElementVisible('@sendMoneyRecurringDay')
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm');

        sendMoney.expect.section('@trpForm').to.be.visible;

        browser.end();
    },

     'Verify new user can set up a recurring allocation with a new tax receipt profile': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var stripePay = sendMoney.section.stripePay;
        var transferForm = sendMoney.section.transferForm;
        var trpForm = sendMoney.section.trpForm;
        var confirmTransfer = sendMoney.section.confirmTransfer;
        var login = browser.page.login();
        var header = login.section.header;

        // Test Broken By CT-5072

        //Because setup pre-logs you in with the standard test account,
        //Here we log out the standard account and log in with the special "clean"
        //Account used for this test.
        header.logout();

        login
            .navigate()
            .fillInForm('chimpautomation+freshuser@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        sendMoney
            .navigate('syrian-refugee-sponsorship-rainbow-railroad')
            .waitForElementVisible('@newTransferAmount');

        transferForm
            .fillInForm({
                amount: '25.00',
                fundType: 'personal',
            });

        sendMoney
            .click('@sendMoneyRecurringDay')
            .waitForElementVisible('@sendMoneyPaymentContainer')
            .selectOptionByText('@newTransferStripeSelect', 'Use a new credit card');

        stripePay
            .waitForElementVisible('@newTransferStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        sendMoney
            .submitForm('@continueTransferForm');

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

        sendMoney
            .submitForm('@continueTRPForm');

        sendMoney.expect.section('@confirmTransfer').to.be.visible;
        
        browser.end();
    },
};
