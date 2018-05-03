module.exports = {
    '@tags': ['staging', 'gemini'],


    'Charity: Verify Chimp phone number is visible in sidebar when logged in': function(browser) {
       var login = browser.page.login();
        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        var charities = browser.page.charities();

        charities
            .navigate()
            .waitForElementVisible('@helpSidebar');

        charities
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580')

        browser.end();
    },

    'Charity: Verify Chimp phone number isn\'t visible in sidebar when logged out': function(browser) {
        var charities = browser.page.charities();

        charities
            .navigate()
            .waitForElementVisible('@helpSidebar');

        charities
            .verify.doesNotContainText('@helpSidebar', 'Call 1 (877) 531-0580')

        browser.end();
    },


}
