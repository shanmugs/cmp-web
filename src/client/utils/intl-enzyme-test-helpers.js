/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 * More details about this implementation here:
 * https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
 */
import React from 'react';
import _ from 'lodash';
import {
    IntlProvider,
    intlShape,
    injectIntl
} from 'react-intl';

import { shallow, mount } from 'enzyme';

// import defaultMessages from 'client/common/language/enMessages.json';
import messages from 'client/common/language/enMessages.json';

// The params below are INVALID; "description: 'foo'" is not inside a hash (also no-such param)
// According to the docs, there is no 'defaultMessages' param, only 'messages'
// const intlProvider = new IntlProvider({locale: 'en'}, 'description': 'foo', defaultMessages);

// TODO: Review modified params below - patched to fix syntax errors noted above
// SEE: https://github.com/yahoo/react-intl/wiki/Components#intlprovider
const intlProvider = new IntlProvider({ locale: 'en', messages, description: 'foo' });
const { intl } = intlProvider.getChildContext();


/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}


// ShallowWithIntl needs the Component Definition to determine how deep to render to not
// just render a wrapping HOC component
export function shallowWithIntl(Component, node, options = {}) {
    const { context } = options;
    let rendered = shallow(
        nodeWithIntlProp(node),
        {
            context: _.assign({}, context, { intl }),
        },
    );

    // Technique taken from https://github.com/airbnb/enzyme/issues/539
    // Traverses down the component Tree until a component that doesn't wrap another component.
    // Allows shallow rendering on Components that export wrapped components
    // typically components with intl strings `export default injectIntl(ComponentName)`
    // Without this code, the shallow rendering will only access the injectIntl HOC
    let component = Component;
    while (component.hasOwnProperty('WrappedComponent')) {
        component = component.WrappedComponent;
        // This seems like a preformance issues, renderering at each level seems expensive,
        // but I couldn't get it to work just traversing and rendering at the end.
        rendered = rendered.first().shallow();
    }
    return rendered;
}

export function mountWithIntl(node, options = {}) {
    const { context, childContextTypes } = options;
    const mountedComponent = mount(
        nodeWithIntlProp(node),
        {
            context: _.assign({}, context, { intl }),
            childContextTypes: _.assign({}, { intl: intlShape }, childContextTypes),
        },
    );

    // Remap the instance() method on the mounted component to reference the nested component
    // so it doesn't just return the instance of the injectIntl method
    const clonedComponent = _.assign({}, mountedComponent).component;
    const instance = () => {
        return clonedComponent.getInstance().refs.wrappedInstance ||
        `injectIntl didn't provide access to the wrappedComponent. To enabled this,
pass { withRef: true } to the injectIntl call of the component you're trying to test`
    };
    mountedComponent.instance = instance;
    return mountedComponent;
}
