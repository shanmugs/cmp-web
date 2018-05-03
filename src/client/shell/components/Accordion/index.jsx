// Accordion Component
// ===


// Vendor Components
// ---
import React from 'react';
import PropTypes from 'prop-types';


// UI Components
// ---
import CollapsibleItem from 'client/common/components/CollapsibleItem';


// Styles
// ---
import './accordion.scss';


const Accordion = (props) => {
    const accordionItems = props.items;
    return (
        <div className={props.className}>
            {accordionItems.map((item, idx) => (
                <CollapsibleItem
                    key={idx}
                    heading={item.heading}
                    content={item.content}
                    iconName={props.iconName}
                    iconSize={props.iconSize}
                    itemClass="c-accordion__item"
                    itemHeadingClass="c-accordion__item-heading"
                    itemTitleClass="c-accordion__item-title"
                    contentClass="c-accordion__item-content"
                    headingIconClass="c-accordion__item-heading-icon"
                />
            ))}
        </div>
    );
};

Accordion.defaultProps = {
    className: 'c-accordion',

};

Accordion.propTypes = {
    className: PropTypes.string,
    iconName: PropTypes.string,
    iconSize: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            heading: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        })
    ),
};

export default Accordion;
