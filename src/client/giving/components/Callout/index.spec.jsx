/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { expect } from 'chai';

import { shallow } from 'enzyme';

import Callout from './';

describe('Callout', function () {
    describe('general', function () {
        it('should contain supplied values', function () {
            const children = (<p>Some children</p>);
            const focus = 'BIG';
            const heading = 'hello';
            const wrapper = shallow(
                <Callout
                    focus={focus}
                    heading={heading}
                >
                    {children}
                </Callout>,
            );

            expect(wrapper.find('.callout-focus').text(), 'focus').to.contain(focus);
            expect(wrapper.find('.callout-heading').dive().text(), 'heading').to.contain(heading);
            expect(wrapper.contains(children), 'children').to.be.true;
        });
    });
    describe('emphasis', function () {
        it('should add classname for `brand-primary`', function () {
            const emphasis = 'primary';
            const wrapper = shallow(<Callout
                emphasis={emphasis}
                focus="BIG"
                heading="hello"
            />);

            expect(wrapper.prop('className')).to.contain(emphasis);
        });
        it('should add classname for `brand-secondary`', function () {
            const emphasis = 'secondary';
            const wrapper = shallow(<Callout
                emphasis={emphasis}
                focus="BIG"
                heading="hello"
            />);

            expect(wrapper.prop('className')).to.contain(emphasis);
        });
        it('should add color for `negative`', function () {
            const wrapper = shallow(<Callout
                emphasis="negative"
                focus="BIG"
                heading="hello"
            />);

            expect(wrapper.prop('color')).to.contain('red');
        });
        it('should add color for `positive`', function () {
            const wrapper = shallow(<Callout
                emphasis="positive"
                focus="BIG"
                heading="hello"
            />);

            expect(wrapper.prop('color')).to.contain('green');
        });
    });
});
