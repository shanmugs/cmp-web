// 
var sections = require('./global/landingSections');

module.exports = {
    url: function () {
        return this.api.launch_url + 'contact';
    },
    
    sections: sections,
     elements: {
        heroImg: '.contact .hero',
       
    }
}
