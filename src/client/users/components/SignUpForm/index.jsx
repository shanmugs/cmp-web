// SignUpForm Component
// ===
//
// A sign up form for joining Chimp
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import Form from './Content';
import Success from './Success';
import FormContainer from 'client/common/components/FormElements/FormContainer';

class SignUpForm extends BaseComponent {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        const {
            response: { activationUri = '' },
            postedData,
        } = this.props;

        const Content = this.props.successState
            ? Success
            : Form;

        return (
            <Content
                activationUri={activationUri}
                email={postedData.get('user[email]')}
                {...this.props}
            />
        );
    }
}

const {
    string,
    objectOf,
    bool,
    shape,
} = PropTypes;

// Default Props are defined if no property with the same key is passed when instantiating this
SignUpForm.defaultProps = {
    postedData: new Map(),
    response: {},
    successState: false,
};

// Explicitly state they type of properties you expect here
SignUpForm.propTypes = {
    assetPath: string,
    successState: bool,
    response: shape({
        activationUri: string,
    }),
};

export default FormContainer(SignUpForm);
export { SignUpForm };
