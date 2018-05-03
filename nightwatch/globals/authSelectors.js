module.exports = {
 
 
    //Log In page specifc
    logInSubmit: '#login_form > button',
    logInUsername: 'input[type="text"]',
    logInPassword: 'input[type="password"]',
    logInForgot: '#login_form > a',
    logInSidebar: '.sidebar',
    logInSidebarBtn: '.sidebar > div > div > div > button',
    logInError: '.error',
    logInErrorMsg: '.flash-msg-body',
    logInErrorClose: '#feed > div > div.flash-container.alert.error > div:nth-child(3) > a',

    //Account Page
    accountContent: '.tools-page',

    //Reset Password
    resetPwdForm: '.c-pwd-reset-form',
    resetPwdFormEmailField: '.c-pwd-reset-form input[name="login_or_email"]',
    resetPwdFormSubmitBtn: '.c-pwd-reset-form button[type="submit"]',
    resetPwdSuccess: '.qa-pwd-reset-success',
    resetPwdSuccessHeading: '.qa-pwd-reset-success h3',
    resetPwdSuccessMessage: '.qa-pwd-reset-success p',
    resetPwdSuccessCloseButton: '.qa-pwd-reset-success button',

    //Give Specific
    //Group
    existingAccountPrompt: '#feed > div.inner > div.alert.warning.mln.mrn.prl > h5 > a',
    groupNameField: '#group_name',
    giftAmount: '#transfer_details_amount',
    groupOptionalMsg: '#transfer_details_group_note',
    groupGiftMsgToolTtp: '#new_transfer_details > div:nth-child(5) > div > b > a',
    groupNewGiftBtn: '#new_transfer_details > button',
    groupGiftAmountError: '.form-alert .alert-label',

    //Beneficiary
    beneficiaryNameField: '#beneficiary_name',
    beneficiaryOptionalMsg: '#transfer_details_beneficiary_note',
    beneficiaryGiftMsgToolTip: '#new_transfer_details > div:nth-child(5) > div.textarea-row > b > a',
    beneficiaryShareInfo: '#transfer_details_privacy_option',
    beneficiaryShareInfoToolTip: '#new_transfer_details > div:nth-child(5) > div.form-row > b > a',

    //Payment Info
    trpForm: '#new_donation_trp',
    trpFullName: '#donation_trp_full_name',
    trpAddressOne: '#donation_trp_address_one',
    trpAddressTwo: '#donation_trp_address_two',
    trpCity: '#donation_trp_city',
    trpPostCode: '#donation_trp_postal_code',
    trpProvince: '#donation_trp_province',
    trpCountry: '#donation_trp_country',
    alertLabel: '#new_donation_trp > div:nth-child(7) > div.form-row.form-alert.error > div.alert-label',
    ccAlertLabel: '#stripe_cc_form_fields > div.form-row.form-alert.error > div',
    ccExpiryAlertLabel: '#stripe_cc_form_fields > div.form-row-half.form-alert.error > div.alert-label',
    trpSubmitBtn: '#new_donation_trp > button',

    //OTD Account Registration
    claimAccountPrompt: '#new_claim_account > div.upgrade-content > div.form-row.otd-checkbox > div > span',
    claimAccountEmail: '#claim_account_email',
    claimAccountFirstName: '#claim_account_first_name',
    claimAccountLastName: '#claim_account_last_name',
    claimAccountPass: '#claim_account_password',
    claimAccountBtn: '#new_claim_account > button',
    claimAccountError: '#create_account_fields > div.form-row.form-alert.error > div',

    //Confirmation Page
    confirmChangeAddress: '#new_transfer_confirm > div.form-wrapper.pam > h2:nth-child(12) > a',
    confirmMakeChanges: '#new_transfer_confirm > p > a',
    confirmBtn: '#confirm-page-button',
    giveSuccessNotice: '.success-title',
    backToGroupLink: '#feed > div.inner > div.form-wrapper > div.clear.ptl.mtl > div > a',
    claimAccountActivationNotice: '#feed > div.inner > div.form-wrapper > div.clear.ptl.mtl > p', 
  };
