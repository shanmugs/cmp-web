// ===
// Primary Footer Section for Mobile

// Vendor components
// ---
import React from 'react';
import { Link } from 'react-router';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import { legacyRoutes } from 'client/routes';

// UI components
// ---
import Icon from 'client/common/components/Icon';
import SocialIcons from 'client/shell/components/SocialIcons';
import { InnerWrapper } from 'client/common/components/Layout';
import { toggleLocale } from 'client/common/language';
import GeminiLink from 'client/common/components/GeminiLink';

// Styles
// ---
import './primary.scss';


// Messages
// ---
const messageList = defineMessages({
    fees: {
        id: 'common.fees',
        defaultMessage: 'Fees',
    },
    contact: {
        id: 'common.contactUs',
        defaultMessage: 'Contact Us',
    },
    about: {
        id: 'common.aboutUs',
        defaultMessage: 'About Us',
    },
    help: {
        id: 'common.helpCentre',
        defaultMessage: 'Help Centre',
    },
    privacy: {
        id: 'common.privacyPolicy',
        defaultMessage: 'Privacy',
    },
    terms: {
        id: 'common.termsOfService',
        defaultMessage: 'Terms',
    },
    accountAgreement: {
        id: 'common.accountAgreement',
        defaultMessage: 'Account Agreement',
    },
    careers: {
        id: 'common.careers',
        defaultMessage: 'Careers',
    },
    press: {
        id: 'common.press',
        defaultMessage: 'Press',
    },
    trust: {
        id: 'common.trust',
        defaultMessage: 'Trust',
    },
    language: {
        id: 'common.selectLanguage',
        defaultMessage: 'Parlez-vous français?',
    },
});


const Primary = (props) => {
    const { intl } = props;
    const { formatMessage } = intl;

    const toggleLanguage = () => {
        toggleLocale();
    };

    return (
        <InnerWrapper className="c-footer-primary">
            <div className="c-footer-primary__section">
                <div className="u-margin-bottom-md">
                    <GeminiLink
                        className="c-footer-primary__link c--primary"
                        path={legacyRoutes.fees}
                    >
                        {formatMessage(messageList.fees)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--primary"
                        path={legacyRoutes.helpCenter}
                    >
                        {formatMessage(messageList.help)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--primary"
                        path={legacyRoutes.contactUs}
                    >
                        {formatMessage(messageList.contact)}
                    </GeminiLink>
                </div>
                <div className="u-margin-bottom-lg">
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.about}
                    >
                        {formatMessage(messageList.about)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.careers}
                    >
                        {formatMessage(messageList.careers)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.press}
                    >
                        {formatMessage(messageList.press)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.trust}
                    >
                        {formatMessage(messageList.trust)}
                    </GeminiLink>
                </div>
                <SocialIcons
                    isLight
                />
            </div>

            <div className="c-footer-primary__section c--right-align">
                <div className="u-margin-bottom-md">
                    <a
                        href="mailto:hello@chimp.net"
                        className="c-footer-primary__link c--primary"
                    >
                        hello@chimp.net
                    </a>
                    <a href="tel:+18775310580" className="c-footer-primary__link c--primary">
                        1-877-531-0580
                    </a>
                </div>
                <div className="u-margin-bottom-lg">
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.privacy}
                    >
                        {formatMessage(messageList.privacy)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.terms}
                    >
                        {formatMessage(messageList.terms)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary__link c--small"
                        path={legacyRoutes.accountAgreement}
                    >
                        {formatMessage(messageList.accountAgreement)}
                    </GeminiLink>
                </div>
                <div>
                    <a
                        className="c-footer-primary__link c--small qa-lang-toggle"
                        onClick={toggleLanguage}
                    >
                        {formatMessage(messageList.language)}
                        <Icon
                            glyph="triangleRight"
                            svgTitle="Right Arrow"
                        />
                    </a>
                </div>
            </div>
        </InnerWrapper>
    );
};

Primary
.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Primary);
