module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'staging', 'gemini'],
    setUp: function(browser) {

        browser.page.contact()
            .navigate();
    },

    'Verify page elements present': function(browser) {
        var contact = browser.page.contact();

        contact.expect.section('@header').to.be.visible;        
        contact.expect.section('@footer').to.be.visible;

        contact
            .verify.elementPresent( '@heroImg');

        browser.end();
    },

}