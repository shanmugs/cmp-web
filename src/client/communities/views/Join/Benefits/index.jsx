// CommunityBenefits Component
// ===
//
// Determines which incentives are displayed in Feature Cards on the Community Join and Invite pages
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

// Helpers
// ---
import { breakpoints } from 'client/globals';
import { connectBranch } from 'client/common/store';
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';
import helpers from 'client/common/helpers/helpers';

// UI components
// ---
import Carousel from 'client/common/components/Carousel';
import FeatureCard from 'client/common/components/FeatureCard';
import { ColumnBorder } from 'client/common/components/Layout';


// Component Styles
// ---
import './benefits.scss';


// Messages
// ---

const messageList = defineMessages({
    benefitsGiveHeader: {
        description: 'foo',
        defaultMessage: 'Give on your terms',
        id: 'communityJoinContent.benefits.give.header',
    },
    benefitsGiveMessage: {
        description: 'foo',
        defaultMessage: 'You choose the charities and causes you want to support.',
        id: 'communityJoinContent.benefits.give.message',
    },
    benefitsTogetherHeader: {
        description: 'foo',
        defaultMessage: 'Do good together',
        id: 'communityJoinContent.benefits.together.header',
    },
    benefitsCompanyTogetherMessage: {
        description: 'foo',
        defaultMessage: 'Team giving for the 21st century with no paper based tracking',
        id: 'benefits.company.together.message',
    },
    benefitsTogetherMessage: {
        description: 'foo',
        defaultMessage: 'Join others in supporting meaningful causes in your community.',
        id: 'communityJoinContent.benefits.together.message',
    },
    benefitsRewardsHeader: {
        description: 'foo',
        defaultMessage: 'Find giving opportunities',
        id: 'communityJoinContent.benefits.rewards.header',
    },
    benefitsCompanyRewardsHeader: {
        description: 'foo',
        defaultMessage: 'Get meaningful rewards',
        id: 'benefits.company.rewards.header',
    },
    benefitsRewardsMessage: {
        description: 'foo',
        defaultMessage: 'Discover charities making an impact that\'s important to you',
        id: 'communityJoinContent.benefits.rewards.message',
    },
    benefitsCompanyRewardsMessage: {
        description: 'foo',
        defaultMessage: 'Get rewarded for your achievements with charity dollars.',
        id: 'benefits.company.rewards.message',
    },
    benefitsMatchingHeader: {
        description: 'foo',
        defaultMessage: 'Double your impact',
        id: 'communityJoinContent.benefits.matching.header',
    },
    benefitsYearMatchingMessage: {
        description: 'foo',
        defaultMessage: 'Your donations will be matched up to ${value} per calendar year.',
        id: 'communityJoinContent.benefits.year.matching.message',
    },
    benefitsMonthMatchingMessage: {
        description: 'foo',
        defaultMessage: 'Your donations will be matched up to ${value} per month.',
        id: 'communityJoinContent.benefits.month.matching.message',
    },
});

class CommunityBenefits extends BaseComponent {

    moveMatchingBenefit(benifitsArr) {
        const matchingEl = benifitsArr.shift();
        benifitsArr.push(matchingEl);
        return benifitsArr;
    }

    render() {
        if (helpers.isRenderingOnServer) return null;

        const {
            className,
            matchingEnabled,
            matchingValue,
            matchingType,
            communityType,
            intl,
        } = this.props;

        const { currentBreakpoint } = this.props.breakpoints;
        const { formatMessage } = intl;

        let benefitsArr = [];

        // Custom SVG icons
        /* eslint-disable max-len */
        const starIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
                <path fill="#87D0CA" d="M24.8 15.8c-.1-.3-.3-.5-.6-.5l-4.2-.6-1.8-3.7c-.3-.5-1.1-.5-1.3 0L15 14.7l-4.2.6c-.3 0-.5.2-.6.5-.1.3 0 .6.2.8l3 2.9-.7 4.1c0 .3.1.6.3.7.2.2.5.2.8.1l3.7-1.9 3.7 1.9c.1.1.2.1.3.1.2 0 .3 0 .4-.1.2-.2.3-.5.3-.7l-.7-4.1 3-2.9c.3-.3.4-.6.3-.9z" />
            </svg>
        );

