module.exports = {
'@tags': ['critical-prod', 'critical-stage', 'gemini'],

    'setUp': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .waitForElementVisible('@form');
    },

    'Verify login page elements present': function(browser) {
    	var login = browser.page.login();
        
        login.expect.section('@header').to.be.visible;
        login.expect.section('@footer').to.be.visible;

        login
            .verify.elementPresent('@form')
            .verify.elementPresent('@loginField')
            .verify.elementPresent('@passwordField')
            .verify.elementPresent('@submit');
            
        browser.end();
    },

    'Verify user can log in with valid credentials': function(browser) {

        var login = browser.page.login();
        var header = login.section.header;
        var dashboard = browser.page.dashboard();

        login
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');
            
        dashboard.waitForElementVisible('@accountNav');

        header.logout();
        
        browser.end();
    },

    'Verify error is thrown with invalid credentials': function(browser) {
    	var login = browser.page.login();

        login
            .fillInForm('chimpautomation+tests@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')
            .verify.elementPresent( '@logInError' )
            .verify.elementPresent( '@logInErrorClose' )
            .verify.elementPresent( '@logInErrorMsg' );

        browser.end();
    },

    'Verify lockout is reset after successful login': function(browser) {
		var login = browser.page.login();
        var dashboard = browser.page.dashboard();
        var dashHeader = dashboard.section.header;

        login
            //first failed attempt
            .fillInForm('chimpautomation+tests@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
        
            //second failed attempt
            .fillInForm('chimpautomation+tests@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
        
            //third failed attempt
            .fillInForm('chimpautomation+tests@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
             
            //fourth attempt good password
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm')
        
        dashboard.waitForElementVisible('@accountNav');
        
        dashHeader
            .logout()
            .triggerTouch('@logInHeaderButton');

        login
            .navigate()
            .waitForElementVisible('@loginForm')
            
            // Fourth Failed attempt
            .fillInForm('chimpautomation+tests@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
        
            // Fifth Failed attempt
            .fillInForm('chimpautomation+tests@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
        
            // Sixth Attempt good password
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm')

        dashboard.waitForElementVisible('@accountNav');

        browser.end();
    },

    'Verify user is locked out after 5 failed attempts': function(browser) {
        var login = browser.page.login();
        var dashboard = browser.page.dashboard();
        var dashHeader = dashboard.section.header;

        login
            //first failed attempt
            .fillInForm('chimpautomation+locked@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')

            //second failed attempt
            .fillInForm('chimpautomation+locked@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')

            //third failed attempt
            .fillInForm('chimpautomation+locked@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')
            
            //fourth failed attempt
            .fillInForm('chimpautomation+locked@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')
        
            // Fifth Failed attempt
            .fillInForm('chimpautomation+locked@gmail.com', 'notrealpassword')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')
        
            // Sixth Attempt good password
            .fillInForm('chimpautomation+locked@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm')
            .waitForElementVisible('@logInError')
            .verify.elementPresent('@logInError')
            .verify.elementPresent('@logInErrorClose')
            .verify.elementPresent('@logInErrorMsg');


        browser.end();
    }

};
