import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import sinon from 'sinon';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import { LoginForm } from './index';
import FloatLabelInput from 'client/common/components/FormElements/FloatLabelInput';
import FormErrors from 'client/common/components/FormElements/FormErrors';

describe('LoginForm', function() {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(LoginForm, {
            defaultProps: {
                routes: { accountAgreement: '#' },
                handleSubmit: () => {},
                postEndpoint: 'postEndpoint',
            },
            withIntl: true,
        })(props, rendererType)
    }

    it('Renders two sets of label and input elements of specified types', function() {
        const wrapper = getComponent();
        const inputs = wrapper.find(FloatLabelInput);
        expect(inputs.length).to.deep.equal(2);

        let expectedInputIds = [
            'email',
            'password',
        ];
        // Iterate through each FloatLabelInput node and check that they're using an id we expect
        // If the Id's in the expected array, remove it and assert that the array is empty by the
        // end of all the input nodes.
        inputs.forEach((shallowNode) => {
            const inputId = expectedInputIds.indexOf(shallowNode.prop('inputId'))
            expectedInputIds.splice(inputId, 1)
        });

        expect(expectedInputIds.length).to.deep.equal(0);
    });

    it('Should not display errors if none are passed', function() {
        const wrapper = getComponent();
        expect(wrapper.find(FormErrors).length).to.deep.equal(0)
    });

    it('Should display errors if errors are passed', function() {
        const wrapper = getComponent({formErrors: ['Error', 'Another error']});
        expect(wrapper.find(FormErrors).length).to.deep.equal(1)
    });

    it('should set inputValue Prop of the login FloatLabelInput to the login value if a prepopulated Values map is passed with a login key', () => {
        const prepopulatedValues = new Map();
        prepopulatedValues.set('login', 'sometest@gmail.com');
        const wrapper = getComponent({ prepopulatedValues: prepopulatedValues });

        const emailField = wrapper.find(FloatLabelInput).filterWhere((shallowNode) => {
            return shallowNode.prop('inputId') === 'login';
        });

        expect(emailField.prop('inputValue')).to.deep.equal('sometest@gmail.com');
    });

    it('Should fire a provided handleSubmit prop ', function() {
        const spy = sinon.spy();
        const wrapper = getComponent({ handleSubmit: spy });
        wrapper.find('form').simulate('submit');
        expect(spy).to.have.been.called;
    });


    it('Submit button is disable while isSubmitting is true', function() {
        const submittingWrapper = getComponent({ isSubmitting: true });
        expect(submittingWrapper.find('button[type="submit"]').prop('disabled')).to.deep.equal(true)

        const wrapper = getComponent({ isSubmitting: false });
        expect(wrapper.find('button[type="submit"]').prop('disabled')).to.deep.equal(false)
    });

    it('Has a configurable className', function() {
        const wrapper = getComponent({ className: 'uniqueClass' });
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true)
    });
});
