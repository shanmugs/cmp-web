// List preview is a way to take an array of items and limit the output with a configurable
// see more button. Configurable to show a number of items and various icons
// ===
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import GeminiLink from 'client/common/components/GeminiLink';

// Vendor components
// ---
import classNames from 'classnames';

// UI components
// ---
import Icon from 'client/common/components/Icon';


// Styles
// ---
import './list-preview.scss';

class ListPreview extends React.Component {

    renderIcon(item) {
        let component = null;
        let iconName = '';

        if (item.type === 'Beneficiary') {
            iconName = 'charity';
        }

        if (item.type === 'Group') {
            iconName = 'group';
        }

        if (iconName !== '') {
            component = (
                <Icon
                    glyph={iconName}
                    svgTitle={`${iconName} icon`}
                    size="md"
                    className="c-list-preview__list-item-icon"
                />
            );
        }

        return component;
    }

    renderButton() {
        const { button } = this.props;

        let isDefaultButton = true;
        let returnedButton = null;

        // Check if button has the expected default properties
        isDefaultButton = button.hasOwnProperty('title');
        isDefaultButton = button.hasOwnProperty('url');

        if (isDefaultButton) {
            const buttonClasses = classNames(
                'c-button c--pop',
                `${button.buttonClass}`
            );

            returnedButton = (
                <Link to={button.url} className={buttonClasses}>
                    {button.title}
                </Link>
            );
        } else {
            returnedButton = (
                <div>
                    {button}
                </div>
            );
        }

        return returnedButton;
    }

    renderArrow() {
        const { showArrow } = this.props;
        if (showArrow !== true) {
            return null;
        }

        let arrowComponent = null;

        arrowComponent = (
            <div className="c-list-preview__list-item-icon-end">
                <Icon
                    glyph="arrowRight"
                    svgTitle="right arrow icon"
                />
            </div>
        );

        return arrowComponent;
    }

    render() {
        const { items, maxShow, className, itemClass, heading } = this.props;

        let headingComponent = null;
        if (heading) {
            headingComponent = (
                <h3 className="c-list-preview__heading u-margin-bottom-md">{heading}</h3>
            );
        }

        // Have to build the button before the items array is spliced, otherwise the items length
        // is not accurate.
        const showButton = (typeof maxShow !== 'undefined' && maxShow < items.length);
        const seeMoreButton = (showButton) ? this.renderButton() : null;


        let trimmedItems = [];
        // maxShow is optional so if it not passed we don't show button
        // but show all the results
        if (maxShow !== 'undefined') {
            // cut items based on maxShow
            trimmedItems = items.slice(0, maxShow);
        }

        const listPreviewClasses = classNames(
            'c-list-preview',
            `${className}`
        );

        const itemClasses = classNames(
            'c-list-preview__list-item-wrapper',
            `${itemClass}`
        );

        return (
            <div className={listPreviewClasses}>
                {headingComponent}
                <ul className="c-list-preview__list">
                    {trimmedItems.map((item, idx) =>
                        <li key={idx} className={itemClasses}>
                            <GeminiLink className="c-list-preview__list-item" path={item.link}>
                                {this.renderIcon(item)}
                                <div className="c-list-preview__list-item-name">
                                    {item.name}
                                </div>
                                {this.renderArrow()}
                            </GeminiLink>
                        </li>,
                    )}
                </ul>
                {seeMoreButton}
            </div>
        );
    }
}

ListPreview.defaultProps = {
    className: '',
    itemClass: '',
    button: {
        buttonClass: '',
        title: '',
        url: '',
    },
    maxShow: 5,
    items: [],
};

ListPreview.propTypes = {
    className: PropTypes.string,
    itemClass: PropTypes.string,
    button: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
            buttonClass: PropTypes.string,
            title: PropTypes.string,
            url: PropTypes.string,
        }),
    ]),
    heading: PropTypes.string,
    showArrow: PropTypes.bool,
    maxShow: PropTypes.number,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            link: PropTypes.string,
            type: PropTypes.string,
        }),
    ),
};

export default ListPreview;
