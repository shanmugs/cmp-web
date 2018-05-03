// Give CTA Component
// ===
//
// Displays various CTAs to Give, including Add, Give, Send money.


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// UI Components
// ---
import CollapsibleItem from 'client/common/components/CollapsibleItem';


// Styles
// ---
import './give-cta.scss';

const GiveCTA = (props) => {
    const { heading, type, item, button } = props;

    const componentClass = classNames(
        'c-give-cta',
        {
            'c--give': type === 'give',
            'c--send': type === 'send',
        }
    );

    const content = (
        <div>
            <p className="c-give-cta__expand-text">{item.content.description}</p>
            {item.button}
        </div>
    );

    return (
        <div className={componentClass}>
            <div className="c-give-cta__description">
                <h3 className="c-give-cta__heading">{heading}</h3>
                <CollapsibleItem
                    content={content}
                    heading={item.heading}
                    iconName="triangleRight"
                    iconSize="sm"
                    iconStart
                    itemClass="c-give-cta__expand"
                    itemTitleClass="u-fs-sm u-margin-start-sm"
                />
            </div>
            <div className="c-give-cta__action">
                {button}
            </div>
        </div>
    );
};

GiveCTA.defaultProps = {
    className: '',
    type: '',
};

GiveCTA.propTypes = {
    className: PropTypes.string,
    button: PropTypes.element,
    heading: PropTypes.string,
    item: PropTypes.shape({
        content: PropTypes.object.isRequired,
        heading: PropTypes.string.isRequired,
        button: PropTypes.element,
    }),
    type: PropTypes.oneOf(['give', 'send', '']),
};

export default GiveCTA;
