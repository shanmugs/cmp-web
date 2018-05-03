// Dropdown Content Component
// ---

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Content = (props) => {
    const {
        isOpen,
        alignRight,
        className,
        size,
        element: Element,
        persistState,
    } = props;

    const contentClass = classNames(
        className,
        'p-dropdown__item-contents',
        {
            'p--open': isOpen,
            'p--right': alignRight,
            'p--sm': (!size || size === 'sm'),
            'p--md': (size === 'md'),
            'p--lg': (size === 'lg'),
        }
    );

    // Render children as null if persistState is false. Which means each time the DDcontent
    // closes and opens again, it's content is starting from the initial state.
    const children = (persistState || isOpen)
        ? props.children
        : null;

    return (
        <Element className={contentClass}>
            {children}
        </Element>
    );
};

Content.defaultProps = {
    persistState: false,
    isOpen: false,
    element: 'div',
    className: '',
    size: 'md',
    alignRight: false,
};

Content.propTypes = {
    persistState: PropTypes.bool,
    element: PropTypes.string,
    isOpen: PropTypes.bool,
    alignRight: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', '']),
    children: PropTypes.any.isRequired,
};

export default Content;
