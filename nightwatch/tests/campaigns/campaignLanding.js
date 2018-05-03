module.exports = {
    '@tags': ['staging', 'gemini'],


    'Campaign: Verify Chimp phone number is visible in sidebar when logged in': function(browser) {
       var login = browser.page.login();
        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        var campaigns = browser.page.campaigns();

        campaigns
            .navigate()
            .waitForElementVisible('@helpSidebar');

        campaigns
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580')

        browser.end();
    },

    'Campaign: Verify Chimp phone number is visible in sidebar when logged out': function(browser) {
        var campaigns = browser.page.campaigns();

        campaigns
            .navigate()
            .waitForElementVisible('@helpSidebar');

        campaigns
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580')

        browser.end();
    },


}