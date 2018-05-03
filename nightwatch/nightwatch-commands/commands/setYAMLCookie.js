// setYAMLCookie.js

// Convert any arbitrairly nested javascrpt object into a valid YAML string
// Use by calling the returned stringify() method with a JS object as a perameter
YAML = (function() {
    INDENT_SPACES = 2;
    // Helper method to call recursivly.
    // converts key: value pairs into nested yaml structure where an object as a value indents all 
    // nested keys under that key
    function yamlify(obj, depth){
        var yamlString = '';
        
        // Use depth to calculate the number of indent spaces for the return string
        var depth = depth || 0;
        depth++;

        var indent = depth * INDENT_SPACES;
        indent = Array(indent).join(" ");

        for(var prop in obj) {
            var value = obj[prop];
            // If the value is object, recurse with another call to yamilfy with the depth 
            // increased
            if(typeof value === 'object'){
                yamlString += `${indent}:${prop}: \n${yamlify(value, depth)}`;
            } else {
                yamlString += `${indent}:${prop}: ${value}\n`;
            }
        }
        return yamlString;
    }

    // The returned public API
    return {
        stringify: function(obj, depth) {
            var urlEncodedString = '---\n'
            urlEncodedString += yamlify(obj);
            return urlEncodedString;
        }
    }
})();

// Actual exported nightwatch command. Access via the browser object.
// Command refreshes the page automatically, so that the server can parse Cookies and render 
// appropiate HTML
exports.command = function (name, value, callback) {
    var self = this;
    var yamlString = YAML.stringify(value);
    self.setCookie({
        name: name,
        value: escape(yamlString),
    }).refresh()
    return this;
};
