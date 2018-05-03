// Tooltip Component
// ===
//
// A tooltip with a close button. Used in the onboarding tooltip flow
//

// Vendor Components
// ---

import React from 'react';
import PropTypes from 'prop-types';

const {
    arrayOf,
    element,
    func,
    oneOf,
    oneOfType,
    string,
} = PropTypes;


// UI components
// ---


import CloseBtn from 'client/common/components/CloseBtn';
import Icon from 'client/common/components/Icon';


// Component Styles
// ---

import './tooltip.scss';

const Tooltip = (props) => {
    const {
        children,
        icon,
        onClose,
        tooltipPosition,
    } = props;
    const classNames = `c-tooltip c--${tooltipPosition}`;
    const closeBtn = onClose
        ? <CloseBtn onClose={onClose} />
        : null;
    const tooltipIcon = icon
        ? <Icon glyph={icon} size="md" className="c-tooltip__icon" />
        : null;
    const tooltipContent = children
        ? <div className="c-tooltip__content">{children}</div>
        : null;

    return (
        <div
            className={classNames}
        >
            <span className="c-tooltip__arrow" aria-hidden />
            {closeBtn}
            {tooltipIcon}
            {tooltipContent}
        </div>
    );
};

Tooltip.defaultProps = {
    tooltipPosition: 'above',
};

Tooltip.propTypes = {
    children: oneOfType([
        arrayOf(element),
        element,
    ]),
    icon: string,
    onClose: func,
    tooltipPosition: oneOf([
        'below',
        'left',
        'right',
        'above',
    ]).isRequired,
};

export default Tooltip;
