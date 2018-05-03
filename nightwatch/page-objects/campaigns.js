var appSections = require('./global/appSections');
var sections = appSections;

module.exports = {
    url: function test(campaignName){
        var defaultCampaignName = 'pink-shirt-day';
            var campaignName = campaignName || defaultCampaignName;
            return this.api.launchUrl + `groups/${campaignName}`;
    },
    sections: sections,
    commands: [{
        navigate: function(campaignName){
            this.api.url(this.url(campaignName));
            return this;
        }
    }],
    elements: {
        helpSidebar: '#sidebar-help.module',
        helpPhoneNumber: '#sidebar-help > div > div > p > strong',
    }
   }
