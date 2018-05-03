var appSections = require('./global/appSections');
var sections = appSections;

// could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}

module.exports = {
     url: function () {
        return this.api.launchUrl + 'user/edit';
    },
    sections: sections,
    commands: [{

    }],
    elements: {
        accountContent: '.tools-page',
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

    }
}
