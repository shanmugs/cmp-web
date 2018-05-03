// PwdResetForm Component
// ===
//
// A form that resets user password
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';


// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';


// UI components
// ---
import { InnerWrapper } from 'client/common/components/Layout';
import FloatLabelInput from 'client/common/components/FormElements/FloatLabelInput';
import FormContainer from 'client/common/components/FormElements/FormContainer';
import FormErrors from 'client/common/components/FormElements/FormErrors';


// Component Styles
// ---
import './pwd-reset-form.scss';


// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messageList = defineMessages({
    description: {
        id: 'pwdReset.description',
        description: 'foo',
        defaultMessage: 'Enter your email address and we\'ll send you a link to reset your' +
        ' password if there is an account associated with that email address.',
    },
    reset: {
        id: 'pwdReset.button',
        description: 'foo',
        defaultMessage: 'Reset My Password',
    },
    email: {
        id: 'common.emailLabel',
        description: 'foo',
        defaultMessage: 'Email',
    },
    closeModal: {
        id: 'common.close',
        description: 'foo',
        defaultMessage: 'Close',
    },
    pwdResetHeader: {
        id: 'pwdReset.success.header',
        description: 'foo',
        defaultMessage: 'Check your Inbox',
    },
    pwdResetSuccess: {
        id: 'pwdReset.success.message',
        description: 'foo',
        defaultMessage: 'If your email address (\'{email}\') is connected to your Chimp Account, ' +
        ' we\'ll send you a link to reset your password.',
    },
});


// Images
// ---
import successImg from 'client/common/images/success_screen_email.gif';

class PwdResetForm extends BaseComponent {
    closeModal() {
        // If this component is in a closeModal, fire the method passed to it by the context
        if (typeof this.context.closeModal !== 'undefined') {
            this.context.closeModal();
        }
    }

    renderFormErrors(formErrors) {
        let displayFormErrors;

        if (formErrors.length > 0) {
            displayFormErrors = (
                <FormErrors
                    className="u-margin-bottom-md"
                    errorsArray={formErrors}
                    showIcon
                />
            );
        }

        return displayFormErrors;
    }

    render() {
        const {
            assetPath,
            className,
            fieldErrors,
            formErrors,
            handleSubmit,
            isSubmitting,
            postedData,
            successState,
        } = this.props;
        const { formatMessage } = this.props.intl;

        let contents = null;
        if (successState) {
            contents = (
                <div className="qa-pwd-reset-success u-text-align-center">
                    <img
                        className="u-margin-bottom-sm"
                        width="144px"
                        height="108px"
                        alt="Success checkmark"
                        src={`${successImg}`}
                    />
                    <h3 className="u-margin-bottom-md u-fs-md">
                        {formatMessage(messageList.pwdResetHeader)}
                    </h3>
                    <p className="u-margin-bottom-lg">
                        {formatMessage(
                            messageList.pwdResetSuccess,
                            { email: postedData.get('login_or_email') }
                        )}
                    </p>
                    <button
                        type="submit"
                        className="c-button c--filled u-margin-bottom-lg"
                        onClick={this.closeModal}
                    >
                        {formatMessage(messageList.closeModal)}
                    </button>
                </div>
            );
        } else {
            const buttonClasses = classNames(
                'c-button c--filled',
                'u-margin-bottom-xlg',
                {
                    'c--pop': !isSubmitting,
                },
                className
            );

            contents = (
                <div>
                    <p className="u-fs-md">{formatMessage(messageList.description)}</p>
                    <form
                        className="u-flex u-flex--column u-flex--items-center"
                        onSubmit={handleSubmit}
                    >
                        {this.renderFormErrors(formErrors)}

                        <FloatLabelInput
                            className="u-margin-bottom-lg"
                            errors={fieldErrors}
                            inputId="login_or_email"
                            inputType="email"
                            labelText={formatMessage(messageList.email)}
                        />

                        <button type="submit" disabled={isSubmitting} className={buttonClasses}>
                            {formatMessage(messageList.reset)}
                        </button>
                    </form>
                </div>
            );
        }


        const componentClass = classNames(
            'c-pwd-reset-form',
            className
        );
        // Return JSX components to output Markup to the DOM
        // Use formatMessage to
        return (
            <div className={componentClass}>
                <InnerWrapper isSmall>
                    {contents}
                </InnerWrapper>
            </div>
        );
    }
}

PwdResetForm.contextTypes = {
    closeModal: PropTypes.func,
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
PwdResetForm.defaultProps = {
    assetPath: '/assets',
    formErrors: [],
};


// Explicitly state they type of Components you expect here
PwdResetForm.propTypes = {
    assetPath: PropTypes.string,
    className: PropTypes.string,
    fieldErrors: PropTypes.objectOf(PropTypes.array),
    formErrors: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired, // Passed in by the Form Container
    intl: intlShape.isRequired,
    isSubmitting: PropTypes.bool,
    postedData: PropTypes.objectOf(PropTypes.array),
    successState: PropTypes.bool,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default FormContainer(injectIntl(PwdResetForm), props => (props));
