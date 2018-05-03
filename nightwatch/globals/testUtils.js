
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateString(len) {
    var len = len || 16;
    var dict = 'abcdefghijklmnopqrstuvwxyz1234567890-_+ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var returnStr = '';

    for (var i = 0; i < len; i++) {
        var charIndex = getRandomInt(0, dict.length)
        var char = dict[charIndex];
        returnStr += char;
    }
    return returnStr;
}

function generateComment() {
    // Creates a text string that is 15 characters long, starting with a capital letter.
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    var returnStr = '';

    firstLetter = uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        for (var i = 0; i < 14; i++) {
        returnStr += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    }
    return firstLetter + returnStr;
}

module.exports = {
    generateComment: generateComment,
    generateString: generateString,
    generateEmail: function (domain, charCount) {
        var domain = domain || 'mailinator';
        var charCount = charCount || 16;

        var emailString = generateString(charCount);

        return 'email' + emailString + '@' + domain + '.com';
    }
};
