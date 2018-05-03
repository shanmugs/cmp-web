var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

module.exports = {
    url: function test(companyName){
        var defaultCommunityName = 'absolute';
            var companyName = companyName || defaultCommunityName;
            return this.api.launchUrl + `companies/${companyName}`;
    },
    sections: sections,
    commands: [{
        navigate: function(companyName){
            this.api.url(this.url(companyName));
            return this;
        }
    }],
    elements: {
        adminButtons: '.corp-admin-buttons',
        successFlashMessage: '.flash-container.alert.success'
    }
}
