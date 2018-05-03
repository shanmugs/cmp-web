
module.exports = {
    '@tags': ['staging', 'critical-stage', 'gemini'],


    'Verify that One Time Donor can\'t give less than $5 to a Group': function(browser) {
        var oneTime = browser.page.oneTimeDonation();

        oneTime
        .navigate('group')
        .waitForElementVisible('@newTransferAmount')
        .setValue('@newTransferAmount', '1.00')
        .submitForm('@continueTransferForm')
        .waitForElementVisible('@groupGiftAmountError')
        .verify.containsText('@groupGiftAmountError', 'The transaction amount must be at least $5');
        
        browser.end();
    },

//Group Specific
    'Verify that One Time Donor can give $5 or more to a Group': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;

        oneTime
        .navigate('group')
        .waitForElementVisible('@newTransferAmount')
        .setValue('@newTransferAmount', '5.00')
        .submitForm('@continueTransferForm');

        trpForm
        .waitForElementVisible('@trpFullName');

        browser.end();

    },

//Campaign Specific
    'Verify that One Time Donor can\'t give less than $5 to a Campaign': function(browser) {
        var oneTime = browser.page.oneTimeDonation();

        oneTime
        .navigate('group', 'yyoga-30-day-challenge-richmond-burnaby')
        .waitForElementVisible('@newTransferAmount')
        .setValue('@newTransferAmount', '1.00')
        .submitForm('@continueTransferForm')
        .waitForElementVisible('@groupGiftAmountError')
        .verify.containsText('@groupGiftAmountError', 'The transaction amount must be at least $5');
        
        browser.end();
    },

    'Verify that One Time Donor can give $5 or more to a Campaign': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;

        oneTime
        .navigate('group', 'yyoga-30-day-challenge-richmond-burnaby')
        .waitForElementVisible('@newTransferAmount')
        .setValue('@newTransferAmount', '5.00')
        .submitForm('@continueTransferForm');

        trpForm
        .waitForElementVisible('@trpFullName');

        browser.end();
    },

//Charity Specific
    'Verify that One Time Donor can\'t give less than $5 to a Charity': function(browser) {
        var oneTime = browser.page.oneTimeDonation();

        oneTime
        .navigate('charity')
        .waitForElementVisible('@newTransferAmount')
        .setValue('@newTransferAmount', '1.00')
        .submitForm('@continueTransferForm')
        .waitForElementVisible('@groupGiftAmountError')
        .verify.containsText('@groupGiftAmountError', 'The transaction amount must be at least $5');
        
        browser.end();
    },


    'Verify that One Time Donor can give $5 or more to a Charity': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;

        oneTime
        .navigate('charity')
        .waitForElementVisible('@newTransferAmount')
        .setValue('@newTransferAmount', '5.00')
        .submitForm('@continueTransferForm');

        trpForm
        .waitForElementVisible('@trpFullName');

        browser.end();

    },

//General Money Form Tests
    'Verify Payment Details Blank Field Errors': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: ' ',
                addressOne: ' ',
                city: ' ',
                postCode: ' '
            });

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        trpForm
            .waitForElementVisible('@trpFullNameError')
            .verify.containsText('@trpFullNameError', 'is too short (minimum is 2 characters)')
            .verify.containsText('@trpAddressOneError', 'is too short (minimum is 2 characters)')
            .verify.containsText('@trpCityError', 'is too short (minimum is 2 characters)')
            .verify.containsText('@trpPostCodeError', 'is too short (minimum is 5 characters)')
            .verify.containsText('@trpProvinceError', 'can\'t be blank')

        browser.end();
    },


    'Verify Payment Details Invalid Characters Errors': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: '<Rick Sanchez>',
                addressOne: '<',
                city: '<',
                postCode: '>'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        trpForm
            .waitForElementVisible('@trpFullNameError')
            .verify.containsText('@trpFullNameError', 'please use only regular word characters')
            .verify.containsText('@trpAddressOneError', 'please use only regular word characters')
            .verify.containsText('@trpCityError', 'please use only regular word characters')
            .verify.containsText('@trpPostCodeError', 'please use only regular word characters')
        browser.end();
    },

    'Verify Payment Details US Address': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .setValue('@trpCountry', 'United States')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Beverly Hills',
                postCode: '90210'
            })
            .setValue('@trpProvince', 'California');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt');

        browser.end();
    },

    'Verify Stripe CC Incorrect Number Error': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242421111',
                fullName: ' ',
                expMonth: '11',
                expYear: '2050',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm')
            .waitForElementVisible('@newTransferStripeNumberError')
            .verify.containsText('@newTransferStripeNumberError', 'Your card number is incorrect.');

        browser.end();
    },

    'Verify Stripe CC Invalid Number Error': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: ' ',
                fullName: ' ',
                expMonth: ' ',
                expYear: ' ',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm')
            .waitForElementVisible('@newTransferStripeNumberError')
            .verify.containsText('@newTransferStripeNumberError', 'credit card number must be a valid Visa, Mastercard or Amex card');

        browser.end();
    },

    'Verify Stripe Name on Card Error': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: ' ',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm')
            .waitForElementVisible('@newTransferStripeNameError')
            .verify.containsText('@newTransferStripeNameError', 'is too short (minimum is 2 characters)');

        browser.end();
    },

    'Verify Stripe Expiry Month Error': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'John Doe',
                expMonth: ' ',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm')
            .waitForElementVisible('@newTransferStripeMonthError')
            .verify.containsText('@newTransferStripeMonthError', 'Please provide a 2 digit month');

        browser.end();
    },

    'Verify Stripe Expiry Year Error': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'John Doe',
                expMonth: '12',
                expYear: ' ',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm')
            .waitForElementVisible('@newTransferStripeYearError')
            .verify.containsText('@newTransferStripeYearError', 'Please provide a 4 digit year');

        browser.end();
    },

    'Verify Stripe CVV Error': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'John Doe',
                expMonth: '12',
                expYear: '2020',
                cvv: '1'
            });

        oneTime
            .submitForm('@continueTRPForm')
            .waitForElementVisible('@newTransferStripeCVVError')
            .verify.containsText('@newTransferStripeCVVError', 'Your card\'s security code is invalid.');

        browser.end();
    },


