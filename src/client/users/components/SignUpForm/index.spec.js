import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import { SignUpForm } from './index';
import Success from './Success';
import Content from './Content';

describe('SignUpForm', function() {
    const getComponent = (props = {}, rendererType = 'full') => {
        return createComponentRenderer(SignUpForm, {
            withIntl: true,
        })(props, rendererType);
    };

    it('has a configurable className', function() {
        const wrapper = shallow(<SignUpForm className="uniqueClass" />);
        expect(wrapper.hasClass('uniqueClass')).to.be.true;
    });

    it('displays the success message when successState is truthy', function() {
        const wrapper = shallow(<SignUpForm successState={true} />);
        const hasSuccess = wrapper.find(Success).exists();
        expect(hasSuccess).to.be.true;
    });


    it('should display the signup form when successState falsy', function() {
        const wrapper = shallow(<SignUpForm successState={false} />);
        const hasSuccess = wrapper.find(Success).exists();
        expect(hasSuccess).to.be.false;
    });

    it('passes activationUri to Success when it\'s passed in the response prop' , function() {
        const activationUri = '/someroute/123456788';
        const wrapper = getComponent({
            successState: true,
            response: {
                activationUri,
            }
        });

        expect(wrapper.find(Success).prop('activationUri')).to.deep.equal(activationUri);
    });

});
