// Social Icons Component
// ===
//
// Displays a list social media icons


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// UI components
// ---
import Icon from 'client/common/components/Icon';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';


// Styles
// ---
import './social-icons.scss';


class SocialIcons extends BaseComponent {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const buttonClasses = classNames(
            'c-social-icons__icon',
            {
                'c--light': this.props.isLight,
            }
        );

        return (
            <div className="c-social-icons">
                <a href="http://twitter.com/wearechimp" className={buttonClasses}>
                    <Icon glyph="twitter" size="md" />
                    <span className="u-visually-hidden">Twitter</span>
                </a>
                <a href="http://facebook.com/wearechimp" className={buttonClasses}>
                    <Icon glyph="facebook" size="md" />
                    <span className="u-visually-hidden">Facebook</span>
                </a>
                <a href="http://instagram.com/wearechimp" className={buttonClasses}>
                    <Icon glyph="instagram" size="md" />
                    <span className="u-visually-hidden">Instagram</span>
                </a>
                <a href="https://vimeo.com/wearechimp" className={buttonClasses}>
                    <Icon glyph="vimeo" size="md" />
                    <span className="u-visually-hidden">Vimeo</span>
                </a>
            </div>
        );
    }
}

SocialIcons.defaultProps = {
    isLight: false,
};

SocialIcons.propTypes = {
    isLight: PropTypes.bool,
};

export default SocialIcons;
