import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'
import { expect } from 'chai';
import sinon from 'sinon';
import 'cheerio';

import Alert from 'client/common/components/Alert';
import createComponentRenderer from 'client/utils/createComponentRenderer';
import Content from './';
import FloatLabelInput from 'client/common/components/FormElements/FloatLabelInput';
import FormErrors from 'client/common/components/FormElements/FormErrors';

describe('SignUpForm', function() {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Content, {
            defaultProps: {
                routes: { accountAgreement: '#' },
                handleSubmit: () => {},
            },
            withIntl: true,
        })(props, rendererType);
    };

    it('Renders four sets of label and input elements of specified types', function() {
        const wrapper = getComponent();
        const inputs = wrapper.find(FloatLabelInput);
        expect(inputs.length).to.deep.equal(4);

        let expectedInputIds = [
            'user[first_name]',
            'user[last_name]',
            'user[email]',
            'user[password]',
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

    it('should set inputValue Prop of the user[email] FloatLabelInput to the email value if a prepopulated Values map is passed with a user[email] key', () => {
        const prepopulatedValues = new Map();
        prepopulatedValues.set('user[email]', 'sometest@gmail.com');
        const wrapper = getComponent({ prepopulatedValues: prepopulatedValues });

        const emailField = wrapper.find(FloatLabelInput).filterWhere((shallowNode) => {
            return shallowNode.prop('inputId') === 'user[email]';
        });

        expect(emailField.prop('inputValue')).to.deep.equal('sometest@gmail.com');
    });

    it('should make readonly the user[email] FloatLabelInput value if a prepopulated Values map is passed with a user[email] key', () => {
        const prepopulatedValues = new Map();
        prepopulatedValues.set('user[email]', 'sometest@gmail.com');
        const wrapper = getComponent({ prepopulatedValues: prepopulatedValues });

        const emailField = wrapper.find(FloatLabelInput).filterWhere((shallowNode) => {
            return shallowNode.prop('inputId') === 'user[email]';
        });

        expect(emailField.prop('isReadonly')).to.deep.equal(true);
    });

    it('Should fire a provided handleSubmit prop ', function() {
        const spy = sinon.spy();
        const wrapper = getComponent({ handleSubmit: spy });
        wrapper.find('form').simulate('submit');
        expect(spy).to.have.been.called;
    });

    it('call handleSubmit with all form fields ', function() {
        let expectedInputIds = [
            'user[first_name]',
            'user[last_name]',
            'user[email]',
            'user[password]',
        ];

        const spy = sinon.spy();
        const wrapper = getComponent({ handleSubmit: spy }, 'full');
        wrapper.find('form').simulate('submit');
        const submitEvent = spy.getCall(0).args[0].nativeEvent

        let fieldCount = 0;
        const inputs = [].slice.call(submitEvent.target.getElementsByTagName('input'));
        inputs.forEach(input => {
            fieldCount++;
            expect(expectedInputIds).to.contain(input.name);
        });

        expect(fieldCount).to.deep.equal(4);
    });


    it('Submit button is disable while isSubmitting is true', function() {
        const submittingWrapper = getComponent({ isSubmitting: true });
        expect(submittingWrapper.find('button[type="submit"]').prop('disabled')).to.deep.equal(true)

        const wrapper = getComponent({ isSubmitting: false });
        expect(wrapper.find('button[type="submit"]').prop('disabled')).to.deep.equal(false)
    });

    it('displays an information alert with password requirments' , function(){
        const wrapper = getComponent();
        expect(wrapper.find(Alert).length).to.exist
    });

    it('doesn\'t render static password requirments if there are field errors' , function() {
        const fieldErrors = new Map();
        fieldErrors.set('user[password]', 'Please provide a password that is at least 8 characters');
        const wrapper = getComponent({ fieldErrors: fieldErrors });
        expect(wrapper.find(Alert).length).to.not.be.ok;
    });
});
