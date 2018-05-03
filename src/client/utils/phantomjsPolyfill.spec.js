import helpers from 'client/common/helpers/helpers';
import 'client/utils/modernizr-custom';
import 'whatwg-fetch'

// Mock matchMedia for environments that don't support it (*cough* PhantomJs *cough*)
const matchMediaMock = function(mediaQuery) {
    return {
        matches: false,
        media: mediaQuery,
        addListener: function() {},
        removeListener: function() {}
    };
};

helpers.window.matchMedia = (helpers.window.matchMedia) ? helpers.window.matchMedia : matchMediaMock;
