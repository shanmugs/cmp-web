// FloatLabelInput Component
// ===
//
// Creates a textbox with a label that floats up when user enters text
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import Alert from 'client/common/components/Alert';
import FormErrors from 'client/common/components/FormElements/FormErrors';

// Component Styles
// ---
import './float-label-input.scss';

class FloatLabelInput extends BaseComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isFocused: false,
            value: props.inputValue,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.inputValue });
    }

    onChange(e) {
        const value = e.target.value;

        if (this.props.isDisabled) return;

        if (value !== this.state.value) {
            // Input value is controlled, so we need to update the state on every keyPress
            this.setState({ value });
        }

        this.toggleFocus(value);
    }

    toggleFocus(inputValue) {
        const isFocused = inputValue.length > 0;

        this.setState({ isFocused });
    }

    renderErrors(inputId, errors) {
        let errorsComponent = null;
        if (errors.has(inputId)) {
            errorsComponent = (
                <FormErrors errorsArray={errors.get(inputId)} />
            );
        }
        return errorsComponent;
    }

    render() {
        const {
            className,
            helpText,
            inputType,
            inputId,
            labelText,
            errors,
            isDisabled,
            isReadonly,
        } = this.props;

        const inputValue = this.state.value;

        const labelClasses = classNames(
            'c-float-label-input__label'
        );

        const inputClasses = classNames(
            'c-float-label-input__input'
        );

        const containerClasses = classNames(
            'c-float-label-input',
            className,
            {
                'c--has-error': errors.has(inputId),
                'c--hide': !this.state.isFocused && inputValue === '',
                'c--show': this.state.isFocused || inputValue !== '',
                'c--is-disabled': isDisabled || isReadonly,
            }
        );

        const showHelpText = this.state.isFocused && errors.size === 0 && helpText;

        return (
            <div className={containerClasses} >
                <label
                    htmlFor={inputId}
                    className={labelClasses}
                >
                     {labelText}
                </label>
                <input
                    autoComplete="off"
                    className={inputClasses}
                    disabled={isDisabled}
                    id={inputId}
                    name={inputId}
                    onChange={this.onChange}
                    placeholder={labelText}
                    readOnly={isReadonly}
                    type={inputType}
                    value={inputValue}
                ></input>
                {showHelpText ? <Alert type="info">{helpText}</Alert> : null}
                {this.renderErrors(inputId, errors)}
            </div>
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
FloatLabelInput.defaultProps = {
    className: '',
    inputType: 'text',
    errors: new Map(),
    inputValue: '',
    isDisabled: false,
    isReadonly: false,
};

// Explicitly state they type of Components you expect here
FloatLabelInput.propTypes = {
    className: PropTypes.string,
    helpText: PropTypes.string,
    inputId: PropTypes.string,
    inputType: PropTypes.string,
    inputValue: PropTypes.string,
    isDisabled: PropTypes.bool,
    isReadonly: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default FloatLabelInput;
