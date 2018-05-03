import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Icon,
    Image,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';

import * as actions from './actions';
import accountTypes from './types';


const {
    bool,
    oneOf,
    oneOfType,
    shape,
    string,
} = PropTypes;

/**
 * This should not be used outside of the AccountNameTag
 * @param  {string} props.color SUI "color"
 * @param  {string} props.icon  SUI icon "name"
 * @param  {string} props.size  SUI "size"
 * @param  {(string|false)} props.src The account's avatar src
 * @return {JSX} Either the account's avatar if it exists, or a generic Icon (appropriate to the
 * account type)
 */
const Avatar = ({
    color,
    icon,
    size,
    src,
}) => {
    if (src) return (
        <Image
            className="account-nametag-avatar"
            size={size}
            src={src}
        />
    );

    return (
        <Icon
            className="account-nametag-avatar"
            bordered
            color={color}
            inverted
            name={icon}
            size={size}
        />
    );
};
/* eslint-disable react/require-default-props */
// these are all optional, so defining `undefined` in defaultProps is stupid
Avatar.propTypes = {
    color: string,
    icon: string,
    size: string,
    src: oneOfType([
        bool,
        string,
    ]),
};
/* eslint-enable react/require-default-props */

class AccountNametag extends BaseComponent {
    constructor(props) {
        super(props);

        const {
            account,
            size,
        } = props;

        const state = {
            color: '',
            displayName: account.displayName,
            icon: '',
            size,
            src: account.avatar,
        };

        switch (account.type) {
        case 'beneficiary':
            state.color = 'blue';
            state.icon = 'heart';
            break;
        case 'community':
            state.color = 'teal';
            state.icon = 'group';
            break;
        case 'company':
            state.color = 'teal';
            state.icon = 'briefcase';
            break;
        case 'group':
            state.color = 'blue';
            state.icon = 'group';
            break;
        case 'user':
            state.color = 'orange';
            state.icon = 'user';
            break;
        default:
            break;
        }

        this.state = state;
    }

    componentDidMount() {
        const { account } = this.props;

        if (
            !account.displayName
            || account.avatar !== false
        ) actions.fetchAccount(account)
            .then(({ displayName, avatar: src = false }) => this.setState({
                displayName,
                src,
            }));
    }

    render() {
        return (
            <span
                className="ui account-nametag icon"
            >
                <Avatar
                    {...this.state}
                />
                { !!this.state.displayName &&
                    <span
                        className="account-nametag-name"
                    >
                        {this.state.displayName}
                    </span>
                }
            </span>
        );
    }
}

AccountNametag.defaultProps = {
    account: {},
    size: 'small',
};
AccountNametag.propTypes = {
    account: shape({
        accountId: string,
        avatar: string,
        displayName: oneOfType([
            bool,
            string,
        ]),
        type: oneOf(accountTypes).isRequired,
    }).isRequired,
    size: string,
};

export {
    AccountNametag as default,
    Avatar, // for testing
    accountTypes,
};
