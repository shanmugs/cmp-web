/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */import React from 'react';

import { IntlProvider } from 'react-intl';
import { expect } from 'chai';
import sinon from 'sinon';
import {
    Breadcrumb,
    Button,
    Container,
    Form,
    Grid,
    Header,
} from 'semantic-ui-react';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import TaxReceiptProfile from './index';

describe('TaxReceiptProfile', () => {
    let wrapper;

    before(function () {
        const getComponent = (props = {}, rendererType = 'full') => {
            return createComponentRenderer(TaxReceiptProfile, {
                withIntl: true,
                withStore: true,
            })(props, rendererType);
        };
        wrapper = getComponent();
    });

    it('Render Container element and  Form element  of TaxReceiptProfile view', function () {
        expect(wrapper.exists()).to.be.true;
        expect(wrapper.find(Container)).to.have.length(1);
        expect(wrapper.find(Form)).to.have.length(2);
    });

    it('TaxReceiptProfile view contains a Form Dropdown with id = taxReceiptRecipient ', function () {
        expect(wrapper.containsMatchingElement(<Form.Dropdown
            id="taxReceiptRecipient"
            name="taxReceiptRecipient"
        />)).to.equal(true);
    });

});
