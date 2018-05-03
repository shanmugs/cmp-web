import React from 'react';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import { expect } from 'chai';

import CalloutAvatar from './index';

describe('CalloutAvatar', function () {
    // Configure the getComponent method to by default return:
    // <CalloutAvatar avatar='test.png' content='test'/>

    // You can extend or overwrite the default properties by passing an
    // object while calling getComponent()
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(CalloutAvatar, {
            defaultProps: {
                'avatar':'test.png',
                'children': 'test',
            },
        })(props, rendererType);
    };

    it('Has a configurable className', function () {
        const classNameWrapper = getComponent({className: 'uniqueClass'})
        expect(classNameWrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });

    it('Renders a content container and an avatar', function () {
        const wrapper = getComponent();
        expect(wrapper.find('.c-callout-avatar__avatar').length).to.deep.equal(1);
        expect(wrapper.find('.c-callout-avatar__content').length).to.deep.equal(1);
    });

    it('Renders an <img> tag with the avatar prop as the src attribute ', function () {
        const wrapper = getComponent({avatar: 'customAvatar.jpg'});
        expect(wrapper.find('.c-callout-avatar__avatar').html()).to.contain('src="customAvatar.jpg"');
    });

    it('Takes a configurable content class', function () {
        const wrapper = getComponent({contentClass: "content-class-test"});
        expect(wrapper.find('.c-callout-avatar__content .content-class-test').length).to.deep.equal(1);
    });

    it('Renders given children string in the content container', function () {
        const wrapper = getComponent({children: "some custom content "});
        expect(wrapper.find('.c-callout-avatar__content').text()).to.contain("some custom content");
    });
});
