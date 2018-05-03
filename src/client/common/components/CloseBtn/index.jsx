// Close Button Component
// ===
//
// A round button with an icon. Used for small modals and tooltips
//


// Vendor Components
// ---

import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

const {
    func,
} = PropTypes;

// UI components
// ---

import Icon from 'client/common/components/Icon';


// Component Styles
// ---

import './close-btn.scss';


// Messages
// ---

const messageList = defineMessages({
    close: {
        id: 'common.close',
        description: 'foo',
        defaultMessage: 'Close',
    },
});

const CloseBtn = (props) => {
    const {
        intl: {
            formatMessage,
        },
        onClose,
    } = props;

    if (!onClose) return null;

    return (
        <button
            className="c-close-btn"
            onClick={onClose}
        >
            <Icon glyph="closeBaby" size="sm" />
            <span className="u-visually-hidden">
                {formatMessage(messageList.close)}
            </span>
        </button>
    );
};

CloseBtn.propTypes = {
    intl: intlShape.isRequired,
    onClose: func,
};

export default injectIntl(CloseBtn);
