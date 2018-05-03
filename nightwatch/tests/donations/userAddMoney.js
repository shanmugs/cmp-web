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

        var addMoney = browser.page.userAddMoney();

        addMoney
            .navigate();

    },

    'Verify form elements are present': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        
        amountForm
            .verify.elementPresent('@newDonationAmount')
            .verify.elementPresent('@newDonationChooseFund')
            .verify.elementPresent('@newDonationStripeSelect')
            .verify.elementPresent('@newDonationStripeSelectNew')
            .verify.elementPresent('@newDonationStripeSelectFirst')
            .verify.elementPresent('@newDonationStripeName');

        browser.end();

    },

    'Verify new User is prompted for tax receipt profile': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        var stripeForm = addMoney.section.stripeForm;
        var login = browser.page.login();
        var taxReceipt = addMoney.section.taxReceiptForm;
        var header = login.section.header;
        var addMoney = browser.page.userAddMoney();
        
        //setup pre-logs you in with the standard test account
        //here we log out the standard account and log in with the special "clean"
        //account used for this test.
        header.logout();

        login
            .navigate()
            .fillInForm('chimpautomation+freshuser@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        var dashboard = browser.page.dashboard();

        dashboard
            .waitForElementVisible('@accountNav');

        addMoney
            .navigate();

        addMoney
            .expect.section('@amountForm').to.be.visible;
        
        amountForm
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


        addMoney
            .submitForm('@newDonationForm');

        taxReceipt
            .waitForElementVisible('@taxReceiptForm');
            
        browser.end();      
    },


    'Verify User is prompted for address when using a new card': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        var stripeForm = addMoney.section.stripeForm;
        var taxReceipt = addMoney.section.taxReceiptForm;

        addMoney
            .expect.section('@amountForm').to.be.visible;
        
        amountForm
            .selectOptionByIndex('@newDonationChooseFund', 1)
            .selectOptionByText('@newDonationStripeSelect', 'Use a new credit card')
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

        addMoney
            .submitForm('@newDonationForm');

        taxReceipt
            .waitForElementVisible('@taxReceiptForm');
            
        browser.end();      
    },

   'Verify User can update their tax receipt info from the confirm page': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        var confirmPage = addMoney.section.confirmPage;
        var taxReceipt = addMoney.section.taxReceiptForm;
        var stripeForm = addMoney.section.stripeForm;

        addMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByIndex('@newDonationChooseFund', 1)
                //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe');

        amountForm
            .waitForElementVisible('@newDonationAmount')
            .fillInForm({
                amount: '5.00',
                });
     
        addMoney
            .submitForm('@newDonationForm');

        addMoney
            .expect.section('@confirmPage').to.be.visible;

        confirmPage
            .waitForElementVisible('@updateTaxReceiptLink')
            .triggerTouch('@updateTaxReceiptLink');

        taxReceipt
            .waitForElementVisible('@taxReceiptForm');
            
        browser.end();      
    },

    'Verify User can change tax receipt profile when using a saved card': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        var confirmPage = addMoney.section.confirmPage;
        var taxReceipt = addMoney.section.taxReceiptForm;
        var stripeForm = addMoney.section.stripeForm;

        addMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByIndex('@newDonationChooseFund', 1)
                //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe');


        amountForm
            .waitForElementVisible('@newDonationAmount')
            .fillInForm({
                amount: '5.00',
                });

        addMoney
            .submitForm('@newDonationForm')
            .expect.section('@confirmPage').to.be.visible;

        confirmPage
            .waitForElementVisible('@updateTaxReceiptLink')
            .triggerTouch('@updateTaxReceiptLink');

        taxReceipt
            .waitForElementVisible('@taxReceiptForm');
            
        browser.end();      
    },

    'Verify User is able to match their donation': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        var stripeForm = addMoney.section.stripeForm;
        var taxReceipt = addMoney.section.taxReceiptForm;
        var confirmPage = addMoney.section.confirmPage;
        var matchModule = addMoney.section.matchModule;

        addMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByIndex('@newDonationChooseFund', 1)
                 //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe')
            .fillInForm({
                amount: '10.00',
                });

        amountForm
            .verify.elementPresent('@employeeID')
            .click('@employeeID')
            .click('@employeeMatch');

        addMoney
            .expect.section('@matchModule').to.be.visible;

        matchModule
            .verify.elementPresent('@communityHeading')
            .verify.elementPresent('@communityLogo')
            .verify.elementPresent('@communityBanner')

        addMoney
            .submitForm('@newDonationForm');

        addMoney
            .expect.section('@confirmPage').to.be.visible;

        addMoney
            .expect.section('@matchModule').to.be.visible;

        confirmPage
            .waitForElementVisible('@matchConfirmHeading')
            .verify.containsText('@matchConfirmHeading', 'Matched by');
        
        addMoney
            .expect.section('@matchModule').to.be.visible;

        browser.end();      
    },

    'Verify User is able to complete their donation': function(browser) {
        var addMoney = browser.page.userAddMoney();
        var amountForm = addMoney.section.amountForm;
        var stripeForm = addMoney.section.stripeForm;
        var taxReceipt = addMoney.section.taxReceiptForm;
        var confirmPage = addMoney.section.confirmPage;

        addMoney
            .expect.section('@amountForm').to.be.visible;

        amountForm
            .selectOptionByIndex('@newDonationChooseFund', 1)
                //this will select the first saved card
            .selectOptionByText('@newDonationStripeSelect', 'John Doe');

        amountForm
            .waitForElementVisible('@newDonationAmount')
            .fillInForm({
                amount: '5.00',
                })
            .verify.elementPresent('@continue');
            
        addMoney
            .submitForm('@newDonationForm');

        addMoney
            .expect.section('@confirmPage').to.be.visible;

        confirmPage
            .click('@confirmButton');

        addMoney
            .waitForElementVisible('@success');


        browser.end();      
    },
};
