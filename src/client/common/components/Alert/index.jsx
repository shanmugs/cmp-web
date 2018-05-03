// Alert
// ===
//
// Displays a container at the beginning of a form with a list of errors


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Component Styles
// ---
import './alert.scss';


const Alert = (props) => {
    const { className, type, children } = props;

    const componentClass = classNames(
        'c-alert',
        className,
        {
            'c--info': type === 'info',
            'c--success': type === 'success',
            'c--warning': type === 'warning',
            'c--error': type === 'error',
        }
    );

    return (
        <div className={componentClass}>
            {children}
        </div>
    );
};

Alert.defaultProps = {
    type: 'info',
};

Alert.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    children: PropTypes.any.isRequired,
};

export default Alert;
