import React from 'react';
import ReactDOM from 'react-dom';

import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import { CommunityBenefits } from './index';
import FeatureCard from 'client/common/components/FeatureCard';

import messageList from 'client/common/language/enMessages.json';

describe('Benefits', function () {
    const getComponent = (props = {}, type = 'shallow') => {
        return createComponentRenderer(CommunityBenefits, {
            defaultProps: {
                name: 'test Community',
                avatar: '/path/to/someimg.jpg',
                routes: {
                    terms: '#',
                },
                breakpoints: {
                    currentBreakPoint: 'sm',
                },
            },
            withIntl: true
        })(props, type)
    }
    beforeEach(function () {
        this.matchCardHeader = messageList['communityJoinContent.benefits.matching.header'];
    });

    it("Has a configurable className", function () {
        const wrapper = getComponent({className: 'uniqueClass'});
        expect(wrapper.hasClass('uniqueClass')).to.deep.equal(true);
    });

    it('should show the matching feature card if matching is enabled and value is non 0', function () {
        let wrapper = getComponent({}, 'full');
        // Intial check for the the default feature cards shown
        expect(wrapper.find(FeatureCard).length).to.deep.equal(3)
        // re-render the component with the properties to display the matching card.
        wrapper = getComponent(
            {
                matchingEnabled: true,
                matchingType: "year",
                matchingValue: 20,
            },
            'full'
        );

        expect(wrapper.find(FeatureCard).length).to.deep.equal(4);

        // Verify that the last card is the match card
        const matchCard = wrapper.find(FeatureCard).first();
        expect(matchCard.text()).to.contain(this.matchCardHeader);
    });

    it('should not show the matching feature card if matching is enabled and value is 0', function () {
        const wrapper = getComponent(
            {
                matchingEnabled: true,
                matchingType: "year",
                matchingValue: 0,
            },
            'full'
        );

        expect(wrapper.find(FeatureCard).length).to.deep.equal(3)
    });

    it('matching feature card should have different copy with different matching periods', function () {
        const yearWrapper = getComponent(
            {
                matchingEnabled: true,
                matchingType: "year",
                matchingValue: 10,
            },
            'full'
        );

        const monthWrapper = getComponent(
            {
                matchingEnabled: true,
                matchingType: "month",
                matchingValue: 10,
            },
            'full'
        );

        let yearMatchCard = yearWrapper.find(FeatureCard).first();
        let monthMatchCard = monthWrapper.find(FeatureCard).first();

        const yearString = yearMatchCard.find('.c-feature-card__content').text();
        const monthString = monthMatchCard.find('.c-feature-card__content').text();

        expect(monthString).to.not.equal(yearString);
    });
});