//Claim Account Page Tests
    'Verify Claim Account Blank Errors': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');


        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email: ' ',
                firstName: ' ',
                lastName: ' ',
                password: ' '
            });

        oneTime
            .submitForm('@continueClaimForm');

        claimForm
            .waitForElementVisible('@claimAccountEmailError')
            .verify.containsText('@claimAccountEmailError', 'is invalid')
            .verify.containsText('@claimAccountFirstNameError', 'can\'t be blank')
            .verify.containsText('@claimAccountLastNameError', 'can\'t be blank')
            .verify.containsText('@claimAccountPassError', 'Please provide a password that is at least 8 characters and contains a lower case letter, an upper case letter, a digit and a special character (!@%$#^&~`*())');

        browser.end();
    },

    'Verify Claim Account Invalid Errors': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email: 'chimpautomation+tests13gmail.com',
                firstName: ' <Joe>',
                lastName: ' <Dee> ',
                password: ' <<<<</>'
            });

        oneTime
            .submitForm('@continueClaimForm');

        claimForm
            .waitForElementVisible('@claimAccountEmailError')
            .verify.containsText('@claimAccountEmailError', 'is invalid')
            .verify.containsText('@claimAccountFirstNameError', 'please use only regular word characters')
            .verify.containsText('@claimAccountLastNameError', 'please use only regular word characters')
            .verify.containsText('@claimAccountPassError', 'Please provide a password that is at least 8 characters and contains a lower case letter, an upper case letter, a digit and a special character (!@%$#^&~`*())');

        browser.end();
    },


