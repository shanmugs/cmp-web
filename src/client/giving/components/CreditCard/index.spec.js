import React from 'react';
import { IntlProvider } from 'react-intl';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {
    FormInput,
    Form,
    Grid,
    GridColumn,
} from 'semantic-ui-react';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import CreditCard from './index';

describe('CreditCard', function() {
    const selectedCardDetails = {
        cardNumber: '4242424242424242',
        cvv: '123',
        expiryMonth: '11',
        expiryYear: '2020',
        nameOnCard: 'John',
    };
    const getComponent = (props = {}, rendererType = 'full') => {
        return createComponentRenderer(CreditCard, {
            defaultProps: {
                data: selectedCardDetails,
            },
            withIntl: true,
        })(props, rendererType)
    }

    let wrapper = getComponent({ data: selectedCardDetails });
   
    it('Render Grid element and Form element of Credit card component', function() {
        expect(wrapper.exists()).to.be.true
        expect(wrapper.find(CreditCard)).to.have.length(1);

        expect(wrapper.containsMatchingElement(
        <Form.Input
            id="cardNumber"
            name="cardNumber"
        />)).to.equal(true);
        expect(wrapper.find(Form)).to.have.length(1);
      });
    it('Renders five sets of Form input elements of specified types', function() {
        const inputs = wrapper.find(FormInput);
        expect(inputs.length).to.deep.equal(5);
        const expectedInputIds = [
            'cardNumber',
            'cvv',
            'expiryMonth',
            'expiryYear',
            'nameOnCard',
        ];
        // Iterate through each Form.Input node and check that they're using an id we expect
        // If the Id's in the expected array, remove it and assert that the array is empty by the
        // end of all the input nodes.
        inputs.forEach((shallowNode) => {
            const inputId = expectedInputIds.indexOf(shallowNode.prop('id'));
            expectedInputIds.splice(inputId, 1);
        });
        expect(expectedInputIds.length).to.deep.equal(0);
    });
    it('Has a configurable className', function() {
        expect(wrapper.find(GridColumn).first().hasClass('field')).to.equal(true);
    });
});
