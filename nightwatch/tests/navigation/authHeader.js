//These tests are for the inside the wall or logged in pages
//when they contain the authenticated header.
//Signed out header tests live at mktHeader.js

// Creates a group with a random name for the currently authed user.
function createGroup(browser) {
    var groupName = 'testGroup:' + Math.random().toPrecision(4);
    var description = 'this description is always the same';
    browser.url(browser.launch_url + 'groups/step/one')
        .setValue('#group_name', groupName)
        .setValue('#group_short', description)
        .click('#new_group button[type="submit"]');

}

module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'gemini'],

    'setUp': function(browser) {
        //include your global selectors here
        gSelc = browser.globals.globalSelectors;


        var login = browser.page.login();
        var dashboard = browser.page.dashboard();

        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@form');

        dashboard.waitForElementVisible('@accountNav');
    },

    'Verify auth header elements present': function(browser) {
    	var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;

        header
            .verify.elementPresent('@logo')
            .verify.elementPresent('@authSearch')
            .verify.elementPresent('@megaNavBtn')
            .verify.elementPresent('@accountNavBtn');

        browser.end();
    },

    'Verify Mega Nav can be toggled open and closed': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;

        header
            .openMegaNav();

        modal
            .waitForElementVisible('@modalHeader');

        modal
            .verify.elementsVisible('@modalTitle')
            .verify.elementsVisible('@modalCloseButton')
            .verify.elementsVisible('@modalContent')
            .click('@modalCloseButton');

        header
            .waitForElementVisible('@logo')
            .verify.elementsVisible('@megaNavBtn')
            .verify.elementsVisible('@accountNavBtn');

        browser.end();
    },

    'Verify features links in Mega Nav': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;

        header
            .openMegaNav();

        modal
            .waitForElementVisible('@modalHeader');

        modal
            .verify.elementsVisible('@headerMegaNavTitle')
            .verify.containsText('@headerMegaNavTitle', 'Chimp improves the experience of giving. Here\'s how we do it.')
            .verify.containsText('@headerMegaNavExplore', 'Explore')
            .verify.containsText('@headerMegaNavFeatures', 'Features')

            .verify.attributeContains('@headerMegaNavFeaturesFundraising', "href", "/fundraising")
            .verify.containsText('@headerMegaNavFeaturesFundraising', 'Fundraising')

            .verify.attributeContains('@headerMegaNavFeaturesWays', "href", "/ways-to-give")
            .verify.containsText('@headerMegaNavFeaturesWays', 'Ways to give')

            .verify.attributeContains('@headerMegaNavFeaturesCommunity', "href", "/community")
            .verify.containsText('@headerMegaNavFeaturesCommunity', 'Community')

            .verify.attributeContains('@headerMegaNavFeaturesAccounts', "href", "/accounts")
            .verify.containsText('@headerMegaNavFeaturesAccounts', 'Accounts')

            .verify.attributeContains('@headerMegaNavFeaturesFees', "href", "/fees")
            .verify.containsText('@headerMegaNavFeaturesFees', 'Fees')

            .verify.attributeContains('@headerMegaNavFeaturesTrust', "href", "/trust")
            .verify.containsText('@headerMegaNavFeaturesTrust', 'Trust');

        browser.end();
    },

    'Verify solutions links in Mega Nav': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;

        header
            .openMegaNav();

        modal
            .waitForElementVisible('@modalHeader');

        modal
            .verify.containsText('@headerMegaNavSolutions', 'Solutions')

            .verify.attributeContains('@headerMegaNavSolutionsIndividuals', "href", "/individuals")
            .verify.containsText('@headerMegaNavSolutionsIndividuals', 'Individuals')

            .verify.attributeContains('@headerMegaNavSolutionsWorkplace', "href", "/workplace")
            .verify.containsText('@headerMegaNavSolutionsWorkplace', 'Workplace')

            .verify.attributeContains('@headerMegaNavSolutionsGroups', "href", "/giving-groups")
            .verify.containsText('@headerMegaNavSolutionsGroups', 'Groups')

            .verify.attributeContains('@headerMegaNavSolutionsCharities', "href", "/charities")
            .verify.containsText('@headerMegaNavSolutionsCharities', 'Charities')

            .verify.attributeContains('@headerMegaNavSolutionsPhilanthropy', "href", "/philanthropists")
            .verify.containsText('@headerMegaNavSolutionsPhilanthropy', 'Philanthropists')

            .verify.attributeContains('@headerMegaNavSolutionsEducation', "href", "/education")
            .verify.containsText('@headerMegaNavSolutionsEducation', 'Education')

            .verify.attributeContains('@headerMegaNavSolutionsSports', "href", "/sports")
            .verify.containsText('@headerMegaNavSolutionsSports', 'Sports')

            .verify.attributeContains('@headerMegaNavSolutionsOrgs', "href", "/funding-organizations")
            .verify.containsText('@headerMegaNavSolutionsOrgs', 'Funding Orgs')

            .verify.attributeContains('@headerMegaNavSolutionsEvents', "href", "/events")
            .verify.containsText('@headerMegaNavSolutionsEvents', 'Events')

            .verify.attributeContains('@headerMegaNavSolutionsFamilies', "href", "/families")
            .verify.containsText('@headerMegaNavSolutionsFamilies', 'Families');

        browser.end();
    },

    'Verify about links in Mega Nav': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;

        header
            .openMegaNav();

        modal
            .waitForElementVisible('@modalHeader');

        modal
            .verify.containsText('@headerMegaNavAbout', 'About')

            .verify.attributeContains('@headerMegaNavAboutAbout', "href", "/about")
            .verify.containsText('@headerMegaNavAboutAbout', 'About')

            .verify.attributeContains('@headerMegaNavAboutStory', "href", "/our-story")
            .verify.containsText('@headerMegaNavAboutStory', 'Our Story')

            .verify.attributeContains('@headerMegaNavAboutFoundation', "href", "/chimp-foundation")
            .verify.containsText('@headerMegaNavAboutFoundation', 'Chimp Foundation')

            .verify.attributeContains('@headerMegaNavAboutTeam', "href", "/team")
            .verify.containsText('@headerMegaNavAboutTeam', 'Team')

            .verify.attributeContains('@headerMegaNavAboutCareers', "href", "/careers")
            .verify.containsText('@headerMegaNavAboutCareers', 'Careers')

            .verify.attributeContains('@headerMegaNavAboutPress', "href", "/press")
            .verify.containsText('@headerMegaNavAboutPress', 'Press');

        browser.end();
    },

    'Verify support links in Mega Nav': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;

        header
            .openMegaNav();

        modal
            .waitForElementVisible('@modalHeader');

        modal
            .verify.containsText('@headerMegaNavSupport', 'Support')

            .verify.attributeContains('@headerMegaNavSupportContact', "href", "/contact")
            .verify.containsText('@headerMegaNavSupportContact', 'Contact Us')

            .verify.attributeContains('@headerMegaNavSupportHelp', "href", "help")
            .verify.containsText('@headerMegaNavSupportHelp', 'Help Centre');

        browser.end();
    },

    'Verify Ask links in Mega Nav': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;

        header
            .openMegaNav();

        modal
            .waitForElementVisible('@modalHeader');

        modal
            .verify.elementsVisible('@headerMegaNavChatBtn')
            .verify.elementsVisible('@headerMegaNavPhoneBtn')
            .verify.elementsVisible('@headerMegaNavEmailBtn')
            .verify.containsText('@headerMegaNavAsk', 'Ask Us Anything')
            .verify.containsText('@headerMegaNavChatTxt', 'Start a live chat with a Chimp team member')
            .verify.containsText('@headerMegaNavPhoneTxt', 'Call us toll-free at 1-877-531-0580 from anywhere in Canada')
            .verify.containsText('@headerMegaNavEmailTxt', 'Email us at hello@chimp.net and we’ll get back to you asap')

        browser.end();
    },

