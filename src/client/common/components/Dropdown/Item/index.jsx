import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import Content from 'client/common/components/Dropdown/Content';

class Item extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: props.index === context.openNavIndex,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const newState = {
            isOpen: this.props.index === nextContext.openNavIndex,
        };
        this.setState(newState);
    }

    toggleOpen() {
        if (this.state.isOpen) {
            this.context.closeDropdowns();
        } else {
            this.context.openDropdown(this.props.index);
        }
    }

    render() {
        const props = this.props;
        const context = this.context;
        const state = this.state;

        const Element = props.element;

        const itemClassName = classNames(
            props.className,
            'p-dropdown__item',
            { 'p--open': state.isOpen }
        );

        // Trigger component might be functional stateless in which case it doesn't have props
        // In these cases default to an empty object so our further accessors on the object
        // don't error out
        const triggerProps = props.trigger.props || {};

        // If the trigger has it's own click event attached we don't want to squash it when
        // we attach the dropdown open/close event
        const mergedClickEvent = (e) => {
            if (triggerProps.onClick) {
                triggerProps.onClick(e);
            }
            this.toggleOpen();
        };
        const triggerClass = triggerProps.className
            ? triggerProps.className
            : null;

        const triggerClassName = classNames(
            triggerClass,
            'p-dropdown__item-trigger'
        );

        const newTriggerProps = {
            onClick: mergedClickEvent,
            className: triggerClassName,
        };
        const clonedTrigger = React.cloneElement(props.trigger, newTriggerProps);
        return (
            <Element
                className={itemClassName}
                onClick={context.clickHandler}
                onTouchEnd={context.clickHandler}
            >
                {clonedTrigger}
                <Content
                    size={props.size}
                    alignRight={props.alignRight}
                    className={props.contentClasses}
                    isOpen={state.isOpen}
                >
                    {props.children}
                </Content>
            </Element>
        );
    }
}

const {
    bool,
    element,
    func,
    number,
    string,
    any,
} = PropTypes;

Item.contextTypes = {
    openNavIndex: number,
    clickHandler: func,
    openDropdown: func,
    closeDropdowns: func,
};

Item.defaultProps = {
    element: 'span',
    className: '',
    trigger: <span>Default Trigger</span>,
};

Item.propTypes = {
    element: string,
    trigger: element,
    index: number.isRequired,
    children: any.isRequired,
    className: string,
    isOpen: bool,
};

export default Item;
