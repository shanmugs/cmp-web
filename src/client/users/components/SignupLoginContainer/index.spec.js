






// DO NOT UNCOMMENT THIS FILE.
// FOR SOME UNKNOWN (MOST ASSUREDLY RIDICULOUS) REASON, ANY it() IN HERE CAUSES
// karma-sonarqube-unit-reporter/…/xmlbuilder/lib/XMLAttribute.js
// TO THROW SOME BULLSHIT "Missing attribute value for attribute path of element file"








// import React from 'react';
// import { expect } from 'chai';

// import {
//     mountWithIntl,
//     shallowWithIntl,
// } from 'ClientSpecUtils';

// import SignupLoginContainer from './index';
// import ComponentSwitcher from 'client/common/components/ComponentSwitcher';
// import LoginForm from 'client/users/components/LoginForm';
// import SignUpForm from 'client/users/components/SignUpForm';


// describe.only('SignupLoginContainer', function() {
    // const props = {
    //     loginFormProps: {
    //         postEndpoint: 'http://login.com/endpoint',
    //         routes: { accountAgreement: "#" },
    //     },
    //     signupFormProps: {
    //         postEndpoint: 'http://signup.com/endpoint',
    //         routes: { accountAgreement: "#" },
    //     },
    // };

    // it('Shows signUp form by default', function() {
    //     const switcherWrapper = mountWithIntl(<SignupLoginContainer {...props} />)
    //         .find(ComponentSwitcher);

    //     expect(switcherWrapper.find(SignUpForm).exists(), 'signup form').to.be.true;
    //     expect(switcherWrapper.find(LoginForm).exists(), 'login form').to.be.false;
    // });

    // it('Shows loginForm by default if showLogin prop is true', function() {
    //     const wrapper = mountWithIntl(<SignupLoginContainer
    //         showLogin={true}
    //         {...props}
    //     />);

    //     expect(wrapper.find(SignUpForm).exists(), 'signup form').to.be.false;
    //     expect(wrapper.find(LoginForm).exists(), 'login form').to.be.true;
    // });

    // it('passes all signupFormProps to the SignUpForm Component', function() {
    //     const wrapper = mountWithIntl(<SignupLoginContainer
    //         signupFormProps={{
    //             postEndpoint: 'customSignupEndpoint',
    //             routes: { accountAgreement: "#" },
    //         }}
    //         {...props}
    //     />);
    //     const formPostEndpoint = wrapper.find(SignUpForm).prop('postEndpoint');
    //     expect(formPostEndpoint).to.equal('customSignupEndpoint');
    // });

    // it('passes all loginFormProps to the LoginForm Component', function() {
    //     const wrapper = mountWithIntl(<SignupLoginContainer
    //         showLogin={true}
    //         signupFormProps={{
    //             postEndpoint: 'customSignupEndpoint',
    //             routes: { accountAgreement: "#" },
    //         }}
    //         {...props}
    //     />);
    //     const formPostEndpoint = wrapper.find(LoginForm).prop('postEndpoint');
    //     expect(formPostEndpoint).to.equal('customLoginEndpoint');
    // });

    // it(' toggles between to forms via a form-toggle links', function() {
    //     const wrapper = mountWithIntl(<SignupLoginContainer {...props} />);
    //     expect(wrapper.find(SignUpForm).exists()).to.be.true;
    //     expect(wrapper.find(LoginForm).exists()).to.be.false;
    //     expect(wrapper.find('.qa-form-toggle').exists()).to.be.true;;

    //     const trigger = wrapper.find('.qa-form-toggle');

    //     trigger.simulate('click');
    //     expect(wrapper.find(LoginForm).exists()).to.be.true;
    //     expect(wrapper.find(SignUpForm).exists()).to.be.false;

    //     // Have to refind the form toggle since it's rerendered on the first click
    //     // assert that the DOM goes back to how it was
    //     trigger.simulate('click');
    //     expect(wrapper.find(LoginForm).exists()).to.be.false;
    //     expect(wrapper.find(SignUpForm).exists()).to.be.true;
    // });
// });
