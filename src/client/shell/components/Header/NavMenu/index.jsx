// Main Desktop dropdown navigation

import React from 'react';
import PropTypes from 'prop-types';

// Vendor components
// ---
import classNames from 'classnames';

// UI components
// ---
import { DDContainer } from 'client/common/components/Dropdown';
import DropdownItem from 'client/shell/components/Header/DropdownItem';
import GeminiLink from 'client/common/components/GeminiLink';

// Helpers
// ---
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import helpers from 'client/common/helpers/helpers';

// Styles
// ---
import './nav-menu.scss';

class NavMenu extends React.Component {
    renderSubNavHeading(itemSubnav) {
        let subnavHeading = null;
        if (itemSubnav.heading) {
            subnavHeading = (
                <div className="c-header-dropdown-item__contents-heading u-margin-bottom-md">
                    {itemSubnav.heading}
                </div>
            );
        }
        return subnavHeading;
    }

    renderSection(section, id) {
        let title = <div className="c-header-dropdown-item__contents-heading">{section.title}</div>;

        if (section.location) {
            title = (
                <div className="c-header-dropdown-item__contents-heading">
                    <GeminiLink path={section.location}>{section.title}</GeminiLink>
                </div>
            );
        }
        return (
            <div key={id} className="pure-u-1-2">
                {title}
                <p>{section.description}</p>
            </div>
        );
    }

    renderLink(link, id) {
        return (
            <li key={id} className="c-header-dropdown-item__contents-link pure-u-1-2">
                <GeminiLink path={link.location}>{link.name}</GeminiLink>
            </li>
        );
    }

    render() {
        if (helpers.isSSR) return null;

        const { items, className, currentBreakpoint } = this.props;

        let HeaderDropdownSize = 'sm';

        if (adaptiveComponentHelper.greaterThan('md', currentBreakpoint)) {
            HeaderDropdownSize = 'md';
        }

        const containerClass = classNames(
            'c-header-nav-menu',
            className
        );

        return (
            <div className="c-header__nav-wrapper">
                <nav role="navigation">
                    <DDContainer
                        element="ul"
                        className={containerClass}
                        role="menubar"
                    >
                        {items.map((item, idx) => {
                            let subnav = '';
                            const trigger = (
                                <span className="c-header-nav-menu__item-text">
                                    {item.name}
                                </span>
                            );
                            if (typeof item.subnav !== 'undefined') {
                                subnav = (
                                    <DropdownItem
                                        itemClass="c-header-nav-menu__item"
                                        key={idx}
                                        index={idx}
                                        size={HeaderDropdownSize}
                                        trigger={trigger}
                                    >
                                        <div className="pure-g pure-g--gutters">
                                            {item.subnav.sections.map(
                                                (section, id) => this.renderSection(section, id)
                                            )}
                                        </div>
                                        {this.renderSubNavHeading(item.subnav)}
                                        <ul className="pure-g pure-g--gutters">
                                            {item.subnav.links.map(
                                                (link, id) => this.renderLink(link, id)
                                            )}
                                        </ul>
                                    </DropdownItem>
                                );
                            } else {
                                // Don't generate a dropdown if there's no subnav property on the
                                // menuItem
                                subnav = (
                                    <li key={idx} className="c-header-nav-menu__item">
                                        <GeminiLink
                                            className="c-header-nav-menu__item-text"
                                            path={item.location}
                                        >{item.name}</GeminiLink>
                                    </li>
                                );
                            }
                            return subnav;
                        })}
                    </DDContainer>
                </nav>
            </div>
        );
    }
}

NavMenu.defaultProps = {
    className: '',
    currentBreakpoint: null,
    items: [],
};

NavMenu.propTypes = {
    className: PropTypes.string,
    currentBreakpoint: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            subnav: PropTypes.object, // Optional subnav
        })
    ),
};

export default NavMenu;
