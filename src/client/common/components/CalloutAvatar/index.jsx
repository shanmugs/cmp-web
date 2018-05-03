// CalloutAvatar Component
// ===
//
// Displays a callout bubble with configurable content and an avatar below
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Component Styles
// ---
import './callout-avatar.scss';


const CalloutAvatar = (props) => {
    const { className, animate, avatar, avatarAlt, children, contentClass } = props;
    const componentClass = classNames(
        'c-callout-avatar',
        {
            'c--animate': animate,
        },
        className
    );

    return (
        <div className={componentClass}>
            <div className="c-callout-avatar__content">
                <div className={contentClass}>
                    {children}
                </div>
            </div>
            <img
                className="c-callout-avatar__avatar"
                src={avatar}
                alt={avatarAlt}
            />
        </div>
    );
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
CalloutAvatar.defaultProps = {
    animate: false,
};

// Explicitly state they type of Components you expect here
CalloutAvatar.propTypes = {
    animate: PropTypes.bool,
    avatar: PropTypes.string.isRequired,
    avatarAlt: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    className: PropTypes.string,
    contentClass: PropTypes.string,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default CalloutAvatar;