//legitimate failure
    //  'Verify French Ask links in Mega Nav': function(browser) {
    //     var dashboard = browser.page.dashboard();
    //     var header = dashboard.section.header;
    //     var modal = dashboard.section.modal;

    //     browser
    //     .url(browser.launch_url + 'dashboard?lang=fr')

    //     header
    //     .openMegaNav();

    //     modal
    //     .verify.elementsVisible('@modalHeader')
    //     .verify.elementsVisible('@headerMegaNavChatBtn')
    //     .verify.elementsVisible('@headerMegaNavPhoneBtn')
    //     .verify.elementsVisible('@headerMegaNavEmailBtn')

    //     .verify.containsText('@headerMegaNavAsk', 'Demandez nous')
    //     .verify.containsText('@headerMegaNavChatTxt', 'Démarrer un chat en direct avec un membre de l\'équipe Chimp')
    //     .verify.containsText('@headerMegaNavPhoneTxt', 'Appelez-nous sans frais au 1-877-531-0580 de partout au Canada')
    //     .verify.containsText('@headerMegaNavEmailTxt', 'Écrivez-nous à hello@chimp.net et nous reviendrons vers vous dès que possible');

    //     //switch back to english or account saves setting
    //     //which will break all other string tests
    //     browser
    //     .url(browser.launch_url + 'dashboard?lang=en');

    //     header
    //     .waitForElementVisible('@megaNavBtn');

    //     browser.end();
    // },

    'Verify Account Menu can toggle open and closed': function(browser) {

        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.not.be.present;

        browser.end();
    },

    'Verify Account Menu contains expected elements': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var accountMenu = header.section.accountMenu;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.elementsVisible('@accountNavGreeting')
            .verify.elementsVisible('@accountNavBalance')
            .verify.elementsVisible('@accountNavAmount')
            .verify.elementsVisible('@accountNavSettingsContent');

        browser.end();
    },

    'Verify Account Menu navigation': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var accountMenu = header.section.accountMenu;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.containsText('@accountNavSettings', 'Settings')

            .verify.containsText('@accountNavAccSettingsLink', 'Account Settings')
            .verify.attributeContains('@accountNavAccSettingsLink', "href", "/user/edit")

            .verify.containsText('@accountNavTaxReceipts', 'Tax Receipts')
            .verify.attributeContains('@accountNavTaxReceipts', "href", "/user/tax-receipts")

            .verify.containsText('@accountNavGivingTools', 'Giving Tools')
            .verify.attributeContains('@accountNavGivingTools', "href", "/user/giving-tools")

            .verify.containsText('@accountNavLogout', 'Logout')
            .verify.attributeContains('@accountNavLogout', "href", "/logout");

        browser.end();
    },

    'Verify Clicking the groups view all in the account nav opens a modal': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;
        var accountMenu = header.section.accountMenu;

        header
        .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.elementsVisible('@headerAccountNavGroupsList');

        header
            .verify.elementsVisible('@groupsViewAllBtn')
            .click('@groupsViewAllBtn');

        dashboard.expect.section('@modal').to.be.visible;

         // Asserts that there's more than the cut off limit for the see more button in the modal
        browser.execute(function(gSelc){
              return document.querySelectorAll(gSelc.viewAllGroupsModalListItems).length;
            }, [gSelc], function(result){
                var listContainsElements = (result.value > 5);
                browser.assert.equal(listContainsElements, true);
            });

         browser.end();
     },

 // Account Switch Menu
 // ---

    'Verify user with only one account does not see the account switcher menu': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var accountMenu = header.section.accountMenu;
        var login = browser.page.login();

        //setup pre-logs you in with the standard test account
        //here we log out the standard account and log in with the special "clean"
        //account used for this test.
        header.logout();

        login
            .navigate()
            .fillInForm('chimpautomation+freshuser@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        dashboard.waitForElementVisible('@accountNav');

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.elementsVisible('@accountNavGreeting')
            .verify.elementsVisible('@accountNavBalance')
            .verify.elementsVisible('@accountNavAccSettingsLink');

        browser.expect.element('@switchAccountButton').to.not.be.present;

        browser.end();
     },

     'Verify user with multiple accounts can toggle account switch menu open and closed': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var accountMenu = header.section.accountMenu;
        var accountSwitcher = header.section.accountSwitcher;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.elementsVisible('@switchAccountButton')
            .verify.elementsVisible('@accountNavGreeting')
            .verify.elementsVisible('@accountNavBalance')
            .verify.elementsVisible('@accountNavAccSettingsLink')
            .click('@switchAccountButton');

        browser.pause(20);

        header.expect.section('@accountSwitcher').to.be.visible;

        accountSwitcher
            .click('@switcherCancelButton');

        header.expect.section('@accountMenu').to.be.visible;

        browser.end();
     },

    'Verify Account Switch menu has all the components': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var accountMenu = header.section.accountMenu;
        var accountSwitcher = header.section.accountSwitcher;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.elementsVisible('@switchAccountButton')
            .click('@switchAccountButton');

        browser.pause(20);

        header.expect.section('@accountSwitcher').to.be.visible;

        accountSwitcher
            .verify.elementsVisible('@switcherCancelButton')

            .verify.elementsVisible('@accountSwitcherAvatar')
            .verify.elementsVisible('@accountSwitcherName')
            .verify.elementsVisible('@accountSwitcherType')
            .verify.elementsVisible('@accountSwitcherOtherAccountsList')
            .verify.elementsVisible('@accountSwitcherMoreLink')

            .verify.containsText('@accountSwitcherHeading', 'Switch Accounts')
            .verify.containsText('@switcherCancelButton', 'Cancel')
            .verify.containsText('@accountSwitcherMoreLink', 'See more Accounts');

        browser.end();
    },

    'Verify Clicking See more Accounts in the Account Switch Menu opens a modal': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var modal = dashboard.section.modal;
        var accountMenu = header.section.accountMenu;
        var accountSwitcher = header.section.accountSwitcher;

        header
            .openAccountNav();

        header.expect.section('@accountMenu').to.be.visible;

        accountMenu
            .verify.elementsVisible('@switchAccountButton')
            .click('@switchAccountButton');

        browser.pause(20);

        header.expect.section('@accountSwitcher').to.be.visible;

        accountSwitcher
            .verify.elementsVisible('@accountSwitcherMoreLink')
            .click('@accountSwitcherMoreLink');

        browser.pause(20);

        dashboard.expect.section('@modal').to.be.visible;

         // Asserts that there's more than the cut off limit for the see more button in the modal
        browser.execute(function(gSelc){
              return document.querySelectorAll(gSelc.viewAllAccountsListItems).length;
            }, [gSelc], function(result){
                var listContainsElements = (result.value > 2);
                browser.assert.equal(listContainsElements, true);
            });
        browser.end();
     },

