// Header Dropdown Item Component
// ===

import React from 'react';
import PropTypes from 'prop-types';

// Vendor components
// ---
import classNames from 'classnames';

// UI components
// ---
import { DDItem as CommonDropdownItem } from 'client/common/components/Dropdown';

import './dropdown-item.scss';

class DropdownItem extends React.Component {
    render() {
        const props = this.props;

        const itemClasses = classNames(
            'c-header-dropdown-item',
            props.itemClass
        );

        const contentClasses = classNames(
            'c-header-dropdown-item__contents',
            props.contentClass
        );

        return (
            // passing all props to the CommonDropdownItem allows the the DDContainer to pass events and indexes
            // down to the items and triggers.
            <CommonDropdownItem
                ref="CommonDropdownItem"
                element={props.itemElement}
                className={itemClasses}
                size={props.size}
                alignRight={props.caratRight}
                contentClasses={contentClasses}
                trigger={props.trigger}
                index={props.index}
            >
                {props.children}
            </CommonDropdownItem>
        );
    }
}

const {
    any,
    bool,
    element,
    oneOf,
    string,
} = PropTypes;

DropdownItem.defaultProps = {
    itemClass: '',
    itemElement: 'li',
    contentClass: '',
    caratRight: false,
};

DropdownItem.propTypes = {
    children: any,
    size: oneOf(['sm', 'md', 'lg', '']),
    itemClass: string,
    itemElement: string,
    trigger: element,
    contentClass: string,
    currentBreakpoint: string,
    caratRight: bool,
};

export default DropdownItem;
