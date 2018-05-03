/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PhoneNumber from './';

describe('PhoneNumber', function () {
    const numbers = {
        domestic: 8005553333,
        domesticWithCountryCode: '+18005553333',
        foreign: '+335555554444',
    };

    describe('className', function () {
        it('should include supplied className', function () {
            const wrapper = shallow(<PhoneNumber number={numbers.domestic} className="foo" />);

            expect(wrapper.hasClass('foo')).to.be.true;
        });
    });

    describe('isLink', function () {
        it('should return an <a> when true', function () {
            const wrapper = shallow(<PhoneNumber number={numbers.domestic} isLink />);

            expect(wrapper.is('a'), 'element is anchor').to.be.true;
            expect(wrapper.prop('href'), 'href').to.equal(`tel:${numbers.domestic}`);
        });

        it('should return an <span> by default', function () {
            const wrapper = shallow(<PhoneNumber number={numbers.domestic} />);

            expect(wrapper.is('span')).to.be.true;
        });
    });

    describe('region', function () {
        context('when region is supported', function () {
            it('should handle a relative number', function () {
                const children = shallow(<PhoneNumber number={numbers.domestic} />).children();

                expect(
                    children.at(0).hasClass('phonenumber-area'),
                    'area classname',
                ).to.be.true;
                expect(
                    children.at(1).hasClass('phonenumber-exchange'),
                    'exchange classname',
                ).to.be.true;
                expect(
                    children.at(2).hasClass('phonenumber-subscriber'),
                    'subscriber classname',
                ).to.be.true;
            });

            it('should handle a domestic country code', function () {
                const children = shallow(<PhoneNumber
                    number={numbers.domesticWithCountryCode}
                />).children();

                expect(
                    children.at(0).hasClass('phonenumber-country'),
                    'country classname',
                ).to.be.true;
                expect(
                    children.at(0).text(),
                    'country code',
                ).to.equal('+1');
                expect(
                    children.at(1).hasClass('phonenumber-area'),
                    'area classname',
                ).to.be.true;
                expect(
                    children.at(1).text(),
                    'area code',
                ).to.equal('800');
                expect(
                    children.at(2).hasClass('phonenumber-exchange'),
                    'exchange classname',
                ).to.be.true;
                expect(
                    children.at(2).text(),
                    'exchange code',
                ).to.equal('555');
                expect(
                    children.at(3).hasClass('phonenumber-subscriber'),
                    'subscriber classname',
                ).to.be.true;
                expect(
                    children.at(3).text(),
                    'subscriber number',
                ).to.equal('3333');
            });
        });

        context('when not supported', function () {
            it('should throw an error', function () {
                const stub = sinon.stub(console, 'error');

                expect(shallow.bind(
                    shallow,
                    (<PhoneNumber number={numbers.foreign} region="foo" />),
                )).to.throw();

                stub.restore();
            });
        });
    });
});
