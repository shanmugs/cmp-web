import React from 'react';
import createComponentRenderer from 'client/utils/createComponentRenderer';

import { expect } from 'chai';

import ColumnBorder from './index';

describe('ColumnBorder', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(ColumnBorder, {
            defaultProps: {
                'content': ['one', 'two', 'three', 'four']
            }
        })(props, rendererType);
    };

    it('Has a configurable className', function () {
        const wrapper = getComponent({className: 'uniqueClass'});
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });

    it('Should render a column for each content array item', function () {
        const content = ['itemOne', 'itemTwo', 'itemThree', 'itemFour']
        const wrapper = getComponent({content});

        // Returns an array of the column element nodes
        const contentListArray = wrapper.find('.c-column-border__item');
        // Number of columns rendered should match content array length
        expect(contentListArray.length).to.deep.equal(content.length);

        // Ensures that outputted column content match content array
        for (let i = 0; i < contentListArray.length; i++) {
            expect(contentListArray.at(i).text()).to.deep.equal(content[i]);
        }
    });
});
