module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'gemini'],
    'setUp': function(browser) {
        var home = browser.page.home();

        home
            .navigate()
            .waitForElementVisible( '@heroVideo' );
    },

    'Verify header top level navigation': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;

        header
            .assert.containsText('@featuresNavItem', 'Features')
            .assert.containsText('@solutionsNavItem', 'Solutions')
            .assert.containsText('@aboutNavItem', 'About')
            .assert.containsText('@supportNavItem', 'Support')
            .triggerTouch('@featuresNavItem');

        browser.waitForAnimation();

        header.expect.section('@featuresDropdown').to.be.visible

        browser.end();
    },


    'Verify features secondary navigation': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;

        header.triggerTouch('@featuresNavItem');
        browser.waitForAnimation();
        header.expect.section('@featuresDropdown').to.be.visible

        var featuresDropdown = header.section.featuresDropdown;

        featuresDropdown
            .verify.elementsVisible('@fundraisingLink')
            .verify.elementsVisible('@communityLink')
            .verify.elementsVisible('@waysToGiveLink')
            .verify.elementsVisible('@AccountsLink')
            .verify.elementsVisible('@feesLink')
            .verify.elementsVisible('@trustLink');

        browser.end();
    },

    'Verify solutions secondary navigation': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;

        header.triggerTouch('@solutionsNavItem');
        browser.waitForAnimation();
        header.expect.section('@solutionsDropdown').to.be.visible

        var solutionsDropdown = header.section.solutionsDropdown;

        solutionsDropdown
            .verify.elementsVisible('@individualsLink')
            .verify.elementsVisible('@workplaceLink')
            .verify.elementsVisible('@givingGroupsLink')
            .verify.elementsVisible('@charitiesLink')
            .verify.elementsVisible('@philanthropistsLink')
            .verify.elementsVisible('@educationLink')
            .verify.elementsVisible('@sportsLink')
            .verify.elementsVisible('@fundingOrganizationLink')
            .verify.elementsVisible('@eventLink')
            .verify.elementsVisible('@familiesLink');

        browser.end();
    },

    'Verify about secondary navigation': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;

        header.triggerTouch('@aboutNavItem');
        browser.waitForAnimation();
        header.expect.section('@aboutDropdown').to.be.visible

        var aboutDropdown = header.section.aboutDropdown;

        aboutDropdown
            .verify.elementsVisible('@aboutLink')
            .verify.elementsVisible('@ourStoryLink')
            .verify.elementsVisible('@chimpFoundationLink')
            .verify.elementsVisible('@teamLink')
            .verify.elementsVisible('@careersLink')
            .verify.elementsVisible('@pressLink');

        browser.end();
    },

    'Verify support secondary navigation': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;

        header.triggerTouch('@supportNavItem');
        browser.waitForAnimation();
        header.expect.section('@supportDropdown').to.be.visible

        var supportDropdown = header.section.supportDropdown;

        supportDropdown
            .verify.elementsVisible('@contactLink')
            .verify.elementsVisible('@helpLink')

        browser.end();
    },

    // 'Verify Search navigates to search page': function(browser) {
    //     var home = browser.page.home();
    //     var header = home.section.header;
    //     var search = browser.page.search();

    //     header
    //         .verify.elementsVisible('@headerSearch')
    //         .verify.attributeContains('@headerSearch', "href", "search")
    //         .triggerTouch('@headerSearch');

    //     search
    //         .waitForElementVisible('@searchForm')

    //     browser.end();
    // },

    'Verify login button navigates to Log In page': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;
        var login = browser.page.login();


        header
            .verify.attributeContains('@logInHeaderButton', "href", "login")
            .triggerTouch('@logInHeaderButton');

        login.waitForElementVisible('@form')
            .verify.urlContains(login.url()); 

        browser.end();
    },

    'Verify sign up button navigates to sign up page': function(browser) {
        var home = browser.page.home();
        var header = home.section.header;
        var signup = browser.page.signup();
        var signUpForm = signup.section.signUpForm;

        header
            .waitForElementVisible('@signUpHeaderButton')
            .verify.attributeContains('@signUpHeaderButton', "href", "new")
            .triggerTouch('@signUpHeaderButton');

        signup.expect.section('@signUpForm').to.be.visible;

        signup
            .verify.urlContains(signup.url());

        browser.end();
    },

}


