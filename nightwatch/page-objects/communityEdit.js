var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

sections.editForm = {
    selector: '.settings-basics form',
    commands: [{
        submit: function(values) {
            var self = this;
            this.api.perform(function (client, done) {
                // set all our variables of the keys we don't expect aren't passed
                // then set that value to null.
                var displayName = values.displayName || null;
                var phone = values.phone || null;
                var fiscalMonth = values.fiscalMonth || null;
                var context = values.context || null;
                var fiscalDay = values.fiscalDay || null;

                // set the Text fields first
                self
                    .verify.elementPresent( '@displayNameField' )
                    .verify.elementPresent( '@phoneField' )
                    .verify.elementPresent( '@fiscalMonth' )
                    .verify.elementPresent( '@contextSelect' )
                    .verify.elementPresent( '@fiscalDay' );

                // Only clear and reset fields if a value was passed in the arguments
                // If those values are null, the command will leave the field with the same
                // value it started with
                if (displayName){
                    self.clearValue('@displayNameField')
                        .setValue('@displayNameField', displayName)
                }

                if (phone){
                    self.clearValue('@phoneField')
                        .setValue('@phoneField', phone);
                }
                
                if (context) {
                    self.selectOptionByText(self.elements.contextSelect.selector, context, function(){
                        // Callbacks to report to the runner what's happening
                        console.log('updated context to: ' + context)
                    })
                }

                if (fiscalMonth) {
                    self.selectOptionByText(self.elements.fiscalMonth.selector, fiscalMonth, function(){
                        // Callbacks to report to the runner what's happening
                        console.log('updated Fiscal Month to:' + fiscalMonth)
                    })
                }

                if (fiscalDay) {
                    self.selectOptionByText(self.elements.fiscalDay.selector, fiscalDay, function(){
                        // Callbacks to report to the runner what's happening
                        console.log('updated Fiscal Day to:' +fiscalDay)
                    })
                }
                done();
            });
            this
                .verify.elementPresent('@saveBtn')
                .triggerTouch('@saveBtn');

            return this;     
        }
    }],
    elements: {
        alertSuccess: '.flash-container.alert.success',
        fieldError: '.alert.error',
        communityName: 'h5',
        communityNamelabel: {
          selector: '//label[text()="Company Name"]',
          locateStrategy: 'xpath'
        },
        communityNameEdit: '[href="mailto:hello@chimp.net?subject=[Company Name Change Request]"]',
        displayNamelabel: {
          selector: '//label[text()="Display Name"]',
          locateStrategy: 'xpath'
        },
        displayNameField: '[name="company[display_name]"]',
        displayNameToolTip: '[for="company_display_name"] + b .chart-help-text',
        phoneField: '[name="company[phone]"]',
        contextLabel: 'label[for="company_community_type"]',
        contextSelect: '[name="company[community_type]"]',
        fiscalMonth: '[name="company[fiscal_year_end(2i)]"]',
        fiscalDay: '[name="company[fiscal_year_end(3i)]"]',
        saveBtn: 'button'
    }
};

sections.logoForm = {
    selector: '.settings-avatar',
    elements: {
        form: '#company-upload-area form',
        fileField: '[name="company[logo]"]',
        browseButton: '#company-image-select-button',
    }
};

sections.bannerForm = {
    selector: '.community-settings-banner',
    elements: {
        form: '#community-banner-upload-area form',
        fileField: '[name="company[banner]"]',
        browseButton: '#community-banner-image-select-button',
    }
};


module.exports = {
url: function(companyName) {
        var defaultCommunityName = 'absolute';
        var companyName = companyName || defaultCommunityName;
        return `${this.api.launchUrl}companies/${companyName}/edit`;
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
