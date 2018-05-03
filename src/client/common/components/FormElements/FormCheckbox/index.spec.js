import React from 'react';
import componentRenderer from 'client/utils/createComponentRenderer';
import { expect } from 'chai';

import FormCheckbox from './index';

describe('Checkbox', function () {
    // You can extend or overwrite the default properties by passing an
    // object while calling getComponent()
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return componentRenderer(FormCheckbox)(props, rendererType);
    };

    const mockClickEvent = { target: 'mockedTargetEl', preventDefault: () => {} };

    it('Renders an label element containing a checkbox input', function() {
        const wrapper = getComponent();
        expect(wrapper.is('label')).to.deep.equal(true);
        expect(wrapper.find('input[type="checkbox"]').length).to.deep.equal(1);
    });

    it('Click Events update the checked prop of the input', function() {
        const wrapper = getComponent();
        expect(wrapper.state('checked')).to.deep.equal(false);
        wrapper.simulate('click', mockClickEvent);
        expect(wrapper.state('checked')).to.deep.equal(true);
    });

    it('default checked state is false', function() {
        const wrapper = getComponent();
        expect(wrapper.state('checked')).to.deep.equal(false);
    });

    it('can set default state to checked with property', function() {
        const wrapper = getComponent({ checked: true });
        expect(wrapper.state('checked')).to.deep.equal(true);
    });

    it('Fires a passed changeCallback with the new checked state as an arg', function() {
        const spy = sinon.spy();

        const wrapper = getComponent({changeCallback: spy});
        wrapper.simulate('click', mockClickEvent);
        expect(spy).to.have.been.calledWith(true);
        wrapper.simulate('click', mockClickEvent);
        expect(spy).to.have.been.calledWith(false);
    });

    it('takes a configurable classname', function() {
        const wrapper = getComponent({className: 'uniqueClass'});
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });

    it('applies configurable name attribute to the input element', function() {
        const wrapper = getComponent({name: 'customName'});
        expect(wrapper.find('input[type="checkbox"]').prop('name')).to.deep.equal('customName');
    });

    it('renders a custom checkbox label', function() {
        const wrapper = getComponent({ label: 'customLabel' });
        expect(wrapper.find('label div').text()).to.deep.equal('customLabel');
    });


});
