/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */
import React from 'react';
import { expect } from 'chai';

import Svg from 'client/common/components/Svg';
import Icon from './index';
import createComponentRenderer from 'client/utils/createComponentRenderer';

describe('Icon', function () {
    let wrapper;
    before(function() {
        const getComponent = (props = {}, rendererType = 'full') => {
            return createComponentRenderer(Icon, {
                withStore: true,
            })(props, rendererType)
        }
    wrapper = getComponent({
            glyph:"dots",
        });
    });
    it('Render Icon component', function() {
        expect(wrapper.exists()).to.be.true
        expect(wrapper.find(Icon)).to.have.length(1);
    });
    it('Render Svg component', function() {
        expect(wrapper.find(Svg)).to.have.length(1);
    });
});
