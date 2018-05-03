// Form Errors
// ===
//
// Displays a container at the beginning of a form with a list of errors


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// UI components
// ---
import Icon from 'client/common/components/Icon';
import Alert from 'client/common/components/Alert';


// Component Styles
// ---
import './form-errors.scss';


const FormErrors = (props) => {
    const {
        className,
        showIcon,
        errorsArray,
    } = props;

    const componentClass = classNames(
        'qa-form-errors',
        'u-flex',
        className,
    );

    return (
        <Alert type="error" className={componentClass}>
            {showIcon &&
                <div className="u-flex u-margin-end-md">
                    <Icon
                        className="u-flex-self-center"
                        glyph="heartBroken"
                        size="md"
                    />
                </div>
            }

            <ul className="u-flex-self-center">
                {errorsArray.map((error, idx) => (
                    <li key={idx} className="c-form-errors__message">
                        {error}
                    </li>
                ))}
            </ul>
        </Alert>
    );
}

FormErrors.defaultProps = {
    showIcon: false,
    errorsArray: [],
};

FormErrors.propTypes = {
    className: PropTypes.string,
    showIcon: PropTypes.bool,
    errorsArray: PropTypes.arrayOf(PropTypes.string),
};

export default FormErrors;
