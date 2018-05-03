module.exports = {
    selector: '.c-footer',
    commands: [{
        toggleLanguage: function() {
            this.waitForElementVisible('@langToggle')
                .verify.containsText('@langToggle', 'Parlez-vous français?')
                .triggerTouch('@langToggle')
                .waitForElementVisible('@langToggle')
                .verify.containsText('@langToggle', 'Do you speak English?')
                .triggerTouch('@langToggle')
                .waitForElementVisible('@langToggle')
                .verify.containsText('@langToggle', 'Parlez-vous français?')
            return this;
        }
    }],
    elements: {
        footer: '.c-footer-primary',
        subFooter: '.c-footer-secondary',
        footerLogo: '.c-footer-secondary__logo',
        footerDigicert: '.c-footer-secondary__badges img',
        footerProdDigicert: '.c-footer-secondary__badges #DigiCertClickID_XGKQnVGQ',
        footerMadeWith: '.c-footer-secondary__center > p:nth-child(1)',
        footerCopyright: '.c-footer-secondary__copyright',
        footerSocial: '.c-social-icons',
        footerTwitter: '.c-social-icons > a:nth-child(1) > svg',
        footerFacebook: '.c-social-icons > a:nth-child(2) > svg',
        footerInstagram: '.c-social-icons > a:nth-child(3) > svg',
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
        langToggle: '.qa-lang-toggle'
    }
}
