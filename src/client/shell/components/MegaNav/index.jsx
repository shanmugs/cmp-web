// Mega Nav Component
// ===
// Displays navigation


// Vendor Components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';


// UI components
// ---
import LinkList from 'client/shell/components/LinkList';


// Styles
// ---
import './mega-nav.scss';


// Messages
// ---
const messageList = defineMessages({
    heading: {
        id: 'header.megaNav.heading',
        description: 'foo',
        defaultMessage: 'Explore',
    },
});


class MegaNav extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { intl, items } = this.props;
        const { formatMessage } = intl;
        const columns = items;

        return (
            <div className={'c-mega-nav'}>
                <h3 className={'c-mega-nav__heading'}>
                    {formatMessage(messageList.heading)}
                </h3>
                <div className="pure-g pure-g--gutters">
                    {columns.map((column, idx) => {
                        const links = [];

                        for (const section of column.subnav.sections) {
                            links.push({
                                name: section.title,
                                location: section.location,
                                isExternal: section.isExternal,
                            });
                        }

                        for (const link of column.subnav.links) {
                            links.push(link);
                        }

                        return (
                            <div className="pure-u-1-4" key={idx}>
                                <h4 className="c-mega-nav__list-heading">{column.name}</h4>
                                <LinkList
                                    links={links}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

MegaNav.defaultProps = {
    className: '',
};

MegaNav.propTypes = {
    className: PropTypes.string,
    intl: intlShape.isRequired,
    items: PropTypes.array,
};

export default injectIntl(MegaNav);
