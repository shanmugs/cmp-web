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

        var communityAddMoney = browser.page.communityAddMoney();

        communityAddMoney
            .navigate();

    },

    'Verify form elements are present': function(browser) {
        var communityAddMoney = browser.page.communityAddMoney();
        var amountForm = communityAddMoney.section.amountForm;
        
        amountForm
            .verify.elementPresent('@newDonationAmount')
            .verify.elementPresent('@newDonationChooseFund')
            .verify.elementPresent('@newDonationStripeSelect')
            .verify.elementPresent('@newDonationStripeSelectNew')
            .verify.elementPresent('@newDonationStripeSelectFirst')
            .verify.elementPresent('@newDonationStripeName');

        browser.end();

    },


    'Verify Community is prompted for address when using a new card': function(browser) {
        var communityAddMoney = browser.page.communityAddMoney();
        var amountForm = communityAddMoney.section.amountForm;
        var stripeForm = communityAddMoney.section.stripeForm;

        communityAddMoney
            .expect.section('@amountForm').to.be.visible;
        
        amountForm
            .selectOptionByText('@newDonationChooseFund', 'Absolute')
            .waitForElementVisible('@newDonationStripeSelect')
            .selectOptionByText('@newDonationStripeSelect', 'Use a new credit card');

        amountForm
            .waitForElementVisible('@newDonationStripeName')
            .fillInForm({
                amount: '10.00',
                });

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        communityAddMoney
            .submitForm('@newDonationForm');
            
        browser.end();      
    },

    'Verify Community can change tax receipt profile when using a saved card': function(browser) {
        var communityAddMoney = browser.page.communityAddMoney();
        var amountForm = communityAddMoney.section.amountForm;
        var confirmPage = communityAddMoney.section.confirmPage;
        var taxReceipt = communityAddMoney.section.taxReceiptForm;

        communityAddMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByText('@newDonationChooseFund', 'Absolute')

                //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe');

        amountForm
            .waitForElementVisible('@newDonationAmount')
            .fillInForm({
                amount: '5.00',
                })
            .waitForElementVisible('@continue');

        communityAddMoney
            .submitForm('@newDonationForm');

        communityAddMoney
            .expect.section('@confirmPage').to.be.visible;

        confirmPage
            .triggerTouch('@updateTaxReceiptLink');

        taxReceipt
            .waitForElementVisible('@taxReceiptForm');
            
        browser.end();      
    },

    'Verify Community can schedule a recurring donation': function(browser) {
        var communityAddMoney = browser.page.communityAddMoney();
        var amountForm = communityAddMoney.section.amountForm;
        var confirmPage = communityAddMoney.section.confirmPage;
        var taxReceipt = communityAddMoney.section.taxReceiptForm;

        communityAddMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByText('@newDonationChooseFund', 'Absolute')

                //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe');

        amountForm
            .waitForElementVisible('@newDonationAmount')
            .fillInForm({
                amount: '5.00',
                });

        communityAddMoney
            .click('@recurringSpan')
            .waitForElementVisible('@donationDetails');

        communityAddMoney
            .submitForm('@newDonationForm');

        communityAddMoney
            .expect.section('@confirmPage').to.be.visible;

        confirmPage
            .triggerTouch('@updateTaxReceiptLink');

        taxReceipt
            .waitForElementVisible('@taxReceiptForm');
            
        browser.end();      
    },

    'Verify community is able to complete their donation': function(browser) {
        var communityAddMoney = browser.page.communityAddMoney();
        var amountForm = communityAddMoney.section.amountForm;
        var confirmPage = communityAddMoney.section.confirmPage;
        var taxReceipt = communityAddMoney.section.taxReceiptForm;

        communityAddMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByText('@newDonationChooseFund', 'Absolute')
                //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe');

        amountForm
            .waitForElementVisible('@newDonationAmount')
            .fillInForm({
                amount: '5.00',
                });

        communityAddMoney
            .submitForm('@newDonationForm');

        communityAddMoney
            .expect.section('@confirmPage').to.be.visible;

        confirmPage
            .click('@confirmButton');

        communityAddMoney
            .waitForElementVisible('@success');


        browser.end();      
    },
};