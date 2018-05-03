import React from 'react';

import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

import GeminiLink from 'client/common/components/GeminiLink';
import Icon from 'client/common/components/Icon';


const messageList = defineMessages({
    search: {
        id: 'common.search',
        description: 'foo',
        defaultMessage: 'Search',
    },
});

const SearchLink = ({intl}) => {
    const { formatMessage } = intl;

    return (
        <GeminiLink
            className='c-header__search-button u-margin-end-lg'
            path="/search"
        >
            <Icon glyph="search" />
            <span className="c-header__search-button-text">
                {formatMessage(messageList.search)}
            </span>
        </GeminiLink>
    );
};

SearchLink.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(SearchLink);;
