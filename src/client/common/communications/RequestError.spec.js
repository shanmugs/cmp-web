import { expect } from 'chai';
import _ from 'lodash';

import RequestError, {
    messages,
    statusMap,
} from './RequestError';

describe('RequestError', function() {
    const message = 'Shit happened';

    describe('type', function() {
        it('should register as an Error', function() {
            expect(new RequestError({message})).to.be.an('error');
        });
    });

    describe('properties', function() {
        it('should contain standard properties', function() {
            const reqError = new RequestError({message});

            expect(reqError.name, 'name').to.equal('RequestError');
            expect(reqError.message, 'message').to.equal(message);
            expect(reqError.stack, 'stack').to.have.string('at');
        });

        it('should contain custom properties', function() {
            const reqError = new RequestError({
                errors: [
                    {}
                ],
                message,
                status: 401,
                url: '/foo/bar?qux'
            });

            expect(reqError.errors, 'errors').to.be.an('array').that.has.lengthOf(1);
            expect(reqError.intlMessage, 'intlMessage').to.equal(messages.UNAUTHORIZED);
            expect(reqError.statusText, 'statusText').to.equal('UNAUTHORIZED');
            expect(reqError.status, 'status').to.equal(401);
            expect(reqError.url, 'url').to.equal('/foo/bar?qux');
        });
    });

    describe('messages', function() {
        it('should have messages for each main error', function() {
            expect(messages).to.have.all.keys([
                'ABORTED',
                'BAD_REQUEST',
                'BAD_RESPONSE',
                'FORBIDDEN',
                'GENERAL',
                'GONE',
                'INVALID_DATA',
                'NO_INTERNET',
                'NOT_FOUND',
                'REDIRECT',
                'SERVER_ERROR',
                'TIMEOUT',
                'UNAUTHORIZED',
            ]);
        });

        it('should match up with statusMap', function() {
            const vals = _.uniq(_.values(statusMap));
            const keys = _.keys(messages);

            expect(vals).to.have.members(keys);
        });
    });
});
