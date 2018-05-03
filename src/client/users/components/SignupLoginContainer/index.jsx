// SignupLoginContainer Component
// ===
//
// Uses the component switcher to toggle between the signUp and signIn forms
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import _ from 'lodash';


// Helpers
// ---
import helpers from 'client/common/helpers/helpers';
import BaseComponent from 'client/common/components/BaseComponent';


// UI components
// ---

// Import other components as dependencies
import ComponentSwitcher from 'client/common/components/ComponentSwitcher';
import LoginForm from 'client/users/components/LoginForm';
import SignUpForm from 'client/users/components/SignUpForm';
import Success from 'client/users/components/SignUpForm/Success';


// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messageList = defineMessages({
    haveAnAccount: {
        id: 'signupLoginContainer.existingUserFormHeading',
        description: 'foo',
        defaultMessage: 'Already have a Chimp Account?',
    },
    needANewAccount: {
        id: 'signupLoginContainer.newUserFormHeading',
        description: 'foo',
        defaultMessage: 'Not yet on Chimp?',
    },
    createAccount: {
        id: 'common.createAccount',
        description: 'foo',
        defaultMessage: 'Create Account',
    },
    logIn: {
        id: 'common.logIn',
        description: 'foo',
        defaultMessage: 'Log In',
    },
});

class SignupLoginContainer extends BaseComponent {
    constructor() {
        super();
        this.state = {
            status: 'waiting',
            postedData: new Map(),
        };
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps);
    }

    // Update the state of the component, rerendering the success state while making the posted
    // data available.
    onSuccess(res, postDataMap) {
        this.setState({
            status: 'success',
            postedData: postDataMap,
        });
    }

    onLoginSuccess() {
        // Default behavior is to redirect to the /dashboard, but in some cases the endpoint
        // passes back a redirect url which the front-end follows, that logic is housed in the
        // form-container.jsx (this method is overidden if a url is returned)
        browserHistory.go('/users/dashboard');
    }

    NewUserJoinForm(switcherProps) {
        // Component Switcher needs a component with to pass in it's switch function
        // So lets create a pure component and add it to the array for the switcher
        const { formatMessage } = this.props.intl;
        const successCallback = this.onSuccess;
        const { signupFormProps } = this.props;
        const formProps = _.extend({}, signupFormProps, { successCallback });

        function switchToExistingUserForm(e) {
            e.preventDefault();
            switcherProps.switchComponent(1);
        }

        return (
            <div>
                <SignUpForm {...formProps} className="u-margin-bottom-lg" />
                <div className="u-text-align-center">
                    {`${formatMessage(messageList.haveAnAccount)} `}<br />
                    <a
                        href="#login"
                        onClick={switchToExistingUserForm}
                        className="qa-form-toggle"
                    >
                        {formatMessage(messageList.logIn)}
                    </a>
                </div>
            </div>
        );
    }

    ExistingUserJoinForm(switcherProps) {
        // Component Switcher needs a component with to pass in it's switch function
        // So lets create a pure component and add it to the array for the switcher
        const { formatMessage } = this.props.intl;
        const successCallback = this.onLoginSuccess;
        const { loginFormProps } = this.props;
        const formProps = Object.assign({}, loginFormProps, { successCallback });

        function switchToNewUserForm(e) {
            e.preventDefault();
            switcherProps.switchComponent(0);
        }

        return (
            <div>
                <LoginForm {...formProps} className="u-margin-bottom-lg" />
                <div className="u-text-align-center">
                    {`${formatMessage(messageList.needANewAccount)} `}<br />
                    <a
                        href="#signup"
                        onClick={switchToNewUserForm}
                        className="qa-form-toggle"
                    >
                        {formatMessage(messageList.createAccount)}
                    </a>
                </div>
            </div>
        );
    }

    Success() {
        return (
            <Success
                assetPath={this.props.assetPath}
                email={this.state.postedData.get('user[email]')}
            />
        );
    }

    render() {
        let Content;
        let childProps = {};

        if (this.state.status === 'success') {
            Content = Success;
        } else {
            const {
                ExistingUserJoinForm,
                NewUserJoinForm,
            } = this;
            childProps = {
                defaultIdx: this.props.showLogin ? 1 : 0,
                components: [
                    <NewUserJoinForm />,
                    <ExistingUserJoinForm />,
                ],
            };
            Content = ComponentSwitcher;
        }

        return (
            <Content {...childProps} />
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
SignupLoginContainer.defaultProps = {
    showLogin: false,
};

// Explicitly state they type of properties you expect here
SignupLoginContainer.propTypes = {
    intl: intlShape.isRequired,
    signupFormProps: PropTypes.object,
    loginFormProps: PropTypes.object,
    assetPath: PropTypes.string,
    showLogin: PropTypes.bool,
};

// Compose the component with the injectIntl so that this.props.formatMessage is available
// This component is also rendered as a RootComponent, so we need to wrap it with the
// RootComponent class which wraps it in the IntlProvider and chooses the right messages based on
// this.props.local

export default injectIntl(SignupLoginContainer);
