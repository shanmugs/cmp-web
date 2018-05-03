module.exports = {
    '@tags': ['staging', 'gemini'],
    'setUp': function(browser) {
        var home = browser.page.home();
        
        home
            .navigate()
            .waitForElementVisible( '@heroImg' );
    },

    // these tests are a poor integration test, but until we can arbitrarily create new users 
    // (and tear them down) to have the backend set the cookies, we can test that when the correct 
    // cookies are set the corrent modal appears.
    'Verify setting new user cookies triggers onboarding panels': function(browser) {
        var home = browser.page.home();
        var body = home.section.body;
        
        body.openNewUserOnboardingModal();
        body.expect.section('@welcomeModal').to.be.visible

        browser.end();
    },

    'Verify onboarding panel elements present': function(browser) {
        var home = browser.page.home();
        var body = home.section.body;
        var modal = body.section.welcomeModal;
        
        body.openNewUserOnboardingModal();
        body.expect.section('@welcomeModal').to.be.visible;

        modal
            .waitForElementVisible('@slideOne')
            .verify.elementPresent('@welcomeClose')
            .verify.elementPresent('@welcomeImg')
            .verify.elementPresent('@welcomeContent')
            .verify.elementPresent('@slideOneDescription')
            .verify.elementPresent('@slideOneBtn');

        browser.end();
    },
    
    'Verify onboarding panel flow can be completed': function(browser) {
        var home = browser.page.home();
        var body = home.section.body;
        var modal = body.section.welcomeModal;
        
        body.openNewUserOnboardingModal();
        body.expect.section('@welcomeModal').to.be.visible;
        // Requires pauses for fade animations to complete
        modal
            .waitForElementVisible('@slideOneDescription')
            .verify.containsText('@slideOneDescription', 'CHIMP lets you give to charities')
            .click('@secondPip')
        browser.pause(500);

        modal
            .waitForElementVisible('@slideTwoBtn')
            .verify.containsText('@slideTwoDescription', 'CHIMP automatically manages and organizes your giving activity')
            .click('@slideTwoBtn')
        browser.pause(500);

        modal
            .waitForElementVisible('@slideThreeBtn')
            .verify.containsText('@slideThreeDescription', 'CHIMP lets you give when you want, how you want, all in one place.')
            .click('@slideThreeBtn');

        body.expect.section('@welcomeModal').to.not.be.present;

        browser.end();
    },
    

    'Verify setting new employee cookies triggers onboarding panels': function(browser) {
        var home = browser.page.home();
        var body = home.section.body;
        var modal = body.section.welcomeModal;
        
        body.openNewEmployeeOnboardingModal();
        body.expect.section('@welcomeModal').to.be.visible

        browser.end();
    },

    'Verify setting new group invite cookies triggers onboarding panels': function(browser) {
        var home = browser.page.home();
        var body = home.section.body;
        
        body.openGroupInviteOnboardingModal();
        body.expect.section('@welcomeModal').to.be.visible

        browser.end();
    },

    'Verify setting new beneficiary cookies triggers onboarding panels': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .waitForElementVisible('@passwordField')
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        var home = browser.page.home();
        var body = home.section.body;
        
        body.openNewBeneficiaryOnboardingModal();

        body.expect.section('@legacyOnboardingPanels').to.be.visible;

        browser.end();
    },
}


