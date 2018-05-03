module.exports = {

    //User dashboard selectors live here
    gearButton: '.gear-btn',
    gearDropdown: 'tbody > tr > td.last > div > div.small-dropdown-body',
    gearDropdownLink: 'tbody > tr > td.last > div > div.small-dropdown-body > a',
    successBanner: '.flash-msg-body',

    //Account Page
    accountContent: '.tools-page',

    //Money Flow: Add
    newDonationForm: '#new_donation_details',
    newDonationAmount: '#donation_details_amount',
    newDonationChooseFund: '#fund_selector',
    newDonationStripeSelect: '#stripe_cards_select',
    newDonationStripeSelectNew: 'option[value="-1"]',
    newDonationStripeSelectFirst: '#stripe_cards_select option:nth-of-type(1)',
    newDonationStripeName: '#stripe_card_name',
    newDonationStripeNumber: '#stripe_card_number',
    newDonationStripeMonth: '#stripe_expiry_month',
    newDonationStripeYear: '#stripe_expiry_year',
    newDonationStripeCVV: '#stripe_cvv',
    newDonationSubmitBtn: '#new_donation_details > div:nth-child(5) > button',
    newDonationSuccessName: '#donation_trp_full_name',
    newDonationMatchSelect: '#donation_details_employee_role_id',
    newDonationMatchSuccess: '#new_donation_confirm > div.form-wrapper.pam > h6:nth-child(7)',


    //Money Flow: Change Tax Receipt Profile
    changeAddressBtn: '.confirm-change',
    changeAddressForm: '#new_donation_trp',
    changeAddressFullName: '#donation_trp_full_name',
    changeAddressSubmit: '#new_donation_trp button',
    changeAddressReceiptToggle: '#receipt-toggle',
    changeAddressConfirmDonationSubmitBtn: '#confirm-page-button',
    //Donor Photo specific
    photoContentWrapper: '.tools-wrapper.settings-avatar.f-right',
    photoUploadArea: '#upload-area',
    photoTitle: '.tools-wrapper.settings-avatar.f-right > h2',
    photoUploadedImg: '#uploaded-image',
    photoTextBlurb: '.p-image-upload__text',
    photoUploadButton: '#image-upload-button',
    photoSelectButton: '#image-select-button',
    photoCancelUpload: '#image-upload-cancel-button',
    photoSliderContainer: '#slider-container',
    photoResizeSlider: '#image-resize-slider',
    photoHiddenUploadField: '#image-upload-field',
    photoUploadOverlay: '#upload-overlay',
    photoUploadProgress: '.p--loading-image',
    photoUploadSuccess: '.p--upload-success',

    //Account Settings
    accountSettingsHeader: '.tools-page .tabs-left h5',
    accountSettingsPersonalInfoLink: '.tools-page .tabs-left li:nth-of-type(1)',
    accountSettingsEmailAddressesLink: '.tools-page .tabs-left li:nth-of-type(2)',
    accountSettingsPreferencesLink: '.tools-page .tabs-left li:nth-of-type(3)',
    accountSettingsCreditCardsLink: '.tools-page .tabs-left li:nth-of-type(4)',
    accountSettingsTaxReceiptProfiles: '.tools-page .tabs-left li:nth-of-type(5)',

    //Account Settings
    accountSettingsHeader: '.tools-page .tabs-left h5',
    accountSettingsPersonalInfoLink: '.tools-page .tabs-left li:nth-of-type(1)',
    accountSettingsEmailAddressesLink: '.tools-page .tabs-left li:nth-of-type(2)',
    accountSettingsPreferencesLink: '.tools-page .tabs-left li:nth-of-type(3)',
    accountSettingsCreditCardsLink: '.tools-page .tabs-left li:nth-of-type(4)',
    accountSettingsTaxReceiptProfiles: '.tools-page .tabs-left li:nth-of-type(5)',

    //Tax Receipts
    taxReceiptHeader: '.tools-page .tools-wrapper h1',
    taxReceiptTable: '.tools-page .tools-wrapper table',
    taxReceiptTableRows: '.tools-page .tools-wrapper table tr',
    taxReceiptForm: '.edit_tax_receipt_profile',
    taxReceiptFormName: '#tax_receipt_profile_full_name',
    taxReceiptFormAddressOne: '#tax_receipt_profile_address_address_one',
    taxReceiptFormAddressTwo: '#tax_receipt_profile_address_address_two',
    taxReceiptFormAddressCity: '#tax_receipt_profile_address_city',
    taxReceiptFormAddressCountry: '#tax_receipt_profile_address_country',
    taxReceiptFormAddressPost: '#tax_receipt_profile_address_postal_code',
    taxReceiptFormAddressProv: '#tax_receipt_profile_address_province',
    taxReceiptFormSubmit: '.tools-wrapper button.med.normal',
    taxReceiptFormError: '.form-row.form-alert.error',

    //Company Dashboard
    companyDash: '.corp-admin-buttons',
    companyTaxReceiptRecipients: '.bonobo-legacy > div.inner-wrapper li:nth-child(6) > a',

    // Send Money
    sendMoneyRecurringDay: '#transfer_details_recurring_day_of_month',
    sendMoneyPaymentContainer: '#transfer_details_payment_wrapper',
    sendMoneySelectTaxReceiptRecipient: '#receipt-toggle',
    sendMoneyTaxReceiptSubmit: '#new_donation_trp > button',

    // Recurring Gifts
    recurringGiftsTable: '#recurring-gifts-table',
    recurringGiftsDeleteModal: '#modal-delete',
};
