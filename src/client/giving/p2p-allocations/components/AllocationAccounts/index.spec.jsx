/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { expect } from 'chai';
import _ from 'lodash';

import { shallow } from 'enzyme';
import { createSandbox } from 'sinon';

import {
    Header,
    Icon,
    Table,
} from 'semantic-ui-react';

import AccountNametag, {
    accountTypes,
} from 'client/common/partials/AccountNametag';

import AllocationAccounts, {
    PaymentIcon,
} from './';

describe('AllocationAccounts', function () {
    const accountPayment = {
        account: {
            accountId: '258ddd13',
            avatar: false, // avoid unnecessary fetch request
            displayName: 'John Jingleheimer',
        },
    };
    const nonaccountPaymentByType = {
        applePay: {
            amount: '$10.00',
            displayName: 'John Jingleheimer',
            type: 'applePay',
        },
        cardGeneric: {
            amount: '$10.00',
            displayName: 'John Jingleheimer',
            type: 'card',
        },
        cardWithKnownProcessor: {
            amount: '$10.00',
            displayName: 'John Jingleheimer',
            processor: 'visa',
            type: 'card',
        },
        crypto: {
            amount: '$10.00',
            displayName: 'John Jingleheimer',
            type: 'crypto',
        },
        email: {
            amount: '$10.00',
            displayName: 'john.jingleheimer@example.com',
            type: 'email',
        },
        googlePay: {
            amount: '$10.00',
            displayName: 'John Jingleheimer',
            type: 'googlePay',
        },
        paypal: {
            amount: '$10.00',
            displayName: 'John Jingleheimer',
            type: 'paypal',
        },
    };
    const cardWithUnknownProcessor = {
        amount: '$10.00',
        displayName: 'John Jingleheimer',
        processor: 'foobar',
        type: 'card',
    };
    const sandbox = createSandbox();
    const spies = {};

    before(function () {
        spies.formatMessage = sandbox.stub();
    });
    after(function () {
        sandbox.restore();
    });

    context('when more than 1 account is provided', function () {
        it('has a Table of avatars/icons and localised strings', function () {
            const wrapper = shallow(<AllocationAccounts
                accounts={_.values(nonaccountPaymentByType)}
                formatMessage={spies.formatMessage}
            />);

            expect(wrapper.is(Table), 'is a Table').to.be.true;
            expect(wrapper.find(PaymentIcon).length, 'has icon for each account').to.equal(7);
            expect(spies.formatMessage, 'has a localised string').to.have.been.called;
        });
    });

    context('when exactly 1 account is provided', function () {
        it('has only an avatar/icon and a localised string', function () {
            const wrapper = shallow(<AllocationAccounts
                accounts={[nonaccountPaymentByType.cardGeneric]}
                formatMessage={spies.formatMessage}
            />);

            expect(wrapper.find(PaymentIcon).length, 'has icon for each account').to.equal(1);
            expect(spies.formatMessage, 'has a localised string').to.have.been.called;
        });
    });

    describe('PaymentIcon', function () {
        context('when payment type is an account', function () {
            _.each(accountTypes, function (type) {
                it(`should use AccountNametag for ${type}`, function () {
                    const account = _.merge({ type }, accountPayment);
                    const wrapper = shallow(<PaymentIcon {...account} />);

                    expect(wrapper.is(AccountNametag)).to.be.true;
                });
            });
        });

        context('when payment type is NOT an account', function () {
            it('should use a generic icon for an unknown card processor', function () {
                let wrapper;
                try {
                    wrapper = shallow(<PaymentIcon {...cardWithUnknownProcessor} />);
                } catch (e) {
                    // silence expected `Failed prop type` error
                }

                expect(wrapper.prop('name')).to.equal('credit card alternative');
            });

            it('should use a generic icon for when no processor is specified', function () {
                const wrapper = shallow(<PaymentIcon {...nonaccountPaymentByType.cardGeneric} />);

                expect(wrapper.prop('name')).to.equal('credit card alternative');
            });

            _.each(nonaccountPaymentByType, function (payment) {
                it('should specify an icon', function () {
                    const wrapper = shallow(<PaymentIcon {...payment} />);

                    expect(wrapper.prop('name')).to.be.ok;
                });
            });
        });
    });
});
