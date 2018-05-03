// /* eslint-env mocha */
// /* eslint-disable prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import {
    Form,
    FormInput,
    Grid,
    GridColumn,
} from 'semantic-ui-react';
import AccountTopUpForm from './index';
import createComponentRenderer from 'client/utils/createComponentRenderer';


 describe('AccountTopUpForm', function() {
    let wrapper;

    before(function() {
        const getComponent = (props = {}, rendererType = 'full') => {
            return createComponentRenderer(AccountTopUpForm, {
                withIntl: true,
                withStore: true,
            })(props, rendererType)
        }    
        wrapper = getComponent();
    });

    it('Render Grid element and Form element of AccountTopUPForm component', function() {

        expect(wrapper.exists()).to.be.true
        expect(wrapper.find(Form)).to.have.length(1);
        expect(wrapper.find(Grid)).to.have.length(2);
    });

    it('Renders one sets of Form input elements of specified types', function() {
        const component = wrapper.find(AccountTopUpForm);        
        expect(component.length).to.deep.equal(1);

        const inputs = component.find(Form);
        const expectedInputIds = [
            'addAmount',
        ];
        // Iterate through each Form.Input node and check that they're using an id we expect
        // If the Id's in the expected array, remove it and assert that the array is empty by the
        // end of all the input nodes.
        inputs.forEach((shallowNode) => {
            const inputId = expectedInputIds.indexOf(shallowNode.prop('id'))
            expectedInputIds.splice(inputId, 1)
        });

        expect(expectedInputIds.length).to.deep.equal(0);
    });
    it('should have one children', function() {
        expect(wrapper.children().length).to.equal(1);
    });

    it('Has a configurable className', function() {
       // expect(wrapper.find(GridColumn).first().hasClass('field')).to.equal(true);
        expect(wrapper.find(GridColumn).someWhere(n => n.hasClass('field'))).to.equal(true);
    });
});
