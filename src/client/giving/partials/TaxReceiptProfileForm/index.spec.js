/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {
    Form,
    FormInput,
    Grid,
    GridColumn,
    Icon,
    Message,
    Popup,
} from 'semantic-ui-react';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import TaxReceiptProfileForm from './index';

describe('TaxReceiptProfileForm', () => {
    let wrapper;
    let anotherWrapper;
    const taxData = {
        attributes: {
            addressOne: 'Ist block',
            addressTwo: '2nd Street',
            city: 'Vancouver',
            country: 'CA',
            fullName: 'John',
            postalCode: '682320',
        },
    };
    before(function () {
        const getComponent = (props = {}, rendererType = 'full') => createComponentRenderer(TaxReceiptProfileForm, {
            defaultProps: { },
            withIntl: true,
            withStore: true,
        })(props, rendererType);
        const getAnotherComponent = (props = {}, rendererType = 'full') => createComponentRenderer(TaxReceiptProfileForm, {
            defaultProps: {
                data: taxData,
            },
            withIntl: true,
            withStore: true,
        })(props, rendererType);
        wrapper = getComponent();
        anotherWrapper = getAnotherComponent({ data: taxData });
    });

    it('Renders 2 Grid and 5 input elements ', function () {
        expect(wrapper.exists()).to.be.true;
        expect(wrapper.find(Grid)).to.have.length(2);
        expect(wrapper.find(Form.Input)).to.have.length(5);
    });

    it('should have one childern', function () {
        expect(wrapper.children().length).to.equal(1);
    });

    it('If props is there then an contains an <a> tag ', function () {
        expect(anotherWrapper.exists()).to.be.true;
        expect(anotherWrapper.containsMatchingElement(<a
            className="achPointer achPading"
            onClick={this.handleDisplayForm}
            >Make changes here
            </a>)).to.equal(true);
    });

    it('Renders five sets of Form input elements of specified types', function () {
        const component = wrapper.find(TaxReceiptProfileForm);
        expect(component.length).to.deep.equal(1);

        const inputs = component.find(FormInput);

        const expectedInputIds = [
            'addressOne',
            'addressTwo',
            'city',
            'postalCode',
            'fullName',
        ];
        inputs.forEach((shallowNode) => {
            const inputId = expectedInputIds.indexOf(shallowNode.prop('id'));
            expectedInputIds.splice(inputId, 1);
        });

        expect(expectedInputIds.length).to.deep.equal(0);
    });
});
