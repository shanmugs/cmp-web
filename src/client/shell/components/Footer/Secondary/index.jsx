// Secondary Footer
// ===

// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

// Helpers
// ---
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import helpers from 'client/common/helpers/helpers';

// UI Components
// ---
import Svg from 'client/common/components/Svg';
import { InnerWrapper } from 'client/common/components/Layout';
import DigiCert from 'client/shell/components/Digicert';

// Component Styles
// ---
import './secondary.scss';


// Messages
// ---
const messageList = defineMessages({
    made: {
        id: 'footer.secondary.made',
        description: 'foo',
        defaultMessage: 'Made with {emoji} in Vancouver BC',
    },
    madeEmojiless: {
        id: 'footer.secondary.madeEmojiless',
        description: 'foo',
        defaultMessage: 'Made in Vancouver BC',
    },
    copyright: {
        id: 'footer.secondary.copyright',
        description: 'foo',
        defaultMessage: '© 2008-{currentYear} Chimp Technology Inc.',
    },
});


class FooterSecondary extends React.Component {
    renderLogo(currentBreakpoint) {
        let logo = null;

        // Only render logo on larger devices
        if (adaptiveComponentHelper.greaterThan('sm', currentBreakpoint)) {
            logo = (
                <Svg
                    ariaHidden
                    className="c-footer-secondary__logo"
                    glyph="chimpLogo"
                />
            );
        }
        return logo;
    }

    renderMadeIn(formatMessage) {
        // By default display a boring string
        let madeIn = formatMessage(messageList.madeEmojiless);

        // But for awesome browsers with emoji support... 🎉

        const Modernizr = helpers.window.Modernizr;
        // The Modernizr library is globally included in the entry file to the app
        // chimpComponentLib.js
        if (Modernizr.emoji) {
            // Randomly display one of these emojis
            const emojiList = ['😂', '🎲', '☕️', '🌈', '☔️', '🍵', '💁', '👔', '🍕', '🍌', '❤️'];
            const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];

            madeIn = formatMessage(messageList.made, { emoji });
        }
        return madeIn;
    }

    render() {
        if (helpers.isSSR) return null;

        const { currentBreakpoint, intl } = this.props;
        const { formatMessage } = intl;

        // Current Year
        const currentYear = new Date().getFullYear();

        return (
            <div className="c-footer-secondary">
                <InnerWrapper className="c-footer-secondary__inner-wrapper">
                    {this.renderLogo(currentBreakpoint)}
                    <div className="c-footer-secondary__center">
                        <p className="u-fs-sm">
                            {this.renderMadeIn(formatMessage)}
                        </p>
                        <p className="c-footer-secondary__copyright">
                            {formatMessage(messageList.copyright, { currentYear })}
                        </p>
                    </div>
                    <div className="c-footer-secondary__badges">
                        <DigiCert />
                    </div>
                </InnerWrapper>
            </div>
        );
    }
}

FooterSecondary.defaultProps = {
    locale: 'en-CA',
    currentBreakpoint: null,
};

FooterSecondary.propTypes = {
    intl: intlShape.isRequired,
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']),
    currentBreakpoint: PropTypes.string,
};

export default injectIntl(FooterSecondary);
