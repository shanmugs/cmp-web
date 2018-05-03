import React from 'react';
import { shallow } from 'enzyme';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import { expect } from 'chai';

import FeatureCard from './index';
import Icon from 'client/common/components/Icon';
import Svg from 'client/common/components/Svg';

describe('FeatureCard', function () {
    const getComponent = (props = {}, renderType = 'shallow') => {
        const defaultProps = {

        };
        return createComponentRenderer(FeatureCard, { defaultProps })(props, renderType);
    };

    it("Has a configurable className", function () {
        const wrapper = getComponent({className: 'test'})

        expect(wrapper.hasClass('test')).to.equal(true);
    });

    it('Renders an icon, title and description if one is passed', function () {
        const wrapper = getComponent({
            icon: "charity",
            title: "Title",
            description: "description",
        });

        expect(wrapper.find(Icon).exists()).to.equal(true);
        expect(wrapper.find('.c-feature-card__content h2').exists()).to.equal(true);
        expect(wrapper.find('.c-feature-card__content div').exists()).to.equal(true);
    });

    it('Renders an icon with a configurable size if one is passed', function () {
        const wrapper = getComponent({
            icon: "charity",
            iconSize: "lg",
            description: "description",
        });

        const icon = wrapper.find(Icon)
        expect(icon.exists()).to.equal(true);
        expect(icon.prop('size')).to.equal('lg');
    });

    it('Renders an image if one is passed', function () {
        const wrapper = getComponent({
            imageSrc: "img.png",
            description: "description",
        });
        expect(wrapper.find('.c-feature-card__img').exists()).to.equal(true);
    });

    it('Renders a CTA button if one is passed', function () {
            const wrapper = getComponent({
            description: "description",
            cta: {
                buttonClass: 'c--pop c--filled',
                title: 'Start Giving',
            },
        });

        const button = wrapper.find('button');
        expect(button.exists()).to.equal(true);
        expect(button.text()).to.equal('Start Giving');
    });

    it('Renders a title with a specified element', function () {

        const wrapper = getComponent({
            title: "Title",
            titleElement: 'h4',
            description: "description",
        });

        expect(wrapper.find('.c-feature-card__content h4').exists()).to.equal(true);
        expect(wrapper.find('.c-feature-card__content h4').text()).to.equal('Title');
    });

    it('Does not render an icon if one is not passed', function () {
        const wrapper = getComponent({
            title: "charity",
            description: "description",
        });

        expect(wrapper.find(Icon).exists()).to.equal(false);
    });

    it('Does not render a title if one is not passed', function () {
        const wrapper = getComponent({
            icon: "charity",
            description: "description",
        });

        expect(wrapper.find('.c-feature-card__content h2').exists()).to.equal(false);
    });

    it('Does not render a description if one is not passed', function () {
        const wrapper = getComponent({
            icon: "charity",
            title: "title",
        });

        expect(
            wrapper.find('.c-feature-card__content')
                .children()
                .find('div')
                .exists()
        ).to.equal(false);

    });

    it('Renderers a Svg component is a svg jsx element is passed as an icon', function () {
        const svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
                <path fill="#E7E6E6" d="M17.5 5.6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3c0 .5-.4.8-.8.8zM17.5 33.8c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3c0 .5-.4.8-.8.8zM33.3 18.2h-3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3c.4 0 .8.3.8.8s-.4.8-.8.8zM4.7 18.2h-3c-.4 0-.7-.3-.7-.8s.3-.8.7-.8h3c.4 0 .8.3.8.8s-.4.8-.8.8zM25.5 10.4c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1l3.9-3.8c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-4 3.8c-.1.1-.3.2-.5.2zM5.7 29.9c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L9 24.8c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.9 3.8c-.2.1-.3.2-.5.2zM29.3 29.9c-.2 0-.4-.1-.5-.2L25 25.9c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.9 3.8c.3.3.3.8 0 1.1-.3.1-.5.2-.7.2zM9.5 10.4c-.2 0-.4-.1-.5-.2L5.1 6.4c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0L10 9.1c.3.3.3.8 0 1.1-.1.1-.3.2-.5.2z"/>
                <path fill="#FA4612" d="M24.8 15.2c-.1-.3-.3-.5-.6-.5l-4.2-.6-1.9-3.7c-.3-.5-1.1-.5-1.3 0L15 14.1l-4.2.6c-.3 0-.5.2-.6.5s0 .6.2.8l3 2.9-.7 4.1c0 .3.1.6.3.7.2.2.5.2.8.1l3.7-1.9 3.7 1.9c.1.1.2.1.3.1.2 0 .3 0 .4-.1.2-.2.3-.5.3-.7l-.7-4.1 3-2.9c.3-.3.4-.6.3-.9z"/>
            </svg>
        );

        const wrapper = getComponent({
            icon: svgIcon,
            title: "title",
        });

        expect(wrapper.find(Svg).exists()).to.equal(true);
    });
});
