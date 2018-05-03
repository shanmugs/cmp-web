
module.exports = {
    '@tags': ['staging', 'gemini'],

    'setUp': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .waitForElementVisible('@loginField')
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        var taxReceipt = browser.page.communityTaxRecipient();
        taxReceipt
            .navigate('shady-potatoes');
        taxReceipt.expect.section('@firstTR').to.be.visible
        // taxReceipt.expect.section('@secondTR').to.be.visible

        firstTaxReceipt = taxReceipt.section.firstTR;
        
        firstTaxReceipt
            .waitForElementVisible('@gearBtn');

    },


    'Community Tax Receipt profile can be updated': function(browser) {
    	var taxReceipt = browser.page.communityTaxRecipient();
        taxReceipt.expect.section('@firstTR').to.be.visible;
        
        firstTaxReceipt = taxReceipt.section.firstTR;

        firstTaxReceipt.edit();
        
        taxReceipt
            .waitForElementVisible('@form')
            .submit({
                fullName: 'Rick' + Math.random().toString(16).replace(/[^a-z]+/g, '')
            });

        firstTaxReceipt
            .waitForElementVisible('@gearBtn')
            // .verify.containsText('@successBanner', 'Great, your new name and address for tax receipts is ready to use.')
            //CT-2863 re-enable check in fix branch
            
        browser.end();      
    },

    'Community Tax Receipt profile blank fields throw error for invalid information': function(browser) {
        var taxReceipt = browser.page.communityTaxRecipient();
        taxReceipt.expect.section('@firstTR').to.be.visible;

        firstTaxReceipt = taxReceipt.section.firstTR;

        firstTaxReceipt.edit();;
        
        taxReceipt
            .waitForElementVisible('@form')
            .submit({
               fullName: ' ',
               addressOne: ' ',
                city: ' ',
                postal: ' '

            });

        taxReceipt
           .waitForElementVisible('@addressOneErrorText')
            .verify.containsText('@nameError', '- can\'t be blank')
            .verify.containsText('@addressOneErrorText', '- can\'t be blank')
            .verify.containsText('@addressCityError', '- can\'t be blank')
            .verify.containsText('@addressPostError', '- can\'t be blank');
            
        browser.end(); 
    },

    'Community Tax Receipt profile fields throw error for invalid characters': function(browser) {
        var taxReceipt = browser.page.communityTaxRecipient();
        taxReceipt.expect.section('@firstTR').to.be.visible;

        firstTaxReceipt = taxReceipt.section.firstTR;

        firstTaxReceipt.edit();;
        
        taxReceipt
            .waitForElementVisible('@form')
            .submit({
               fullName: '/',
               addressOne: '/',
                city: '/',
                // postal: '/'
                // CT-2861, re-enable in fix branch

            });

        taxReceipt
           .waitForElementVisible('@addressOneErrorText')
            .verify.containsText('@nameError', '- please use only regular word characters')
            .verify.containsText('@addressOneErrorText', '- please use only regular word characters')
            .verify.containsText('@addressCityError', '- please use only regular word characters');
            // .verify.containsText('@addressPostError', '- please use only regular word characters');
            // CT-2861, re-enable in fix branch

        browser.end(); 
    }
}
