// 
var marketingSections = require('./global/landingSections');
var sections = marketingSections;
// could add additional sections here with sections.sectionName = { selector: '.selectoClass'}


// Page object for the home page. Access in tests by by calling browser.pages.home(); home being 
// the name of the current File. Other all files in /nightwatch/page-objects are accessable from 
// the browser.pages object.

module.exports = {
    // url can be accessed from the page object directly with home.url
    // Every page object comes with a .navigate() method which directs the browser to the url of the 
    // pageObject eg:  
    //
    // var home = browser.page.home();
    // home.navigate(); 
    url: function () {
        // This method can return whatver. Append strings to the launch_url to make subpaths.
        return this.api.launch_url;
    },
    // Sections are for sections of the page. It's a way to scope selectors to a specific element 
    // of the page.  All pages will have some common sections which we've pulled out to the ./global
    // dir (header, footer, modal, etc...).  Sections can be accessed from the page object like so:
    //
    // var home = browser.page.home();
    // var header = home.section.header;
    sections: sections,
    // All elements are available when asserting on the page object, by adding an @ to the key:
    //
    // var home = browser.page.home()
    // home.verify.elementsPresent('@heroVideo') will select .js-hero-video
    elements: {
        heroImg: '.hero',
        heroTitle: '.page--title',
        heroSubtitle: '.page--subtitle',
        btnStart: '.c-mk-button__button[href="/users/new"]',

        piggyBankIcon: '.i-piggy-bank',
        notepadIcon: '.i-notepad',
        cursorIcon: '.i-cursor',
        plantIcon: '.i-plant',

        theHeartHeading: '.c--alt-bg h2',
        theHeartContent: '.c--alt-bg div:nth-child(2)',

        homeSearchHeading: '.c--search h2',
        homeSearch: '.c-typeahead-input',
        homeSearchMenu: '.c-typeahead-menu.is-open',
        homeSearchSuggestion: '.c-mk-search-dataset.c-mk-search-dataset-chimp-search',
        homeSearchBtn: 'form[action="/search"] .c-mk-button',

        highlights: '.c-highlight',
        highlightsTitle: '.c-highlight__title',
        highlightsBody: '.c-highlight__body',
        highlightsBtn: '.c-highlight__body .button',
        highlightsIndiv: '.c-highlight__body .button[href="/individuals"]',
        highlightsGroup: '.c-highlight__body .button[href="/giving-groups"]',
        highlightsStart: '.c-highlight__body .button[href="/get-started"]',

        countingBanner: '.c-section.c--photo',
        countingBannerHeading: '.c-section__container .large-centered h2',

        socialProof: '.c--social-proof',

        homeCTA: '.c--cta-home .button[href="/users/new"]',
    }
}
