import React from 'react';
import TestUtils from 'react-dom/test-utils';

import { expect } from 'chai';
import createComponentRenderer from 'client/utils/createComponentRenderer';

import Carousel from './';
import Slider from 'react-slick';

describe('Carousel', function () {
    const getComponent = (props = {}, renderType = 'shallow') => {
        // this is the same as nesting JSX like:
        //<Carousel>
        //    <div><h3>Some Content</h3></div>,
        //    <div><h3>Some Different Content</h3></div>,
        //    <div><h3>More</h3></div>,
        //    <div><h3>Last thing</h3></div>,
        //</Carousel>
        const defaultProps = {
            children: [
                <div><h3>Some Content</h3></div>,
                <div><h3>Some Different Content</h3></div>,
                <div><h3>More</h3></div>,
                <div><h3>Last thing</h3></div>,
            ],
        };
        return createComponentRenderer(Carousel, { defaultProps })(props, renderType);
    }

    it('Displays It\'s children', function () {
        const wrapper = getComponent();
        expect(wrapper.contains(<div><h3>Some Content</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>Some Different Content</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>More</h3></div>)).to.deep.equal(true);
        expect(wrapper.contains(<div><h3>Last thing</h3></div>)).to.deep.equal(true);
    });

    it('Has a customizable class', function() {
        const wrapper = getComponent({className: 'uniqueClass'});
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true)
    });

    it('Takes a sliderRef prop to expose a reference to the slider API', function(done) {
        let sliderRef = null;
        getComponent({
            sliderRef: (el) => {
                sliderRef = el;
                done();
            },
        }, 'full')

        expect(sliderRef instanceof Slider).to.equal(true)
    });
});
