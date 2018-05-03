// form-errors-test.jsx
import React from 'react';
import TestUtils from 'react-dom/test-utils';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import { expect } from 'chai';
import sinon from 'sinon';
import helpers from 'client/common/helpers/helpers';

import formContainer from './index';


import messageList from 'client/common/language/enMessages.json';

xdescribe('Form Container', function () {
    // Requires a simple form with a submit button and a few fields
    const WrappedForm = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <input name="first_name" defaultValue="first"/>
                <input name="last_name" defaultValue="last"/>
                <button
                    disabled={props.isSubmitting}
                    type="submit"
                >
                    submit
                </button>
            </form>
        );
    };

    const getComponent = (props = {}, rendererType = 'full', getInstance = false) => {
        // compose the component by executing the form container with the WrappedForm
        const component = formContainer(WrappedForm);
        // Configure the component with default props and with the Intl wrapper for string
        // translations
        const defaultRenderer = createComponentRenderer(component, {
            defaultProps: {
                postEndpoint: '//:testEndpoint',
                successCallback: () => {},
            },
            withIntl: true,
        });
        return defaultRenderer(props, rendererType, getInstance);
    };

    beforeEach(function () {
        this.generalErrorString = messageList['common.validation.generalError'];
        this.failedLoginValidationString = messageList['common.validation.login.failure'];

        this.xhr = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.xhr.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function() {
        this.xhr.restore();
    });

    it('handleSubmit should fire the successCallback with a 200 response', function () {
        const stub = sinon.stub();
        const wrapper = getComponent({successCallback: stub});
        wrapper.find('form').simulate('submit');
        // Respond with an empty 200
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '');

        expect(stub).to.have.been.called;
    });

    it('handleSubmit overide the successCallback if the endpoint responds with a {url: ""}', function (done) {
        // Spy on the helpers redirect method(which doesn't fire the original logic)
        // and test if it's fired instead of the success callback
        const redirectMethod = sinon.stub(helpers, 'redirect');
        const successCallback = sinon.spy();
        const wrapper = getComponent({successCallback: successCallback});
        wrapper.find('form').simulate('submit')

        // Respond with an 200 { url: 'whatever'}
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({url: 'whatever'}));

        expect(redirectMethod).to.have.been.calledWith('whatever');
        expect(successCallback).to.not.have.been.called;

        // Make sure to call done after we've made all of our assertations
        done();
    });

    it('handleSubmit 200 response should pass successState = true to children', function () {

        // Render a dom with the composed component using props specific to our test
        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '');
        // Get the passed prop
        expect(wrapper.find(WrappedForm).prop('successState')).to.equal(true);
    });

    it('handleSubmit 200 response throw generalError when response is invalid JSON', function () {

        // Render a dom with the composed component using props specific to our test
        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, 'INVALID JSON');

        expect(wrapper.find(WrappedForm).prop('formErrors')).to.contain(this.generalErrorString);
    });

    it('handleSubmit, 200 response should fire a successCallback with the response and posted data as arguments', function () {
        const self = this;

        const formDataMap = new Map();
        formDataMap.set('first_name', 'first');
        formDataMap.set('last_name', 'last');

        const stub = sinon.stub();

        const props = {
            postEndpoint: this.testEndpoint,
            successCallback: stub
        }
        const wrapper = getComponent(props);
        wrapper.find('form').simulate('submit');

        // Respond with an empty 200
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{}');

        // Just testing if the response object is a XMLHttpRequest, Have to use the fake
        // constructor because of how sinon mocks the requests
        const cbArgs = stub.getCall(0).args;

        expect(cbArgs[0]).to.be.an.instanceof(sinon.FakeXMLHttpRequest)
        expect(cbArgs[1]).to.deep.equal(formDataMap);
    });

    it('handleSubmit, 200 response should pass the response body to the wrappedComponent as a response prop', function () {
        const responseData = {
            testData: 'value',
        };

        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        // Respond with a response body
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify(responseData));
        expect(wrapper.find(WrappedForm).prop('response')).to.deep.equal(responseData);
    });

    it('handleSubmit 403 response should pass the failedLoginValidationString as a formError to it\'s wrapped component', function () {
        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        this.requests[0].respond(403, { 'Content-Type': 'text/json' }, '');

        // Get the passed prop
        expect(wrapper.find(WrappedForm).prop('formErrors')).to.include(this.failedLoginValidationString);
    });

    it('handleSubmit 422 response should pass form and field errors from the body of the response to the wrapped Component', function () {
        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        const responseObject = {
            errors: {
                form_errors: ["error1"],
                field_errors: {
                    first_name: ["first_name error"],
                    last_name: ["last_name error"]
                }
            }
        };
        this.requests[0].respond(422, { 'Content-Type': 'text/json' }, JSON.stringify(responseObject));

        // Get the passed props from the DOM
        expect(wrapper.find(WrappedForm).prop('formErrors')).to.deep.equal(responseObject.errors.form_errors);

        //PropsDomDebugger can't render maps because they don't JSON.stringify :(
        //expect(fieldErrors.get('first_name')).to.deep.equal(responseObject.errors.field_errors.first_name);
    });

    it('handleSubmit 422 response without errors object should return general error', function () {
        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        this.requests[0].respond(422, { 'Content-Type': 'text/json' }, 'garbage Response');

        expect(wrapper.find(WrappedForm).prop('formErrors')).to.include(this.generalErrorString);
    });

    it('handleSubmit other response codes should set a general form error', function () {
        const wrapper = getComponent();
        wrapper.find('form').simulate('submit');

        // Testing some common responses
        this.requests[0].respond(500, { 'Content-Type': 'text/json' }, '');
        expect(wrapper.find(WrappedForm).prop('formErrors')).to.include(this.generalErrorString);

        wrapper.find('form').simulate('submit');
        this.requests[1].respond(404, { 'Content-Type': 'text/json' }, '');
        expect(wrapper.find(WrappedForm).prop('formErrors')).to.include(this.generalErrorString);

        // Just test that the 403 case returns the different string
        wrapper.find('form').simulate('submit');
        this.requests[2].respond(403, { 'Content-Type': 'text/json' }, '');
        expect(wrapper.find(WrappedForm).prop('formErrors')).to.not.include(this.generalErrorString);
    });

    it('handleSubmit should post to the postEndpoint prop string', function () {
        const self = this;
        const customEndpoint = '//uniqueEndpount.com';
        // Create a function we'll assert if it's called. Has to also call done() so mocha knows
        // when the test is done
        const stub = sinon.stub()

        const wrapper = getComponent({
            'postEndpoint': customEndpoint,
            'successCallback': stub,
        });
        wrapper.find('form').simulate('submit');

        // Respond with an empty 200
        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '');
        expect(stub.getCall(0).args[0].url).to.equal(customEndpoint)
    });

    it('parseAPIErrors should return an empty Map with no intialErrors', function () {
        const instance = getComponent().instance();

        const emptyMap = new Map();
        const noValue = instance.parseAPIErrors();
        expect(noValue).to.deep.equal(emptyMap);

        const nullValue = instance.parseAPIErrors(null);
        expect(noValue).to.deep.equal(emptyMap);

        const emptyStringValue = instance.parseAPIErrors('');
        expect(noValue).to.deep.equal(emptyMap);
    });

    it('parseAPIErrors should flatten nested values with it they\'re parent\'s keys', function () {
        const instance = getComponent().instance();
        const inputObj = {
            user: {
                email: ['Error 1', 'error 2'],
                first_name: ['Error 3', 'error 4'],
                last_name: ['Error 5', 'error 6'],
            }
        };

        const expectedOutputMap = new Map();
        expectedOutputMap.set('user[email]', ['Error 1', 'error 2']);
        expectedOutputMap.set('user[first_name]', ['Error 3', 'error 4']);
        expectedOutputMap.set('user[last_name]', ['Error 5', 'error 6']);

        const actualMap = instance.parseAPIErrors(inputObj);

        expect(actualMap).to.deep.equal(expectedOutputMap);
    });

    it('parseAPIErrors still handle non nested values', function () {
        const inputObj = {
            email: ['Error 1', 'error 2'],
            first_name: ['Error 3', 'error 4'],
            last_name: ['Error 5', 'error 6'],
        };

        const expectedOutputMap = new Map();
        expectedOutputMap.set('email', ['Error 1', 'error 2']);
        expectedOutputMap.set('first_name', ['Error 3', 'error 4']);
        expectedOutputMap.set('last_name', ['Error 5', 'error 6']);

        const actualMap = getComponent().instance().parseAPIErrors(inputObj);

        expect(actualMap).to.deep.equal(expectedOutputMap);
    });

    it('parseAPIErrors should handle a mix of nested and non nested', function () {
        const inputObj = {
            email: ['Error 1', 'error 2'],
            first_name: ['Error 3', 'error 4'],
            last_name: ['Error 5', 'error 6'],
            user: {
                email: ['Error 1', 'error 2'],
                first_name: ['Error 3', 'error 4'],
                last_name: ['Error 5', 'error 6'],
            }
        };

        const expectedOutputMap = new Map();
        expectedOutputMap.set('email', ['Error 1', 'error 2']);
        expectedOutputMap.set('first_name', ['Error 3', 'error 4']);
        expectedOutputMap.set('last_name', ['Error 5', 'error 6']);
        expectedOutputMap.set('user[email]', ['Error 1', 'error 2']);
        expectedOutputMap.set('user[first_name]', ['Error 3', 'error 4']);
        expectedOutputMap.set('user[last_name]', ['Error 5', 'error 6']);

        const actualMap = getComponent().instance().parseAPIErrors(inputObj);

        expect(actualMap).to.deep.equal(expectedOutputMap);
    });

    it('parseAPIErrors should handle a mix of nested and non nested', function () {
        const inputObj = {
            email: ['Error 1', 'error 2'],
            first_name: ['Error 3', 'error 4'],
            last_name: ['Error 5', 'error 6'],
            user: {
                email: ['Error 1', 'error 2'],
                first_name: ['Error 3', 'error 4'],
                last_name: ['Error 5', 'error 6'],
            }
        };

        const expectedOutputMap = new Map();
        expectedOutputMap.set('email', ['Error 1', 'error 2']);
        expectedOutputMap.set('first_name', ['Error 3', 'error 4']);
        expectedOutputMap.set('last_name', ['Error 5', 'error 6']);
        expectedOutputMap.set('user[email]', ['Error 1', 'error 2']);
        expectedOutputMap.set('user[first_name]', ['Error 3', 'error 4']);
        expectedOutputMap.set('user[last_name]', ['Error 5', 'error 6']);

        const actualMap = getComponent().instance().parseAPIErrors(inputObj);

        expect(actualMap).to.deep.equal(expectedOutputMap);
    });

    it('parseAPIErrors should handle deep nesting', function () {
        const inputObj = {
            user: {
                email: {
                    domain: ['Top Level Domain is not accepted'],
                    address: ['we don\'t like your email address']
                }
            }
        };

        const expectedOutputMap = new Map();
        expectedOutputMap.set('user[email][domain]', ['Top Level Domain is not accepted']);
        expectedOutputMap.set('user[email][address]', ['we don\'t like your email address']);

        const actualMap = getComponent().instance().parseAPIErrors(inputObj);

        expect(actualMap).to.deep.equal(expectedOutputMap);
    });

    it('should take errors as props and pass them to the wrapped form', () => {
        const formErrors = ['someErr', 'err two'];
        const wrapper = getComponent({formErrors})
        expect(wrapper.find(WrappedForm).prop('formErrors')).to.deep.equal(formErrors);
    });
});




