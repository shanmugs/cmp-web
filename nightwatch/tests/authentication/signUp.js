module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'gemini'],
    'setUp': function(browser) {
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;
        
        signup
            .navigate();

        signup.expect.section('@signUpForm').to.be.visible;
        
    },


    'Verify sign up page elements present': function(browser) {
    	var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;
        
        signUpForm
            .waitForElementVisible( '@emailField' )
            .verify.elementPresent( '@passwordField' )
            .verify.elementPresent( '@passwordHint' )
            .verify.elementPresent( '@firstNameField' )
            .verify.elementPresent( '@lastNameField' )
            .verify.elementPresent( '@submit' )
            .verify.elementPresent( '@agreement' )
            .verify.elementPresent( '@loginLink' )
            
        browser.end();

    },

    'Verify error is thrown for in-use email': function(browser) {
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;

        signUpForm
            .submit({
                firstName: 'Automation', 
                lastName: 'Tester', 
                email: 'chimpautomation+tests@gmail.com', 
                password: 'Qwerty1234!'
            });

        signup
            .submitForm('@form');

        signUpForm
            .waitForElementVisible('@emailError')
            .verify.containsText('@emailError', 'has already been taken');
        
        browser.end();
    },

//legitimate fails due to CT-3661
    'Verify error is thrown for invalid email': function(browser) {
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;

        signUpForm
            .submit({
                firstName: 'Automation', 
                lastName: 'Tester', 
                email: 'chimpautomation', 
                password: 'Qwerty1234!'
            });

        signup
            .submitForm('@form');

        signUpForm
            .waitForElementVisible('@emailError')
            .verify.containsText('@emailError', 'should look like an email');
        
        browser.end();
    },


    'Verify error is thrown for invalid password': function(browser) {
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;

        signUpForm
            .submit({
                firstName: 'Automation', 
                lastName: 'Tester', 
                email: 'chimpautomation+1@gmail.com', 
                password: 'qwerty1234'
            });

        signup
            .submitForm('@form');
            
        signUpForm
            .waitForElementVisible('@passwordError')
            .verify.containsText('@passwordError', 'Please provide a password that is at least 8 characters and contains a lower case letter, an upper case letter, a digit and a special character (!@%$#^&~`*()).')
            .verify.elementNotPresent('@passwordHint');
        browser.end();
    },

    'Verify error is thrown for blank form fields': function(browser) {
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;

        signUpForm
            .submit({
                firstName: ' ', 
                lastName: ' ', 
                email: ' ', 
                password: ' '
            });

        signup
            .submitForm('@form');
            
        signUpForm
            .waitForElementVisible('@passwordError')
            .verify.containsText('@passwordError', 'can\'t be blank')
            .verify.containsText('@emailError', 'can\'t be blank')
            .verify.containsText('@firstNameFieldError', 'can\'t be blank')
            .verify.containsText('@lastNameFieldError', 'can\'t be blank')
            .verify.elementNotPresent('@passwordHint');
        browser.end();
    },

    'Verify user can successfully create an account': function(browser) {
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;
        var email = browser.globals.testUtils.generateEmail();

        signUpForm
            .submit({
                firstName: 'test', 
                lastName: 'automation', 
                email: email, 
                password: 'Qwerty1234!'
            });
            
        signup
            .submitForm('@form');
        
        signUpForm
            .waitForElementVisible('.qa-signup-success');
        browser.end();
    },




};
