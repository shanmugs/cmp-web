

module.exports = {
    '@tags': ['staging', 'critical-stage', 'critical-prod', 'gemini'],

    'setUp': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        var userAccount = browser.page.userAccountInfo();

        userAccount
            .navigate()
            .waitForElementVisible('@accountContent');

    },

    'Verify Account Settings sidebar navigation is present': function(browser) {
        var userAccount = browser.page.userAccountInfo();

        userAccount
            .verify.elementPresent('@accountSettingsPersonalInfoLink')
            .verify.elementPresent('@accountSettingsEmailAddressesLink');

        browser.end();
    },

    'Verify Account Basics module elements are present': function(browser) {
       var userAccount = browser.page.userAccountInfo();

        userAccount
            .verify.elementPresent('@photoContentWrapper')
            .verify.elementPresent('@photoUploadArea');

        browser.end();
    },

    'Verify Donor Photo module elements are present': function(browser) {
        var userAccount = browser.page.userAccountInfo();

        userAccount
            .verify.elementPresent('@photoContentWrapper')
            .verify.elementPresent('@photoUploadArea')
            .verify.elementPresent('@photoTitle')
            .verify.elementPresent('@photoUploadedImg')
            .verify.elementPresent('@photoTextBlurb')
            .verify.elementPresent('@photoUploadButton');

        browser.end();
    },

    'Verify Change Password module elements are present': function(browser) {
        var userAccount = browser.page.userAccountInfo();

        userAccount
            .verify.elementPresent('@photoContentWrapper')
            .verify.elementPresent('@photoUploadArea')
            .verify.elementPresent('@photoTitle')
            .verify.elementPresent('@photoUploadedImg')
            .verify.elementPresent('@photoTextBlurb')
            .verify.elementPresent('@photoUploadButton');
            
        browser.end();
    }
}
