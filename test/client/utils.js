import React from 'react';

import {
    IntlProvider,
    intlShape,
} from 'react-intl';
import {
    mount,
    shallow,
} from 'enzyme';


function getIntl(locale = 'en', messages = {}) {
    return (
        new IntlProvider(
            {
                locale,
                messages,
            },
            {},
        )
    ).getChildContext();
}

function mountWithIntl(component, { context, childContextTypes, locale, messages } = {}) {
    const { intl } = getIntl(locale, messages);

    return mount(React.cloneElement(component, { intl }), {
        context: Object.assign({}, context, { intl }),
        childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
    });
}

function shallowWithIntl(
    component,
    {
        locale,
        messages,
        options,
    } = {},
) {
    const { intl } = getIntl(locale, messages);

    return shallow(React.cloneElement(component, { intl }), {
        context: { intl },
    }, options);
}

export {
    mountWithIntl,
    shallowWithIntl,
};
