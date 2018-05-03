// Success Component
// ===
//
// Success view shown when creating an account


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

import Alert from 'client/common/components/Alert';

import successImg from 'client/common/images/success_screen_email.gif';

// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messageList = defineMessages({
    header: {
        id: 'signupLoginContainer.success.header',
        description: 'foo',
        defaultMessage: 'Success! One more thing...',
    },
    confirm: {
        id: 'signupLoginContainer.success.confirm',
        description: 'foo',
        defaultMessage: 'Just one last step to verify we got everything right.',
    },
});


const Success = (props) => {
    const { formatMessage } = props.intl;
    const {
        email,
        assetPath,
        activationUri,
    } = props;

    return (
        <div className="qa-signup-success u-text-align-center">
            {activationUri &&
                <Alert>
                    <h2>Development Mode - Instant Activation</h2><br />
                    <p>Because you're in development mode, we'll show you the activation link right
                    here. It's less of a pain this way. That, and we love you. ❤️</p>
                    <a href={activationUri}>Click To Activate</a> 🚀
                </Alert>
            }
            <img
                width="144px"
                height="108px"
                src={successImg}
                role="presentation"
            />
            <h2 className="u-margin-bottom-md u-fs-md">{formatMessage(messageList.header)}</h2>
            <p>{formatMessage(messageList.confirm)}</p>
            <p>
                <FormattedHTMLMessage
                    id="signupLoginContainer.success.instructions"
                    description="foo"
                    defaultMessage={'Take a look in your inbox at <strong>{email}</strong>' +
                        ' and complete the verification instructions. If you don\'t see an' +
                        ' email from us, try your spam or junk folder.'
                    }
                    values={{ email }}
                />
            </p>
        </div>
    );
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
Success.defaultProps = {
    assetPath: '/assets',
    email: '',
    activationUri: '',
};

// Explicitly state they type of Components you expect here
Success.propTypes = {
    assetPath: PropTypes.string,
    email: PropTypes.string,
    activationUri: PropTypes.string,
    intl: intlShape.isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(Success);
