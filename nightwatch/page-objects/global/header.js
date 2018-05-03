// The header global section is attached to every page object and makes available some common
// actions and selectors.

module.exports = {
    // every element and section selector is scoped to this selector, 
    // 
    // var home = browser.page.home();
    // var header = home.section.header;
    // var header.verify.elementPresent('@logo') // This looks for the selector '.c-header .c-header__logo'

    // All commands called on the header will have the elements scoped to the selector.
    // Verifying that a section is on a page has a slighly different syntax. To assert that a 
    // section is visible use the following syntax:
    // 
    // var home = browser.page.home();
    // home.expect.section(@header).to.be.visible;
    // 
    // where @header is the name of your section
    selector: '.c-header',
    // each function specified in the commands array is a custom asseration that can be called on 
    // the pageObject in tests. This isn't available on the browser object and can only be called 
    // on the page Object. 
    //
    // Within the command, `this` refers to the pageObject, in this instance, the header. 
    // To access native nightwach commands use `this.api`.
    // All commands should `return this;` so that the command is chainable in the test files.
    // 
    // Any reusable actions should added as commands. This abstracts the selection logic and makes
    // updating commands happen in only one place.
    commands: [{
        openSearchModal: function () {
            this.triggerTouch('@headerSearch');
            this.api.waitForAnimation();
            return this;
        },
        openMegaNav: function () {
            this.triggerTouch('@megaNavBtn');
            this.api.waitForAnimation();
            return this;
        },
        openAccountNav: function () {
            this.triggerTouch('@accountNavBtn');
            this.api.waitForAnimation();
            return this;
        },
        openGiveNav: function () {
            this.waitForElementVisible('@giveMenuBtn');
            this.triggerTouch('@giveMenuBtn');
            this.api.waitForAnimation();
            return this;
        },
        logout: function(){
            this.triggerTouch('@accountNavBtn');
            this.api.waitForAnimation();
            this.triggerTouch('@accountNavLogout');
            this.waitForElementVisible('@logInHeaderButton');
            return this;
        },

    }],

    // Sections can have sections!  The header is a section but it also has logical groups within it
    // The same selector and element rules apply here. Any element on a section is scoped to the 
    // sections selector. This is a nice way to group selectors and deduplicate selectors
    //
    // How do I access these section elements? Using the same syntax we used to get the headrer from
    // the home page object
    //
    // 
    // var home = browser.page.home();
    // home.expect.section(@header).to.be.visible;
    // 
    // var header = home.sections.header;
    // var featuresDropdown = header.sections.featuresDrowdown // this the key of the sections object
    // featuresDropdown.verify.elementsVisible('@fundraisingLink') 
    // 
    //
    // ^ @fundraisingLink is scoped to the solutionsDropdown section so it's looking for:
    // '.c-header-dropdown-item:nth-child(1) .c-header-dropdown-item__contents.p--open a[href="fundraising"]'
    sections: {
        featuresDropdown: {
            selector: '.c-header-dropdown-item:nth-child(1) .c-header-dropdown-item__contents.p--open',
            elements: {
                fundraisingLink: 'a[href="/fundraising"]',
                communityLink: 'a[href="/community"]',
                waysToGiveLink: 'a[href="/ways-to-give"]',
                AccountsLink: 'a[href="/accounts"]',
                feesLink: 'a[href="/fees"]',
                trustLink: 'a[href="/trust"]'
            }
        },
        solutionsDropdown: {
            selector: '.c-header-dropdown-item:nth-child(2) .c-header-dropdown-item__contents.p--open',
            elements: {
                individualsLink: 'a[href="/individuals"]',
                workplaceLink: 'a[href="/workplace"]',
                givingGroupsLink: 'a[href="/giving-groups"]',
                charitiesLink: 'a[href="/charities"]',
                philanthropistsLink: 'a[href="/philanthropists"]',
                educationLink: 'a[href="/education"]',
                sportsLink: 'a[href="/sports"]',
                fundingOrganizationLink: 'a[href="/funding-organizations"]',
                eventLink: 'a[href="/events"]',
                familiesLink: 'a[href="/families"]'
            }
        },
        aboutDropdown: {
            selector: '.c-header-dropdown-item:nth-child(3) .c-header-dropdown-item__contents.p--open',
            elements: {
                aboutLink: 'a[href="/about"]',
                ourStoryLink: 'a[href="/our-story"]',
                chimpFoundationLink: 'a[href="/chimp-foundation"]',
                teamLink: 'a[href="/team"]',
                careersLink: 'a[href="/careers"]',
                pressLink: 'a[href="/press"]',
            }
        },
        supportDropdown: {
            selector: '.c-header-dropdown-item:nth-child(4) .c-header-dropdown-item__contents.p--open',
            elements: {
                contactLink: 'a[href="/contact"]',
                helpLink: 'a[href="http://help.chimp.net"]',
            }
        },

        giveMenu: {
            selector: '.c-header-give-dropdown__content',
            elements: {
                giveMenuFirstHeading: '.c-header-give-contents__heading',
                giveMenuAddDropDownHeading: '.p-dropdown__item-contents .p-collapsible-item__heading',
                giveMenuAddHeading: '.p-dropdown__item-contents.p--open.p--right.p--sm > div > div:nth-child(2) > div.c-give-cta__description > h3',
                giveMenuAddButton: '.p-dropdown__item-contents .c-give-cta__action .c-button[href="/donations/new"]',
                giveMenuAddDropDownText: '.p-dropdown__item-contents.p--open.p--right.p--sm > div > div:nth-child(2) > div.c-give-cta__description > div > div:nth-child(2) > div > div > div > p',
                giveMenuGiveHeading: '.p-tooltip-container__step > div > div.c-give-cta__description > h3',
                giveMenuGiveButton: '.p-dropdown__item-contents .c-give-cta.c--give .c-button[href="/give"]',
                giveMenuSendHeading: '.p-dropdown__item-contents.p--open.p--right.p--sm > div > div.c-give-cta.c--send > div.c-give-cta__description > h3',
                giveMenuSendButton: '.c--send .c-button[href="/give/to/friend/new"]',
            }
        },

        accountMenu: {
            selector: '.c-header-account-nav',
            elements: {
                switchAccountButton: '.c-header-account-nav__header > button > svg',
                accountNavGreeting: '.c-header-account-nav__greeting',
                accountNavBalance: '.c-user-balance-summary',
                accountNavAmount: '.qa-user-balance-summary-amount',
                accountNavAddMoney: '.c-user-balance-summary .c-button[href="/donations/new"]',
                accountNavSettings: '.c-header-account-nav__section h3',
                    accountNavSettingsContent: '.c-header-account-nav__section',
                    accountNavAccSettingsLink: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(1) > a',
                accountNavTaxReceipts: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(2) > a',
                accountNavGivingTools: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(3) > a',
                accountNavLogout: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(4) > a',
                headerAccountNavGreeting: '.c-header-account-nav .c-header-account-nav__greeting',
                headerAccountNavBalanceSummary: '.c-header-account-nav .c-user-balance-summary',
                headerAccountNavSettingsLinks: '.c-header__button-wrapper > div:nth-child(3) div:nth-child(4) > ul',
                headerCompanyAccountSettings: 'div:nth-child(3) .c-header-account-nav__section li:nth-child(1) > a',
                headerAccountNavGroupsList: '.c-header-account-nav__group-list',
                headerAccountNavGroupsViewAllBtn: '.c-list-preview .c-header-account-nav__group-list button',
                viewAllGroupsModalListItems: '.c-modal .c-link-list li',
            }
        },

        accountSwitcher: {
            selector: '.c-header-account-switcher',
            elements: {
                accountSwitcherHeading: '.c-header-account-switcher__greeting',
                switcherCancelButton: '.c-header-account-switcher .c-button',
                accountSwitcherCurrentAccount: '.c-account-preview.c--current',
                accountSwitcherAvatar: '.c-account-preview__avatar',
                accountSwitcherName: '.c-account-preview__name',
                accountSwitcherType: '.c-account-preview__type',
                accountSwitcherOtherAccountsList: '.c-account-preview-list',
                    accountSwitcherMoreLink: '.c-account-preview-list__more',
                    viewAllAccountsListItems: '.c-modal .c-account-preview-list a',
                    accountSwitchCompany:  '.c-account-preview-list .c--company',
            }
        },
    },
    // all elements are scoped to the section's selector and can only be called on the section 
    // object
    //
    // var home = browser.page.home();
    // var header = home.section.header;
    //
    // home.verify.elementPresent('@logo') // <--- Won't work because there's no @logo element on the home pageObject
    // header.verify.elementPresent('@logo') // <--- will select `.c-header .c-header__logo`
    elements: {
        //Global Header
        logo: '.c-header__logo',
        accountNavLogout: '.c-header-account-nav a[href="/logout"]',
        //Marketing Header
        featuresNavItem: '.c-header__nav-wrapper li:nth-child(1) > span',
        solutionsNavItem: '.c-header__nav-wrapper li:nth-child(2) > span',
        aboutNavItem: '.c-header__nav-wrapper li:nth-child(3) > span',
        supportNavItem: '.c-header__nav-wrapper li:nth-child(4) > span',

        headerSearch: '.c-header__button-wrapper .c-header__search-button',
        searchPlaceholder: '.header-wrapper .c-header__nav-wrapper .c-header__auth-search-button',
        headerSearchInput: '#header-search',
        headerSearchClose: '.c-modal__close',
        headerSearchResults:'.c-modal-search__results',
        headerSearchResultsName: '.c-list-preview__list-item-name',
        headerSearchResultsArrow: '.c-list-preview__list-item-icon-end > svg',
        logInHeaderButton: '.c-header__button-wrapper > .c-button[href="/login"]',
        signUpHeaderButton: '.c-header__button-wrapper > .c-button[href="/users/new"]',

        accountNavBtn: '.c-header-account-dropdown__trigger-avatar',
            groupsViewAllBtn: '.p-dropdown div:nth-child(5) button',
        authSearch: 'a[href*="/search"]',
        megaNavBtn: 'div.c-header__button-wrapper > button.c-button',
            headerMegaNavTitle: 'c-modal__title',
        profileBtn: '.c-header-account-dropdown__trigger-avatar',
        giveMenuBtn: '.c-header-give-dropdown button',

      }
};
