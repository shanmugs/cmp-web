const path = require('path');

module.exports = function(originalUrl) {
    return !!path.extname(originalUrl);
}
