
module.exports = {
    '@tags': ['staging', 'critical-stage', 'gemini'],

    setUp: function(browser) {
        var login = browser.page.login();
        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        var dashboard = browser.page.dashboard();

        dashboard
            .waitForElementVisible('@accountNav');
            
        var sendP2P = browser.page.sendP2P();

        sendP2P
            .navigate();
    },

	'Verify user can send a p2p to a single, unregistered recipient': function(browser) {
        var sendP2P = browser.page.sendP2P();
        var transferForm = sendP2P.section.transferForm;

        transferForm
            .fillInForm({
                amount: '5.00',
                fundType: 'personal',
                recipients: 'solo-flier@mailinator.com,'
            })
            .waitForElementVisible('@continue');

        sendP2P
            .submitForm('@newTransferDetails')
            .expect.section('@confirmGift').to.be.visible;


        browser.end();
    },

    'Verify user can send a p2p to multiple recipients': function(browser) {
        var sendP2P = browser.page.sendP2P();
        var transferForm = sendP2P.section.transferForm;

        transferForm
            .fillInForm({
                amount: '5.00',
                fundType: 'personal',
                recipients: 'solo-flier@mailinator.com\, duo-flier@mailinator.com,'
            })
            .waitForElementVisible('@continue');

        sendP2P
            .submitForm('@newTransferDetails')
            .expect.section('@confirmGift').to.be.visible;


        browser.end();
    },

    'Verify user can send a p2p to an existing user': function(browser) {
        var sendP2P = browser.page.sendP2P();
        var transferForm = sendP2P.section.transferForm;

        transferForm
            .fillInForm({
                amount: '5.00',
                fundType: 'personal',
                recipients: 'chimpautomation+p2p@gmail.com,'
            })
            .waitForElementVisible('@continue');

        sendP2P
            .submitForm('@newTransferDetails')
            .expect.section('@confirmGift').to.be.visible;


        browser.end();
    },

    'Verify user can send a 1.00 p2p to a single recipient': function(browser) {
        var sendP2P = browser.page.sendP2P();
        var transferForm = sendP2P.section.transferForm;

        transferForm
            .fillInForm({
                amount: '1.00',
                fundType: 'personal',
                recipients: 'solo-flier@mailinator.com,'
            })
            .waitForElementVisible('@continue');

        sendP2P
            .submitForm('@newTransferDetails')
            .expect.section('@confirmGift').to.be.visible;


        browser.end();
    },
    
    'Verify user can not send a p2p that is less than 1.00': function(browser) {
        var sendP2P = browser.page.sendP2P();
        var transferForm = sendP2P.section.transferForm;

        transferForm
            .fillInForm({
                amount: '0.50',
                fundType: 'personal',
                recipients: 'solo-flier@mailinator.com,'
            })
            .waitForElementVisible('@continue');

        sendP2P
            .submitForm('@newTransferDetails')
            .expect.section('@transferForm').to.be.visible;


        browser.end();
    },

    };