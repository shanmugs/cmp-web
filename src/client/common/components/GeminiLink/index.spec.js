
import util from 'util';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { getState } from 'client/common/store';
import { Link } from 'react-router';

import GeminiLink from './';


describe('GeminiLink', function() {
    const railsAppUrlOrigin = getState('/config/endpoints/railsAppUrlOrigin');

    context('when path IS Gemini', function() {
        it('should return a <Link>', function() {
            const link = shallow(
                <GeminiLink
                    className="foo"
                    path="/give/error"
                >
                    Is Gemini
                </GeminiLink>
            );

            expect(
                link.equals(
                    <Link
                        className="foo"
                        to="/give/error"
                    >
                        Is Gemini
                    </Link>
                )
            ).to.be.true;
        });
    });
    context('when path is NOT Gemini', function() {
        it('should return a <a>', function() {
            const link = shallow(
                <GeminiLink
                    className="simple"
                    path='/not-gemini'
                >
                    Not Gemini
                </GeminiLink>
            );

            expect(
                link.equals(
                    <a
                        href={`${railsAppUrlOrigin}/not-gemini`}
                        className="simple"
                    >
                        Not Gemini
                    </a>
                )
            ).to.be.true;
        });
    });
});
