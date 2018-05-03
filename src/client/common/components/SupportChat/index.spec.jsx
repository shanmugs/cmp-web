/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { Helmet } from 'react-helmet';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import browser from 'client/common/helpers/browser';

import SupportChat from './';

describe('SupportChat', function () {
    it('should set up snap engage for the beacon', function () {
        const children = shallow(<SupportChat><button /></SupportChat>).children();
        const helmet = children.filter(Helmet);
        const beacon = children.filter('button');

        expect(
            helmet.children('script').prop('src'),
            'load snap engage vendor script',
        ).to.contain('snapengage');
        expect(beacon.prop('onClick'), 'set click handler').to.be.a('function');
    });

    it('should prevent link behaviour', function () {
        const preventDefaultSpy = sinon.spy();
        const snapengageClickSpy = sinon.spy();

        browser.window.SnapEngage = {
            startLink: snapengageClickSpy,
        };

        const link = shallow((
            <SupportChat>
                <a href="//www.google.com">foo</a>
            </SupportChat>
        )).children('a');

        link.simulate('click', {
            preventDefault: preventDefaultSpy,
        });

        expect(preventDefaultSpy).to.have.been.called;
        expect(snapengageClickSpy).to.have.been.called;

        delete browser.window.SnapEngage;
    });
});
