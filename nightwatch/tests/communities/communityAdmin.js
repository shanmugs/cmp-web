
module.exports = {
    '@tags': ['staging', 'gemini'],
    'setUp': function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .waitForElementVisible('@loginField')
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        var communityEdit = browser.page.communityEdit();
        communityEdit
            .navigate('absolute')
            .waitForElementVisible('@leftNavigation');
    },

    'Community Info: verify elements present': function(browser) {
        var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@editForm').to.be.visible;

        communityEdit
            .verify.elementPresent('@leftNavigation')

        var communityEditForm = communityEdit.section.editForm;
        communityEditForm
            .verify.elementPresent('@communityName')
            .verify.elementPresent('@communityNamelabel')
            .verify.elementPresent('@displayNamelabel')
            .verify.elementPresent('@displayNameField')
            .verify.elementPresent('@displayNameToolTip')
            .verify.elementPresent('@phoneField')
            .verify.elementPresent('@contextSelect')
            .verify.elementPresent('@contextLabel')
            .verify.elementPresent('@fiscalMonth')
            .verify.elementPresent('@fiscalDay')
            .verify.elementPresent('@saveBtn')

        browser.end();
    },

    'Community Info: verify community name link is correct': function(browser) {
         var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@editForm').to.be.visible;

        communityEdit
            .verify.elementPresent('@leftNavigation')

        var communityEditForm = communityEdit.section.editForm;
        communityEditForm
            .verify.elementPresent('@communityNameEdit')

        browser.end();
    },

    'Community Info: verify display name tooltip displays when tapped': function(browser) {
        var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@editForm').to.be.visible;

        var communityEditForm = communityEdit.section.editForm;
        var body = communityEdit.section.body;

        // offset by 20px, left and top so we actually hit the element
        communityEditForm.moveToElement('@displayNameToolTip', 20, 20, function(){
            browser.waitForAnimation()
            // Tooltip is appended to the body so we need to use the
            // body section
            body
                .waitForElementVisible('@helpText')
                .verify.elementPresent('@helpText');
        });

        browser.end();
    },

    'Community Info: verify display name field errors': function(browser) {
        var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@editForm').to.be.visible;

        var communityEditForm = communityEdit.section.editForm;

        communityEditForm.submit({
            displayName: '/', // Invalid character
        });

        communityEditForm
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Display Name')
            .verify.containsText('@fieldError', 'please use only regular word characters')
            .verify.containsText('@fieldError', 'is too short (minimum is 2 characters)')

        var string = browser.globals.testUtils.generateString(300);
        communityEditForm.submit({
            displayName: string,
        });

        communityEditForm
            .waitForAnimation(250)
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Display Name')
            .verify.containsText('@fieldError', 'is too long (maximum is 225 characters)')

        browser.end();
    },

    'Community Info: verify phone field errors': function(browser) {
        var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@editForm').to.be.visible;

        var communityEditForm = communityEdit.section.editForm;

        communityEditForm.submit({
            phone: ' ',
        });

        communityEditForm
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Phone')
            .verify.containsText('@fieldError', 'can\'t be blank')
            .verify.containsText('@fieldError', 'must consist of at least 10 digits')

         communityEditForm.submit({
            phone: '</> ',
        });

        communityEditForm
            .waitForAnimation(250)
            .waitForElementVisible('@fieldError')
            .verify.containsText('@fieldError', 'Phone')
            .verify.containsText('@fieldError', 'Only standard letters and numbers are allowed here.')
        browser.end();
    },

    'Community Info: verify community admin can save valid changes': function(browser) {
        var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@editForm').to.be.visible;

        var communityEditForm = communityEdit.section.editForm;

        communityEditForm.submit({
            displayName: 'ValidName',
            phone: '1234567890',
            context: 'employer',
            fiscalMonth: 'june',
            fiscalDay: '1',
        });

        communityEditForm
            .waitForAnimation()
            .verify.attributeContains('@displayNameField', 'value', 'ValidName')
            .verify.attributeContains('@phoneField', 'value', '1234567890')
            .verify.attributeContains('@contextSelect', 'value', 'employer')
            .verify.attributeContains('@fiscalMonth', 'value', '6')
            .verify.attributeContains('@fiscalDay', 'value', '1')

        communityEditForm.submit({
            displayName: 'DifferentValidName',
            phone: '5678901234',
            context: 'General Community',
            fiscalMonth: 'january',
            fiscalDay: '30',
        });

        communityEditForm
            .waitForAnimation()
            .verify.attributeContains('@displayNameField', 'value', 'DifferentValidName')
            .verify.attributeContains('@phoneField', 'value', '5678901234')
            .verify.attributeContains('@contextSelect', 'value', 'general')
            .verify.attributeContains('@fiscalMonth', 'value', '1')
            .verify.attributeContains('@fiscalDay', 'value', '30')
        browser.end();
    },

    'Community Info: verify community admin logo upload is present': function(browser) {
        var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@logoForm').to.be.visible;

        var logoForm = communityEdit.section.logoForm;



        logoForm
            .verify.elementPresent('@form')
            .verify.elementPresent('@fileField')
            .verify.elementPresent('@browseButton');

        browser.end();
    },

    'Community Info: verify community admin banner upload is present': function(browser) {
         var communityEdit = browser.page.communityEdit();
        communityEdit.expect.section('@bannerForm').to.be.visible;

        var bannerForm = communityEdit.section.bannerForm;

        bannerForm
            .verify.elementPresent('@form')
            .verify.elementPresent('@fileField')
            .verify.elementPresent('@browseButton');

        browser.end();
    },
}
