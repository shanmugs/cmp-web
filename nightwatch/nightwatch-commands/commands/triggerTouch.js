exports.command = function(selector, type, callback) {
    var client = this;

    // Selenium's click doesn't always register
    // We should expand this to bind and trigger more events
    //
    // PageObject @notation passes an object with the selector nested in the second element of an array
    // Not sure where this data structure is built though.
    if(typeof selector === 'object') {
        var parent = selector[0];
        var element = selector[1];
        selector = parent.selector + ' ' + element.selector;
    }

    client.execute(function(sel, t) {
        console.log(sel);
        var event = new MouseEvent(t || 'click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var el = document.querySelector(sel);
        el.dispatchEvent(event);
        return true;
    }, [selector, type], function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;
};
