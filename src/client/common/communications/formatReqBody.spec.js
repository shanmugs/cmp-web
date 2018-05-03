import { expect } from 'chai';

import formatReqBody from './formatReqBody';

describe('formatReqBody', function () {
    const data = {foo: 'bar'};

    it('should abort when called without arguments (ex for a GET request)', function() {
        expect( formatReqBody() ).to.equal(undefined);
    });

    context('when format: JSON', function() {
        it('should convert hash to string', function() {
            expect( formatReqBody(data, 'JSON') ).to.equal('{"foo":"bar"}');
        });
    });

    context('when format: undefined', function() {
        it('should throw an error', function() {
            const throwWrapper = () => formatReqBody(data);

            expect( throwWrapper ).to.throw();
        });
    });
});
