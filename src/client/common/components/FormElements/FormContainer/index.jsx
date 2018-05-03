/**
 * Form Container is a form-wrapper component that handles interactions with the server, like:
 * submitting data, returning errors, and redirecting on success
 *
 * Updated so form-posts now use the communications component instead of XMLHttpRequest()
 */
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import _ from 'lodash';

import BaseComponent from 'client/common/components/BaseComponent';
import server from 'client/common/communications';


// Messages
// ---
const messageList = defineMessages({
    generalError: {
        id: 'common.validation.generalError',
        description: 'foo',
        defaultMessage: 'Something went wrong, please try again',
    },
    failedLoginValidation: {
        id: 'common.validation.login.failure',
        description: 'foo',
        defaultMessage: 'Hmm, we couldn\'t log you in with that info. Give it another try.',
    },
});


/**
 * Helper to create a Map of file names/values in the passed Form object.
 *
 * @param formEl
 * @returns {Map}   Map of keys(field.name) and values(field.value)
 */
const extractFormData = (formEl) => {
    const map = new Map();
    const inputs = formEl.querySelectorAll('input');

    // iterate through form-fields to create a map object
    _.forEach(inputs, (field) => {
        map.set(field.getAttribute('name'), field.value);
    });

    return map;
};


/**
 * Flattens the nested field errors object to a (single-layer) map, keyed by strings.
 *
 * @example
 * initialErrors: {
         *     nonScopedErrors: ['This field is required'],
         *     user: {
         *         email: ['Email is Required',' Email must be valid'],
         *         password: ['Email is Required',' Password must contain one character....'],
         *         first_name: ['First Name is Required'],
         *     }
         * }
 * The above object maps to:
 * errorsMap: {
         *     "nonScopedErrors": ['This field is required'],
         *     "users[email]": ['Email is Required',' Email must be valid'],
         *     "user[password]": ['Email is Required',' Password must contain one character....'],
         *     "user[First_name]": ['First Name is Required']
         * }
 *
 * This method is called ONLY for testing by index.spec.js
 * @param {Object} initialErrors    A nested object of error arrays
 * @returns {Map}  A single level deep map with keys like user[email], user[password]
 */
const parseAPIErrors = (initialErrors) => {
    const errorsMap = new Map();

    if (initialErrors) {
        setNestedErrors(initialErrors); // eslint-disable-line no-use-before-define
    }

    return errorsMap;


    function setNestedErrors(errors, parentFieldname = '') {
        _.forEach(errors, (value, key) => {
            const fieldname = parentFieldname
                ? `${parentFieldname}[${key}]`
                : key;

            // If it's an array, we've hit the value. Let's set the key with this field
            // and any other fields we've traverse so far. Otherwise recurse into value.
            if (!_.isArray(value)) {
                setNestedErrors(value, fieldname);
            } else if (!_.isEmpty(value)) {
                errorsMap.set(fieldname, value);
            }
        });
        /*
         Object.keys(errors).forEach((fieldName) => {
         const value = errors[fieldName];
         const field = currentField ? `${currentField}[${fieldName}]` : fieldName;

         // If it's an array, we've hit the value. Let's set the key with this field
         // and any other fields we've traverse so far.
         if (Array.isArray(value) && value.length > 0) {
         errorsMap.set(field, value);
         } else {
         setNestedErrors(value, field);
         }
         });
         */
    }
};


// set default state because used in more than one place
const defaultState = {
    isSubmitting: false,
    successState: false, // MUST be false
    response: {},
    postedData: new Map(),
    formErrors: [],
    fieldErrors: new Map(),
};


/* eslint-disable react/prop-types, guard-for-in, brace-style */

export default function formContainer(WrappedComponent) {
    class FormContainer extends BaseComponent {
        constructor(props) {
            super(props);

            this.state = _.cloneDeep(defaultState);
        }

        handleSubmit(e) {
            e.preventDefault();

            const props = this.props;
            const formatMessage = props.intl.formatMessage;

            const formEl = e.target;
            const formDataMap = extractFormData(formEl);

            const nextState = _.cloneDeep(defaultState);
            nextState.postedData = formDataMap;

            this.setState({
                isSubmitting: true,
                postedData: formDataMap,
            });

            // POST the form data
            server.post(props.postEndpoint, formDataMap)
                .then((resp) => {
                    const redirectURL = resp ? resp.url : '';
                    if (redirectURL) {
                        browserHistory.push(redirectURL);
                        // CT-3667 Don't update the form view if we're redirecting.
                        // Abort to prevent wasted cpu re-rendering an unmounted form
                        return;
                    }

                    nextState.response = resp;
                    nextState.successState = true;

                    this.setState(nextState);

                    // fire the callback passed in props
                    props.successCallback(resp, formDataMap);
                })
                .catch((resp) => {
                    nextState.response = resp;

                    const errors = resp.errors;

                    if (errors) {
                        nextState.formErrors = errors.form_errors || []; // Array
                        nextState.fieldErrors = parseAPIErrors(errors.field_errors); // Map
                    } else {
                        const errorMessage = resp.statusText === 'FORBIDDEN'
                            ? formatMessage(messageList.failedLoginValidation)
                            : formatMessage(messageList.generalError);

                        nextState.formErrors = [errorMessage];
                    }

                    this.setState(nextState);
                });
        }

        render() {
            const {
                fieldErrors,
                formErrors,
                isSubmitting,
                successState,
                postedData,
                response,
            } = this.state;

            return (
                <WrappedComponent
                    {...this.props}
                    fieldErrors={fieldErrors}
                    formErrors={formErrors}
                    successState={successState}
                    postedData={postedData}
                    handleSubmit={this.handleSubmit}
                    isSubmitting={isSubmitting}
                    response={response}
                />
            );
        }
    }


    // Provides access to the wrapped component for determine component names in the styleguide
    FormContainer.WrappedComponent = WrappedComponent;

    FormContainer.defaultProps = {
        // default empty successCallback so that the container doesn't error if one isn't provided
        successCallback: () => {
            /* eslint-disable no-console */
            console.log(
                'No success Callback provided, nor did the server ' +
                ' respond with a redirect url',
            );
            /* eslint-enable no-console */
        },
    };

    const {
        array,
        func,
        object,
        string,
    } = PropTypes;

    FormContainer.propTypes = {
        postEndpoint: string,
        fieldErrors: object,
        formErrors: array,
        intl: intlShape.isRequired,
        successCallback: func,
    };

    return injectIntl(FormContainer, { withRef: true });
}

/* eslint-enable */
