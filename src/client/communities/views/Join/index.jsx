
// Join Component
// ===
//
// View for signing up and login in to a community
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import _ from 'lodash';
import { Helmet } from 'react-helmet';


// Helpers
// ---
import { connectBranch } from 'client/common/store';
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
// Import other components as dependencies
import {
    InnerWrapper,
    WrapperLogo,
} from 'client/common/components/Layout';
import ConfigurableHeader from 'client/common/components/ConfigurableHeader';
import ChatLive from 'client/common/components/ChatLive';
import ChimpFeatures from 'client/common/components/ChimpFeatures';
import SignupLoginContainer from 'client/users/components/SignupLoginContainer';

import Benefits from './Benefits';
import Incentive from './Incentive';

import ViewModel, {
    branchOptions,
} from './ViewModel';


// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messages = defineMessages({
    defaultHeaderMessage: {
        description: 'foo',
        defaultMessage: 'Welcome! Join the community and increase the' +
        ' impact of your charitable giving.',
        id: 'communityJoinContent.default.message',
    },
    getStarted: {
        description: 'foo',
        defaultMessage: 'To get started, sign up for our community on Chimp.',
        id: 'communityJoinContent.getStarted',
    },
    avatarAltText: {
        description: 'foo',
        defaultMessage: 'Client success team member avatar',
        id: 'common.contactUsAvatarAlt',
    },
    chatNow: {
        description: 'foo',
        defaultMessage: 'Chat Live Now',
        id: 'common.chatNow',
    },
    headTitle: {
        description: 'foo',
        defaultMessage: '{name} community giving - Fundraise with likeminded people - Chimp',
        id: 'communityJoinContent.headTitle',
    },
    metaDescription: {
        description: 'foo',
        defaultMessage: 'Pool your money with others to support the things you care about.',
        id: 'communityJoinContent.metaDescription',
    },
});

class CommunityJoin extends BaseComponent {
    constructor(props, context) {
        super(props, context);

        this.viewModel = new ViewModel();

        this.dataLoded = !!props.name;
    }

    componentDidMount() {
        const slug = this.props.params.slug;
        if (!this.dataLoded) {
            this.viewModel.loadComponentData(slug);
        }
    }

    render() {
        if (this.props.hasErrors) {
            return <this.ServerError errorType={this.props.error.status} />;
        }

        const { currentBreakpoint } = this.props.breakpoints;
        const props = this.props;
        const { formatMessage } = props.intl;

        // Use default unless override provided
        const headerMessage = props.givingProgramMessage
            || formatMessage(messages.defaultHeaderMessage, { name: props.name });

        let incentiveCopy = null;
        if (props.incentiveEnabled) {
            incentiveCopy = (<Incentive
                className="u-clr-brand u-fw-m"
                name={props.name}
                value={props.incentiveValue}
            />);
        }

        // Determine heroImage size to display
        const banner = props.banner;
        let heroImage = null;
        let heroImageThumb = null;

        if (banner) {
            heroImage = banner.small;
            heroImageThumb = banner.thumbnail;

            if (currentBreakpoint === 'md') {
                heroImage = banner.medium;
            } else if (currentBreakpoint === 'lg') {
                heroImage = banner.original;
            }
        }


        const {
            assetPath,
        } = this.props;

        const prepopulatedValues = new Map();
        if (props.invitedUserEmail !== null) {
            prepopulatedValues.set('user[email]', props.invitedUserEmail);
        }

        // FormComponent uses communications component, which prepends the API root path
        const communityPath = `${this.viewModel.getCommunitiesAPIPath()}/${props.id}`;
        const commonFormProps = {
            postEndpoint: '', // different for login & signup; see below
            assetPath,
            prepopulatedValues,
        };
        const signupFormProps = _.assign({}, commonFormProps, {
            postEndpoint: `${communityPath}/signup`,
        });
        const loginFormProps = _.assign({}, commonFormProps, {
            postEndpoint: `${communityPath}/login`,
        });

        return (
            <div className="v-community-join">
                <Helmet>
                    <title>{formatMessage(messages.headTitle, { name: props.name })}</title>
                    <meta name="description" content={formatMessage(messages.metaDescription)} />
                </Helmet>

                <ConfigurableHeader
                    assetPath={props.assetPath}
                    defaultBackground="community"
                    title={props.name}
                    message={headerMessage}
                    heroImage={heroImage}
                    heroImageThumb={heroImageThumb}
                    avatar={props.avatar}
                    avatarAlt={`${props.name}'s Avatar`}
                />

                <main role="main">
                    <Benefits
                        matchingEnabled={props.matchingEnabled}
                        matchingType={props.matchingPeriod}
                        matchingValue={props.matchingValue}
                        communityType={props.communityType}
                    />
                </main>

                <InnerWrapper
                    isSmall
                    isPadded
                    className="u-text-align-center u-margin-bottom-xlg"
                >
                    {incentiveCopy}
                    <p className="u-fw-md">
                        {formatMessage(messages.getStarted)}
                    </p>
                </InnerWrapper>

                <WrapperLogo>
                    <InnerWrapper isSmall>
                        <SignupLoginContainer
                            signupFormProps={signupFormProps}
                            loginFormProps={loginFormProps}
                            showLogin={props.showLogin}
                            assetPath={props.assetPath}
                        />
                    </InnerWrapper>
                </WrapperLogo>

                <ChimpFeatures />

                <InnerWrapper isSmall isPadded>
                    <ChatLive />
                </InnerWrapper>
            </div>
        );
    }
}


const {
    any,
    arrayOf,
    bool,
    number,
    object,
    objectOf,
    oneOf,
    string,
} = PropTypes;

// Explicitly state they type of Components you expect here
CommunityJoin.propTypes = {
    assetPath: string,
    avatar: string,
    banner: string,
    communityType: oneOf(['general', 'employer']),
    currentBreakpoint: PropTypes.string,
    incentiveEnabled: bool,
    incentiveValue: string,
    intl: intlShape.isRequired,
    invitedUserEmail: string,
    loginEndpoint: string,
    matchingEnabled: bool,
    matchingPeriod: oneOf(['year', 'month']),
    matchingValue: number,
    name: string,
    showLogin: bool,
    signupEndpoint: string,
    welcomeMessage: string,
};

CommunityJoin.defaultProps = {
    invitedUserEmail: '',
    assetPath: '/assets',
    avatar: '',
    welcomeMessage: '',
    incentiveEnabled: false,
    incentiveValue: '',
    intl: null,
    matchingEnabled: false,
    matchingPeriod: 'month',
    matchingValue: 0,
    name: '',
    showLogin: false,
    signupEndpoint: '',
    loginEndpoint: '',
    communityType: 'general',
    banner: '',
};

const wrappedCommunityJoin = injectIntl(CommunityJoin)
export { wrappedCommunityJoin as CommunityJoin };
export default connectBranch(wrappedCommunityJoin, branchOptions, ViewModel);
