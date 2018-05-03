var appSections = require('./global/appSections');
var sections = appSections;

module.exports = {
    url: function test(groupName) {
        var defaultGroupName = 'triathlon-for-a-cause';
        var groupName = groupName || defaultGroupName;
        return this.api.launchUrl + `groups/${groupName}`;
    },
    sections: sections,
    commands: [{
        navigate: function(groupName){
            this.api.url(this.url(groupName));
            return this;
        },

        joinTheGroup: function(){
            var pageObject = this;
            var joinGroupSel = (this.elements.joinGroup.selector);
            // This checks the page for the presence of the Join Group button
            // Used in the case where the test requires that the user is a member of the group
            // In the case they for some reason aren't a member, this will join the group
            this.api.element('css selector', joinGroupSel, function(result){
                if (result.value && result.value.ELEMENT) {
                    // If the Join Group button is present, click it, wait for the page to reload
                    // Then check that the button is now the Give To This Group button
                    pageObject
                        .triggerTouch('@joinGroup')
                        .waitForElementVisible('@giveToGroup')
                }
            });
            return this;
        }
    }],
    elements: {
        groupAdminButtons: '.corp-admin-buttons',

        groupLogo: 'img[src*="chimp-icon-giving-group"]',
        joinGroup: 'button[data-link*="/join"]',
        giveToGroup: '#give-to-group-button',

        feedBox: '#feed',
        aboutTab: 'a[href*="/about"]',
        activityTab: 'a[href*="/comments"]',
        moneyTab: 'a[href*="/money"]',
        membersTab: 'a[href*="/members"]',
        commentBox: 'input[id="comment"]',
        addComment: 'button[type="submit"].main-search',
        commentSpan: 'div.activity-inner-wrap > p > span > span',

        facebookShare: 'a.groups-facebook-icon',
        twitterShare: 'a.groups-twitter-icon',
        mailGroupShare: 'a.groups-mail-icon',
        groupUrl: '.group-short-url',
        giveFromGroup: 'button#group-allocate-money',

        helpSidebar: '#sidebar-help.module',
    }
}
