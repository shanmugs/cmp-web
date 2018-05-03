import { defineMessages } from 'react-intl';

/* TODO: Delete these messages and referece all the messages in format message with id instead.
(look at p2p-allocations/views/Success for reference) */
const messages = defineMessages({
    breadcrumbGive: {
        description: 'Give message for Breadcrumb',
        defaultMessage: 'Give',
        id: 'giving.breadcrumbGive',
    },
    breadcrumbAddMoney: {
        description: 'Add Money message for Breadcrumb',
        defaultMessage: 'Add Money',
        id: 'giving.breadcrumbAddMoney',
    },
    breadcrumbTaxReceipt: {
        description: 'Tax receipt message for Breadcrumb',
        defaultMessage: 'Tax Receipt',
        id: 'giving.breadcrumbTaxReceipt',
    },
    breadcrumbReview: {
        description: 'Review message for Breadcrumb',
        defaultMessage: 'Review',
        id: 'giving.breadcrumbReview',
    },
    breadcrumbDone: {
        description: 'Done message for Breadcrumb',
        defaultMessage: 'Confirmation',
        id: 'giving.breadcrumbDone',
    },
    continueButton: {
        description: 'Continue button label',
        defaultMessage: 'Continue',
        id: 'giving.continueButton',
    },
    fullName: {
        description: 'Full name',
        defaultMessage: 'Full Name',
        id: 'giving.fullName',
    },
    fullNamePopup: {
        description: 'Popup message for full name',
        defaultMessage: 'This must be the name of the person who pays the credit card bill. Please include your first name, middle initial, and last name.',
        id: 'giving.fullNamePopup',
    },
    fullNamePlaceHolder: {
        description: 'Place holder message for full name',
        defaultMessage: 'Full legal name',
        id: 'giving.fullNamePlaceHolder',
    },
    address: {
        description: 'Address',
        defaultMessage: 'Address',
        id: 'giving.address',
    },
    addressPlaceHolder: {
        description: 'Place holder for address',
        defaultMessage: '123 Street Road',
        id: 'giving.addressPlaceHolder',
    },
    secondAddress: {
        description: 'Second address',
        defaultMessage: 'Address Two',
        id: 'giving.secondAddress',
    },
    secondAddressPlaceHolder: {
        description: 'Place holder for second address',
        defaultMessage: 'Apt/Suite number',
        id: 'giving.secondAddressPlaceHolder',
    },
    city: {
        description: 'City',
        defaultMessage: 'City',
        id: 'giving.city',
    },
    cityPlaceHolder: {
        description: 'Place holder for city',
        defaultMessage: 'City name',
        id: 'giving.cityPlaceHolder',
    },
    country: {
        description: 'Country',
        defaultMessage: 'Country',
        id: 'giving.country',
    },
    countryPlaceHolder: {
        description: 'Place holder for country',
        defaultMessage: 'Canada',
        id: 'giving.countryPlaceHolder',
    },
    postalCode: {
        description: 'postal code',
        defaultMessage: 'Postal Code',
        id: 'giving.postalCode',
    },
    postalCodePlaceHolder: {
        description: 'Place holder for postalCode',
        defaultMessage: 'Z1Z 1Z1',
        id: 'giving.postalCodePlaceHolder',
    },
    province: {
        description: 'Province',
        defaultMessage: 'Province',
        id: 'giving.province',
    },
    provincePlaceHolder: {
        description: 'Place holder for province',
        defaultMessage: 'Select a province or state',
        id: 'giving.provincePlaceHolder',
    },
    state: {
        description: 'state',
        defaultMessage: 'State',
        id: 'giving.state',
    },
    zip: {
        description: 'zip',
        defaultMessage: 'Zip',
        id: 'giving.zip',
    },
    giveHeader: {
        description: 'Give Header label',
        defaultMessage: 'Give',
        id: 'giving.giveHeader',
    },
    noteToSelfPlaceHolder: {
        description: 'Placeholder for not to self input',
        defaultMessage: 'Why are you giving today?',
        id: 'giving.noteToSelfPlaceHolder',
    },
    givingNoteToSelfPopup: {
        description: 'Popup message for self',
        defaultMessage: 'This is just to remind yourself why you gave the money. It’ll only appear on your dashboard.',
        id: 'giving.givingNoteToSelfPopup',
    },
    generalInputPlaceHolder: {
        description: 'Placeholder for general input',
        defaultMessage: 'Type your message here',
        id: 'giving.generalInputPlaceHolder',
    },
    amountLabel: {
        description: 'Giving Amount Label',
        defaultMessage: 'Amount',
        id: 'giving.amountLabel',
    },
    giveGroupLabel: {
        description: 'Giving Group Label',
        defaultMessage: 'Group',
        id: 'giving.giveGroupLabel',
    },
    giveFromLabel: {
        description: 'Giving Give From Label',
        defaultMessage: 'Give From',
        id: 'giving.giveFromLabel',
    },
    forGroupLabel: {
        description: 'Giving For Group Label',
        defaultMessage: 'For Group',
        id: 'giving.ForGroupLabel',
    },
    noteToSelfLabel: {
        description: 'Giving Note to Self Label',
        defaultMessage: 'Note to Self',
        id: 'giving.noteToSelfLabel',
    },
    emailInputPlaceHolder: {
        description: 'Placeholder for email input',
        defaultMessage: 'Enter email addresses, separated with commas.',
        id: 'giving.emailInputPlaceHolder',
    },
    forRecipientPopup: {
        description: 'Popup message for recipients input',
        defaultMessage: 'Tell your friend why you\'re making this charitable gift. They\'re more likely to trust and accept it if they read a personal message from you.',
        id: 'giving.forRecipientPopup',
    },
    recipientPopup: {
        description: 'Popup message for recipients email list',
        defaultMessage: 'You can give a gift to multiple recipients at the same time, just separate email addresses with a comma.',
        id: 'giving.recipientPopup',
    },
    changeAddressText: {
        description: 'Change address',
        defaultMessage: 'Want to change this address? ',
        id: 'giving.changeAddressText',
    },
    makeChangesText: {
        description: 'Link for address change',
        defaultMessage: 'Make changes here',
        id: 'giving.makeChangesText',
    },
    addingToLabel: {
        description: 'Giving Adding to Label',
        defaultMessage: 'Adding To',
        id: 'giving.addingToLabel',
    },
    automaticDonationLabel: {
        description: 'Giving Automatic Donation Label',
        defaultMessage: 'Automatic Donation',
        id: 'giving.automaticDonationLabel',
    },
    recurringMontlyDonationLabel: {
        description: 'Giving recurring monthly donation Label',
        defaultMessage: 'Make this a recurring monthly donation',
        id: 'giving.recurringMontlyDonationLabel',
    },
    donationOnWhatDayLabel: {
        description: 'Giving On what day Label',
        defaultMessage: 'On what day?',
        id: 'giving.donationOnWhatDayLabel',
    },
    donationMatchLabel: {
        description: 'Giving On what day Label',
        defaultMessage: 'Donation Match',
        id: 'giving.donationMatchLabel',
    },
    testCreditCardLabel: {
        description: 'Giving Test Credit card Label',
        defaultMessage: 'Use a test credit card',
        id: 'giving.testCreditCardLabel',
    },
    testCreditCardListLabel: {
        description: 'Giving Test Credit card List Label',
        defaultMessage: '{showtestcardlabel}',
        id: 'giving.testCreditCardListLabel',
    },
    testCreditCardListMessage: {
        description: 'Giving Test Credit card List Message Label',
        defaultMessage: 'More information on test accounts can be found at Stripe.',
        id: 'giving.testCreditCardListMessage',
    },
    creditCardLabel: {
        description: 'Giving Credit Card Label',
        defaultMessage: 'Credit Card',
        id: 'giving.creditCardLabel',
    },
    addMoneyToAccountLabel: {
        description: 'Giving Add Money to Account Label',
        defaultMessage: 'Add Money',
        id: 'giving.addMoneyToAccountLabel',
    },
    cardNumberLabel: {
        id: 'giving.cardNumberLabel',
        description: 'Credit Card Number',
        defaultMessage: 'Card Number',
    },
    nameOnCardLabel: {
        id: 'giving.nameOnCardLabel',
        description: 'Name on Credit card',
        defaultMessage: 'Name on Card',
    },
    expiryDateLabel: {
        id: 'giving.expiryDate',
        description: 'Credit Card Expiry Date',
        defaultMessage: 'Expiry Date',
    },
    cvvLabel: {
        id: 'giving.cvv',
        description: 'Credit card CVV no',
        defaultMessage: 'CVV',
    },
});

