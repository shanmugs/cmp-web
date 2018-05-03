// Community Log In Form
// ===
//
// A log in form for those invited to join a Community


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import classNames from 'classnames';


// UI components
// ---
import FloatLabelInput from 'client/common/components/FormElements/FloatLabelInput';
import FormErrors from 'client/common/components/FormElements/FormErrors';
import Modal from 'client/common/components/Modal';
import PwdResetForm from 'client/users/components/PwdResetForm';
import FormContainer from 'client/common/components/FormElements/FormContainer';


// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messageList = defineMessages({
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
    forgotPassword: {
        id: 'common.forgotPassword',
        description: 'foo',
        defaultMessage: 'Forgot your password?',
    },
    logIn: {
        id: 'common.logIn',
        description: 'foo',
        defaultMessage: 'Log In',
    },
});

class LoginForm extends React.Component {
    renderPwdResetLink() {
        const { assetPath } = this.props;
        const { formatMessage } = this.props.intl;
        const resetPwdLink = (
            <a className="qa-reset-pwd-link" href="#">
                {formatMessage(messageList.forgotPassword)}
            </a>
        );
        const resetPwdForm = (
            <PwdResetForm
                assetPath={assetPath}
                postEndpoint="/password/reset"
            />
        );

        return (
            <Portal
                closeOnEsc
                closeOnOutsideClick
                openByClickOn={resetPwdLink}
                ref="pwdResetPortal"
            >
                <Modal
                    header={formatMessage(messageList.forgotPassword)}
                    headerIsCentered
                    content={resetPwdForm}
                />
            </Portal>
        );
    }

    render() {
        const {
            className,
            fieldErrors,
            formErrors,
            handleSubmit,
            intl,
            isSubmitting,
            prepopulatedValues,
        } = this.props;

        const { formatMessage } = intl;

        const componentClasses = classNames(
            'c-login-form',
            className,
        );

        const buttonClasses = classNames(
            'c-button c--lg c--filled',
            {
                'c--pop': !isSubmitting,
            },
        );

        return (
            <div className={componentClasses}>
                <form
                    className="u-flex u-flex--column u-flex--items-center"
                    onSubmit={handleSubmit}
                >
                    {!!formErrors.length &&
                        <FormErrors
                            className="u-margin-bottom-md"
                            errorsArray={formErrors}
                            showIcon
                        />
                    }

                    <FloatLabelInput
                        className="u-margin-bottom-md"
                        errors={fieldErrors}
                        inputId="login"
                        inputType="email"
                        inputValue={prepopulatedValues.get('login')}
                        labelText={formatMessage(messageList.email)}
                    />
                    <FloatLabelInput
                        className="u-margin-bottom-md"
                        errors={fieldErrors}
                        inputId="password"
                        inputType="password"
                        labelText={formatMessage(messageList.password)}
                    />

                    <div className="u-margin-bottom-lg u-fs-sm">
                        {this.renderPwdResetLink()}
                    </div>

                    <button type="submit" disabled={isSubmitting} className={buttonClasses}>
                        {formatMessage(messageList.logIn)}
                    </button>
                </form>
            </div>
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
LoginForm.defaultProps = {
    assetPath: '/assets',
    formErrors: [],
    // uses a map so we can query the map for the inputId's nicely with .has()
    prepopulatedValues: new Map(),
};

// Explicitly state they type of Components you expect here
// class
LoginForm.propTypes = {
    assetPath: PropTypes.string,
    className: PropTypes.string,
    fieldErrors: PropTypes.objectOf(PropTypes.array),
    // Can be provided on instantiation, but is normally provided by the form Container after a
    // failed round trip to the postEndpoint validation
    formErrors: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired, // Passed in by the Form Container
    intl: intlShape.isRequired,
    isSubmitting: PropTypes.bool,
    postEndpoint: PropTypes.string.isRequired,
    prepopulatedValues: PropTypes.objectOf(PropTypes.string),
    successCallback: PropTypes.func,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
const IntlLoginForm = injectIntl(LoginForm);
export default FormContainer(IntlLoginForm);
export { IntlLoginForm as LoginForm };
