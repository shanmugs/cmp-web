// selectOptionByText.js
// Given a jquery like selector for a <select /> element, and a needle string
// switches the active option to the the last option that contains the needle string 
exports.command = function (selector, needle, callback) {
    var self = this;


    // PageObject @notation passes an object with the selector nested in the second element of an array
    // Not sure where this data structure is built though.
    if(typeof selector === 'object') {
        var parent = selector[0];
        var element = selector[1];
        selector = parent.selector + ' ' + element.selector;
    }

    this.execute(
        function(args) {
            var sel = window.document.querySelector(arguments[0]);
            if (sel != null) {
                for (var i = 0; i < sel.options.length; i++) {
                    const optionText = sel.options[i].text.toLowerCase();
                    const needleText = arguments[1].toLowerCase();

                    // Partial matches work as long as the option text contains the needleText
                    if ( optionText.indexOf(needleText) !== -1 ) {
                        
                        var jSel = $(arguments[0]);

                        jSel.val(sel.options[i].value).change();
                        jSel.blur();

                        return true;
                    }
                }
                // Option provided isn't found
                return false;
            }
            return false;
        },
        [selector, needle],
            function (result) {
                if (typeof callback === 'function'){
                    callback(self, result);
                }
            }
        );

    return this;
};
