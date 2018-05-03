/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */
import React from 'react';
import { Link } from 'react-router';
import { expect } from 'chai';
import { shallowWithIntl } from 'ClientSpecUtils';
import { // list alphabetically for grok-ability
    Button,
} from 'semantic-ui-react';

import Success from './index';


describe('Success', function () {
    const taxReceiptProfilePath = '/user/tax-receipts';
    const recurringDonationPath = '/user/recurring-donations';
    const userDashboardPath = '/users/dashboard';
    context('with recurring donation', function () {
        it('has recurring donations correct link address', () => {
            const defaultProps = {
                addMoneyFormData: {
                    amount: '$100.00',
                    isRecurringDonation: true,
                    name: 'Jane',
                    onWhatDay: '1st',
                    recurringDate: 'April 1st 2018',
                },
                creditCardData: {
                    cardType: 'VISA',
                    description: 'John Doe\'s visa ending with 4242',
                    lastFourDigitCardNo: '4242',
                    nameOnCard: 'Jane Prescott',
                },
            };
            const wrapper = shallowWithIntl(<Success {...defaultProps} />).dive();
            expect(wrapper.find(Button).prop('to')).to.equal(recurringDonationPath);
        });
    });

    context('without recurring donation', function () {
        const defaultProps = {
            addMoneyFormData: {
                amount: '$100.00',
                isRecurringDonation: false,
                name: 'Jane',
                onWhatDay: '1st',
                recurringDate: 'April 1st 2018',
            },
            creditCardData: {
                cardType: 'VISA',
                description: 'John Doe\'s visa ending with 4242',
                lastFourDigitCardNo: '4242',
                nameOnCard: 'Jane Prescott',
            },
        };
        const wrapper = shallowWithIntl(<Success {...defaultProps} />).dive();
        it('has tax receipt correct link address', () => {
            expect(wrapper.find(Button).prop('to')).to.equal(taxReceiptProfilePath);
        });
        it('has user dashboard correct link address', () => {
            expect(wrapper.find(Link).prop('to')).to.equal(userDashboardPath);
        });
    });
});

