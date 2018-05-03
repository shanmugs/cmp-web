
module.exports = {

    '@tags': ['staging', 'critical-stage', 'gemini'],

    'setUp': function(browser) {

        var communityJoin = browser.page.communityJoin();
        communityJoin
            .navigate('30-day-adventures')
            .waitForElementVisible('@joinPage');
    },

    'Community Join: verify elements present': function(browser) {
        var communityJoin = browser.page.communityJoin();
        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .verify.elementPresent('@joinPage')
            .verify.elementPresent('@formToggle')
            .verify.elementPresent('@communityBanner')
            .verify.elementPresent('@communityTitle')
            .verify.elementPresent('@communityLandingText')
            .verify.elementPresent('@communityAvatar')
            .verify.elementPresent('@communityBenefitsCards')
            .verify.elementPresent('@communityIncentiveText')
            .verify.elementPresent('@chimpFeatures')
            .verify.elementPresent('@chatCallout')
            .verify.elementPresent('@chatCalloutAvatar');
        
        
        var communitySignUp = communityJoin.section.newUserForm;
        communitySignUp
            .verify.elementPresent('@firstNameField')
            .verify.elementPresent('@lastNameField')
            .verify.elementPresent('@emailField')
            .verify.elementPresent('@passwordField')
            .verify.elementPresent('@accountAgreement')
            .verify.elementPresent('@createAccountBtn');


        browser.end();
    },


    'Community Join: verify user can toggle between log in and sign up forms': function(browser) {
        var communityJoin = browser.page.communityJoin();
        var communityLogIn = communityJoin.section.logInForm;
        var communitySignUp = communityJoin.section.newUserForm;

        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .waitForElementVisible('@formToggle')
            .triggerTouch('@formToggle');

        communityLogIn
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@logInForm').to.be.visible;

        communityJoin
            .click('@formToggle')

        communitySignUp
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@newUserForm').to.be.visible;

        browser.end();
    },

    'Join Community - Sign Up: verify empty first name field triggers error': function(browser) {
        var communityJoin = browser.page.communityJoin();
        communityJoin.expect.section('@newUserForm').to.be.visible;

        var communitySignUp = communityJoin.section.newUserForm;

        communitySignUp.register({
            firstName: ' ',
            lastName: 'Doe',
            email: 'valid@mailinator.com',
            password: 'Qwerty1234!' 
        });

        communityJoin
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'can\'t be blank')

        browser.end();
    },

    'Join Community - Sign Up: verify empty last name field triggers error': function(browser) {
        var communityJoin = browser.page.communityJoin();
        communityJoin.expect.section('@newUserForm').to.be.visible;

        var communitySignUp = communityJoin.section.newUserForm;

        communitySignUp.register({
            firstName: 'John',
            lastName: ' ',
            email: 'valid@mailinator.com',
            password: 'Qwerty1234!' 
        });

        communitySignUp
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'can\'t be blank')

        browser.end();
    },

    'Join Community - Sign Up: verify unauthorized email triggers error': function(browser) {
        var communityJoin = browser.page.communityJoin();
        communityJoin.expect.section('@newUserForm').to.be.visible;

        var communitySignUp = communityJoin.section.newUserForm;

        communitySignUp.register({
            firstName: 'Ned',
            lastName: 'Stark',
            email: 'fake@notapproved.com',
            password: 'Qwerty1234!' 
        });

        communitySignUp
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Sorry, it doesn\'t look like that email address has been approved by')

        browser.end();
    },

    'Join Community - Sign Up: verify invalid password triggers error': function(browser) {
        var communityJoin = browser.page.communityJoin();
        communityJoin.expect.section('@newUserForm').to.be.visible;

        var communitySignUp = communityJoin.section.newUserForm;

        communitySignUp.register({
            firstName: 'Ned',
            lastName: 'Stark',
            email: 'valid@mailinator.com',
            password: 'weakpass' 
        });

        communitySignUp
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Please provide a password that is at least 8 characters and contains a lower case letter, an upper case letter, a digit and a special character (!@%$#^&~`*()).')

        browser.end();
    }, 

    'Join Community - Log In: verify invalid email/password combination': function(browser) {      
        var communityJoin = browser.page.communityJoin();
        var communityLogIn = communityJoin.section.logInForm;
        var communitySignUp = communityJoin.section.newUserForm;

        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .click('@formToggle')

        communityLogIn
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@logInForm').to.be.visible;

        communityLogIn.submit({
            email: 'nedstark@mailinator.com',
            password: 'weakpass' 
        });

        communityJoin
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Hmm, we couldn\'t log you in with that info. Give it another try.')

        browser.end();
    },

    'Join Community - Log In: verify already a member error': function(browser) {
        var communityJoin = browser.page.communityJoin();
        var communityLogIn = communityJoin.section.logInForm;
        var communitySignUp = communityJoin.section.newUserForm;

        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .click('@formToggle')

        communityLogIn
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@logInForm').to.be.visible;

        communityLogIn.submit({
            email: 'chimpautomation+tests@gmail.com',
            password: 'Qwerty1234!' 
        });

        communityJoin
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'You are already a member of')

        browser.end();
    },

    'Join Community - Log In: verify reseting password with valid email shows reset password alert ': function(browser) {
        var communityJoin = browser.page.communityJoin();
        var communityLogIn = communityJoin.section.logInForm;
        var communitySignUp = communityJoin.section.newUserForm;
        var modal = communityJoin.section.modal;

        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .click('@formToggle')

        communityLogIn
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@logInForm').to.be.visible;

        communityLogIn
            .verify.containsText('@forgotPassword', 'Forgot your password?')
            .click('@forgotPassword')

        modal
            .waitForElementPresent('@modalHeader')
            .verify.containsText('@modalTitle', 'Forgot your password?')
            .verify.elementPresent('@resetPwdForm')
            .verify.elementPresent('@resetPwdFormEmailField')
            .verify.elementPresent('@resetPwdFormSubmitBtn')
            .verify.elementPresent('@modalCloseButton')

            .setValue('@resetPwdFormEmailField', 'chimpautomation+tests@gmail.com')
            .click('@resetPwdFormSubmitBtn')
            .waitForElementVisible('@resetPwdSuccess')

            .waitForElementPresent('@resetPwdSuccess')
            .verify.elementPresent('@resetPwdSuccessHeading')
            .verify.elementPresent('@resetPwdSuccessMessage')
            .verify.elementPresent('@resetPwdSuccessCloseButton')

            .click('@resetPwdSuccessCloseButton')
            .verify.elementNotPresent('@modalHeader')

        browser.end();
    },

    'Join Community - Log In: verify invalid email in reset password form shows validation': function(browser) {
        var communityJoin = browser.page.communityJoin();
        var communityLogIn = communityJoin.section.logInForm;
        var communitySignUp = communityJoin.section.newUserForm;
        var modal = communityJoin.section.modal;

        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .click('@formToggle')

        communityLogIn
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@logInForm').to.be.visible;

        communityLogIn
            .verify.containsText('@forgotPassword', 'Forgot your password?')
            .click('@forgotPassword')

        modal
            .waitForElementPresent('@modalHeader')
            .verify.containsText('@modalTitle', 'Forgot your password?')
            .verify.elementPresent('@resetPwdForm')
            .verify.elementPresent('@resetPwdFormEmailField')
            .verify.elementPresent('@resetPwdFormSubmitBtn')
            .verify.elementPresent('@modalCloseButton')

            .setValue('@resetPwdFormEmailField', ' ')
            .click('@resetPwdFormSubmitBtn')
            .waitForElementVisible('@resetPwdFailureMessage')
            .verify.containsText('@resetPwdFailureMessage', 'should look like an email address.')

        browser.end();
    },

    'Join Community - Sign Up: verify new user can sign up with valid information': function(browser) {        
        var communityJoin = browser.page.communityJoin();
        var email = browser.globals.testUtils.generateEmail();

        communityJoin.expect.section('@newUserForm').to.be.visible;

        var communitySignUp = communityJoin.section.newUserForm;

        communitySignUp.register({
            firstName: 'Ned',
            lastName: 'Stark',
            email: email,
            password: 'Qwerty1234!' 
        });

        communityJoin
            .waitForElementVisible('@alertSuccess')
            .verify.containsText('@alertSuccess', 'Success! One more thing...')

        browser.end();
    }, 

    'Join Community - Sign Up: verify existing user can sign up': function(browser) {   
    // this test relies on the new user activation debug tools available on a staging 
    // environment it should not be run against production and will fail if you turn 
    // off the activation debug link     
        var communityJoin = browser.page.communityJoin();
        var email = browser.globals.testUtils.generateEmail();
        var communityLogIn = communityJoin.section.logInForm;
        var communitySignUp = communityJoin.section.newUserForm;
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;
        var dashboard = browser.page.dashboard();
        
        signup
            .navigate();

        signup.expect.section('@signUpForm').to.be.visible;

        signUpForm
            .submit({
                firstName: 'Existing', 
                lastName: 'User', 
                email: email, 
                password: 'Qwerty1234!'
            });

        signup
            .submitForm('@form')
            .waitForElementVisible('.qa-signup-success')
            .click('.qa-signup-success a');

        var home = browser.page.home();
        var body = home.section.body;
        var modal = body.section.welcomeModal;

        modal
            .waitForElementVisible('@slideOneDescription');

        communityJoin
            .navigate('30-day-adventures')
            .waitForElementVisible('@joinPage');

        communityJoin.expect.section('@newUserForm').to.be.visible;

        communityJoin
            .click('@formToggle')

        communityLogIn
            .waitForElementVisible('@emailField')

        communityJoin.expect.section('@logInForm').to.be.visible;

        communityLogIn.submit({
            email: email,
            password: 'Qwerty1234!' 
        });

        //assumption is that if the user is redirected to the dashboard, the join
        //was successful.
        dashboard
            .waitForElementPresent('@accountNav');
            
        browser.end();
    }, 

}
