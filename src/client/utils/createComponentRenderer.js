// Generalized abstraction that can be used to return different types of renderers
// for testing react components Given a Abstract React component or functional stateless component
// and default props to always apply

// @param  (function) Component  A react component or functional statlless component
// @param  (object) options an object with two keys:
//     @param (object) defaultProps an object of props to always instantiate the component with, can
//         be overwritten
//     @param (bool) Wraps rendering component in react-intl context to enable rendering components
//         which use translations
// @return (function) to modify the default component render. The returned function will render the
//     default props if called without arguments but takes a properties object and a render type
//     for customization between tests. More detail on the rendering types
//     three modes ( shallow | full | static )
//
//     Shallow (default)
//     Limits the rendering to one component, to isolate behavior, does not give access to component
//     life cycle methods.
//     Gives you access all of the API methods mentioned : https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
//
//     Full
//     Renders the full nested react tree, gives access component lifecycle methods.
//     Gives you access all of the API methods mentioned: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
//
//     Static
//     Returns an Html wrapper that's traverssable via Cheerio to make assertions against
//     Gives you access all of the API methods mentioned: https://github.com/airbnb/enzyme/blob/master/docs/api/render.md

import React from 'react';
import intl from 'intl'; // Need to import intl to polyfill in node environment
import _ from 'lodash';


import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl, mountWithIntl } from './intl-enzyme-test-helpers';

import { Provider } from 'react-redux';
import store from 'client/common/store';


Enzyme.configure({ adapter: new Adapter() });

const SHALLOW = 'shallow';
const FULL = 'full';
const STATIC = 'static';

export default (Component, options = {}) => {
    // Default options are no properties and no react-intl wrapper
    const {
        defaultProps = {},
        withIntl = false,
        context = {}
    } = options;

    return function getComponent(props = {}, type = SHALLOW, getInstance = false) {

        const validRenderers = [SHALLOW, FULL, STATIC];
        if(validRenderers.indexOf(type) === -1) {
            console.log(`${type} is not a valid Enzyme Renderer. Choose from ${validRenderers.join(', ')}`)
            return false;
        }

        // Any test can override the default props by passing an object to the getComponent function
        const compProps = _.merge({}, {...defaultProps}, props);
        let componentWithProps = (
            <Component
                {...compProps}
            />
        );

        let component = null;
        switch(type) {
        case SHALLOW:
            component = withIntl ?
                shallowWithIntl(Component, componentWithProps, { context }) :
                shallow(componentWithProps, { context });
            break;
        case FULL:
            // Full rendered components could contain nested components which require access to the
            // store, normally, if you only want to tests via shallow rendering, you'll test
            // the component directly, not the connectBranch wrapped version.
            componentWithProps = <Provider store={store}>{componentWithProps}</Provider>;
            component = withIntl ?
                mountWithIntl(componentWithProps, { context }) :
                mount(componentWithProps, { context });
            break;
        case STATIC:
            component = render(componentWithProps, { context });
            break;
        }

        return component;
    };
}


