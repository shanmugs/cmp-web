module.exports = {
    '@tags': ['critical-prod', 'critical-stage', 'staging', 'gemini'],
    'setUp': function(browser) {
        var home = browser.page.home();

        home
            .navigate();
    },

    'Verify page elements present': function(browser) {
        var home = browser.page.home();

        home.expect.section('@header').to.be.visible;        
        home.expect.section('@footer').to.be.visible;

        home
            .verify.elementPresent( '@heroImg' )
            .verify.elementPresent( '@heroTitle' )
            .verify.elementPresent( '@heroSubtitle' )
            .verify.elementPresent( '@btnStart' )

            .verify.elementPresent( '@piggyBankIcon' )
            .verify.elementPresent( '@notepadIcon' )
            .verify.elementPresent( '@notepadIcon' )
            .verify.elementPresent( '@plantIcon' )

            .verify.elementPresent( '@theHeartHeading' )
            .verify.elementPresent( '@theHeartContent' )

            .verify.elementPresent( '@homeSearchHeading' )
            .verify.elementPresent( '@homeSearch' )

            .verify.elementPresent( '@highlights' )
            .verify.elementPresent( '@highlightsTitle' )
            .verify.elementPresent( '@highlightsBody' )
            .verify.elementPresent( '@highlightsBtn' )

            .verify.elementPresent( '@countingBanner' )
            .verify.elementPresent( '@countingBannerHeading' )

            .verify.elementPresent( '@socialProof')

            .verify.elementPresent( '@homeCTA');

        browser.end();
    },

    'Verify search displays results': function(browser) {
        var home = browser.page.home();

        home
            .triggerTouch( '@homeSearch')
            .setValue('@homeSearch', 'red')
            .verify.visible( '@homeSearchMenu')
            .verify.elementPresent( '@homeSearchSuggestion')

        browser.end();
    },

    'Verify highlights show correct links': function(browser) {
        var home = browser.page.home();

        home
            .verify.elementPresent( '@highlightsIndiv' )
            .verify.elementPresent( '@highlightsGroup' )
            .verify.elementPresent( '@highlightsStart' )

        browser.end();
    },

}
 





