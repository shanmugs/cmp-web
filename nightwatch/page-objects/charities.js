var appSections = require('./global/appSections');
var sections = appSections;

module.exports = {
    url: function test(charityName){
        // Since we can't pass variables to the default url Method return a function to that takes
        // a company name to edit.
        // (nightwatch seems to eval the this.url on start up or something ¯\_(ツ)_/¯)
        var defaultCharityName = 'the-canadian-red-cross-society-la-societe-canadienne-de-la-croix-rouge';
            var charityName = charityName || defaultCharityName;
            return this.api.launchUrl + `charities/${charityName}`;
    },
    sections: sections,
    commands: [{
        navigate: function(charityName){
            this.api.url(this.url(charityName));
            return this;
        }
    }],
    elements: {
        helpSidebar: '#sidebar-help.module',
    }
   }
