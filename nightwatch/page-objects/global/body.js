// A section available on all page objects for 
// centralizing our selectors for things that are apended
// to the dom like tool tips,

module.exports = {
    selector: 'body',
    sections: {
        welcomeModal: {
            selector: '.c-welcome-modal',
            elements: {
                welcomeClose: '.c-modal-small__close',
                welcomeImg: '.c-feature-card__img',
                welcomeContent: '.c-feature-card__content',
                slideOne: '.slick-slide[data-index="0"]',
                    slideOneDescription: '.slick-slide[data-index="0"] .c-feature-card__description',
                    slideOneBtn: '.slick-slide[data-index="0"] .c-button',
                slideTwo: '.slick-slide[data-index="1"]',
                    slideTwoDescription: '.slick-slide[data-index="1"] .c-feature-card__description',
                    secondPip: '.c-welcome-modal li:nth-child(2) > button',
                    slideTwoBtn: '.slick-slide[data-index="1"] .c-button',
                slideThree: '.slick-slide[data-index="2"]',
                    slideThreeDescription: '.slick-slide[data-index="2"] .c-feature-card__description',
                    thirdPip: '.c-welcome-modal li:nth-child(3) > button',
                    slideThreeBtn: '.slick-slide[data-index="2"] .c-button',
            }
        },
        legacyOnboardingPanels: {
            selector: '.onboarding-panel'
        }
    },
    commands:[{
        openNewUserOnboardingModal: function (){
            // make sure we're working from 0 onboarding cookies
            this.api.deleteCookie('onboarding');

            // this automatically refreshes the page so you don't need to do it in your tests
            this.setYAMLCookie('onboarding', {new_user: true});
            return this;
        },
        openNewEmployeeOnboardingModal: function (){
            this.api.deleteCookie('onboarding');
            this.setYAMLCookie('onboarding', {employee: true});
            return this;
        },
        openGroupInviteOnboardingModal: function (){
            this.api.deleteCookie('onboarding');
            this.setYAMLCookie('onboarding', {group_invite: true});
            return this;
        },
        openNewBeneficiaryOnboardingModal: function (){
            this.api.deleteCookie('onboarding');
            this.setYAMLCookie('onboarding', {new_user: true, beneficiary: true});
            return this;
        }
    }],
    elements: {
        helpText: '.help-text',
    }
}
