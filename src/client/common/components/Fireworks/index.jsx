// Fireworks Component
// ===
//
// Goes boom boom with pretty lights
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';


const {
    oneOf,
} = PropTypes;


// Component Styles
// ---
import './fireworks.scss';


const Fireworks = (props) => {
    const classNames = `c-fireworks c--${props.position}`;

    return (
        <svg
            className={classNames}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 97 50"
        >
            <path
                className="c-fireworks--streaks"
                /* eslint-disable max-len */
                d="M94 32.8L72.2 45.5m4-33.5L63.6 33.8M48.5 4.5v25.1M20.7 12l12.6 21.8M3 32.8l21.8 12.6"
                /* eslint-enable max-len */
            />
        </svg>
    );
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
Fireworks.defaultProps = {
    position: 'baseline',
};

// Explicitly state they type of Components you expect here
Fireworks.propTypes = {
    position: oneOf([
        'around',
        'baseline',
        'top-right',
    ]),
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default Fireworks;