//Confirm Page Tests
    'Verify OTD can update address via confirm page': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        console.log('TEST', email)
        console.log(browser.globals.testUtils.generateEmail())
        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');


        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmChangeAddress')
            .triggerTouch('@confirmChangeAddress');

        trpForm
            .waitForElementVisible('@trpFullName')
            .setValue('@trpFullName', 'FullName ' + Math.random().toString(36).replace(/[^a-z]+/g, ''));

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                        });
        oneTime
            .submitForm('@continueTRPForm');

        oneTime
            .waitForElementVisible('@confirmBtn');

        browser.end();
    },

    'Verify OTD can use Make Changes link to start over': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var transferForm = oneTime.section.transferForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmMakeChanges')
            .triggerTouch('@confirmMakeChanges');

        transferForm
            .waitForElementVisible('@newTransferAmount');

        browser.end();
    },

    'Verify OTD can social share': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('#share-twitter')
            .verify.elementPresent('#share-facebook')
            .verify.elementPresent('#share-email');

        browser.end();
    },
        
  

  //Workflow Tests
    'Verify One Time Donor can give to Group': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Seanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice')
            .verify.containsText('@backToGroupLink', 'Go back to the group');

        browser.end();
    },

    'Verify One Time Donor can give to Group and receive a match': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group', 'super-fun-email-times')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Seanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice')
            .waitForElementVisible('@matchConfirmHeading')
            .verify.containsText('@matchConfirmHeading', 'Your gift was matched by:');

        browser.end();
    },

    'Verify One Time Donor recieves a match when giving to a group with a matched campaign': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group', 'safe-oceans')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Seanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice')
            .verify.containsText('@matchConfirmHeading', 'Your gift was matched by:');

        browser.end();
    },

      'Verify One Time Donor registration enforces password policy': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email:  email,
                firstName: 'Joe',
                lastName: 'Smith',
                password: 'bad&wrong'
            });

        oneTime
            .submitForm('@continueClaimForm');

        claimForm
            .waitForElementVisible('@claimAccountPassError')
            .verify.containsText('@claimAccountPassError', 'Please provide a password that is at least');

        browser.end();
    },

    'Verify One Time Donor registration disallows existing primary email addresses': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email:  'chimpautomation+tests@gmail.com',
                firstName: 'Joe',
                lastName: 'Smith',
                password: 'Qwerty1234!'
            });

        oneTime
            .submitForm('@continueClaimForm');

        claimForm
            .waitForElementVisible('@claimAccountEmailError')
            .verify.containsText('@claimAccountEmailError', 'an account already exists in our system using that email address.');

        browser.end();
    },


    'Verify One Time Donor registration disallows existing secondary email addresses': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email:  'chimpautomation+secondary@gmail.com',
                firstName: 'Joe',
                lastName: 'Smith',
                password: 'Qwerty1234!'
            });

        oneTime
            .submitForm('@continueClaimForm');

        claimForm
            .waitForElementVisible('@claimAccountEmailError')
            .verify.containsText('@claimAccountEmailError', 'an account already exists in our system using that email address.');

        browser.end();
    },

    'Verify One Time Donor can publicize the amount to the group without creating an account': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var groups = browser.page.groups();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();
        var login = browser.page.login();
        var header = login.section.header;

        oneTime
            .navigate('group','t-rex-sandwich-drive')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '12.99')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'public amount',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .triggerTouch('@claimAccountCheckbox')
            .fillInForm({
                email:  email,
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice');

        header.logout();

        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        groups
            .navigate('t-rex-sandwich-drive' + '/dashboard/comments');

        oneTime
            .verify.containsText('.activity-inner-wrap > h5', 'public amount gave $12.99')

        browser.end();
    },

    'Verify One Time Donor can keep the amount private while registering and giving to a group': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var groups = browser.page.groups();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();
        var login = browser.page.login();
        var header = login.section.header;

        oneTime
            .navigate('group', 'team-rocket')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '11.21')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .triggerTouch('@editPrivacyLink')
            .waitForElementVisible('.checkbox.checked')
            .triggerTouch('@displayAmountCheckbox')
            .waitForElementVisible('.checkbox.unchecked')
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email:  email,
                firstName: 'Private',
                lastName: 'Smith',
                password: 'Qwerty1234!'
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice');

        header.logout();

        login
            .navigate()
            .fillInForm('chimpautomation+tests@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        groups
            .navigate('team-rocket' + '/dashboard/comments');

        oneTime
        .verify.containsText('@groupActivity', 'Private gave money to the group')

        browser.end();
    },

     'Verify One Time Donor can register while giving to Group': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });
        
        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email:  email,
                firstName: 'Joe',
                lastName: 'Smith',
                password: 'Qwerty1234!'
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice');

        browser.end();
    },

    'Verify OTD can set up a recurring allocation to a Group': function(browser) {
        var sendMoney = browser.page.sendMoneyRecurring();
        var confirmTransfer = sendMoney.section.confirmTransfer;
        var login = browser.page.login();
        var header = login.section.header;
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();

        oneTime
            .navigate('group','team-rocket')
            .waitForElementVisible('@newTransferAmount')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00');

        sendMoney
            .click('@sendMoneyRecurringDay');

        oneTime
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Sanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email:  email,
                firstName: 'Joe',
                lastName: 'Smith',
                password: 'Qwerty1234!'
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@submitTransferForm')
            .triggerTouch('@continue')
            .waitForElementVisible('@successCheck');
        
        browser.end();
    },

    'Verify One Time Donor can give to Charity': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();
        
        oneTime
            .navigate('charity')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Seanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .click('@claimAccountCheckbox')
            .fillInForm({
                email: email
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice')

        browser.end();
    },

     'Verify One Time Donor can register while giving to Charity': function(browser) {
        var oneTime = browser.page.oneTimeDonation();
        var trpForm = oneTime.section.trpForm;
        var stripeForm = oneTime.section.stripeForm;
        var claimForm = oneTime.section.claimForm;
        var email = browser.globals.testUtils.generateEmail();
        
        oneTime
            .navigate('charity')
            .waitForElementVisible('@newTransferAmount')
            .setValue('@newTransferAmount', '5.00')
            .submitForm('@continueTransferForm');

        trpForm
            .waitForElementVisible('@trpFullName')
            .fillInForm({
                fullName: 'John Dee',
                addressOne: '1234 Rite Way Lane',
                addressTwo: '#13A',
                city: 'Burnaby',
                postCode: 'V3N4H9'
            })
            .setValue('@trpProvince', 'British Columbia');

        stripeForm
            .verify.elementPresent('@newDonationStripeNumber')
            .fillInForm({
                cardNumber: '4242424242424242',
                fullName: 'Rick Seanchez',
                expMonth: '12',
                expYear: '2020',
                cvv: '123'
            });

        oneTime
            .submitForm('@continueTRPForm');

        claimForm
            .waitForElementVisible('@claimAccountPrompt')
            .fillInForm({
                email: email,
                firstName: 'Joe',
                lastName: 'Smith',
                password: 'Qwerty1234!'
            });

        oneTime
            .submitForm('@continueClaimForm')
            .waitForElementVisible('@confirmBtn')
            .triggerTouch('@confirmBtn')
            .waitForElementVisible('@giveSuccessNotice');

        browser.end();
    },
};
