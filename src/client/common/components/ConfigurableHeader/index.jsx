// ConfigurableHeader Component
// ===
//
// A configurable header for Community Join pages
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Helpers
// ---

// UI components
// ---
import { InnerWrapper } from 'client/common/components/Layout';
import CalloutAvatar from 'client/common/components/CalloutAvatar';

// Image assets
// ---
import backgroundImage from 'client/common/images/Pattern_Gift2x.png';
import backgroundImageCommunity from 'client/common/images/Pattern_Community2x.png';

// Component Styles
// ---
import './configurable-header.scss';

class ConfigurableHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            isImgLoaded: false,
        };
    }

    componentDidMount() {
        const self = this;
        // Attach a load event to the fullRes image being secretly loaded. When it's finished
        // rerender the component with the fullRes image
        if (
            this.refs.fullResImg
            && typeof this.refs.fullResImg.addEventListener === 'function'
        ) {
            this.refs.fullResImg.addEventListener('load', () => {
                self.setState({
                    isImgLoaded: true,
                });
            });
        }
    }

    renderTitle(title) {
        let displayTitle = null;

        if (title !== '') {
            displayTitle = (
                <h1 className="c-configurable-header__title">{title}</h1>
            );
        }

        return displayTitle;
    }

    render() {
        const {
            className,
            avatar,
            avatarAlt,
            defaultBackground,
            heroImage,
            heroImageThumb,
            title,
            message,
        } = this.props;

        const componentClass = classNames(
            'c-configurable-header',
            className
        );

        // Default background image
        let bgImg = backgroundImage;
        let bgImgSize = '242px 242px';

        if (defaultBackground === 'community') {
            bgImg = backgroundImageCommunity;
            bgImgSize = '180px 223px';
        }

        let divStyle = {};

        // Set default background if a custom one doesn't exist
        if (!heroImage) {
            divStyle = {
                backgroundImage: `url(${bgImg})`,
                backgroundSize: `${bgImgSize}`,
                backgroundRepeat: 'repeat',
            };
        } else {
            // By default set the low res image as the background
            divStyle = {
                backgroundImage: `url(${heroImageThumb})`,
            };

            // The high res image loads secretly and hidden into the dom and once
            // it's loaded, swap it in as the background image
            if (this.state.isImgLoaded) {
                divStyle = {
                    backgroundImage: `url(${heroImage})`,
                };
            }
        }

        return (
            <header className={componentClass} style={divStyle} role="banner">
                <InnerWrapper isSmall>
                    {this.renderTitle(title)}
                    <CalloutAvatar
                        animate
                        avatar={avatar}
                        avatarAlt={avatarAlt}
                        contentClass="u-fs-md"
                    >
                        {message}
                    </CalloutAvatar>
                </InnerWrapper>
                <img hidden src={heroImage} ref="fullResImg" role="presentation" />
            </header>
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
ConfigurableHeader.defaultProps = {
    avatarAlt: '',
    className: '',
    defaultBackground: 'gift',
    heroImage: '',
    heroImageThumb: '',
};

// Explicitly state they type of Components you expect here
ConfigurableHeader.propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarAlt: PropTypes.string,
    className: PropTypes.string,
    defaultBackground: PropTypes.oneOf(['community', 'gift']),
    heroImage: PropTypes.string,
    heroImageThumb: PropTypes.string,
    message: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    title: PropTypes.string.isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default ConfigurableHeader;
