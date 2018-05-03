module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'staging', 'gemini'],
    setUp: function(browser) {

        browser.page.error()
            .navigate();
    },

    'Verify page elements present': function(browser) {
        var error = browser.page.error();

        error.expect.section('@header').to.be.visible;        
        error.expect.section('@footer').to.be.visible;

        error
            .verify.elementPresent('@chimpBricked');

        browser.end();
    },

}