/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Helmet } from 'react-helmet';
import {
    Button,
} from 'semantic-ui-react';

import browser from 'client/common/helpers/browser';

import HelpCentre from './';


describe('HelpCentre', function () {
    const breakpoints = {
        mobile: 'xs',
        tablet: 'sm',
        laptop: 'md',
        desktop: 'lg',
    };
    const currentUser = {
        email: 'john.jingleheimer@example.com',
        fullName: 'John Jingleheimer',
    };
    const sandbox = sinon.createSandbox();
    const stubs = {};

    before(function () {
        stubs.formatMessage = sandbox.stub().callsFake(({ id }) => id);
    });

    beforeEach(function () {
        sandbox.resetHistory();
    });

    after(function () {
        sandbox.restore();
    });

    describe('constructor', function () {
        it('should set up Help Scout config', function () {
            const inst = shallow((
                <HelpCentre
                    currentBreakpoint={breakpoints.mobile}
                    currentUser={currentUser}
                    formatMessage={stubs.formatMessage}
                />
            )).instance();

            expect(inst.HS, 'alias to HS').to.deep.eq(browser.window.HS);
            expect(inst.HS.beacon, 'beacon config').to.have.all.keys([
                'config',
                'ready',
                'readyQueue',
                'userConfig',
            ]);
            expect(inst.HS.beacon.config, 'beacon config').to.be.a('function');
            expect(inst.HS.beacon.ready, 'beacon ready').to.be.a('function');
            expect(inst.HS.beacon.readyQueue[0], 'beacon ready').to.be.a('function');
            expect(inst.HS.beacon.userConfig, 'beacon userConfig').to.be.a('object');

            expect(inst.HSCW, 'alias to HSCW').to.deep.eq(browser.window.HSCW);
            expect(inst.HSCW.config, 'cw config').to.be.an('object');
        });

        it('should NOT overwrite existing config', function () {
            const HS = { foo: 'a' };
            const HSCW = { bar: 'b' };
            browser.window.HS = HS;
            browser.window.HSCW = HSCW;

            const inst = shallow((
                <HelpCentre
                    currentBreakpoint={breakpoints.mobile}
                    currentUser={currentUser}
                    formatMessage={stubs.formatMessage}
                />
            )).instance();

            expect(inst.HS, 'alias to HS').to.deep.eq(browser.window.HS);
            expect(inst.HS, 'hs config').to.deep.eq(HS);

            expect(inst.HSCW, 'alias to HSCW').to.deep.eq(browser.window.HSCW);
            expect(inst.HSCW, 'cw config').to.deep.eq(HSCW);

            delete browser.window.HS;
            delete browser.window.HSCW;
        });
    });

    context('when viewport is mobile', function () {
        it('should NOT load Help Scout script', function () {
            const wrapper = shallow((
                <HelpCentre
                    currentBreakpoint={breakpoints.mobile}
                    currentUser={currentUser}
                    formatMessage={stubs.formatMessage}
                />
            ));
            const helmet = wrapper.children(Helmet);
            const button = wrapper.find(Button);

            expect(helmet.children().length, 'helpscout script').to.equal(0);
            expect(button.prop('as'), 'email cta type').to.equal('a');
            expect(button.prop('href'), 'email link path').to.be.ok;
        });
    });

    context('when viewport is larger than mobile', function () {
        it('should set up Help Scout', function () {
            const wrapper = shallow((
                <HelpCentre
                    currentBreakpoint={breakpoints.tablet}
                    currentUser={currentUser}
                    formatMessage={stubs.formatMessage}
                />
            ));
            const openSpy = wrapper.instance().HS.beacon.open = sinon.stub();
            const script = wrapper.children(Helmet).children('script');
            const button = wrapper.find(Button);

            expect(script.prop('data-key'), 'helpscout script').to.contain('helpscout');

            button.simulate('click');

            expect(openSpy, 'HS beacon open').to.have.been.called;
        });
    });
});
