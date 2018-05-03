import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ConfigurableHeader from './';

describe('ConfigurableHeader', function () {
    it('has a configurable className', function () {
        const defaultClassName = shallow(
            <ConfigurableHeader
                avatar="test.jpg"
                message="A header"
            >
                <h1>test</h1>
            </ConfigurableHeader>
        )
            .prop('className');

        expect(defaultClassName, 'default className')
            .to.contain('c-configurable-header')

        const customClassName = shallow(
            <ConfigurableHeader
                avatar="test.jpg"
                className="test"
                message="A header"
            >
                <h1>test</h1>
            </ConfigurableHeader>
        )
            .prop('className');

        expect(customClassName, 'custom className')
            .to.contain('c-configurable-header test')
    });
});
