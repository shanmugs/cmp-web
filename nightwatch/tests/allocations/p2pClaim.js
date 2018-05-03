
module.exports = {

    '@tags': ['unique-setup'],

    'setUp': function(browser) {
        var p2pClaim = browser.page.p2pClaim();
        p2pClaim
            .navigate()
            .waitForElementVisible('@pageContainer');
    },

    'P2P Claim: verify elements present': function(browser) {
        var p2pClaim = browser.page.p2pClaim();

        p2pClaim
            .verify.elementPresent('@pageContainer')
            .verify.elementPresent('@formToggle')
            .verify.elementPresent('@chimpFeatures')
            .verify.elementPresent('@introText')
            .verify.elementPresent('@chatCallout')
            .verify.elementPresent('@chatCalloutAvatar')
        
        
        p2pClaim.expect.section('@banner').to.be.visible;
        var p2pBanner = p2pClaim.section.banner;
        p2pBanner
            .verify.elementPresent('@p2pLandingText')
            .verify.elementPresent('@p2pAvatar')

        p2pClaim.expect.section('@registrationForm').to.be.visible;
        var p2pSignUp = p2pClaim.section.registrationForm;
        
        p2pSignUp
            .verify.elementPresent('@firstNameField')
            .verify.elementPresent('@lastNameField')
            .verify.elementPresent('@emailField')
            .verify.elementPresent('@passwordField')
            .verify.elementPresent('@accountAgreement')
            .verify.elementPresent('@createAccountBtn')

        p2pClaim
            .click('@formToggle')

        p2pClaim.expect.section('@logInForm').to.be.visible;
        var p2pLogIn = p2pClaim.section.logInForm;
        p2pLogIn
            .verify.elementPresent('@emailField')
            .verify.elementPresent('@passwordField')
            .verify.elementPresent('@emailField')
            .verify.elementPresent('@forgotPassword')
            .verify.elementPresent('@logInFormSubmit')

        browser.end();
    },

    'P2P Claim: claim amount is in p2p Landing text': function(browser) {
        var appState = browser.globals.getAppTestState(browser.globals.env)

        var p2pClaim = browser.page.p2pClaim();

        var p2pBanner = p2pClaim.section.banner;
        p2pBanner
            .verify.containsText('@p2pLandingText', appState.p2pClaim.amount)
            .verify.containsText('@p2pLandingText', appState.p2pClaim.sender.firstName)

        browser.end();
    },

    'P2P Claim: Sender\'s name is in the intro text': function(browser) {
        var appState = browser.globals.getAppTestState(browser.globals.env)

        var p2pClaim = browser.page.p2pClaim();
        p2pClaim
            .verify.containsText('@introText', appState.p2pClaim.sender.firstName)

        browser.end();
    },

    'P2P Claim: Receivers name is prepopulated in the email field': function(browser) {
        var appState = browser.globals.getAppTestState(browser.globals.env)

        var p2pClaim = browser.page.p2pClaim();
        p2pClaim.expect.section('@registrationForm').to.be.visible;
        var p2pSignUp = p2pClaim.section.registrationForm;
        p2pSignUp
            .verify.elementPresent('@emailField')
            .verify.attributeEquals('@emailField', 'value', appState.p2pClaim.recipient.email);
        browser.end();
    },

    'P2P Claim - Sign Up: verify form validation': function(browser) {
        var p2pClaim = browser.page.p2pClaim();
        p2pClaim.expect.section('@registrationForm').to.be.visible;

        var registrationForm = p2pClaim.section.registrationForm;

        registrationForm.register({
            firstName: '',
            lastName: '',
            email: '',
            password: '' 
        });

        registrationForm
            .waitForElementVisible('@firstNameError')
            .verify.containsText('@firstNameError', 'can\'t be blank')
            .verify.containsText('@lastNameError', 'can\'t be blank')
            .verify.containsText('@passwordError', 'can\'t be blank')
            .verify.containsText('@passwordError', 'Please provide a password that is at least 8 characters and contains a lower case letter, an upper case letter, a digit and a special character (!@%$#^&~`*()).')


        browser.end();
    },

    'P2P Claim - Log in: verify form validation': function(browser) {
        var p2pClaim = browser.page.p2pClaim();
        p2pClaim
            .verify.elementPresent('@formToggle')
            .click('@formToggle')
        
        p2pClaim.expect.section('@logInForm').to.be.visible;

        var logInForm = p2pClaim.section.logInForm;
        

        logInForm.submit({
            email: '',
            password: ''
        });

        logInForm
            .waitForElementVisible('@formErrors')
            .verify.containsText('@formErrors', 'Hmm, we couldn\'t log you in with that info. Give it another try.')


        browser.end();
    },
}
