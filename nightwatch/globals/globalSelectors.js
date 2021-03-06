module.exports = {
    langToggle: '.lang-toggle',

    //Global Header
    header: '.c-header',
    headerLogo: '.c-header__logo',

    //Marketing Header
    headerFeatures: '.c-header__nav-wrapper li:nth-child(1) > span',
    headerFeaturesOpen: '.c-header-dropdown-item__contents.p-dropdown__item-contents.p--open',
    headerSolutions: '.c-header__nav-wrapper li:nth-child(2) > span',
    headerAbout: '.c-header__nav-wrapper li:nth-child(3) > span',
    headerSupport: '.c-header__nav-wrapper li:nth-child(4) > span',
        headerSolution1: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open div:nth-child(1) > div > a',
        headerSolution2: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open div:nth-child(2) > div > a',
        headerSolution3: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open div:nth-child(3) > div > a',
        headerSolution4: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open div:nth-child(4) > div > a',
            headerSecondary1: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open li:nth-child(1) > a',
            headerSecondary2: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open li:nth-child(2) > a',
            headerSecondary3: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open li:nth-child(3) > a',
            headerSecondary4: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open li:nth-child(4) > a',
            headerSecondary5: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open li:nth-child(5) > a',
            headerSecondary6: '.c-header-dropdown-item.c-header-nav-menu__item.p-dropdown__item.p--open li:nth-child(6) > a',
    headerSearch: '.c-header__button-wrapper .c-header__search-button',
    headerSearchPlaceholder: '.header-wrapper .c-header__nav-wrapper > div > button > span',
    headerSearchInput: '#header-search',
    headerSearchClose: '.c-modal__close',
    headerSearchResults:'.c-modal-search__results',
    headerSearchResultsName: '.c-list-preview__list-item-name',
    headerSearchResultsArrow: '.c-list-preview__list-item-icon-end > svg',
    logInHeaderButton: '.bonobo.header .c-header__button-wrapper > .c-button[href="/login"]',
    signUpHeaderButton: '.bonobo.header .c-header__button-wrapper > .c-button[href="/users/new"]',

    // Generic Modal Selectors
    modal: '.c-modal',
    modalHeader: '.c-modal__header',
    modalTitle: '.c-modal__title',
    modalCloseButton: '.c-modal__close',
    modalContent: '.c-modal__content',

    //Authenticated Header
    //Account Nav
    accountNav: '.c-header-account-dropdown__trigger-avatar',
        accountNavBody: '.c-header-account-nav',
    accountNavGreeting: '.c-header-account-nav__greeting',
    accountNavBalance: '.c-user-balance-summary',
        accountNavAmount: '.qa-user-balance-summary-amount',
    accountNavAddMoney: '.c-user-balance-summary .c-button[href="/donations/new"]',
    accountNavSettings: '.c-header__button-wrapper > div:nth-child(3) div:nth-child(4) > h3',
        accountNavSettingsContent: '.c-header-account-nav__section',
        accountNavAccSettingsLink: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(1) > a',
        accountNavTaxReceipts: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(2) > a',
        accountNavGivingTools: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(3) > a',
        accountNavLogout: '.c-header-account-nav div:nth-of-type(3) > ul > li:nth-child(4) > a',
    headerAuthSearch: 'div.c-header__nav-wrapper .c-header__auth-search-button',

    headerMegaBtn: 'div.c-header__button-wrapper > .c-button',
        headerMegaNavTitle: '.c-modal__title-string',
        headerMegaNavExplore: '.c-mega-nav__heading',
        headerMegaNavFeatures: 'section div:nth-child(1) > h4',
            headerMegaNavFeaturesFundraising: 'section div:nth-child(1) li:nth-child(1) > a',
            headerMegaNavFeaturesWays: 'section div:nth-child(1) li:nth-child(2) > a',
            headerMegaNavFeaturesCommunity: 'section div:nth-child(1) li:nth-child(3) > a',
            headerMegaNavFeaturesAccounts: 'section div:nth-child(1) li:nth-child(4) > a',
            headerMegaNavFeaturesFees: 'section div:nth-child(1) li:nth-child(5) > a',
            headerMegaNavFeaturesTrust: 'section div:nth-child(1) li:nth-child(6) > a',
        headerMegaNavSolutions: 'section div:nth-child(2) > h4',
            headerMegaNavSolutionsIndividuals: 'section div:nth-child(2) > ul > li:nth-child(1) > a',
            headerMegaNavSolutionsWorkplace: 'section div:nth-child(2) > ul > li:nth-child(2) > a',
            headerMegaNavSolutionsGroups: 'section div:nth-child(2) > ul > li:nth-child(3) > a',
            headerMegaNavSolutionsCharities: 'section div:nth-child(2) > ul > li:nth-child(4) > a',
            headerMegaNavSolutionsPhilanthropy: 'section div:nth-child(2) > ul > li:nth-child(5) > a',
            headerMegaNavSolutionsEducation: 'section div:nth-child(2) > ul > li:nth-child(6) > a',
            headerMegaNavSolutionsSports: 'section div:nth-child(2) > ul > li:nth-child(7) > a',
            headerMegaNavSolutionsOrgs: 'section div:nth-child(2) > ul > li:nth-child(8) > a',
            headerMegaNavSolutionsEvents: 'section div:nth-child(2) > ul > li:nth-child(9) > a',
            headerMegaNavSolutionsFamilies: 'section div:nth-child(2) > ul > li:nth-child(10) > a',
        headerMegaNavAbout: 'section div:nth-child(3) > h4',
            headerMegaNavAboutAbout: 'section div:nth-child(3) > ul > li:nth-child(1) > a',
            headerMegaNavAboutStory: 'section div:nth-child(3) > ul > li:nth-child(2) > a',
            headerMegaNavAboutFoundation: 'section div:nth-child(3) > ul > li:nth-child(3) > a',
            headerMegaNavAboutTeam: 'section div:nth-child(3) > ul > li:nth-child(4) > a',
            headerMegaNavAboutCareers: 'section div:nth-child(3) > ul > li:nth-child(5) > a',
            headerMegaNavAboutPress: 'section div:nth-child(3) > ul > li:nth-child(6) > a',
        headerMegaNavSupport: 'section div:nth-child(4) > h4',
            headerMegaNavSupportContact: 'section div:nth-child(4) > ul > li:nth-child(1) > a',
            headerMegaNavSupportHelp: 'section div:nth-child(4) > ul > li:nth-child(2) > a',
        headerMegaNavAsk: '.c-ask-us .c-ask-us__heading',
            headerMegaNavChatBtn: '.c-ask-us > div:nth-of-type(1) .c-button',
                headerMegaNavChatTxt: '.c-ask-us div:nth-child(2) .c-ask-us__description',
            headerMegaNavPhoneBtn: '.c-ask-us .c-button[href="tel:18775310580"]',
                headerMegaNavPhoneTxt: '.c-ask-us div:nth-child(3) .c-ask-us__description',
            headerMegaNavEmailBtn: '.c-ask-us .c-button[href="mailto:hello@chimp.net"]',
                headerMegaNavEmailTxt: '.c-ask-us div:nth-child(4) .c-ask-us__description',


    headerProfileBtn: '.c-header-account-dropdown__trigger.p-dropdown__item-trigger > div',
     headerAccountNav: '.c-header-account-nav',
     headerAccountNavSwitchAccountButton: '.c-header__button-wrapper > div:nth-child(3) .c-header-account-nav__header > button',
     headerAccountNavGreeting: '.c-header-account-nav .c-header-account-nav__greeting',
     headerAccountNavBalanceSummary: '.c-header-account-nav .c-user-balance-summary',
     headerAccountNavSettingsLinks: '.c-header__button-wrapper > div:nth-child(3) div:nth-child(4) > ul',
    headerCompanyAccountSettings: '.c-header-account-nav__section [href$="/edit"]',


     // Account Groups
     headerAccountNavGroupsList: '.c-header-account-nav .c-header-account-nav__group-list',
     headerAccountNavGroupsViewAllBtn: '.c-header-account-nav .c-header-account-nav__group-list .c-button',
     viewAllGroupsModalListItems: '.c-modal .c-link-list li',

     // Account Switcher
     headerAccountSwitcher: '.c-header-account-switcher',
     headerAccountSwitcherHeading: '.c-header-account-switcher__header',
     headerAccountSwitcherCancelButton: '.c-header-account-switcher .c-button',
     headerAccountSwitcherCurrentAccount: '.c-account-preview.c--current',
     headerAccountSwitcherAvatar: '.c-account-preview__avatar',
     headerAccountSwitcherName: '.c-account-preview__name',
     headerAccountSwitcherType: '.c-account-preview__type',
     headerAccountSwitcherOtherAccountsList: '.c-account-preview-list',
        headerAccountSwitcherMoreLink: '.c-account-preview-list__more',
        viewAllAccountsListItems: '.c-modal .c-account-preview-list a',
     headerAccountSwitchCompany:  '.c-account-preview-list .c--company',

    //Give Menu
    headerGiveMenuBtn: '.c-header-give-dropdown > div.p-dropdown__item-trigger > button',
    headerGiveMenuContent: '.c-header-give-dropdown__content',
    headerGiveMenuFirstHeading: 'h2.c-header-give-contents__heading',
    headerGiveMenuGiveHeading: '.c-header__button-wrapper > div:nth-child(2) > div > div.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div.c-give-cta.c--give > div.c-give-cta__description > h3',
    headerGiveMenuGiveButton: '.c-header__button-wrapper > div:nth-child(2) > div > div.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div.c-give-cta.c--give > div.c-give-cta__action > a',
    headerGiveMenuSendHeading: '.c-header__button-wrapper > div:nth-child(2) > div > div.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div.c-give-cta.c--send > div.c-give-cta__description > h3',
    headerGiveMenuSendButton: '.c-header__button-wrapper > div:nth-child(2) > div > div.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div.c-give-cta.c--send > div.c-give-cta__action > a',

    // Add Section of Give Menu
    headerGiveMenuAddDropDownHeading: '.c-header__button-wrapper .c-header-give-dropdown .c-header-give-dropdown__content.p--open .c-give-cta:nth-of-type(1) .p-collapsible-item__heading',
    headerGiveMenuAddHeading: '.c-header__button-wrapper > div:nth-child(2) > div > div.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div:nth-child(2) > div.c-give-cta__description > h3',
    headerGiveMenuAddButton: '.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div:nth-child(2) > div.c-give-cta__action > a',
    headerGiveMenuAddDropDownText: '.c-header__button-wrapper > div:nth-child(2) > div > div.c-header-dropdown-item__contents.c-header-give-dropdown__content.p-dropdown__item-contents.p--open.p--right.p--sm > div > div:nth-child(2) > div.c-give-cta__description > div > div:nth-child(2) > div > div > div > p',

    //Global Footer
    preFooter: '.c-prefooter',
    footer: '.c-footer-primary',
    postFooter: '.c-postfooter',
    subFooter: '.c-footer-secondary',
    footerLogo: '.c-footer-secondary__logo',
    footerDigicert: '.c-footer-secondary__badges > img',
    footerProdDigicert: '.c-footer-secondary__badges #DigiCertClickID_XGKQnVGQ',
    footerMadeWith: '.c-footer-secondary__center > p:nth-child(1)',
    footerCopyright: '.c-footer-secondary__copyright',
    footerSocial: '.c-social-icons',
    footerTwitter: '.c-social-icons > a:nth-child(1) > svg',
    footerFacebook: '.c-social-icons > a:nth-child(2) > svg',
    footerInstagram: 'body > div.bonobo.footer > footer > div.c-footer-primary > div:nth-child(1) > div.c-social-icons > a:nth-child(3) > svg',
    footerVimeo: '.c-social-icons > a:nth-child(4) > svg',
    footerFees: '.c-footer-primary a[href="/fees"]',
    footerHelp: '.c-footer-primary a[href="http://help.chimp.net/"]',
    footerContact: '.c-footer-primary a[href="/contact"]',
    footerHello: '.c-footer-primary__section.c--right-align a[href="mailto:hello@chimp.net"]',
    footerCall: '.c-footer-primary__section.c--right-align a[href="tel:+18775310580"]',
    footerAbout: '.c-footer-primary a[href="/about"]',
    footerCareers: '.c-footer-primary a[href="/careers"]',
    footerPress: '.c-footer-primary a[href="/press"]',
    footerTrust: '.c-footer-primary a[href="/trust"]',
    footerPrivacy: '.c-footer-primary__section.c--right-align a[href="/privacy"]',
    footerTerms: '.c-footer-primary__section.c--right-align a[href="/terms"]',
    footerAgreement: '.c-footer-primary__section.c--right-align a[href="/chimp-account-agreement"]',
    footerLang: '.c-footer-primary__section.c--right-align > div:nth-child(3) > a',



};
