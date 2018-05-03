import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import Overlay from './index';

describe('Overlay', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Overlay, {
            defaultProps: {
                children: [
                    <div><h3>Some Content</h3></div>,
                    <div><h3>Some Different Content</h3></div>,
                    <div><h3>More</h3></div>,
                    <div><h3>Last thing</h3></div>,
                ],
            }
        })(props, rendererType);
    }

    it('Displays Its children', function () {
        const wrapper = getComponent();
        expect(wrapper.contains(<div><h3>Some Content</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>Some Different Content</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>More</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>Last thing</h3></div>)).to.deep.equal(true);
    });

    it('Should optionally render a light version', function () {
        const wrapper = getComponent({ isLight: true });
        expect(wrapper.find('.c--light').length).to.deep.equal(1);
    });
});
