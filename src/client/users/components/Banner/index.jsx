// Banner Component
// ===
//
// Used to display enticing info.
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Component Styles
// ---
import './banner.scss';

const Banner = (props) => {
    const {
        children,
        className,
    } = props;

    const componentClasses = classNames(
        'c-banner',
        className
    );

    return (
        <div
            className="c-banner__wrapper"
        >
            <div
                className={componentClasses}
            >
                {children}
            </div>
        </div>
    );
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
Banner.defaultProps = {
    className: '',
};

// Explicitly state they type of Components you expect here
Banner.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
};

export default Banner;
