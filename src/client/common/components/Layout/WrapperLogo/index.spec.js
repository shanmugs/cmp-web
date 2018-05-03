import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import WrapperLogo from './index';

describe('Wrapper Logo', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(WrapperLogo, {
            defaultProps: {
                children: (
                    <div className="container">
                        <h1>Some more complicated Content</h1>
                        <p> A block of content </p>
                        <img src="path/to/image" />
                    </div>
                ),
            },
        })(props, rendererType);
    };

    it("Should render its children", () => {
        const wrapper = getComponent();

        expect(wrapper.find('.container').length).to.deep.equal(1);
    });

    it("Should take a configurable className", function () {
        const wrapper = getComponent( {className: "test-class"});

        expect(wrapper.find('.test-class').length).to.deep.equal(1);
    });
});
