// Overlay Component
// ===
//
// A full page overlay that is used behind modals and other such things.
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Helpers
// ---
// Import plugins from /client/common/helpers/helpers


// Component Styles
// ---
import './overlay.scss';


const Overlay = (props) => {
    const { children, clickCB, isLight, className } = props;
    const componentClass = classNames(
        'c-overlay',
        className,
        {
            'c--light': isLight,
        }
    );

    // Only triggers passed callback on click of the container overlay
    // Clicking on children content won't fire
    const onOverlayClick = (e) => {
        if (e.target.classList.value === componentClass) {
            clickCB(e);
        }
    };

    // Return JSX components to output Markup to the DOM
    // Use formatMessage to
    return (
        <div className={componentClass} onClick={onOverlayClick}>
            {children}
        </div>
    );
};

const {
    any,
    bool,
    func,
    string,
} = PropTypes;

// Default Props are defined if no property with the same key is passed when instantiating this
// class
Overlay.defaultProps = {
    clickCB: () => {},
    isLight: false,
};

// Explicitly state they type of Components you expect here
Overlay.propTypes = {
    className: string,
    children: any,
    clickCB: func,
    isLight: bool,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default Overlay;
