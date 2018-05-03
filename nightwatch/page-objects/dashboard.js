var appSections = require('./global/appSections');
var sections = appSections;
// could add additional sections here with sections.sectionName = { selector: '.selectoClass'}

module.exports = {
    url: function () {
        return this.api.launchUrl + '/dashboard';
    },
    sections: sections,
    elements: {
        accountNav: '.c-header-account-dropdown__trigger-avatar',
    }
}
