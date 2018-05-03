//These tests are for the outside the wall or marketing pages
//when they contain the signed-out header.
//Authenticated header tests live at authHeader.js

module.exports = {
    selector: '.c-modal',
    commands: [{
        enterSearchText: function(input){
            this.setValue('@headerSearchInput', input);
            this.api.waitForAnimation();
            this.api.pause(2000)
            this.verify.elementsPresent( '@headerSearchResultsName' )
            return this.verify.elementsPresent( '@headerSearchResultsArrow' );
            
        },
        close: function() {
            this.triggerTouch('@headerSearchClose')
            this.api.waitForAnimation();
            return this;
        }

    }],
    elements: {
        modal: '.c-modal',
            modalHeader: '.c-modal__header',
                modalTitle: '.c-modal__title',
            modalCloseButton: '.c-modal__close',
            modalContent: '.c-modal__content',
        headerSearchInput: '#header-search',
        headerSearchClose: '.c-modal__close',
        headerSearchResults:'.c-modal-search__results',
        headerSearchResultsName: '.c-list-preview__list-item-name',
        headerSearchResultsArrow: '.c-list-preview__list-item-icon-end > svg',
        
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
        resetPwdForm: '.c-pwd-reset-form',
        resetPwdFormEmailField: '.c-pwd-reset-form input[name="login_or_email"]',
        resetPwdFormSubmitBtn: '.c-pwd-reset-form button[type="submit"]',
        resetPwdSuccess: '.qa-pwd-reset-success',
        resetPwdSuccessHeading: '.qa-pwd-reset-success h3',
        resetPwdSuccessMessage: '.qa-pwd-reset-success p',
        resetPwdFailureMessage: '.c-form-errors__message',
        resetPwdSuccessCloseButton: '.qa-pwd-reset-success button',

headerGiveMenuFirstHeading: '.c-header-give-contents__heading',
    

        
    }
}
