import React from 'react';
import { expect } from 'chai';
import { shallowWithIntl } from 'ClientSpecUtils';
import { // list alphabetically for grok-ability
    Button,
} from 'semantic-ui-react';

import P2pSuccessView from './';

describe('P2PAllocation/Success', function () {
    const taxReceiptProfilePath = '/user/tax-receipts';
    const giveNewGiftPath = '/give/to/friend/new';
    context('without top up', function () {
        it('has correct link address', () => {
            const defaultProps = {
                allocation: { amount: '$75.00', emailList: ['1@gmail.com'] },
                wasToppedUp: false,
            };
            const wrapper = shallowWithIntl(<P2pSuccessView {...defaultProps} />).dive();
            expect(wrapper.find(Button).prop('to')).to.equal(giveNewGiftPath);
        });
    });

    context('with top up', function () {
        it('has correct link address', () => {
            const defaultProps = {
                allocation: { amount: '$75.00', emailList: ['1@gmail.com'] },
                wasToppedUp: true,
            };
            const wrapper = shallowWithIntl(<P2pSuccessView {...defaultProps} />).dive();
            expect(wrapper.find(Button).prop('path')).to.equal(taxReceiptProfilePath);
        });
    });

});