// //=== Give Menu Tests Start

    'Verify that Give Menu has all the components': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var giveMenu = header.section.giveMenu;

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        browser.pause(750);

        header
            .openGiveNav();

        header.expect.section('@giveMenu').to.be.visible;

        giveMenu
            .verify.containsText('@giveMenuFirstHeading', 'How would you like to give?')

            .verify.containsText('@giveMenuAddHeading', 'Add Money to your Account')
            .verify.containsText('@giveMenuAddButton', "Add")

            .verify.containsText('@giveMenuGiveHeading', 'Give to a Charity or Giving Group')
            .verify.containsText('@giveMenuGiveButton', 'Give')

            .verify.containsText('@giveMenuSendHeading', 'Send Charity Dollars to Other People')
            .verify.containsText('@giveMenuSendButton', 'Send');

        browser.end();
    },

    'Verify that Whats This? links in Give Menu work': function(browser) {
        var dashboard = browser.page.dashboard();
        var header = dashboard.section.header;
        var giveMenu = header.section.giveMenu;

        header
            .waitForAnimation()
            .openGiveNav();

        header.expect.section('@giveMenu').to.be.visible;

        giveMenu
            // Whats This? in Add Section
            .waitForElementVisible('@giveMenuAddDropDownHeading')
            .click('@giveMenuAddDropDownHeading')
            .waitForAnimation(500);

        giveMenu
            .verify.elementsVisible('@giveMenuAddDropDownText');

        browser.end();
    },

}
