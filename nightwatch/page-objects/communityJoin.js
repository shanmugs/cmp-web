var appSections = require('./global/appSections');
var modal = require('./global/modal');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

module.exports = {
    url: function test(communityName){
            communityName = communityName || defaultCommunityName;
            return this.api.launchUrl + `companies/${communityName}/join`;
    },
    sections: sections,
    commands: [{
        navigate: function(communityName){
            this.api.url(this.url(communityName));
            return this;
        }
    }],
    elements: {
        fieldError: '.c-form-errors__message',
        alertSuccess: '.qa-signup-success',
        joinPage: '.v-community-join',
        formToggle: '.qa-form-toggle',
        communityBanner: '.c-configurable-header',
        communityTitle: '.c-configurable-header__title',
        communityLandingText: '.c-callout-avatar__content',
        communityAvatar: '.c-callout-avatar__avatar',
        communityBenefitsCards: '.c-community-benefits',
        communityIncentiveText: '.c-community-incentive',
        chimpFeatures: '.c-chimp-features',
        chatCallout: '.c-callout-avatar',
        chatCalloutAvatar: '.c-callout-avatar__avatar',

    }
};

sections.newUserForm = {
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
        firstNameField: '[name="user[first_name]"]',
        lastNameField: '[name="user[last_name]"]',
        emailField: '[name="user[email]"]',
        passwordField: '[name="user[password]"',
        accountAgreement: '.c-sign-up-form > form > p > a',
        createAccountBtn: '.c-sign-up-form > form > button',
        fieldError: '.c-form-errors__message',
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
        emailField: '[name="login"]',
        passwordField: '[name="password"]',
        forgotPassword: '.qa-reset-pwd-link',
        logInFormSubmit: '.c-login-form > form > button',
        signUpSuccess: '.qa-signup-success'
    }
}
