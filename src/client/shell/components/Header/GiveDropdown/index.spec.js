import React from 'react';
import { expect } from 'chai';
import _ from 'lodash';

import createComponentRenderer from 'client/utils/createComponentRenderer';
import GiveContents from 'client/shell/components/Header/GiveContents';
import Tooltip from 'client/common/components/Tooltip';

import { GiveDropdown } from './';


describe('GiveDropdown', () => {
    const getComponent = (props = {}, rendererType = 'full') => {
        return createComponentRenderer(GiveDropdown, {
            defaultProps: {
                cancelGiveTooltips: _.noop,
                showGiveTooltips: false,
            },
            withIntl: true,
            withStore: true,
        })(props, rendererType);
    };

    const getTooltipBalanceComponent = (GiveDropdownWrapper) => {
        return GiveDropdownWrapper.find('.qa-tooltip-balance');
    };

    const accountWithBalance = { balance: '$25.00' };
    const accountWithoutBalance = { balance: '$0.00' };
    const noCurrentAccount = {};

    context("when showGiveTooltips is FALSE", () => {
        it("should NOT activate the TooltipStep", () => {
            const wrapper = getComponent()
            expect(wrapper.find(Tooltip).exists()).to.be.false;
        });
    });

    context("when showGiveTooltips is TRUE", () => {
        context("and a currentAccount.balance exists", () => {
            it("should display the balance if non-zero", () => {
                const wrapper = getComponent({
                    showGiveTooltips: true,
                    currentAccount: accountWithBalance,
                });
                const tooltipBalanceComponent = getTooltipBalanceComponent(wrapper);
                expect(tooltipBalanceComponent.exists()).to.be.true;
                expect(tooltipBalanceComponent.text()).to.contain(accountWithBalance.balance);
            });

            it("should NOT display the balance if zero", () => {
                const wrapper = getComponent({
                    showGiveTooltips: true,
                    currentAccount: accountWithoutBalance,
                });

                expect(getTooltipBalanceComponent(wrapper).exists()).to.be.false;
            });
        });

        context("and a currentAccount.balance does NOT exist", () => {
            it("should NOT display the balance string", () => {
                const wrapper = getComponent({
                    showGiveTooltips: true,
                    currentAccount: noCurrentAccount,
                });

                expect(getTooltipBalanceComponent(wrapper).exists()).to.be.false;
            });
        });
    });
});
