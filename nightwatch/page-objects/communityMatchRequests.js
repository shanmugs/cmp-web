var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}
sections.requestsForm = {
    selector: '#new_transfer_details',
    sections: {
        firstMatch: createRequestRowSection(1),
        secondMatch: createRequestRowSection(2)
    },
    commands: [{
        approveSelectedMatches: function() {
            this
                .verify.elementPresent('@confirmMatchesButton')
                .triggerTouch('@confirmMatchesButton');
            return this;
        },
        declineSelectedMatches: function() {
            this
                .verify.elementPresent('@declineMatchesButton')
                .triggerTouch('@declineMatchesButton');
            return this;
        }
    }],
    elements: {
        heading: 'h2',
        confirmMatchesButton: '[value="match"]',
        declineMatchesButton: '[value="decline"]',
        selectAllMatches: 'a.select-all'
    }
}

module.exports = {
    url: function test(companyName){
        var defaultCommunityName = 'shady-potatoes';
            var companyName = companyName || defaultCommunityName;
            return this.api.launchUrl + `companies/${companyName}/match-requests/new`;
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
        leftNavigation: '.tabs-left',
        changePolicyLink: '[rel="set-policy"]',
        confirmRequestsButton: '[name="transfer_confirm[confirmed]"]'
    }
}

// creates one section per call that can be attached to the main page object. Just an easy way
// to deduplicate identical logic for each table row.
// index is 1 based
function createRequestRowSection(index) {
    return {
        selector: 'table tbody tr:nth-of-type(' + index + ')',
    }
}
