// selectOptionByIndex.js
// Given a jquery like selector for a <select /> element, and an index number 
// switches the active option to the given index
exports.command = function (selector, index, callback) {
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
                    const index = arguments[1];

                    if ( i === index ) {
                        
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
        [selector, index],
            function (result) {
                if (typeof callback === 'function'){
                    callback(self, result);
                }
            }
        );

    return this;
};
