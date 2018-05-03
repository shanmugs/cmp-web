// Header Give Dropdown Container
// ===
//
// Responsive global header component
//

// Header Give Menu
// ===
//
// Give Button and Dropdown

// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import { connectBranch } from 'client/common/store';
import { cancelGiveTooltips } from 'client/shell/components/Header/actions';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';
import _ from 'lodash';
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import { DDContainer } from 'client/common/components/Dropdown';
import GiveContents from 'client/shell/components/Header/GiveContents';
import DropdownItem from 'client/shell/components/Header/DropdownItem';
import TooltipContainer from 'client/common/components/TooltipContainer';
import Step from 'client/common/components/TooltipContainer/Step';
import Beacon from 'client/common/components/Tooltip/Beacon';

import './give-dropdown.scss';

// Messages
// ---
const messageList = defineMessages({
    trigger: {
        id: 'header.giveDropdown.trigger',
        description: 'foo',
        defaultMessage: 'Give',
    },
    tooltipContentHeading: {
        id: 'onboardingTooltips.giveButton.heading',
        description: 'foo',
        defaultMessage:
            'The Give button is the starting point for the ' +
            'things you’ll do most: adding money to your account, giving ' +
            'to charities, and sending money to friends and family, for them ' +
            'to give away.',
    },
    tooltipContentContent: {
        id: 'onboardingTooltips.giveButton.content',
        description: 'foo',
        defaultMessage:
            'To get you started, you have {balanceStr} to give to a cause of your choice!',
    },
    tooltipContentButtonText: {
        id: 'onboardingTooltips.giveButton.buttonText',
        description: 'foo',
        defaultMessage: 'Give Now',
    },
});

class GiveDropdown extends BaseComponent {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
        this.toggleOpen = _.noop; // harmless noop until it's overwritten in componentDidMount
    }

    // Wrap the DDItem's componentDidUpdate method with a method to update our state
    // so we can update the direction of the tooltip based on the dropdown's open state
    componentDidMount() {
        const DDItem = this.refs.DropdownItem.refs.CommonDropdownItem;
        const original = DDItem.componentDidUpdate || function noOp() {};
        const updateState = (isOpen) => this.setState({
            isOpen,
        });
        DDItem.componentDidUpdate = () => {
            // necessary to prevent an infinite re-render loop
            if (this.state.isOpen === DDItem.state.isOpen) return;
            updateState(DDItem.state.isOpen);
            original(); // Only execute the original CDU if it was found
        };

        // Get open method from the Dropdown item so we can use it in the tooltip method
        // It's not available on first render because we don't have access to the DDItem yet.
        //
        // This whole thing should be refactored with redux actions when we get a chance
        this.toggleOpen = this.refs.DropdownItem.refs.CommonDropdownItem.toggleOpen;
    }

    BalanceTooltip({ intl, currentAccount }) {
        const format = intl.formatMessage;
        const balanceStr = currentAccount.balance;
        // `balanceStr &&` protects against null balances throwing syntax errors
        const balanceNum = balanceStr && +balanceStr.slice(1);
        if (_.isUndefined(balanceStr) || balanceNum === 0) return null;

        return (
            <p className="qa-tooltip-balance u-margin-bottom-lg u-lh-copy" >
                {format(messageList.tooltipContentContent, { balanceStr })}
            </p>
        );
    }

    render() {
        const { BalanceTooltip } = this;
        const props = this.props;
        const format = props.intl.formatMessage;
        const giveTooltipContents = [
            <h3
                key={1}
                className="u-margin-bottom-lg u-lh-copy"
            >
                {format(messageList.tooltipContentHeading)}
            </h3>,
            <BalanceTooltip
                key={2}
                {...props}
            />,
            <Beacon
                className="c-button c--light c--pop"
                key={3}
                onClick={this.toggleOpen}
            >
                {format(messageList.tooltipContentButtonText)}
            </Beacon>,
        ];

        const tooltipOptions = {
            icon: 'giftSolid',
            tooltipPosition: 'below',
            children: giveTooltipContents,
            onClose: props.cancelGiveTooltips,
        };
        const direction = this.state.isOpen ? 'previous' : 'next';
        const trigger = (
            <Beacon
                className="c-button c--pop c--filled"
                direction={direction}
            >
                {format(messageList.trigger)}
            </Beacon>
        );

        return (
            <TooltipContainer
                isActive={props.showGiveTooltips}
            >
                <DDContainer>
                    <Step
                        fireworksPosition="baseline"
                        order={1}
                        tooltipOptions={tooltipOptions}
                    >
                        <DropdownItem
                            ref="DropdownItem"
                            size="sm"
                            itemElement="div"
                            itemClass="c-header-give-dropdown"
                            trigger={trigger}
                            contentClass="c-header-give-dropdown__content"
                            caratRight
                            index={1}
                        >
                            <GiveContents {...props} />
                        </DropdownItem>
                    </Step>
                </DDContainer>
            </TooltipContainer>
        );
    }
}

const {
    bool,
    func,
} = PropTypes;

GiveDropdown.defaultProps = {
    cancelGiveTooltips: _.noop,
    showGiveTooltips: false,
}

GiveDropdown.propTypes = {
    cancelGiveTooltips: func,
    intl: intlShape.isRequired,
    showGiveTooltips: bool,
};

const wrappedGiveDropdown = injectIntl(GiveDropdown);
export { wrappedGiveDropdown as GiveDropdown };

export default connectBranch(GiveDropdown, {
    branchPath: 'giveDropdown',
});
