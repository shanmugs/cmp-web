// Sections available to all Marketing pages.
// When creating a new marketing page object, require this file and pass it to your object's section
// property

var header = require('./header');
var modal = require('./modal');
var body = require('./body');

module.exports = {
    header,
    modal,
    body,
    preFooter: { selector: '.c-prefooter' },
    postFooter: { selector: '.c-postfooter' },
    footer: { selector: '.c-footer' }
}
