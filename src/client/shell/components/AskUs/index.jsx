// AskUs Component
// ===
// Displays 'Ask Us Anything' section

// Vendor Components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
    FormattedHTMLMessage,
} from 'react-intl';


// Helpers
// ---
import helpers from 'client/common/helpers/helpers';
// import logger from 'client/common/logger';
import BaseComponent from 'client/common/components/BaseComponent';


// UI components
// ---
import Icon from 'client/common/components/Icon';
import SupportChat from 'client/common/components/SupportChat';


// Styles
// ---
import './ask-us.scss';

// Messages
// // ---
const messageList = defineMessages({
    heading: {
        id: 'header.askUs.heading',
        defaultMessage: 'THIS MESSAGE IS NOT TRANSLATED',
    },
    chatButton: {
        id: 'header.askUs.chat',
        defaultMessage: 'THIS MESSAGE IS NOT TRANSLATED',
    },
    emailButton: {
        id: 'header.askUs.email',
        defaultMessage: 'THIS MESSAGE IS NOT TRANSLATED',
    },
    phoneButton: {
        id: 'header.askUs.phone',
        defaultMessage: 'THIS MESSAGE IS NOT TRANSLATED',
    },
    chatDescription: {
        id: 'header.askUs.chatDescription',
        defaultMessage: 'THIS MESSAGE IS NOT TRANSLATED',
    },
    phoneDescription: {
        id: 'header.askUs.phoneDescription',
        defaultMessage: 'THIS MESSAGE IS NOT TRANSLATED',
    },
});


class AskUs extends BaseComponent {
    handlePhoneButton() {
        this.closeModal();
    }

    handleEmailButton() {
        this.closeModal();
    }

    closeModal() {
        // If this component is in a closeModal, fire the method passed to it by the context
        if (typeof this.context.closeModal !== 'undefined') {
            this.context.closeModal();
        }
    }

    render() {
        const { intl } = this.props;
        const { formatMessage } = intl;

        return (
            <div className="c-ask-us">
                <h3 className="c-ask-us__heading">
                    {formatMessage(messageList.heading)}
                </h3>

                <div className="u-flex u-flex--items-center u-margin-bottom-md">
                    <div className="c-ask-us__button-wrapper">
                        <SupportChat>
                            <button
                                className="c-button c--pop c--filled"
                            >
                                <Icon
                                    glyph="chat"
                                    className="u-margin-end-sm"
                                />
                                {formatMessage(messageList.chatButton)}
                            </button>
                        </SupportChat>
                    </div>
                    <div className="u-flex-expand-right u-margin-start-md c-ask-us__description">
                        {formatMessage(messageList.chatDescription)}
                    </div>
                </div>

                <div className="u-flex u-flex--items-center u-margin-bottom-md">
                    <div className="c-ask-us__button-wrapper">
                        <a
                            className="c-button c--pop c--filled"
                            href="tel:18775310580"
                            onClick={this.handlePhoneButton}
                        >
                            <Icon
                                glyph="phone"
                                className="u-margin-end-sm"
                            />
                            {formatMessage(messageList.phoneButton)}
                        </a>
                    </div>
                    <div className="u-flex-expand-right u-margin-start-md c-ask-us__description">
                        {formatMessage(messageList.phoneDescription)}
                    </div>
                </div>

                <div className="u-flex u-flex--items-center u-margin-bottom-md">
                    <div className="c-ask-us__button-wrapper">
                        <a
                            className="c-button c--pop c--filled"
                            href="mailto:hello@chimp.net"
                            onClick={this.handleEmailButton}
                        >
                            <Icon
                                glyph="email"
                                className="u-margin-end-sm"
                            />
                            {formatMessage(messageList.emailButton)}
                        </a>
                    </div>
                    <div className="u-flex-expand-right u-margin-start-md c-ask-us__description">
                        <FormattedHTMLMessage
                            description="foo"
                            id="header.askUs.emailDescription"
                            defaultMessage={'Email us at <a href="mailto:hello@chimp.net">' +
                            'hello@chimp.net</a> and we’ll get back to you asap'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

AskUs.contextTypes = {
    closeModal: PropTypes.func,
};

AskUs.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(AskUs);