        const starShineIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
                <path fill="#E7E6E6" d="M17.5 5.6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3c0 .5-.4.8-.8.8zM17.5 33.8c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3c0 .5-.4.8-.8.8zM33.3 18.2h-3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3c.4 0 .8.3.8.8s-.4.8-.8.8zM4.7 18.2h-3c-.4 0-.7-.3-.7-.8s.3-.8.7-.8h3c.4 0 .8.3.8.8s-.4.8-.8.8zM25.5 10.4c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1l3.9-3.8c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-4 3.8c-.1.1-.3.2-.5.2zM5.7 29.9c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L9 24.8c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.9 3.8c-.2.1-.3.2-.5.2zM29.3 29.9c-.2 0-.4-.1-.5-.2L25 25.9c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.9 3.8c.3.3.3.8 0 1.1-.3.1-.5.2-.7.2zM9.5 10.4c-.2 0-.4-.1-.5-.2L5.1 6.4c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0L10 9.1c.3.3.3.8 0 1.1-.1.1-.3.2-.5.2z" />
                <path fill="#FA4612" d="M24.8 15.2c-.1-.3-.3-.5-.6-.5l-4.2-.6-1.9-3.7c-.3-.5-1.1-.5-1.3 0L15 14.1l-4.2.6c-.3 0-.5.2-.6.5s0 .6.2.8l3 2.9-.7 4.1c0 .3.1.6.3.7.2.2.5.2.8.1l3.7-1.9 3.7 1.9c.1.1.2.1.3.1.2 0 .3 0 .4-.1.2-.2.3-.5.3-.7l-.7-4.1 3-2.9c.3-.3.4-.6.3-.9z" />
            </svg>
        );
        /* eslint-enable max-len */

        if (matchingEnabled && (parseFloat(matchingValue) > 0)) {
            let matchCopy;
            switch (matchingType) {
            case 'year':
                matchCopy = formatMessage(
                    messageList.benefitsYearMatchingMessage, { value: matchingValue }
                );
                break;
            case 'month':
                matchCopy = formatMessage(
                    messageList.benefitsMonthMatchingMessage, { value: matchingValue }
                );
                break;
            default:
                matchCopy = '';
            }

            benefitsArr.push(
                <FeatureCard
                    title={formatMessage(messageList.benefitsMatchingHeader)}
                    description={matchCopy}
                    icon={starShineIcon}
                    className="u-text-align-center"
                    key={1}
                />
            );
        }

        const firstHeader = formatMessage(messageList.benefitsGiveHeader);
        const firstMessage = formatMessage(messageList.benefitsGiveMessage);
        const secondHeader = formatMessage(messageList.benefitsTogetherHeader);
        let secondMessage = formatMessage(messageList.benefitsTogetherMessage);
        let thirdHeader = formatMessage(messageList.benefitsRewardsHeader);
        let thirdMessage = formatMessage(messageList.benefitsRewardsMessage);

        if (communityType === 'employer') {
            secondMessage = formatMessage(messageList.benefitsCompanyTogetherMessage);
            thirdHeader = formatMessage(messageList.benefitsCompanyRewardsHeader);
            thirdMessage = formatMessage(messageList.benefitsCompanyRewardsMessage);
        }

        benefitsArr.push(
            <FeatureCard
                title={firstHeader}
                description={firstMessage}
                icon={starIcon}
                className="u-text-align-center"
                key={2}
            />
        );
        benefitsArr.push(
            <FeatureCard
                title={secondHeader}
                description={secondMessage}
                icon={starIcon}
                className="u-text-align-center"
                key={3}
            />
        );
        benefitsArr.push(
            <FeatureCard
                title={thirdHeader}
                description={thirdMessage}
                icon={starIcon}
                className="u-text-align-center"
                key={4}
            />
        );


        // Render the carousel below the small breakpoint
        const isDesktop = adaptiveComponentHelper.greaterThan('sm', currentBreakpoint);


        const componentClass = classNames(
            'c-community-benefits',
            className
        );

        const sliderConfig = {
            responsive: [
                {
                    breakpoint: breakpoints.md,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: breakpoints.sm,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        };

        let component = (
            <Carousel className={componentClass} sliderConfig={sliderConfig}>
                {benefitsArr}
            </Carousel>
        );
        if (isDesktop) {
            benefitsArr = this.moveMatchingBenefit(benefitsArr);
            component = (
                <div className={componentClass}>
                    <ColumnBorder content={benefitsArr} className="u-margin-bottom-xlg" />
                </div>
            );
        }

        return component;
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
CommunityBenefits.defaultProps = {
    communityType: 'general',
};

// Explicitly state they type of Components you expect here
CommunityBenefits.propTypes = {
    className: PropTypes.string,
    communityType: PropTypes.oneOf(['general', 'employer']),
    matchingEnabled: PropTypes.bool,
    matchingValue: PropTypes.number,
    matchingType: PropTypes.oneOf(['year', 'month']),
    intl: intlShape.isRequired,
};

const wrappedCommunityBenifits = injectIntl(CommunityBenefits);
export { wrappedCommunityBenifits as CommunityBenefits }
// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default connectBranch(wrappedCommunityBenifits, {
    branchPath: 'benefits',
    mapPathsToProps: {
        breakpoints: '/layout/breakpoints',
    },
});
