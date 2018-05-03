import React from 'react';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import { expect } from 'chai';

import { Footer } from './index';

describe('Footer', () => {

    const getComponent = (props = {}, rendererType = 'full') => {
        return createComponentRenderer(Footer, {
            defaultProps: {
                breakpoints: {
                    currentBreakPoint: 'sm',
                },
            },
            withIntl: true,
        })(props, rendererType);
    };

    // These will be testable once we have refactored the Footer to not use
    // the rootComponent

    it("Applies c--overlap class when hasOverlap is passed", () => {
        const wrapper = getComponent({ hasOverlap: true });
        expect(wrapper.find('.c-footer').hasClass('c--overlap')).to.deep.equal(true);
    });

    it('Renders the appropriate mobile or desktop version of the Primary Footer', () => {

    });
});
