// Primary Footer Section for Mobile
// ===

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
import GeminiLink from 'client/common/components/GeminiLink';
import SocialIcons from 'client/shell/components/SocialIcons';
import { toggleLocale } from 'client/common/language';

// Component Styles
// ---
import './mobile.scss';


// Messages
// ---
const messageList = defineMessages({
    fees: {
        id: 'common.fees',
        description: 'foo',
        defaultMessage: 'Fees',
    },
    contact: {
        id: 'common.contactUs',
        description: 'foo',
        defaultMessage: 'Contact Us',
    },
    about: {
        id: 'common.aboutUs',
        description: 'foo',
        defaultMessage: 'About Us',
    },
    help: {
        id: 'common.helpCentre',
        description: 'foo',
        defaultMessage: 'Help Centre',
    },
    privacy: {
        id: 'common.privacyPolicy',
        description: 'foo',
        defaultMessage: 'Privacy',
    },
    terms: {
        id: 'common.termsOfService',
        description: 'foo',
        defaultMessage: 'Terms',
    },
    accountAgreement: {
        id: 'common.accountAgreement',
        description: 'foo',
        defaultMessage: 'Account Agreement',
    },
    language: {
        id: 'common.selectLanguage',
        description: 'foo',
        defaultMessage: 'Parlez-vous français?',
    },
});


const Mobile = (props) => {
    const { intl } = props;
    const { formatMessage } = intl;

    const toggleLanguage = () => {
        toggleLocale();
    };

    return (
        <div className="c-footer-primary-mobile">
            <div className="c-footer-primary-mobile__section">
                <div className="c-footer-primary-mobile__section-inner">
                    <SocialIcons
                        isLight
                        iconSize="md"
                    />

                    <a href="mailto:hello@chimp.net" className="c-button c--light">
                        hello@chimp.net
                    </a>
                    <a href="tel:+18775310580" className="c-button c--light">1-877-531-0580</a>
                </div>

            </div>
            <div className="c-footer-primary-mobile__section">
                <div className="c-footer-primary-mobile__section-inner">
                    <div className="pure-g">
                        <div className="pure-u-1-2">
                            <GeminiLink
                                className="c-footer-primary-mobile__link"
                                path={legacyRoutes.fees}
                            >
                                {formatMessage(messageList.fees)}
                            </GeminiLink>
                            <GeminiLink
                                className="c-footer-primary-mobile__link"
                                path={legacyRoutes.contactUs}
                            >
                                {formatMessage(messageList.contact)}
                            </GeminiLink>
                        </div>
                        <div className="pure-u-1-2">
                            <GeminiLink
                                className="c-footer-primary-mobile__link"
                                path={legacyRoutes.about}
                            >
                                {formatMessage(messageList.about)}
                            </GeminiLink>
                            <GeminiLink
                                className="c-footer-primary-mobile__link"
                                path={legacyRoutes.helpCenter}
                            >
                                {formatMessage(messageList.help)}
                            </GeminiLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="c-footer-primary-mobile__section">
                <div className="c-footer-primary-mobile__section-inner">
                    <button
                        onClick={toggleLanguage}
                        className="c-button c--light qa-lang-toggle"
                    >
                        {formatMessage(messageList.language)}
                    </button>
                    <GeminiLink
                        className="c-footer-primary-mobile__link"
                        path={legacyRoutes.privacy}
                    >
                        {formatMessage(messageList.privacy)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary-mobile__link"
                        path={legacyRoutes.terms}
                    >
                        {formatMessage(messageList.terms)}
                    </GeminiLink>
                    <GeminiLink
                        className="c-footer-primary-mobile__link"
                        path={legacyRoutes.accountAgreement}
                    >
                        {formatMessage(messageList.accountAgreement)}
                    </GeminiLink>
                </div>
            </div>

        </div>
    );
};

Mobile.defaultProps = {
    locale: 'en-CA',
};

Mobile.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Mobile);
