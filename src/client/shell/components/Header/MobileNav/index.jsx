// Mobile Nav Menu Component

// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import { Link } from 'react-router';
import { legacyRoutes } from 'client/routes';
import Accordion from 'client/shell/components/Accordion';
import LinkList from 'client/shell/components/LinkList';
import SocialIcons from 'client/shell/components/SocialIcons';
import GeminiLink from 'client/common/components/GeminiLink';


// Styles
// ---
import './mobile-nav.scss';


// Messages
// ---
const messageList = defineMessages({
    signUp: {
        id: 'common.signUp',
        description: 'foo',
        defaultMessage: 'Sign Up',
    },
    login: {
        id: 'common.login',
        description: 'foo',
        defaultMessage: 'Log In',
    },
    intro: {
        id: 'header.mobileNav.intro',
        description: 'foo',
        defaultMessage: 'A Chimp Account allows you to manage all your giving in one place.',
    },
});

const HeaderMobileNav = (props) => {
    const items = [];
    const { formatMessage } = props.intl;

    props.items.forEach((navItem) => {
        const links = navItem.subnav.links;
        items.push({
            heading: navItem.name,
            content: <LinkList links={links} />,
        });
    });

    return (
        <nav className="c-header-mobile-nav">
            <div className="c-header-mobile-nav__header">
                <p>{formatMessage(messageList.intro)}</p>
                <Link
                    to="/users/new"
                    className="c-button c--filled c--pop u-margin-end-md"
                >
                    {formatMessage(messageList.signUp)}
                </Link>
                <GeminiLink
                    path={legacyRoutes.login}
                    className="c-button c--pop"
                >
                    {formatMessage(messageList.login)}
                </GeminiLink>
            </div>
            <Accordion
                className="c-accordion"
                iconName="arrowDown"
                iconSize="sm"
                items={items}
            />

            <SocialIcons iconSize="md" />
        </nav>
    );
};

HeaderMobileNav.defaultProps = {
    items: [],
    className: '',
};

HeaderMobileNav.propTypes = {
    intl: intlShape.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
};

export default injectIntl(HeaderMobileNav);
