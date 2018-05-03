import React from 'react';
import TestUtils from 'react-dom/test-utils';

import { commonTests } from 'client/utils/chimp-test-utils';

import { expect } from 'chai';
import Svg from 'client/common/components/Svg';

import ListPreview from './index';

xdescribe('List Preview', function () {

    it('Heading is rendered if passed', function () {
        const headingContent = "Testing";

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview heading={headingContent} />
        );

        let headingDOM = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'c-list-preview__heading');
        headingDOM = headingDOM[0]; // ^ returns of array of elements, have to grab the first one
        expect(headingDOM).to.exist;
        expect(headingDOM.textContent).to.deep.equal(headingContent)
    });

    it('Heading is not rendered by default', function () {
        const headingContent = "Testing";

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview />
        );

        let headingDOM = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'c-list-preview__heading');
        expect(headingDOM.length).to.deep.equal(0);
    });

    it('Renders one list item for every item passed', function () {
        const item1 = { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' };
        const item2 = { name: 'First Robotics Canada', link: '#', type: 'Group' };
        const item3 = { name: 'Community', link: '#', type: 'Beneficiary' };

        const twoItems = [item1, item2];
        const threeItems = [item1, item2, item3];


        let renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={twoItems}/>
        );

        let listItemsArr = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item-wrapper'
        );

        expect(listItemsArr.length).to.deep.equal(twoItems.length);

        renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={threeItems}/>
        );

        listItemsArr = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item-wrapper'
        );

        expect(listItemsArr.length).to.deep.equal(threeItems.length);
    });

    it('Limits the number of rendered items by the maxShow Property passed', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
        ];

        const maxShow = 2;
        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} maxShow={maxShow}/>
        );

        const listItemsArr = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item-wrapper'
        );

        expect(listItemsArr.length).to.deep.equal(maxShow);
    });

    it('Render See more button if items.length exceeds maxShow value', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
        ];

        const maxShow = 2;
        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} maxShow={maxShow}/>
        );

        const buttonEl = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-button'
        );

        expect(buttonEl.length).to.deep.equal(1);
    });

    it('See more button has configurable url, title, and, buttonClass', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
        ];

        const buttonConfig = { url: 'test.com', buttonClass: 'custom-class', title: 'test', }
        const maxShow = 2;
        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} maxShow={maxShow} button={buttonConfig}/>
        );

        const buttonEl = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-button'
        );

        expect(buttonEl[0].getAttribute('href')).to.deep.equal(buttonConfig.url);
        expect(buttonEl[0].getAttribute('class')).to.include(buttonConfig.buttonClass);
        expect(buttonEl[0].textContent).to.deep.equal(buttonConfig.title);
    });

    it('All items render arrow icon if showArrow is passed', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
        ];

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} showArrow/>
        );

        const listItemsArr = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item-wrapper'
        );

        let allItemsHaveArrows = true;
        for (const itemEl of listItemsArr) {
            let arrowEl = itemEl.querySelector('.c-list-preview__list-item-icon-end');
            if (!arrowEl) { allItemsHaveArrows = false };
        }
        expect(allItemsHaveArrows).to.deep.equal(true);

    });

    it('Render custom see more button if passed when items.length exceeds maxShow value', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
        ];

        const customButton = <button className="c-button custom" href="test.com">test</button>;

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} button={customButton} maxShow={2}/>
        );

        const buttonEl = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-button'
        );

        expect(buttonEl[0].getAttribute('href')).to.deep.equal('test.com');
        expect(buttonEl[0].getAttribute('class')).to.include('custom');
        expect(buttonEl[0].textContent).to.deep.equal('test');
    });


    it('items with type "group" render group icon', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
        ];

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} />
        );

        const itemEl = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item'
        );

        // If we can grab the use xlink:href attribute we can compare it with the sprite
        // reference in the Svg.GLYPHS object. This way if our group icon changes, our test
        // will still work
        const useEl = itemEl[0].querySelector('.c-list-preview__list-item-icon use');
        expect(useEl.getAttribute('xlink:href')).to.deep.equal(Svg.GLYPHS.group);

    });

    it('items with type "charity" render beneficiary icon', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Beneficiary' },
        ];

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} />
        );

        const itemEl = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item'
        );

        // If we can grab the use xlink:href attribute we can compare it with the sprite
        // reference in the Svg.GLYPHS object. This way if our group icon changes, our test
        // will still work
        const useEl = itemEl[0].querySelector('.c-list-preview__list-item-icon use');
        expect(useEl.getAttribute('xlink:href')).to.deep.equal(Svg.GLYPHS.charity);
    });

    it('items with no type don\'t render an icon', function () {
        const items = [
            { name: 'Kinetic Knights Robotics', link: '#' },
        ];

        const renderedComponent = TestUtils.renderIntoDocument(
            <ListPreview items={items} />
        );

        const itemEl = TestUtils.scryRenderedDOMComponentsWithClass(
            renderedComponent,
            'c-list-preview__list-item'
        );

        const svgEl = itemEl[0].querySelector('.c-list-preview__list-item-icon');
        expect(svgEl).to.not.exist;
    });
});