const errorMessages = defineMessages({
    blankError: {
        description: 'Error message for blank input',
        defaultMessage: '- Can\'t be blank',
        id: 'giving.blankError',
    },
    minTwoCharsError: {
        description: 'Error message for input less than two chars',
        defaultMessage: '- is too short (minimum is 2 characters)',
        id: 'giving.minTwoCharsError',
    },
    minFiveCharsError: {
        description: 'Error message for input less than five chars',
        defaultMessage: '- is too short (minimum is 5 characters)',
        id: 'giving.minFiveCharsError',
    },
    invalidNumberError: {
        description: 'Error message for an invalid number',
        defaultMessage: '- must be a valid dollar amount.',
        id: 'giving.invalidNumberError',
    },
    invalidMinAmountError: {
        description: 'Error message for an invalid min amount',
        defaultMessage: '- The minimum gift you can send is $1',
        id: 'giving.invalidMinAmountError',
    },
    invalidMaxAmountError: {
        description: 'Error message for an invalid max amount',
        defaultMessage: '- The maximum gift you can send is $ 1,000,000,000 dollars.',
        id: 'giving.invalidMaxAmountError',
    },
    invalidLengthError: {
        description: 'Error message for an invlid length',
        defaultMessage: '- is too long (maximum is 1000 characters)',
        id: 'giving.invalidLengthError',
    },
    invalidEmailError: {
        description: 'Error message for an invalid email',
        defaultMessage: '- Enter valid email addresses, separated with commas.',
        id: 'giving.invalidEmailError',
    },
    cardNumber: {
        description: 'Credit card is not valid',
        defaultMessage: 'Your card no is not valid!',
        id: 'giving.errorCardNumber',
    },
    expiryYear: {
        description: 'Credit card expiry date is not valid',
        defaultMessage: 'Your card expiry MM/YYYY is not valid!',
        id: 'giving.errorExpiryDate',
    },
    cvv: {
        description: 'Credit card cvv is not valid',
        defaultMessage: 'Your cvv is not valid!',
        id: 'giving.errorCVV',
    },
});

export {
    messages,
    errorMessages,
};
