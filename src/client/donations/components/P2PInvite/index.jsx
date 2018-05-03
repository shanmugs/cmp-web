// P2pInvite Component
// ===
//
// P2P Invite component for landing page
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


// UI components
// ---
import {
    InnerWrapper,
} from 'client/common/components/Layout';
import ConfigurableHeader from 'client/common/components/ConfigurableHeader';
import ExpandableText from 'client/common/components/ExpandableText';


// Component Styles
// ---
import './p2p-invite.scss';


// Messages
// ---
const messageList = defineMessages({
    headerAmountMessage: {
        description: 'foo',
        defaultMessage: 'Here\'s {giftAmount} for you from {sender}!',
        id: 'p2pInvite.amountMessage',
    },
    intro: {
        description: 'foo',
        defaultMessage: '{sender} gave you money to send to any charity in Canada by starting a ' +
        'Chimp account.',
        id: 'p2pInvite.intro',
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
});

const P2pInvite = (props) => {
    const { formatMessage } = props.intl;
    const {
        avatar,
        banner,
        giftAmount,
        giftMessage,
        senderDisplayName,
    } = props.p2pData;

    const intro = formatMessage(messageList.intro, { sender: senderDisplayName });

    let headerMessage = formatMessage(
        messageList.headerAmountMessage,
        {
            sender: senderDisplayName,
            giftAmount,
        },
    );
    let headerTitle = '';
    // Figure out Header strings
    if (giftMessage) {
        headerTitle = headerMessage;

        headerMessage = (
            <ExpandableText
                content={giftMessage}
            />
        );
    }

    return (
        <div className="c-p2p-invite">
            <ConfigurableHeader
                avatar={avatar}
                avatarAlt={`${senderDisplayName}'s Avatar`}
                message={headerMessage}
                title={headerTitle}
            />
            <main role="main">
                <InnerWrapper
                    isSmall
                    isPadded
                    className="u-text-align-center u-margin-bottom-xlg"
                >
                    <p className="u-fw-m qa-p2p-intro-text">
                        {intro}
                    </p>
                </InnerWrapper>
            </main>
        </div>
    );
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
P2pInvite.defaultProps = {
    invitedUserEmail: null,
};

// Explicitly state they type of Components you expect here
P2pInvite.propTypes = {
    intl: intlShape.isRequired,
    p2pData: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        banner: PropTypes.string,
        senderDisplayName: PropTypes.string.isRequired,
        giftAmount: PropTypes.string.isRequired,
        giftMessage: PropTypes.string,
    }).isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(P2pInvite);
