var appSections = require('./global/appSections');
var sections = appSections;
// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}


sections.signUpForm = {
    selector: '.c-sign-up-form',
    commands: [{
        submit: function (values) {
            var firstName = values.firstName || null;
            var lastName = values.lastName || null;
            var email = values.email || null;
            var password = values.password || null;
            
            this
                .verify.elementPresent( '@emailField' )
                .verify.elementPresent( '@passwordField' )
                .verify.elementPresent( '@firstNameField' )
                .verify.elementPresent( '@lastNameField' )

            if (firstName){
                this.clearValue('@firstNameField')
                    .setValue('@firstNameField', firstName)
            }

            if (lastName){
                this.clearValue('@lastNameField')
                    .setValue('@lastNameField', lastName);
            }
            
            if (email) {
                this.clearValue('@emailField')
                    .setValue('@emailField', email);
            }

            if (password) {
                this.clearValue('@passwordField')
                    .setValue('@passwordField', password);
            }

            //let setValue finish adding text:
            this.api.pause(100);
                
            return this;
        }
    }],

    elements: {
        firstNameField: 'input[name="user[first_name]"]',
        firstNameFieldError: 'input[name="user[first_name]"] + .qa-form-errors',
        lastNameField: 'input[name="user[last_name]"]',
        lastNameFieldError: 'input[name="user[last_name]"] + .qa-form-errors',
        emailField: 'input[name="user[email]"]',
        emailError: 'input[name="user[email]"] + .qa-form-errors',
        passwordField: 'input[name="user[password]"]',
        passwordError: 'input[name="user[password]"] + .qa-form-errors',
        passwordHint: '.c-alert.u-margin-bottom-xlg.c--info',
        agreement: '[href="/chimp-account-agreement"]',
        submit: 'button[type="submit"]',
        loginLink: '.qa-form-toggle',
        success: '.qa-signup-success',

    }
};

module.exports = {
    url: function() {
        return this.api.launchUrl + 'users/new';
    },
    sections: sections,
    commands: [{
         }],
    elements: {
       form: 'form',

    }
};

