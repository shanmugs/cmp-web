// Link List Component
// Displays a list of links
// ===
//
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Vendor components
// ---
import classNames from 'classnames';

// UI components
// ---
import GeminiLink from 'client/common/components/GeminiLink';

import './link-list.scss';

const LinkContainer = (props) => {
    const {
        className,
        location,
        name,
        isExternal
    } = props;

    const linkEl = (isExternal)
        ? <a href={location}>{name}</a>
        : <GeminiLink path={location}>{name}</GeminiLink>

    return (
        <li className={className}>
            {linkEl}
        </li>
    );
}

const LinkList = (props) => {
    const { links, itemClass, className } = props;

    const containerClass = classNames(
        'c-link-list',
        className
    );

    const itemClasses = classNames(
        'c-link-list__item',
        `${itemClass}`
    );

    return (
        <ul className={containerClass}>
            {links.map((item, idx) => {
                item.className = itemClasses;
                return <LinkContainer key={idx} {...item} />;
            })}
        </ul>
    );
};

LinkList.defaultProps = {
    className: '',
    itemClass: '',
};

LinkList.propTypes = {
    className: PropTypes.string,
    itemClass: PropTypes.string,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            isExternal: PropTypes.boolean,
        })
    ),
};

export default LinkList;
