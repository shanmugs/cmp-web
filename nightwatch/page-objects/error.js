// 
var sections = require('./global/landingSections');

module.exports = {
    url: function () {
        return this.api.launch_url + 'error';
    },
    
    sections: sections,
     elements: {
        chimpBricked: '.c-error-view__img',
       
    }
}
