// InnerWrapper Component
// ===
//
// Inner wrapper component that constrains width of content


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Component Styles
// ---
import './inner-wrapper.scss';


const InnerWrapper = (props) => {
    const { className, isPadded, isSmall } = props;

    const componentClasses = classNames(
        'c-inner-wrapper',
        {
            'c--padding': isPadded,
            'c--sm': isSmall,
        },
        className
    );

    return (
        <div className={componentClasses}>
            {props.children}
        </div>
    );
};

InnerWrapper.defaultProps = {
    children: null,
    className: '',
};

InnerWrapper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isPadded: PropTypes.bool,
    isSmall: PropTypes.bool,
};

export default InnerWrapper;
