// FeatureCard Component
// ===
//
// Configurable card to highlight features. Can include an image, icon, title, content, cta.
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// UI components
// ---
import Icon from 'client/common/components/Icon';
import Svg from 'client/common/components/Svg';


// Component Styles
// ---
import './feature-card.scss';


class FeatureCard extends React.Component {
    renderImage(imageSrc) {
        return imageSrc ?
        (
            <div className="c-feature-card__img-wrapper">
                <img
                    className="c-feature-card__img"
                    src={imageSrc}
                    role="presentation"
                />
            </div>
        )
        : null;
    }

    renderIcon(icon, iconSize) {
        // Can render either an icon from the icon system or an svg that is
        // passed in
        let iconComponent = null;

        if (icon && typeof icon === 'string') {
            iconComponent = (
                <Icon
                    glyph={icon}
                    size={iconSize}
                    className="u-margin-bottom-md"
                />
            );
        } else if (icon.type === 'svg') {
            // Passes all svg props to the Svg Component, have to rename children to content for
            // our Svg component
            const { children } = icon.props;
            iconComponent = (
                <Svg
                    content={children}
                    {...icon.props}
                />
            );
        }
        return iconComponent;
    }

    renderTitle(title, titleElement) {
        let content = null;
        const Element = titleElement;

        if (title !== '') {
            content = (
                <Element className="c-feature-card__title u-margin-bottom-md">{title}</Element>
            );
        }
        return content;
    }

    renderDesc(description, descriptionElement) {
        let content = null;

        let Element = descriptionElement;

        if (description !== '') {
            content = (
                <Element className="c-feature-card__description">
                    {description}
                </Element>
            );
        }
        return content;
    }

    renderCTA(cta) {
        let content = null;

        const ctaClass = classNames(
            'c-feature-card__cta',
            'c-button',
            cta.buttonClass
        );

        if (typeof cta.title !== 'undefined') {
            content = (
                <button className={ctaClass} onClick={cta.click}>
                    {cta.title}
                </button>
            );
        }
        return content;
    }

    render() {
        const {
            className,
            cta,
            description,
            descriptionElement,
            icon,
            iconSize,
            imageSrc,
            title,
            titleElement,
        } = this.props;

        const componentClass = classNames(
            'c-feature-card',
            className
        );

        return (
            <div className={componentClass}>
                {this.renderImage(imageSrc)}
                <div className="c-feature-card__content">
                    {this.renderIcon(icon, iconSize)}
                    {this.renderTitle(title, titleElement)}
                    {this.renderDesc(description, descriptionElement)}
                    {this.renderCTA(cta)}
                </div>
            </div>
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
FeatureCard.defaultProps = {
    cta: {},
    description: '',
    descriptionElement: 'div',
    icon: '',
    imageSrc: '',
    title: '',
    titleElement: 'h2',
};

// Explicitly state they type of Components you expect here
FeatureCard.propTypes = {
    className: PropTypes.string,
    cta: PropTypes.shape({
        buttonClass: PropTypes.string,
        click: PropTypes.func,
        title: PropTypes.string,
        url: PropTypes.string,
    }),
    description: PropTypes.any.isRequired,
    descriptionElement: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    iconSize: PropTypes.oneOf(['sm', 'md', 'lg', '']),
    imageSrc: PropTypes.string,
    title: PropTypes.string,
    titleElement: PropTypes.string,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default FeatureCard;
