import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
    defineMessages,
    injectIntl,
    intlShape,
    FormattedMessage,
    FormattedHTMLMessage,
} from 'react-intl';

import { Helmet } from 'react-helmet';

// UI components
// ---
import { InnerWrapper } from 'client/common/components/Layout';
import SupportChat from 'client/common/components/SupportChat';


// Messages
// ---
const messages = defineMessages({
    contactUs: {
        id: 'common.contactUs',
        description: 'foo',
        defaultMessage: 'Contact Us',
    },
    headTitle: {
        id: 'common.headTitle',
        description: 'foo',
        defaultMessage: 'Error',
    }
});

const defaultErrorHeadings = defineMessages({
    errorHeading: {
        id: 'common.errorHeading',
        description: 'foo',
        defaultMessage: 'A piece is missing',
    },
    errorHeading1: {
        id: 'common.errorHeading1',
        description: 'foo',
        defaultMessage: 'Something is blocked',
    },
    errorHeading2: {
        id: 'common.errorHeading2',
        description: 'foo',
        defaultMessage: 'Give us a second to rebuild',
    },
    errorHeading3: {
        id: 'common.errorHeading3',
        description: 'foo',
        defaultMessage: 'Give us a minute to pick up the pieces',
    },
});

const getDefaultError = (props) => {
    const { formatMessage } = props.intl;

    // Set a delightful random error message
    const defaultError = allTheErrorMessages.defaultError;

    const errorHeadingsList = [
        formatMessage(defaultErrorHeadings.errorHeading),
        formatMessage(defaultErrorHeadings.errorHeading1),
        formatMessage(defaultErrorHeadings.errorHeading2),
        formatMessage(defaultErrorHeadings.errorHeading3),
    ];
    const numErrors = errorHeadingsList.length;

    defaultError.heading =  errorHeadingsList[Math.floor(Math.random() * numErrors)];
    return defaultError;
}

const allTheErrorMessages = {
    defaultError: {
        heading: (
            <FormattedMessage
                id="common.errorHeading"
                description="foo"
                defaultMessage="A piece is missing"
            />
        ),
        message: (
            <FormattedHTMLMessage
                id="common.errorMessage"
                description="foo"
                defaultMessage="Something didn't fit like it was supposed to.<br /> Contact us and we'll get everything in place for you."
            />
        ),
    },
    error403: {
        heading: (
            <FormattedMessage
                id="common.errorHeading403"
                description="foo"
                defaultMessage="Lost your way?"
            />
        ),
        message: (
            <FormattedHTMLMessage
                id="common.errorMessage403"
                description="foo"
                defaultMessage="Looks like you’re out of bounds. Contact support to help you get to the right place or return to <a href='http://chimp.net'>home base</a>."
            />
        ),
    },
    error404: {
        heading: (
            <FormattedMessage
                id="common.errorHeading404"
                description="foo"
                defaultMessage="Sorry, we couldn’t find this page"
            />
        ),
        message: (
            <FormattedHTMLMessage
                id="common.errorMessage404"
                description="foo"
                defaultMessage="It might not exist anymore, or the link might be misspelled. Double check the link, return to the <a href='http://chimp.net'>homepage</a> or contact support."
            />
        ),
    },
    error500: {
        heading: (
            <FormattedMessage
                id="common.errorHeading500"
                description="foo"
                defaultMessage="Well this is embarrassing"
            />
        ),
        message: (
            <FormattedMessage
                id="common.errorMessage500"
                description="foo"
                defaultMessage="Something went wrong on our end. We’ve reported the problem, but if it persists let us know. In the meantime, try refreshing."
            />
        ),
    },
};

// Helper method to determine if a given code is something we have a custom errorMessage for.
// Add to the customCodes array if we add more custom error codes
const statusHasCustomMessage = (code) => {

    if (!(_.isNumber(code))) {
        return false;
    }

    const customCodes = [403, 404, 500];
    return _.includes(customCodes, code);
}

const ErrorMessage = (props) => {
    const { formatMessage } = props.intl;

    const errorStatus = props.status; // Get the status from the passed error

    // Make sure the code is a number falsy and make sure that it's a number
    const errorMessage = (statusHasCustomMessage(errorStatus))
            ? allTheErrorMessages[`error${errorStatus}`]
            : getDefaultError(props);

    return (
        <div>
            <Helmet>
                <title>{formatMessage(messages.headTitle)}</title>
            </Helmet>
            <InnerWrapper isSmall isPadded>
                <h2 className="u-fs-lg u-margin-bottom-md">
                    {errorMessage.heading}
                </h2>
                <p className="u-margin-bottom-lg">
                    {errorMessage.message}
                </p>
                <SupportChat>
                    <button
                        className="c-button c--pop"
                    >
                        {formatMessage(messages.contactUs)}
                    </button>
                </SupportChat>
            </InnerWrapper>
        </div>
    );
};

const {
    string,
    number,
    oneOfType,
} = PropTypes;

ErrorMessage.propTypes = {
    status: oneOfType([ string, number ]).isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(ErrorMessage);
