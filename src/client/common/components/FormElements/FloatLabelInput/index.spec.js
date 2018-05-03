import React from 'react';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import FloatLabelInput from './';
import FormErrors from 'client/common/components/FormElements/FormErrors';

describe('FloatLabelInput', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(FloatLabelInput, {
            defaultProps: {
                inputId: 'email',
                labelText: 'Email',
            }
        })(props, rendererType);
    };

    const inputIsEditable = (wrapper) => {
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: '' }})
        const emptyVal = wrapper.state().value;
        input.simulate('change', { target: { value: 'asldkjfhalkjdsh' }})
        const changedVal = wrapper.state().value;
        return emptyVal !== changedVal;
    }

    it("renders an input and hidden label element", function() {
        const wrapper = getComponent()
        expect(wrapper.find('input').length).to.deep.equal(1);

        const hiddenLabel = wrapper.find('.c-float-label-input.c--hide');
        expect(hiddenLabel.length).to.deep.equal(1);
        expect(hiddenLabel.text()).to.deep.equal('Email');
    });

    it("renders an input with a value and shows label element ", function() {
        const wrapper = getComponent({
            inputValue: 'harrison@chimp.net',
            isDisabled: true,
        })

        expect(wrapper.hasClass('c-float-label-input')).to.deep.equal(true);
        expect(wrapper.hasClass('c--is-disabled')).to.deep.equal(true);
        expect(wrapper.hasClass('c--show')).to.deep.equal(true);

        expect(wrapper.find('input').prop('value')).to.deep.equal('harrison@chimp.net')
        expect(wrapper.find('input').prop('disabled')).to.deep.equal(true)
    });

    it("rendered field is not editable when isDisabled is passed", function(){
        const wrapper = getComponent({
            isDisabled: true,
        })

        expect(inputIsEditable(wrapper)).to.deep.equal(false);
    });

    it("rendered field is editable with inputValue passed", function(){
        const wrapper = getComponent({
            inputValue: 'Some default value',
        });
        expect(inputIsEditable(wrapper)).to.deep.equal(true);
    });

    it("doesn't show prepopulated value and is still editable when null values are passed", function() {
        let wrapper = getComponent({ inputValue: '' });
        expect(inputIsEditable(wrapper)).to.deep.equal(true);

        wrapper = getComponent({ inputValue: null });
        expect(inputIsEditable(wrapper)).to.deep.equal(true);
    });

    it("renders an input and passes errors prop to a FormErrors component", function() {
        const fieldErrors = new Map();
        fieldErrors.set('email', ['Email is required.', 'Email is not valid.']);

        const wrapper = getComponent({
            inputValue: 'harrison@chimp.net',
            errors: fieldErrors,
        })
        expect(wrapper.hasClass('c--has-error')).to.deep.equal(true);

        const formErrors = wrapper.find(FormErrors);
        // Not going to query the nested components since that should be handled by
        // unit tests on the FormErrors component
        expect(formErrors.prop('errorsArray')).to.deep.equal(fieldErrors.get('email'));
    });

    it("displays a configurable help alert on focus", function(){
        const wrapper = getComponent({
            helpText: 'Some default value',
        });

        wrapper.setState({ isFocused: true });
        expect(wrapper.find('.c-alert.c--info')).to.exist;
    });
});
