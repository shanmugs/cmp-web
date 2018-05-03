// WrapperLogo Component
// ===
//
// Styling wrapper component with offset Chimp Logo
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// UI components
// ---
import Svg from 'client/common/components/Svg';


// Component Styles
// ---
import './wrapper-logo.scss';


const WrapperLogo = (props) => {
    const componentClass = classNames(
        'c-wrapper-logo',
        props.className
    );

    return (
        <div className={componentClass}>
            <div className="c-wrapper-logo__inner">
                <Svg
                    ariaHidden
                    className="c-wrapper-logo__logo"
                    glyph="chimpLogo"
                    width="2.56em"
                    height="3.18em"
                />
                {props.children}
            </div>
        </div>
    );
};

WrapperLogo.defaultProps = {
    children: null,
};

// Explicitly state they type of Components you expect here
WrapperLogo.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default WrapperLogo;
