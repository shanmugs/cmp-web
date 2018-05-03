// ChatLive Component
// ===
//
// Displays contact info and Chat Live cta
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
    FormattedHTMLMessage,
} from 'react-intl';

// UI components
// ---
// Import other components as dependencies
import CalloutAvatar from 'client/common/components/CalloutAvatar';
import SupportChat from 'client/common/components/SupportChat';

import csAvatarImg from 'client/common/images/csHelpAvatar.jpg';


// Messages
// ---
const messages = defineMessages({
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


const ChatLive = ({ className, intl: { formatMessage } }) => (
    <CalloutAvatar
        avatar={csAvatarImg}
        avatarAlt={formatMessage(messages.avatarAltText)}
        className={`c-chat-live ${className}`}
    >
        <div>
            <div className="u-margin-bottom-md">
                <FormattedHTMLMessage
                    id="common.hereToHelp"
                    description="foo"
                    defaultMessage={'Have questions? We\'re here for you! Email us at' +
                    ' <a href="mailto:hello@chimp.net">hello@chimp.net</a> or call' +
                    ' <a href="tel:+18775310580">+1 (877) 531-0580</a>.'}
                />
            </div>
            <SupportChat>
                <a
                    className="c-button c--pop"
                    href="mailto:hello@chimp.net"
                >
                    {formatMessage(messages.chatNow)}
                </a>
            </SupportChat>
        </div>
    </CalloutAvatar>
);

// Explicitly state they type of Components you expect here
ChatLive.propTypes = {
    className: PropTypes.string,
    intl: intlShape.isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(ChatLive);
