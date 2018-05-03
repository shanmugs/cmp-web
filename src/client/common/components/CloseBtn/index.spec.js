import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import CloseBtn from './';
import Icon from 'client/common/components/Icon';

describe('CloseBtn', () => {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(CloseBtn, {
            defaultProps: {
                onClose() {},
            },
            withIntl: true,
        })(props, rendererType);
    };
    const selectors = {
        content: '.u-visually-hidden',
        icon: Icon
    };

    it('should display its contents when it exists', () => {
        const wrapper = getComponent();

        const closeBtnIcon = wrapper.children(selectors.icon);
        const closeBtnContent = wrapper.children(selectors.content);

        expect(closeBtnIcon.exists(), 'closeBtnIcon').to.be.true;
        expect(closeBtnContent.exists(), 'closeBtnContent').to.be.true;
    });

    it('should hide when no callback is supplied', () => {
        const wrapper = getComponent({
            onClose: null
        });

        expect(wrapper.type()).to.equal(null);
    });

    it('should call the supplied onClose callback when the close button is clicked', () => {
        const spy = sinon.spy();
        const wrapper = getComponent({ onClose: spy });

        wrapper.simulate('click');

        expect(spy).to.have.been.called;
    });
});
