// Accordion Item Component
// ===

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';


// UI components
// ---
import Collapse from 'react-collapse';
import Icon from 'client/common/components/Icon';


import './collapsible-item.scss';

class CollapsibleItem extends BaseComponent {

    constructor() {
        super();
        this.state = {
            active: false,
        };
    }

    toggle() {
        this.setState({
            active: !this.state.active,
        });
    }

    renderIcon() {
        const { iconSize, iconName, headingIconClass } = this.props;

        const itemHeadingIconClasses = classNames(
            'p-collapsible-item__heading-icon',
            `${headingIconClass}`
        );
        let iconComponent = null;
        if (typeof iconName !== 'undefined') {
            iconComponent = (
                <span className={itemHeadingIconClasses}>
                    <Icon
                        glyph={iconName}
                        svgTitle="Down Arrow"
                        size={iconSize}
                    />
                </span>
            );
        }

        return iconComponent;
    }

    render() {
        const { itemClass, itemHeadingClass, itemTitleClass, contentClass, iconStart } = this.props;

        const itemClasses = classNames(
            'p-collapsible-item',
            `${itemClass}`,
            { 'c--open': this.state.active }
        );
        const itemHeadingClasses = classNames(
            'p-collapsible-item__heading',
            `${itemHeadingClass}`
        );
        const itemTitleClasses = classNames(
            'p-collapsible-item__title ',
            `${itemTitleClass}`
        );
        const contentClasses = classNames(
            'p-collapsible-item__content',
            `${contentClass}`

        );

        // By Default an optional Icon is rendered after the Heading text

        let itemHeading = (
            <div
                onClick={this.toggle}
                className={itemHeadingClasses}
            >
                <span className={itemTitleClasses}>
                    {this.props.heading}
                </span>
                {this.renderIcon()}
            </div>
        );

        // The Icon could be set to render before the Heading text

        if (iconStart) {
            itemHeading = (
                <div
                    onClick={this.toggle}
                    className={itemHeadingClasses}
                >
                    {this.renderIcon()}
                    <span className={itemTitleClasses}>
                        {this.props.heading}
                    </span>
                </div>
            );
        }

        return (
            <div className={itemClasses}>
                {itemHeading}
                <Collapse
                    isOpened={this.state.active}
                    springConfig={{ stiffness: 350, dampening: 40 }}
                >
                    <div className={contentClasses}>
                        {this.props.content}
                    </div>
                </Collapse>
            </div>
        );
    }
}

CollapsibleItem.defaultProps = {
    itemClass: '',
    headingIconClass: '',
    itemHeadingClass: '',
    itemTitleClass: '',
    contentClass: '',
    iconStart: false,
};

CollapsibleItem.propTypes = {
    content: PropTypes.node.isRequired,
    heading: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    iconSize: PropTypes.string,
    headingIconClass: PropTypes.string,
    itemClass: PropTypes.string,
    itemHeadingClass: PropTypes.string,
    itemTitleClass: PropTypes.string,
    contentClass: PropTypes.string,
    iconStart: PropTypes.bool,
};

export default CollapsibleItem;
