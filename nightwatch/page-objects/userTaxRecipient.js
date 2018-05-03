var appSections = require('./global/appSections');
var sections = appSections;

function createTRSection(index) {
    return {
        selector: '.qa-tax-receipt:nth-of-type(' + index + ')',
        elements: {
            gearBtn: ' .gear-btn',
            gearDropdown: '.action-drop',
            gearDropdownLink: '.action-drop a',
        },
        commands: [{
            edit: function(){
                this
                    .triggerTouch('@gearBtn')
                    .waitForElementVisible('@gearDropdown')
                    .verify.containsText('@gearDropdownLink', 'Edit')
                    .triggerTouch('@gearDropdownLink');

                return this;
            }
        }]
    }
}

sections.firstTR = createTRSection(1);

module.exports = {
    url: function () {
        return this.api.launchUrl + 'user/tax-receipt-profiles';
    },
    sections: sections,
    commands: [{
        submit: function (values) {
        	var fullName = values.fullName || null;
            var addressOne = values.addressOne || null;
            var addressTwo = values.addressTwo || null;
            var city = values.city || null;
            var postal = values.postal || null;
            var province = values.province || null;

            this
                .verify.elementPresent('@name')
            	.verify.elementPresent('@addressOne')
            	.verify.elementPresent('@addressTwo')
            	.verify.elementPresent('@addressCity')
            	.verify.elementPresent('@addressPost')
            	.verify.elementPresent('@addressProv')
            	.verify.elementPresent('@submit')

            if (fullName){
                this.clearValue('@name')
                    .setValue('@name', fullName)
            }

            if (addressOne){
                this.clearValue('@addressOne')
                    .setValue('@addressOne', addressOne);
            }

            if (addressTwo) {
                this.clearValue('@addressTwo')
                    .setValue('@addressTwo', addressTwo);
            }

            if (city) {
                this.clearValue('@addressCity')
                    .setValue('@addressCity', city);
            }

            if (postal) {
                this.clearValue('@addressPost')
                    .setValue('@addressPost', postal);
            }

            if (province) {
                this.clearValue('@addressProv')
                    .setValue('@addressProv', province);
            }
            //let setValue finish adding text:
            this.api.pause(1000);

        	this
            	.verify.elementPresent( '@submit' )
                .triggerTouch('@submit');

            return this;
        }
    }],
    elements: {
        successBanner: '.flash-msg-body',
        header: '.tools-page .tools-wrapper h1',
        table: '.qa-tax-receipt-table',
        tableRows: '.qa-tax-receipt',
        form: '.edit_tax_receipt_profile',
        name: '#tax_receipt_profile_full_name',
        nameError: '#tax_receipt_profile_full_name ~ .alert-label',
        addressOne: '#tax_receipt_profile_address_address_one',
        addressOneErrorText: '#tax_receipt_profile_address_address_one ~ .alert-label',
        addressTwo: '#tax_receipt_profile_address_address_two',
        addressCity: '#tax_receipt_profile_address_city',
        addressCityError: '#tax_receipt_profile_address_city ~ .alert-label',
        addressCountry: '#tax_receipt_profile_address_country',
        addressPost: '#tax_receipt_profile_address_postal_code',
        addressPostError: '#tax_receipt_profile_address_postal_code ~ .alert-label',
        addressProv: '#tax_receipt_profile_address_province',
        submit: '.tools-wrapper button.med.normal',
        formError: '.form-row.form-alert.error',

        gearBtn: ' .gear-btn',
            gearDropdown: '.action-drop',
            gearDropdownLink: '.action-drop a',
    }
}
