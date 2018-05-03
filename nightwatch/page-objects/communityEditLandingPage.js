var appSections = require('./global/appSections');
var sections = appSections;
var path = require('path');

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

sections.domainForm = {
    selector: '#email_domain_settings_form',
    commands: [{
        submit: function(emails) {
            client.perform(function (client) {
                var emailsArr = emails || [];
                // set all our variables of the keys we don't expect aren't passed
                // then set that value to null.

                // set the Text fields first
                this
                    .verify.elementPresent( '@domainsField' )

                // Only clear and reset fields if a value was passed in the arguments
                // If those values are null, the command will leave the field with the same
                // value it started with
                if (emailsArr.length > 0){
                    this.clearValue('@domainsField')
                        .setValue('@domainsField', emailsArr.join(', '))
                };
                this
                    .waitForElementVisible('@saveBtn')
                    .triggerTouch('@saveBtn');

                return this;
                done();
        });
        },
        toggleAllowedDomains: function(){
            this
                .triggerTouch('@allowDomainsCheckbox')
                .triggerTouch('@saveBtn')
        }
    }],
    elements: {
        domainsField: '[name="company[email_domains]"]',
        allowDomainsCheckbox: '#allow_all_email_domains',
        saveBtn: '#save_email_domain_settings_button',
    }
};

sections.emailDomainConfirmationModal = {
    selector: '#modal-confirm-container',
    elements: {
        modal: '#modal-confirm',
        confirmButton: 'med danger',
    }
};

module.exports = {
url: function(companyName) {
        var defaultCommunityName = 'absolute';
        var companyName = companyName || defaultCommunityName;
        return this.api.launchUrl + `companies/${companyName}/landing_page_settings`;
    },
    sections: sections,
    commands: [{
        navigate: function(companyName){
            this.api.url(this.url(companyName));
            return this;
        }
    }],
    elements: {
        leftNavigation: '.tabs-left',
    }
}
