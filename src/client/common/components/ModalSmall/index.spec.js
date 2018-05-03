import React from 'react';
import TestUtils from 'react-dom/test-utils';

import { expect } from 'chai';
import createComponentRenderer from 'client/utils/createComponentRenderer';


import ModalSmall from './index';

describe('ModalSmall', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(ModalSmall, {
            defaultProps: {
                children: (
                    <div>
                        <div><h3>Some Content</h3></div>,
                        <div><h3>Some Different Content</h3></div>,
                        <div><h3>More</h3></div>,
                        <div><h3>Last thing</h3></div>,
                    </div>
                ),
            },
            withIntl: true
        })(props, rendererType);
    }

    it('Displays it\'s children', function () {
        const wrapper = getComponent();
        expect(wrapper.contains(<div><h3>Some Content</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>Some Different Content</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>More</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>Last thing</h3></div>)).to.deep.equal(true);
    });

    it("executes the onClose prop cb when the closeModal method is called", function () {
        const spy = sinon.spy();
        const instance = getComponent({ onClose: spy }).instance();
        instance.closeModal();
        expect(spy).to.have.been.called;
    });

    it("close button is not rendered when when no onClose prop is passed", function () {
        const spy = sinon.spy();
        const wrapper = getComponent()
        expect(wrapper.find('.c-modal-small__close').length).to.deep.equal(0)
    });

    it("close button is rendered when when onClose prop is passed", function () {
        const cb = () => {};
        const wrapper = getComponent({onClose: cb}, 'full');
        expect(wrapper.find('.c-modal-small__close').length).to.deep.equal(1);
    });


    it("Applies custom className to the Overlay component", function () {
        const wrapper = getComponent({className: 'uniqueClass'});
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });
});
