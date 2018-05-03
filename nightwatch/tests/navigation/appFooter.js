module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'gemini'],
    'setUp': function(browser) {
        var dashboard = browser.page.dashboard();
        var login = browser.page.login();

        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@form');

        dashboard
            .waitForElementVisible( '@accountNav' );
    },

    'Verify footer elements present - dashboard': function(browser) {
        var dashboard = browser.page.dashboard();
        var footer = dashboard.section.footer;

        footer
            .waitForElementVisible('@footer')
            .verify.elementPresent('@footerSocial')
            .verify.elementPresent('@footerTwitter')
            .verify.elementPresent('@footerFacebook')
            .verify.elementPresent('@footerInstagram')
            .verify.elementPresent('@footerVimeo')
            .verify.elementPresent('@footerFees')
            .verify.elementPresent('@footerHelp')
            .verify.elementPresent('@footerContact')
            .verify.elementPresent('@footerHello')
            .verify.elementPresent('@footerCall')
            .verify.elementPresent('@footerAbout')
            .verify.elementPresent('@footerCareers')
            .verify.elementPresent('@footerPress')
            .verify.elementPresent('@footerTrust')
            .verify.elementPresent('@footerPrivacy')
            .verify.elementPresent('@footerTerms')
            .verify.elementPresent('@footerAgreement')

            .verify.containsText('@footerFees', 'Fees')
            .verify.containsText('@footerHelp', 'Help Centre')
            .verify.containsText('@footerContact', 'Contact Us')
            .verify.containsText('@footerHello', 'hello@chimp.net')
            .verify.containsText('@footerCall', '1-877-531-0580')
            .verify.containsText('@footerAbout', 'About Us')
            .verify.containsText('@footerCareers', 'Careers')
            .verify.containsText('@footerPress', 'Press')
            .verify.containsText('@footerTrust', 'Trust')
            .verify.containsText('@footerPrivacy', 'Privacy')
            .verify.containsText('@footerTerms', 'Terms')
            .verify.containsText('@footerAgreement', 'Account Agreement')
            .verify.containsText('@langToggle', 'Parlez-vous français?')
        browser.end();
    },


    'Verify sub footer elements present - dashboard': function(browser) {
        var currentYear = new Date().getFullYear();
        var dashboard = browser.page.dashboard();
        var footer = dashboard.section.footer;
        // console.log(currentYear);
        footer
            .waitForElementVisible('@subFooter')
            .verify.elementsPresent('@subFooter')
            .verify.elementsPresent('@footerLogo')

            .verify.containsText('@footerMadeWith', 'in Vancouver BC')
            .verify.containsText('@footerCopyright', '© 2008-' + currentYear + ' CHIMP TECHNOLOGY INC.')
        browser.end();
    },

    'Verify digiCert is present': function(browser) {
        var dashboard = browser.page.dashboard();
        var footer = dashboard.section.footer;

        console.log(browser.globals.test)
        if(browser.globals.env === 'production'){
            footer
                .waitForElementVisible('@subFooter')
                .verify.elementPresent('@footerProdDigicert') // Look for the prod DigiCert
            browser.end();

        } else {
            footer
                .waitForElementVisible('@subFooter')
                .verify.elementPresent('@footerDigicert')
            browser.end();
        }
    },
}
