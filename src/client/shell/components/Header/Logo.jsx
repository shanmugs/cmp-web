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
import { connectBranch } from 'client/common/store';

// Helpers
// ---
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper.js';


// UI components
// ---
import GeminiLink from 'client/common/components/GeminiLink';
import Svg from 'client/common/components/Svg';


const messageList = defineMessages({
    headerLogo: {
        id: 'header.a11y.logo',
        description: 'foo',
        defaultMessage: 'Chimp Home',
    },
});

class HeaderLogo extends React.Component {
    LinkWrapper({ hardRefresh, children }) {
        // When not authenticated. Use an <a> to do a hard refresh back to the Rails hosted landing page
        return <GeminiLink path={legacyRoutes.root}>{children}</GeminiLink>;
    };

    DisplayLogo({currentBreakpoint}) {
        let glyph = 'chimpLogo';
        let width = '2.56em';
        let height = '3.625em';

        if (adaptiveComponentHelper.greaterThan('md', currentBreakpoint)) {
            glyph = 'chimpLogoWordmark';
            width = '7.125em';
            height = '3.625em';
        }

        return (
            <Svg
                ariaHidden
                className="c-header__logo"
                glyph={glyph}
                width={width}
                height={height}
            />
        );
    }

    render() {
        const { currentBreakpoint } = this.props.breakpoints;
        const { formatMessage } = this.props.intl;
        const { hardRefresh } = this.props;
        const {
            DisplayLogo,
            LinkWrapper,
        } = this;

        return (
            <LinkWrapper hardRefresh={hardRefresh} >
                <DisplayLogo {...this.props.breakpoints} />
                <span className="u-visually-hidden">
                    {formatMessage(messageList.headerLogo)}
                </span>
            </LinkWrapper>
        )
    }
}

HeaderLogo.defaultProps = {
    hardRefresh: false,
}

HeaderLogo.propTypes = {
    currentBreakPoint: PropTypes.string,
    intl: intlShape.isRequired,
    hardRefresh: PropTypes.bool,
};

export { HeaderLogo };

export default connectBranch(HeaderLogo, {
    'branchPath': 'headerLogo',
    mapPathsToProps: {
        breakpoints: '/layout/breakpoints',
    },
});
