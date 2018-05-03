import React from 'react';
import { expect } from 'chai';
import createComponentRenderer from 'client/utils/createComponentRenderer';

import Incentive from './index';

describe('Incentive', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Incentive, {
            defaultProps: {
                'value':'25',
                'name': 'Capital Power'
            },
            withIntl: true
        })(props, rendererType);
    };


    it("Has a configurable className", function () {
        const wrapper = getComponent({className: 'uniqueClass'});
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });
});
