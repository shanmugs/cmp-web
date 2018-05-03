// Header Give Contents
// ===
//
// This component is the contents of the Dropdown under the give button in the
// authenticated nav bar

import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
    FormattedHTMLMessage,
} from 'react-intl';
import { Link } from 'react-router';
import { legacyRoutes } from 'client/routes';


// UI components
// ---
import GeminiLink from 'client/common/components/GeminiLink';
import GiveCTA from 'client/shell/components/GiveCta';
import Step from 'client/common/components/TooltipContainer/Step';


// Styles
// ---
import './give-contents.scss';


// Messages
// ---
const messageList = defineMessages({
    heading: {
        id: 'header.giveDropdown.heading',
        description: 'foo',
        defaultMessage: 'How would you like to give?',
    },
    ctaMore: {
        id: 'header.giveDropdown.ctaMore',
        description: 'foo',
        defaultMessage: 'What is this?',
    },
    addCTA: {
        id: 'header.giveDropdown.addCTA.button',
        description: 'foo',
        defaultMessage: 'Add',
    },
    addCTAheading: {
        id: 'header.giveDropdown.addCTA.heading',
        description: 'foo',
        defaultMessage: 'Add Money to your Account',
    },
    addCTAcontent: {
        id: 'header.giveDropdown.addCTA.content',
        description: 'foo',
        defaultMessage: 'Adding money into your account means there will be money for you to give' +
        ' away when and how you want. Each time you add money, you get a tax receipt' +
        ' automatically.',
    },
    giveCTA: {
        id: 'header.giveDropdown.giveCTA.button',
        description: 'foo',
        defaultMessage: 'Give',
    },
    giveCTAheading: {
        id: 'header.giveDropdown.giveCTA.heading',
        description: 'foo',
        defaultMessage: 'Give to a Charity or Giving Group',
    },
    giveCTAcontent: {
        id: 'header.giveDropdown.giveCTA.content',
        description: 'foo',
        defaultMessage: 'Give to any Canadian charity through Chimp—either directly, or via a' +
        ' Giving Group. A Giving Group is where people pool or raise money together for the' +
        ' charities of their choice.',
    },
    giveReadmore: {
        id: 'header.giveDropdown.giveCTA.readMore.button',
        description: 'foo',
        defaultMessage: 'Start your own group',
    },
    sendCTA: {
        id: 'header.giveDropdown.sendCTA.button',
        description: 'foo',
        defaultMessage: 'Send',
    },
    sendCTAheading: {
        id: 'header.giveDropdown.sendCTA.heading',
        description: 'foo',
        defaultMessage: 'Send Charity Dollars to Other People',
    },
    sendCTAcontent: {
        id: 'header.giveDropdown.sendCTA.content',
        description: 'foo',
        defaultMessage: 'Send more meaningful gifts, and empower your friends, family, and wider' +
        ' circles to give wherever and whenever they want.',
    },
    tooltipContentHeading: {
        id: 'onboardingTooltips.giveMenu.heading',
        description: 'foo',
        defaultMessage: 'Give directly to a charity',
    },
});


const HeaderGiveContents = (props) => {
    const { intl } = props;
    const { formatMessage } = intl;
    const addButton = (
        <GeminiLink path={legacyRoutes.donate} className="c-button c--light-inverted c--pop">
            {formatMessage(messageList.addCTA)}
        </GeminiLink>
    );

    const giveButton = (
        <GeminiLink path={legacyRoutes.give} className="c-button c--light-inverted c--pop">
            {formatMessage(messageList.giveCTA)}
        </GeminiLink>
    );

    const giveReadMoreButton = (
        <GeminiLink path={legacyRoutes.createGroup} className="c-button c--light">
            {formatMessage(messageList.giveReadmore)}
        </GeminiLink>
    );

    const sendButton = (
        <GeminiLink path={legacyRoutes.send} className="c-button c--light-inverted c--pop">
            {formatMessage(messageList.sendCTA)}
        </GeminiLink>
    );

    const giveTooltipContents = [
        <h3
            className="u-margin-bottom-md u-lh-copy"
            key={1}
        >
            {props.intl.formatMessage(messageList.tooltipContentHeading)}
        </h3>,
        <p
            key={2}
        >
            <FormattedHTMLMessage
                id="onboardingTooltips.giveMenu.content"
                description="foo"
                defaultMessage={'Every registered charity in Canada is in our system' +
                ' and ready to receive your gift. Click <b>Give</b> to find the right one for you.'}
            />
        </p>,
    ];

    const tooltipOptions = {
        icon: 'giftSolid',
        tooltipPosition: 'left',
        children: giveTooltipContents,
        onClose: props.cancelGiveTooltips,
    };

    return (
        <div className="c-header-give-contents">
            <h2 className="c-header-give-contents__heading">
                {formatMessage(messageList.heading)}
            </h2>
            <GiveCTA
                button={addButton}
                heading={formatMessage(messageList.addCTAheading)}
                item={{
                    heading: formatMessage(messageList.ctaMore),
                    content: {
                        description: formatMessage(messageList.addCTAcontent),
                    },
                }}
            />
            <Step
                fireworksPosition="top-right"
                order={2}
                tooltipOptions={tooltipOptions}
            >
                <GiveCTA
                    button={giveButton}
                    heading={formatMessage(messageList.giveCTAheading)}
                    item={{
                        heading: formatMessage(messageList.ctaMore),
                        content: {
                            description: formatMessage(messageList.giveCTAcontent),
                        },
                        button: giveReadMoreButton,
                    }}
                    type="give"
                />
            </Step>

            <GiveCTA
                button={sendButton}
                heading={formatMessage(messageList.sendCTAheading)}
                item={{
                    heading: formatMessage(messageList.ctaMore),
                    content: {
                        description: formatMessage(messageList.sendCTAcontent),
                    },
                }}
                type="send"
            />
        </div>
    );
};

const {
    func,
} = PropTypes;

HeaderGiveContents.propTypes = {
    intl: intlShape.isRequired,
    cancelGiveTooltips: func.isRequired,
};

export default injectIntl(HeaderGiveContents);
