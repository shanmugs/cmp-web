var appSections = require('./global/appSections');
var modal = require('./global/modal');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}
module.exports = {
    url: function() {
        var testState = this.api.globals.getAppTestState(this.api.globals.env);
        var defaultToken = testState.p2pClaim.token;
        return function test(token){
            token = token || defaultToken;
            return this.api.launchUrl + `claim/gift/${token}`;
        }.bind(this);
    },
    sections: sections,
    commands: [{
        navigate: function(p2pToken){
            this.api.url(this.url(p2pToken));
            return this;
        }
    }],
    elements: {
        pageContainer: '.v-p2p-invite',
        formToggle: '.qa-form-toggle',
        introText: '.qa-p2p-intro-text',
        chimpFeatures: '.c-chimp-features',
        chatCallout: '.c-callout-avatar',
        chatCalloutAvatar: '.c-callout-avatar__avatar'

    }
};

sections.banner = {
    selector: '.c-configurable-header',
    elements: {
        p2pLandingText: '.c-callout-avatar__content',
        p2pAvatar: '.c-callout-avatar__avatar'
    }
};

sections.registrationForm = {
    selector: '.c-sign-up-form',
    commands: [{
        register: function(values) {
            // set all our variables of the keys we don't expect aren't passed
            // then set that value to null.
            var firstName = values.firstName || null;
            var lastName = values.lastName || null;
            var email = values.email || null;
            var password = values.password || null;

            // set the Text fields first
            this
                .verify.elementPresent( '@firstNameField' )
                .verify.elementPresent( '@lastNameField' )
                .verify.elementPresent( '@emailField' )
                .verify.elementPresent( '@passwordField' )
                .verify.elementPresent( '@accountAgreement' )
                .verify.elementPresent( '@createAccountBtn' );

            // Only clear and reset fields if a value was passed in the arguments
            // If those values are null, the command will leave the field with the same
            // value it started with
            if (firstName){
                this.clearValue('@firstNameField')
                    .setValue('@firstNameField', firstName);
            }

            if (lastName){
                this.clearValue('@lastNameField')
                    .setValue('@lastNameField', lastName);
            }

            if (email){
                this.clearValue('@emailField')
                    .setValue('@emailField', email);
            }

            if (password){
                this.clearValue('@passwordField')
                    .setValue('@passwordField', password);
            }

            this.api.pause(1000);
            this
                .verify.elementPresent('@createAccountBtn')
                .click('@createAccountBtn');

            return this;
        }
    }],
    elements: {
        fieldError: '.c-form-errors__message',
        firstNameField: '[name="user[first_name]"]',
        firstNameError: '[name="user[first_name]"] + .qa-form-errors',
        lastNameField: '[name="user[last_name]"]',
        lastNameError: '[name="user[last_name]"] + .qa-form-errors',
        emailField: '[name="user[email]"]',
        passwordField: '[name="user[password]"',
        passwordError: '[name="user[password]"] + .qa-form-errors',
        accountAgreement: '[href="/chimp-account-agreement"]',
        createAccountBtn: '.c-sign-up-form > form > button'
    }
};

sections.logInForm = {
    selector: '.c-login-form',
    commands: [{
        submit: function(values) {
            // set all our variables of the keys we don't expect aren't passed
            // then set that value to null.
            var email = values.email || null;
            var password = values.password || null;

            // set the Text fields first
            this
                .verify.elementPresent( '@emailField' )
                .verify.elementPresent( '@passwordField' )
                .verify.elementPresent( '@forgotPassword' )
                .verify.elementPresent( '@logInFormSubmit' );

            // Only clear and reset fields if a value was passed in the arguments
            // If those values are null, the command will leave the field with the same
            // value it started with

            if (email){
                this.clearValue('@emailField')
                    .setValue('@emailField', email);
            }

            if (password){
                this.clearValue('@passwordField')
                    .setValue('@passwordField', password);
            }

            this.api.pause(1000);
            this
                .verify.elementPresent('@logInFormSubmit')
                .click('@logInFormSubmit');

            return this;
        }
    }],
    elements: {
        alertSuccess: '.flash-container.alert.success',
        formErrors: '.c-form-errors__message',
        emailField: '[name="login"]',
        passwordField: '[name="password"]',
        forgotPassword: '.qa-reset-pwd-link',
        logInFormSubmit: '.c-login-form > form > button',
        signUpSuccess: '.qa-signup-success'
    }
}
