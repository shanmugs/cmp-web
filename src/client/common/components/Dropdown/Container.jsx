// Main Desktop dropdown navigation

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import BaseComponent from 'client/common/components/BaseComponent';
import helpers from 'client/common/helpers/helpers';

import './dropdown.scss';

const win = helpers.window;

class DropdownContainer extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { openNavIndex: null };
        this.clickIsOnComponent = false;
    }

    getChildContext() {
        return {
            openNavIndex: this.state.openNavIndex,
            clickHandler: this.clickHandler,
            openDropdown: this.openDropdown,
            closeDropdowns: this.closeDropdowns,
        };
    }

    componentDidMount() {
        // Sets up a window event listener for any click on the window
        // outside the component will reset the openNavIndex and close all Dropdowns
        win.addEventListener('click', this.pageClick, false);
        win.addEventListener('touchend', this.pageClick, false);
        win.closeDropdowns = this.closeDropdowns;
    }

    componentWillUnmount() {
        win.removeEventListener('click', this.pageClick, false);
        win.removeEventListener('touchend', this.pageClick, false);
        win.closeDropdowns = _.noop;
    }

    pageClick() {
        // If a page click is not on this component then close all the dropdowns
        if (!this.clickIsOnComponent) {
            this.closeDropdowns();
        }
        // reset for next click
        this.clickIsOnComponent = false;
    }

    // Call this method in click events to prevent the window click listeners from closing dropdowns
    clickHandler() {
        this.clickIsOnComponent = true;
    }

    openDropdown(index) {
        // Necessary for clicks outside the dropdown item to prevent the content from immediately
        // being closed by the window listeners.
        this.clickHandler();
        this.setState({ openNavIndex: index });
    }

    closeDropdowns() {
        // Set the openNavIndex and re-render with no menu open
        this.setState({ openNavIndex: null });
    }

    render() {
        const {
            children,
            element: Element,
            className,
            ...containerProps, // Pass whatever's left to the rendered container element
        } = this.props;

        const containerClass = classNames(
            className,
            'p-dropdown'
        );

        return (
            <Element {...containerProps} className={containerClass}>
                {children}
            </Element>
        );
    }
}

const {
    any,
    func,
    number,
    string,
} = PropTypes;

DropdownContainer.childContextTypes = {
    openNavIndex: number,
    clickHandler: func,
    openDropdown: func,
    closeDropdowns: func,
};

DropdownContainer.defaultProps = {
    element: 'div',
    className: '',
};

DropdownContainer.propTypes = {
    className: string,
    element: string,
    children: any.isRequired,
};

export default DropdownContainer;
