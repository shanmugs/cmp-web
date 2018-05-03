
module.exports = {
    '@tags': ['staging', 'gemini'],
    'setUp': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        var communityEdit = browser.page.communityEdit();
        var communityEditLandingPage = browser.page.communityEditLandingPage();

        //Have to hit the root edit page first otherwise going directly to landing page admin
        // throws 404. Wat
        communityEdit
            .navigate('absolute')
            .waitForElementVisible('@leftNavigation');

        communityEditLandingPage
            .navigate('absolute')
            .waitForElementVisible('@leftNavigation');
    },

    'Community Edit Landing Page: verify elements present': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .verify.elementPresent('@domainsField')
            .verify.elementPresent('@allowDomainsCheckbox')
            .verify.elementPresent('@saveBtn')

        browser.end();
    },

    'Community Edit Landing Page: Admin user is able to select allow any email domain': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .verify.elementPresent('@allowDomainsCheckbox')
            .triggerTouch('@allowDomainsCheckbox')
            .verify.cssClassPresent('@allowDomainsCheckbox', 'checked');
        browser.end();
    },

    'Selecting Allow Any Email presents a verification pop up': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .toggleAllowedDomains()

        var domainModal = communityEditLandingPage.section.emailDomainConfirmationModal;
        domainModal
            .verify.elementPresent('@modal') // Broken by CT-5070
        browser.end();
    },

    'Confirming Allow any in the popup disables the list domains text field': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .toggleAllowedDomains()

        var domainModal = communityEditLandingPage.section.emailDomainConfirmationModal;
        domainModal
            .verify.elementPresent('@modal') // Broken by CT-5070
            .triggerTouch('@confirmButton')

        domainForm
            .verify.attributeEquals('@domainsField', 'disabled', 'true')

        browser.end();
    },

    'Confirming Allow Any updates the checkbox to show a checkmark': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .toggleAllowedDomains()

        var domainModal = communityEditLandingPage.section.emailDomainConfirmationModal;
        domainModal
            .verify.elementPresent('@modal') // Broken by CT-5070
            .triggerTouch('@confirmButton')

        domainForm
            .verify.cssClassPresent('@allowDomainsCheckbox', 'checked');

        browser.end();
    },

    'Admin user is able to disable Allow Any, no confirmation pop up for disabling': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .toggleAllowedDomains()

        var domainModal = communityEditLandingPage.section.emailDomainConfirmationModal;
        domainModal
            .verify.elementPresent('@modal')
            .triggerTouch('@confirmButton')

        domainForm
            .verify.cssClassPresent('@allowDomainsCheckbox', 'checked')
            .toggleAllowedDomains()

        domainForm
            .verify.cssClassPresent('@allowDomainsCheckbox', 'unchecked')

        browser.end();
    },

    'Content of the Domain List text field is maintained when user toggles Allow Any': function(browser) {
        var communityEditLandingPage = browser.page.communityEditLandingPage();
        communityEditLandingPage.expect.section('@domainForm').to.be.visible;

        var domainForm = communityEditLandingPage.section.domainForm;
        domainForm
            .clearValue('@domainsField')
            .setValue('@domainsField', 'chimp.net')
            .triggerTouch('@saveBtn')
            .toggleAllowedDomains()

        var domainModal = communityEditLandingPage.section.emailDomainConfirmationModal;
        domainModal
            .verify.elementPresent('@modal') // Broken by CT-5070
            .triggerTouch('@confirmButton')

        domainForm
            .verify.valueContains('@domainsField', 'chimp.net')

        browser.end();
    },
}
