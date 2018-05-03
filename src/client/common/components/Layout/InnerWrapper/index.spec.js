// inner-wrapper-test.jsx
import React from 'react';
import { shallow } from 'enzyme';

import { expect } from 'chai';

import InnerWrapper from './';

describe('Inner Wrapper', function () {
    it('renders simple children', function () {
        const content = (<h1>Test</h1>);
        const children = shallow(
            <InnerWrapper>
                {content}
            </InnerWrapper>
        ).children();

        expect(children.contains(content)).to.be.true;
    });

    it('renders complex children', function () {
        const content = (
            <div className="container">
                <h1>Some more complicated Content</h1>
                <p> A block of content </p>
                <img src="path/to/image" />
            </div>
        );
        const children = shallow(
            <InnerWrapper>
                {content}
            </InnerWrapper>
        ).children();

        expect(children.contains(content)).to.be.true;
    });

    it('has a configurable className', function () {
        const defaultClassName = shallow(
            <InnerWrapper>
                <h1>test</h1>
            </InnerWrapper>
        )
            .prop('className');

        expect(defaultClassName).to.contain('c-inner-wrapper');

        const customClassName = shallow(
            <InnerWrapper
                className="c-custom-component"
            >
                <h1>test</h1>
            </InnerWrapper>
        )
            .prop('className');

        expect(customClassName, 'custom className')
            .to.contain('c-inner-wrapper c-custom-component');
    });
});
