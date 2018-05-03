import { expect } from 'chai';
import _ from 'lodash';

import redact from './redact';

import allSettled from './whenAllPromisesSettled';

describe('Redeact Helper', function() {
    const redactedVal = '*';
    const testCreditCardNumber = 4242424242424242;
    const testPassword = 'abc123';
    const dummyData = {
        foo: {
            bar: {
                a: 1,
                b: {
                    c: {
                        d: {
                            creditCardNumber: testCreditCardNumber,
                            password: testPassword,
                        },
                    },
                },
            },
            creditCardNumber: testCreditCardNumber,
            password: testPassword,
        },
        creditCardNumber: testCreditCardNumber,
        password: testPassword,
    };

    context('when only `data` is passed', function() {
        context('and `data` is a plain object', function() {
            let redactPromise;
            beforeEach(function() {
                redactPromise = redact(dummyData);
            });

            it('should replace all values for all occurances of default keys', function() {
                return redactPromise.then(function(redactedData) {
                    expect(redactedData.creditCardNumber).to.equal(redactedVal);
                    expect(redactedData.password).to.equal(redactedVal);
                    expect(redactedData.foo.bar.a).to.equal(1);
                    expect(redactedData.foo.bar.b.c.d.creditCardNumber).to.equal(redactedVal);
                    expect(redactedData.foo.bar.b.c.d.password).to.equal(redactedVal);
                    expect(redactedData.foo.creditCardNumber).to.equal(redactedVal);
                    expect(redactedData.foo.password).to.equal(redactedVal);
                });
            });

            it('should maintain the orginal data\'s structure', function() {
                return redactPromise.then(function(redactedData) {
                    expect(_.keys(redactedData))
                        .to.have.all.members(_.keys(dummyData));
                    expect(_.keys(redactedData.foo))
                        .to.have.all.members(_.keys(dummyData.foo));
                    expect(_.keys(redactedData.foo.bar))
                        .to.have.all.members(_.keys(dummyData.foo.bar));
                    expect(_.keys(redactedData.foo.bar.b))
                        .to.have.all.members(_.keys(dummyData.foo.bar.b));
                    expect(_.keys(redactedData.foo.bar.b.c))
                        .to.have.all.members(_.keys(dummyData.foo.bar.b.c));
                    expect(_.keys(redactedData.foo.bar.b.c.d))
                        .to.have.all.members(_.keys(redactedData.foo.bar.b.c.d));
                });
            });
        });

        context('and `data` contains a non-primitive that is not a plain object or array',
            function() {
                it('should abort', function() {
                    const date = new Date();
                    const extendedData = _.merge({
                        zed: date,
                    }, dummyData);

                    return redact(extendedData).then(function(redactedData) {
                        expect(redactedData.zed).to.equal(date);
                    });
                });
        });

        context('and `data` is not a plain object', function() {
            it('should reject unsupported input', function() {
                const rejectedRealtypes = [];
                const promises = [];

                promises.push(
                    redact('foo').catch(() => { rejectedRealtypes.push('string')})
                    // string is allowed (is immediately returned)
                );
                promises.push(
                    redact(['foo']).catch(() => { rejectedRealtypes.push('array')})
                );
                promises.push(
                    redact(_.noop).catch(() => { rejectedRealtypes.push('function')})
                );
                promises.push(
                    redact(new Map()).catch(() => { rejectedRealtypes.push('map')})
                );
                promises.push(
                    redact(new Promise(_.noop)).catch(() => { rejectedRealtypes.push('promise')})
                );
                promises.push(
                    redact(new Set()).catch(() => { rejectedRealtypes.push('set')})
                );

                return allSettled(promises).then(function() {
                    expect(rejectedRealtypes.length).to.equal(5);
                });
            });

            it('should reject with an explation', function() {
                return redact('foo').catch(function(err) {
                    expect(_.keys(err)).to.have.all.members(['error', 'realtype', 'data']);
                });
            });
        });
    });


    context('when extra sanitization keys are passed', function() {
        const extraKeys = ['qux'];
        const testQux = 2;
        const extendedData = _.merge({
            qux: testQux,
            foo: {
                bar: {
                    b: {
                        c: {
                            qux: testQux,
                        },
                    },
                },
            },
        }, dummyData);

        it('should also replace the value of those keys', function() {
            return redact(extendedData, extraKeys).then(function(redactedData) {
                expect(redactedData.qux).to.equal(redactedVal);
                expect(redactedData.foo.bar.b.c.qux).to.equal(redactedVal);
            });
        });

        context('and `moreSanitizeKeys` is not an array', function() {
            it('should ignore them', function() {
                return redact(extendedData, 'qux').then(function(redactedData) {
                    expect(redactedData.qux).to.equal(testQux);
                    expect(redactedData.foo.bar.b.c.qux).to.equal(testQux);
                });
            });
        });
    });

    context('when a recursion depth is passed', function() {
        it('should stop after redacting that level', function() {
            return redact(dummyData, null, { recurseDepth: 1 }).then(function(redactedData) {
                expect(redactedData.creditCardNumber).to.equal(redactedVal);
                expect(redactedData.password).to.equal(redactedVal);
                expect(redactedData.foo.bar.a).to.equal(1);
                expect(redactedData.foo.bar.b.c.d.creditCardNumber).to.equal(testCreditCardNumber);
                expect(redactedData.foo.bar.b.c.d.password).to.equal(testPassword);
                expect(redactedData.foo.creditCardNumber).to.equal(testCreditCardNumber);
                expect(redactedData.foo.password).to.equal(testPassword);
            });
        });
    });
});
