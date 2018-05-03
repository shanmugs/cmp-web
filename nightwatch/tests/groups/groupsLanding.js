module.exports = {
    '@tags': ['staging', 'gemini'],

    'Groups: Verify Page Elements - Logged Out': function(browser) {

        browser.page.groups()
            .navigate()
            .verify.elementPresent('@groupLogo')
            .verify.elementNotPresent('@activityTab')
            .verify.elementPresent('@feedBox')
            .verify.elementPresent('@facebookShare')
            .verify.elementPresent('@twitterShare')
            .verify.elementPresent('@groupUrl')
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580');

        browser.end();
    },

    'Groups: Verify Page Elements - Logged In - Non Member': function(browser) {
        var home = browser.page.home();
        var groups = browser.page.groups();

        browser.page.login()
            .navigate()
            .waitForElementVisible('@form')
            .fillInForm('chimpautomation+kevin@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        groups
            .navigate('team-rocket') // Group: team-rocket

        home.expect.section('@header').to.be.visible;
        home.expect.section('@footer').to.be.visible;

        groups
            .verify.elementPresent('@groupLogo')
            .verify.elementPresent('@joinGroup')
            .verify.elementPresent('@feedBox')
            .verify.elementPresent('@aboutTab')
            .verify.elementPresent('@activityTab')
            .verify.cssClassPresent('@aboutTab', 'active')
            .verify.elementPresent('@moneyTab')
            .verify.elementPresent('@membersTab')
            .verify.elementPresent('@facebookShare')
            .verify.elementPresent('@twitterShare')
            .verify.elementPresent('@groupUrl')
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580');

        browser.end();
    },

    'Groups: Verify Page Elements - Logged In - Member': function(browser) {
        var home = browser.page.home();
        var groups = browser.page.groups();

        browser.page.login()
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        groups
            .navigate('team-rocket') // Group: team-rocket

        home.expect.section('@header').to.be.visible;
        home.expect.section('@footer').to.be.visible;

        groups
            .joinTheGroup()
            .verify.elementPresent('@groupLogo')
            .verify.elementPresent('@giveToGroup')
            .verify.elementPresent('@feedBox')
            .verify.elementPresent('@aboutTab')
            .verify.elementPresent('@activityTab')
            .verify.cssClassPresent('@activityTab', 'active')
            .verify.elementPresent('@moneyTab')
            .verify.elementPresent('@membersTab')
            .verify.elementPresent('@facebookShare')
            .verify.elementPresent('@twitterShare')
            .verify.elementPresent('@groupUrl')
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580');

        browser.end();
    },

    'Groups: Verify Page Elements - Logged In - Group Admin': function(browser) {
        var home = browser.page.home();
        var groups = browser.page.groups();

        browser.page.login()
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        groups
            .navigate() // Default Group: triathlon-for-a-cause

        home.expect.section('@header').to.be.visible;
        home.expect.section('@footer').to.be.visible;

        groups
            .verify.elementPresent('@groupAdminButtons')
            .verify.elementPresent('@groupLogo')
            .verify.elementPresent('@joinGroup') // Acct is not a member of this group
            .verify.elementPresent('@feedBox')
            .verify.elementPresent('@aboutTab')
            .verify.elementPresent('@activityTab')
            .verify.elementPresent('@moneyTab')
            .verify.elementPresent('@membersTab')
            .verify.elementPresent('@facebookShare')
            .verify.elementPresent('@twitterShare')
            .verify.elementPresent('@groupUrl')
            .verify.elementPresent('@giveFromGroup')
            .verify.containsText('@helpSidebar', 'Call 1 (877) 531-0580');

        browser.end();
    },

    'Groups: Navigate Feed Tabs - Logged In - Non Member': function(browser) {
        var home = browser.page.home();
        var groups = browser.page.groups();

        browser.page.login()
            .navigate()
            .waitForElementVisible('@form')
            .fillInForm('chimpautomation+kevin@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        groups
            .navigate('team-rocket') // Group: team-rocket

        home.expect.section('@header').to.be.visible;
        home.expect.section('@footer').to.be.visible;

        groups
            .verify.elementPresent('@joinGroup')
            .verify.cssClassPresent('@aboutTab', 'active')
            .waitForElementVisible('@moneyTab')
            .triggerTouch('@moneyTab')
            .waitForElementVisible('@moneyTab')
            .verify.cssClassPresent('@moneyTab', 'active')
            .verify.cssClassNotPresent('@aboutTab', 'active');

        browser.end();
    },

    'Groups: Navigate Feed Tabs - Logged In - Member': function(browser) {
        var home = browser.page.home();
        var groups = browser.page.groups();

        browser.page.login()
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        groups
            .navigate('team-rocket') // Group: team-rocket

        home.expect.section('@header').to.be.visible;
        home.expect.section('@footer').to.be.visible;

        groups
            .joinTheGroup()
            .verify.elementPresent('@giveToGroup')
            .verify.cssClassPresent('@activityTab', 'active')
            .waitForElementVisible('@moneyTab')
            .triggerTouch('@moneyTab')
            .waitForElementVisible('@moneyTab')
            .verify.cssClassPresent('@moneyTab', 'active')
            .verify.cssClassNotPresent('@activityTab', 'active');

        browser.end();
    },

    'Groups: Add Comment - Logged In - Member': function(browser) {
        var home = browser.page.home();
        var groups = browser.page.groups();
        var commentText = browser.globals.testUtils.generateComment();

        browser.page.login()
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        groups
            .navigate('team-rocket') // Group: team-rocket

        home.expect.section('@header').to.be.visible;
        home.expect.section('@footer').to.be.visible;

        groups
            .joinTheGroup()
            .triggerTouch('@activityTab')
            .waitForElementVisible('@activityTab')
            .verify.cssClassPresent('@activityTab', 'active')
            .waitForElementVisible('@commentBox')
            .waitForElementVisible('@addComment')
            .setValue('@commentBox', commentText)
            .triggerTouch('@addComment')
            .waitForAnimation(500)
            .waitForElementVisible('@commentBox')
            .waitForElementVisible('@commentSpan')
            .verify.containsText('@commentSpan', commentText);

        browser.end();
    }

}
