var appSections = require('./global/appSections');
var sections = appSections;
// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}


module.exports = {
    url: function() {
        return this.api.launchUrl + 'login';
    },
    sections: sections,
    commands: [{
        fillInForm: function (userName, password) {
            // Filling in the form elements pulled into an anonmyous function to deduplcate the 
            // code
            var fillOutForm = function(pageObject){
                pageObject
                    .verify.elementPresent( '@passwordField' )
                    .verify.elementPresent( '@loginField' )
                    .clearValue('@passwordField')
                    .clearValue('@loginField')
                    .setValue('@loginField', userName)
                    .setValue('@passwordField', password);

                //let setValue finish adding text:
                pageObject.api.pause(10);
            }

            var pageObject = this;
            var forgotLinkSel = (this.elements.forgetLink.selector);
            // Our Login page will autocomplete the email address of the login page if multiple 
            // users login in the same session, which makes the command fail if run in this 
            // scenario. The following code, checks for the presence of the link and clicks it,
            // resetting to the normal login form and continues entering the details like normal
            this.api.element('css selector', forgotLinkSel, function(result){
                if (result.value && result.value.ELEMENT) {
                    // If the links's present, click it, wait for the page to reload and fill in 
                    // as usual
                    pageObject
                        .triggerTouch('@forgetLink')
                        .waitForElementVisible('@form')
                    
                    fillOutForm(pageObject)
                } else {
                    // the link's not there, so just fill it in like normal
                    fillOutForm(pageObject);
                }
            });
            
            return this;
            // All commands should return 'this' object so tests are chainable.
        },

    }],
    elements: {
        form: '#login_form',
        loginField: 'input[name="login"]',
        passwordField: 'input[name="password"]',
        submit: 'button[type="submit"]',
        logInForgot: '#login_form .forgot-link-login',
        logInSidebar: '.sidebar',
        logInSidebarBtn: '.sidebar button[data-link="/users/new"]',
        logInError: '.flash-container.error',
        logInErrorMsg: '.flash-msg-body',
        logInErrorClose: '.flash-container .alert-hide',
        forgetLink: '.not-you',
        loginForm: '#login_form',

    }
}
