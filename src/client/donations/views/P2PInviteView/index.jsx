// P2pInviteView Component
// ===
//
// Renders the p2pInvite if token is valid
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    defineMessages,
} from 'react-intl';
import { Helmet } from 'react-helmet';


// UI components
// ---
// Import other components as dependencies
import BaseComponent from 'client/common/components/BaseComponent';
import ChatLive from 'client/common/components/ChatLive';
import ChimpFeatures from 'client/common/components/ChimpFeatures';
import { connectBranch } from 'client/common/store';
import ErrorMessage from 'client/shell/views/ErrorView/ErrorMessage';
import SignupLoginContainer from 'client/users/components/SignupLoginContainer';
import {
    InnerWrapper,
    WrapperLogo,
} from 'client/common/components/Layout';

import ViewModel, {
    branchOptions,
} from './ViewModel';
import P2pInvite from '../../components/P2PInvite';


// Messages
// ---
const messageList = defineMessages({
    headTitle: {
        description: 'foo',
        defaultMessage: '{name} sent you charitable dollars with Chimp',
        id: 'p2pInvite.headTitle',
    },
    metaDescription: {
        description: 'foo',
        defaultMessage: 'Claim your gift now and send to any charity of your choice in Canada.',
        id: 'p2pInvite.metaDescription',
    },
});

/**
 * This View only ever renders server-side.
 */
class P2pInviteView extends BaseComponent {
    View() {
        const { formatMessage } = this.props.intl;

        const {
            p2pData: {
                invitedUserEmail,
                senderDisplayName,
            },
            showLogin,
        } = this.props;

        const prepopulatedValues = new Map([
            ['user[email]', invitedUserEmail],
        ]);

        const signupFormProps = {
            postEndpoint: `${
                this.props.location.pathname.replace('gift', 'p2p')
            }/user/signup`,
            prepopulatedValues,
        };

        const loginFormProps = {
            postEndpoint: `${
                this.props.location.pathname.replace('gift', 'p2p')
            }/user/login`,
            prepopulatedValues,
        };

        return (
            <div className="id-app-view v-p2p-invite">
                <Helmet>
                    <title>
                        {formatMessage(messageList.headTitle, { name: senderDisplayName })}
                    </title>
                    <meta name="description" content={formatMessage(messageList.metaDescription)} />
                </Helmet>
                <P2pInvite {...this.props} />
                <WrapperLogo>
                    <InnerWrapper isSmall>
                        <SignupLoginContainer
                            signupFormProps={signupFormProps}
                            loginFormProps={loginFormProps}
                            className="u-margin-bottom-xlg"
                            showLogin={showLogin}
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

    render() {
        let Content;

        if (this.props.p2pData) {
            Content = this.View;
        } else if (this.hasServerError()) {
            Content = ErrorMessage;
        } else {
            return null;
        }

        return (
            <Content />
        );
    }
}

// Explicitly state they type of Components you expect here
P2pInviteView.propTypes = {
    invitedUserEmail: PropTypes.string,
    senderDisplayName: PropTypes.string,
    showLogin: PropTypes.bool,
};

P2pInviteView.loadComponentData = ViewModel.loadComponentData;

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default connectBranch(P2pInviteView, _.assign(branchOptions, {
}), ViewModel);
