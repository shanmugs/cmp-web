// SignUpFormContent Component
// ===
//
// A sign up form for joining Chimp
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

// UI components
// ---
import Alert from 'client/common/components/Alert';
import FloatLabelInput from 'client/common/components/FormElements/FloatLabelInput';
import FormErrors from 'client/common/components/FormElements/FormErrors';
import GeminiLink from 'client/common/components/GeminiLink';


// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messageList = defineMessages({
    agreementText: {
        id: 'signUpForm.agreementText',
        description: 'foo',
        defaultMessage: 'By signing up for a Chimp Account, you agree to accept our',
    },
    createAccount: {
        id: 'common.createAccount',
        description: 'foo',
        defaultMessage: 'Create Account',
    },
    accountAgreementLink: {
        id: 'signupLoginContainer.accountAgreementLink',
        description: 'foo',
        defaultMessage: 'Chimp Account Agreement',
    },
    firstName: {
        id: 'common.firstNameLabel',
        description: 'foo',
        defaultMessage: 'First Name',
    },
    lastName: {
        id: 'common.lastNameLabel',
        description: 'foo',
        defaultMessage: 'Last Name',
    },
    email: {
        id: 'common.emailLabel',
        description: 'foo',
        defaultMessage: 'Email',
    },
    password: {
        id: 'common.passwordLabel',
        description: 'foo',
        defaultMessage: 'Password',
    },
    passwordRequirements: {
        id: 'common.passwordRequirements',
        description: 'foo',
        defaultMessage: 'Your password must contain at least 8 characters, ' +
        'lower and uppercase letters, a number and a special character !@%$#^&~`*()',
    },
    optInLabel: {
        id: 'signUpForm.optInLabel',
        description: 'foo',
        defaultMessage: 'Help me learn about new giving opportunities with occasional ' +
        'messages from this community',
    },
});

const SignUpFormContent = (props) => {
    const {
        className,
        fieldErrors,
        formErrors,
        handleSubmit,
        isSubmitting,
        prepopulatedValues,
        intl,
    } = props;

    const {
        formatMessage,
    } = intl;

    // postedData will be passed when form reloads after a failed submit
    const values = props.postedData || new Map();
    const inviteEmail = prepopulatedValues.get('user[email]');

    return (
        <div
            className={`c-sign-up-form ${className}`}
        >
            <form
                className="
                    u-flex
                    u-flex--column
                    u-flex--items-center
                    u-margin-bottom-lg
                "
                onSubmit={handleSubmit}
                noValidate
            >
                {formErrors.length > 0 &&
                    <FormErrors
                        className="u-margin-bottom-md"
                        errorsArray={formErrors}
                        showIcon
                    />
                }

                <FloatLabelInput
                    className="u-margin-bottom-lg"
                    errors={fieldErrors}
                    inputId="user[first_name]"
                    labelText={formatMessage(messageList.firstName)}
                    inputType="text"
                    inputValue={values.get('user[first_name]')}
                />
                <FloatLabelInput
                    className="u-margin-bottom-lg"
                    errors={fieldErrors}
                    inputId="user[last_name]"
                    labelText={formatMessage(messageList.lastName)}
                    inputType="text"
                    inputValue={values.get('user[last_name]')}
                />
                <FloatLabelInput
                    className="u-margin-bottom-lg"
                    errors={fieldErrors}
                    inputId="user[email]"
                    labelText={formatMessage(messageList.email)}
                    inputType="email"
                    inputValue={inviteEmail || values.get('user[email]')}
                    isReadonly={!!inviteEmail}
                />
                <FloatLabelInput
                    className="u-margin-bottom-md"
                    errors={fieldErrors}
                    inputId="user[password]"
                    inputType="password"
                    labelText={formatMessage(messageList.password)}
                    inputValue={values.get('user[password]')}
                />

                {fieldErrors.size === 0 &&
                    <Alert
                        className="
                            u-margin-bottom-xlg
                            u-text-align-center
                        "
                        type="info"
                    >
                        {formatMessage(messageList.passwordRequirements)}
                    </Alert>
                }

                {/*
                    CT-3659 add u-w-100 css class for ie11 fix
                */}
                <p
                    className="u-margin-bottom-lg u-text-align-center u-w-100"
                >
                    {`${formatMessage(messageList.agreementText)} `}
                    <GeminiLink path={legacyRoutes.accountAgreement}>
                        {formatMessage(messageList.accountAgreementLink)}
                    </GeminiLink>
                </p>
                <button
                    className={`c-button c--filled${isSubmitting ? ' c--pop' : ''}`}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {formatMessage(messageList.createAccount)}
                </button>
            </form>
            {props.children}
        </div>
    );
};


// Default Props are defined if no property with the same key is passed when instantiating this
SignUpFormContent.defaultProps = {
    fieldErrors: new Map(),
    formErrors: [],
    // uses a map so we can query the map for the inputId's nicely with .has()
    postedData: new Map(),
    prepopulatedValues: new Map(),
};

// Explicitly state they type of Components you expect here
SignUpFormContent.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    isSubmitting: PropTypes.bool,
};

export default injectIntl(SignUpFormContent);
