// form-errors-test.jsx
import React from 'react';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import FormErrors from './index';
import Icon from 'client/common/components/Icon';

describe('Form Errors', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(FormErrors)(props, rendererType);
    };

    beforeEach(function () {

        this.exampleErrors = [
            'Password is too short',
            'Email domain is not approved',
        ];
    });

    it('Renders a list of errors', function () {
        const wrapper = getComponent({errorsArray: this.exampleErrors})
        const errors = wrapper.find('.qa-form-errors li');
        expect(errors.length).to.deep.equal(this.exampleErrors.length);

        // Ensures that outputted errors match errors array
        for (let i = 0; i < errors.length; i++) {
            expect(errors.at(i).text()).to.deep.equal(this.exampleErrors[i]);
        }
    });

    it('Has a configurable className', function () {
        const wrapper = getComponent({className: 'qa-form-errors'})
        expect(wrapper.hasClass('qa-form-errors')).to.deep.equal(true);
    });

    it('Renders with icon', function () {
        const wrapper = getComponent({
            errorsArray: this.exampleErrors,
            showIcon: true,
        });
        const icon = wrapper.find(Icon);
        expect(icon.length).to.deep.equal(1);
        expect(icon.prop('glyph')).to.deep.equal('heartBroken');
    });
});
