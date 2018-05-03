// Header Account Nav. This component is the contents of the Dropdown under the avatar in the
// authenticated nav bar
// ===

import React from 'react';
import PropTypes from 'prop-types';

// Vendor components
// ---

// UI components
// ---
import { DDContainer } from 'client/common/components/Dropdown';
import AccountNav from 'client/shell/components/Header/AccountNav';
import AccountSwitcher from 'client/shell/components/Header/AccountSwitcher';
import DropdownItem from 'client/shell/components/Header/DropdownItem';
import Icon from 'client/common/components/Icon';
import ComponentSwitcher from 'client/common/components/ComponentSwitcher';

import './account-dropdown.scss';

const HeaderAccountDropdown = (props) => {
    const { avatar } = props.currentAccount;

    const trigger = (
        <button className="c-header-account-dropdown__trigger">
            <img
                className="c-header-account-dropdown__trigger-avatar"
                src={avatar}
                alt="Avatar"
            ></img>
            <Icon
                className="c-header-account-dropdown__trigger-carat"
                size="sm"
                glyph="arrowDown"
            />
        </button>
    );
    return (
        <DDContainer>
            <DropdownItem
                size="sm"
                itemElement="div"
                itemClass="c-header-account-dropdown"
                trigger={trigger}
                contentClass="c-header-account-dropdown__content"
                caratRight
                index={1}
            >

                <ComponentSwitcher
                    components={[
                        <AccountNav {...props} />,
                        <AccountSwitcher {...props} />,
                    ]}
                />
            </DropdownItem>
        </DDContainer>
    );
};

HeaderAccountDropdown.defaultProps = {
    currentAccount: {
        avatar: '',
    },
};

HeaderAccountDropdown.propTypes = {
    currentAccount: PropTypes.shape({
        avatar: PropTypes.string,
    }),
};

export default HeaderAccountDropdown;
