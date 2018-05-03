import React from 'react';
import { expect } from 'chai';
import helpers from 'client/common/helpers/helpers';
import createComponentRenderer from 'client/utils/createComponentRenderer';
import ErrorMessage from './ErrorMessage';

import messageList from 'client/common/language/enMessages.json';



describe('ErrorMessage', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(ErrorMessage, {
            withIntl: true,
        })(props, rendererType);
    };

    it('A 403 page has the 403 message and contact us button', function () {
        const wrapper = getComponent({ status: 403 }, 'full');
        const button = wrapper.find('button');

        expect(wrapper.text()).to.contain(messageList['common.errorHeading403']);
        expect(button.text()).to.equal(messageList['common.contactUs']);
    });

    it('A 404 page has the 404 message and contact us button', function () {
        const wrapper = getComponent({ status: 404 }, 'full');
        const button = wrapper.find('button');

        expect(wrapper.text()).to.contain(messageList['common.errorHeading404']);
        expect(button.text()).to.equal(messageList['common.contactUs']);
    });

    it('A 500 page has the 500 message and contact us button', function () {
        const wrapper = getComponent({ status: 500 }, 'full');
        const button = wrapper.find('button');

        expect(wrapper.text()).to.contain(messageList['common.errorHeading500']);
        expect(button.text()).to.equal(messageList['common.contactUs']);    
    });

    it('A 501 page has a general message and contact us button', function () {
        const wrapper = getComponent({ status: 501 }, 'full');
        const button = wrapper.find('button');

        expect(wrapper.html()).to.contain(messageList['common.errorMessage']);
        expect(button.text()).to.equal(messageList['common.contactUs']);
    });
});
