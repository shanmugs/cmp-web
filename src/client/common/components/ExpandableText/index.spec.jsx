import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import messageList from 'client/common/language/enMessages.json'
import ExpandableText from './index';

describe('ExpandableText', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(ExpandableText, {
            defaultProps: {
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin elementum erat. Integer egestas dapibus iaculis. Donec dapibus rhoncus diam. Morbi congue nibh quis diam pulvinar ullamcorper eu nec ligula. Aenean placerat porttitor felis eu finibus. Morbi facilisis dapibus est, vel posuere.',
            },
            withIntl: true,
        })(props, rendererType)
    }

    it("Has a configurable className", () => {
        const wrapper = getComponent({ className: 'uniqueClass' });
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });

    it("applies c--expanded class when expanded", () => {
        const wrapper = getComponent();
        const link = wrapper.find('.c-expandable-text__expand-link');
        link.simulate('click');
        expect(wrapper.hasClass('c--expanded')).to.deep.equal(true);
    });

    it(`default read more button text is "${messageList['common.readMore']}"`, () => {
        const wrapper = getComponent();
        const link = wrapper.find('.c-expandable-text__expand-link');
        expect(link.text()).to.deep.equal(messageList['common.readMore']);
    });

    it("it truncates to 200 characters by default", () => {
        const wrapper = getComponent();
        // 203 because it's the default limit, plus 3 for the ...
        expect(wrapper.find('.c-expandable-text__text').text().length).to.deep.equal(203)
    });

    it("it takes a configurable message preview length and truncates appropriately", () => {
        const wrapper = getComponent({previewLength: 50});
        expect(wrapper.find('.c-expandable-text__text').text().length).to.deep.equal(53)
    });

    it("it takes configurable link text and renders the custom text", () => {
        const wrapper = getComponent({previewLinkText: 'Custom Link Text'});
        expect(wrapper.find('.c-expandable-text__expand-link').text()).to.deep.equal('Custom Link Text')
    });

    it("clicking on the more link renders the full message", () => {
        const wrapper = getComponent();
        expect(wrapper.find('.c-expandable-text__text').text().length).to.deep.equal(203);
        const link = wrapper.find('.c-expandable-text__expand-link');
        link.simulate('click');
        expect(wrapper.find('.c-expandable-text__text').text().length).to.deep.equal(300);
    });
});
