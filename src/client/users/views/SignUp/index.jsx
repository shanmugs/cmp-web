// SignUp Component
// ===
//
// Sign Up page view
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
import { legacyRoutes } from 'client/routes';
import GeminiLink from 'client/common/components/GeminiLink';

// Helpers
// ---
import { connectBranch } from 'client/common/store';
import BaseComponent from 'client/common/components/BaseComponent';


// UI components
// ---

import { InnerWrapper } from 'client/common/components/Layout';
import ChatLive from 'client/common/components/ChatLive';
import SignUpForm from 'client/users/components/SignUpForm';
import Banner from 'client/users/components/Banner';

import ViewModel, {
    branchOptions,
    signUpPost,
} from './ViewModel';

// Component Styles
// ---
import './sign-up.scss';


// Images
// ---
import chimpBox from 'client/common/images/chimp-box.svg';


// Messages
// ---
const messages = defineMessages({
    callout: {
        id: 'signUpPage.incentive',
        description: 'foo',
        defaultMessage: 'Sign up today, and we\'ll give you {incentiveValue} charity dollars to '
        + 'get started.',
    },
    title: {
        id: 'signUpPage.title',
        description: 'foo',
        defaultMessage: 'Sign up for your Chimp Account',
    },
    subTitle: {
        id: 'signUpPage.subTitle',
        description: 'foo',
        defaultMessage: 'Give when you want, how you want, all in one place.',
    },
    haveAnAccount: {
        id: 'signupLoginContainer.existingUserFormHeading',
        description: 'foo',
        defaultMessage: 'Already have a Chimp Account?',
    },
    login: {
        id: 'common.login',
        description: 'foo',
        defaultMessage: 'Log In',
    },
});


class SignUp extends BaseComponent {
    constructor(props, context) {
        super(props, context);

        this.viewModel = new ViewModel();

        this.dataLoaded = false;
    }

    componentDidMount() {
        if (!this.dataLoaded) {
            ViewModel.loadComponentData();
        }
    }

    render() {
        const { props } = this;
        const {
            formatMessage,
        } = props.intl;

        const {
            incentiveEnabled,
            incentiveValue,
        } = props;

        const signupFormProps = {
            postEndpoint: signUpPost,
        };

        return (
            <div
                className="v-sign-up layout"
            >
                <div
                    className="v-sign-up__image-wrapper layout__header"
                >
                    <img
                        className="v-sign-up__image"
                        src={chimpBox}
                        role="presentation"
                        width="80"
                        height="120"
                    />
                </div>

                <main
                    role="main"
                    className="v-sign-up__main layout__content"
                >
                    <InnerWrapper
                        isPadded
                        className="u-margin-bottom-xlg"
                    >
                        <h1
                            className="
                                u-fs-lg
                                u-clr-brand
                                u-text-align-center
                                u-margin-bottom-md"
                        >
                            {formatMessage(messages.title)}
                        </h1>
                        <p
                            className="u-fs-md u-text-align-center"
                        >
                            {formatMessage(messages.subTitle)}
                        </p>
                    </InnerWrapper>
                    {incentiveEnabled &&
                        <InnerWrapper
                            className="u-margin-bottom-xlg"
                            isPadded
                            isSmall
                        >
                            <Banner>
                                {formatMessage(messages.callout, { incentiveValue })}
                            </Banner>
                        </InnerWrapper>
                    }
                    <InnerWrapper
                        className="u-margin-bottom-xlg"
                        isSmall
                    >
                        <SignUpForm
                            {...signupFormProps}
                            className="u-margin-bottom-xlg"
                        >
                            <div className="u-text-align-center">
                                {`${formatMessage(messages.haveAnAccount)} `}<br />
                                <GeminiLink
                                    path="/users/login"
                                    className="qa-form-toggle"
                                >
                                    {formatMessage(messages.login)}
                                </GeminiLink>
                            </div>
                        </SignUpForm>
                    </InnerWrapper>
                </main>
                <div className="u-clr-bg-tint layout__footer">
                    <InnerWrapper
                        isSmall
                        isPadded
                    >
                        <ChatLive />
                    </InnerWrapper>
                </div>
            </div>
        );
    }
}


const {
    string,
    objectOf,
    bool,
} = PropTypes;

// Default Props are defined if no property with the same key is passed when instantiating this
// class
SignUp.defaultProps = {
    incentiveEnabled: false,
};

// Explicitly list all props that MAY be passed in
SignUp.propTypes = {
    incentiveEnabled: bool,
    incentiveValue: string,
    intl: intlShape.isRequired,
    signupEndpoint: string,
};

// Compose the component with the IntlProvider so that props.formatMessage is available
export default connectBranch(injectIntl(SignUp), branchOptions, ViewModel);
