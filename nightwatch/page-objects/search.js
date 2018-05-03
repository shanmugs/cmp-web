var appSections = require('./global/appSections');
var modal = require('./global/modal');
var sections = appSections;

module.exports = {
    url: function() {
        return this.api.launchUrl + 'search';
    },
    sections: sections,
    commands: [{
    
    }],
    elements: {
        searchForm: '#q.main-search',

    }
}


