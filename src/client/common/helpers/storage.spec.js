import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';

// NOTE: cannot import from index.js because IT imports storage.js; so that would be circular
import storage from './storage';
import browser from './browser';
// import redact from './redact'; // See related note on last test below

const realDoc = browser.document;
const realWin = browser.window;

const mockWin = _.pick(browser.window, [
    'localStorage',
    'location',
    'sessionStorage',
]);

// TODO: Why is this 'xdescribe'? Are these tests disable on purpose, or by accident?
xdescribe('Storage Helper', function() {
    const cookieKey = 'cookieKey';
    const cookieVal = 'cookieVal';
    const localKey = 'localKey';
    const localVal = 'localVal';
    const sessionKey = 'sessionKey';
    const sessionVal = 'sessionVal';
    const unsetKey = 'unsetKey';
    let sandbox;
    let doc, win;
    const spies = {};

    function disableStorage(type) {
        spies[type] = sandbox.stub(browser.window, `${type}Storage`, function() {
            new ReferenceError(`Spec: ${type}Storage has been removed`)
        });
    }

    before(function() {
        doc = browser.document;
        win = browser.window = mockWin;

        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        try {
            doc.clearCookies();
            win.localStorage.clear();
            win.sessionStorage.clear();
        } catch(e) {}

        sandbox.resetHistory();
    });

    after(function() {
        sandbox.restore();

        browser.document = realDoc;
        browser.window = realWin;
    });

    context('when WebStorage is NOT available', function() {
        before(function() {
            disableStorage('local');
            disableStorage('session');

            storage.refreshAvailableTypes();
        });

        after(function() {
            spies.local.restore();
            spies.session.restore();
        })

        describe('availableTypes', function() {
            it('should contain ONLY \'cookie\'', function() {
                expect(storage.availableTypes.length).to.equal(1);
                expect(storage.availableTypes[0]).to.equal('cookie');
            });
        });

        describe('get()', function() {
            beforeEach(function() {
                doc._cookies.set(cookieKey, cookieVal);
            });

            it('should get value at key in document.cookies', function() {
                expect(storage.get(cookieKey)).to.contain(cookieVal);
            });

            context('and an unavailable storageType is passed', function() {
                it(
                'should ignore supplied storageType and check cookies',
                function() {
                    expect(storage.get(cookieKey, 'session')).to.contain(cookieVal);
                })
            });
        });

        describe('set()', function() {
            it('should write a cookie', function() {
                storage.set(cookieKey, cookieVal);

                expect(doc.cookie).to.contain(`${cookieKey}="${cookieVal}"`);
            });

            context('but \'session\' is passed', function() {
                it(
                'should use \'cookie\' and not query window.sessionStorage',
                function() {
                    storage.set(sessionKey, sessionVal, 'session');

                    expect(doc.cookie).to.contain(`${sessionKey}="${sessionVal}"`);
                });
            });
        });

        describe('unset()', function() {
            context('if a single argument is passed', function() {
                it('should remove all keys from document.cookie if \'cookie\' is passed',
                    function() {
                    storage.unset('cookie');

                    expect(doc._cookies.size).to.equal(0);
                });

                /* not applicable in this context (there are no others)
                it('should not affect any storage if anything else is passed', function() {

                });
                */
            });

            context('if two arguments are passed', function() {
                context('and second argument is \'cookie\'', function() {
                    it(
                    'should only remove the key of the first argument from document.cookie',
                    function() {
                        storage.unset(cookieKey, 'cookie');

                        expect(doc._cookies.has(cookieKey)).to.be.false;
                    });
                });

                context('and second argument is anything but \'cookie\'', function() {
                    it('should not remove key from any storage, even if storage is valid', function() {
                        const spy = sinon.spy(doc._cookies, 'delete');

                        storage.unset(cookieKey, 'session');

                        expect(spy).to.have.been.called;
                    });
                });
            });
        });
    });


    context('when WebStorage IS available', function() {
        // make webStorage available
        beforeEach(function() {
            storage.refreshAvailableTypes();
        });

        describe('availableTypes', function() {
            it(
            'should contain all 3 possibilities',
            function() {
                expect(storage.availableTypes.length).to.equal(3);
                expect(_.includes(storage.availableTypes, 'local')).to.be.true;
                expect(_.includes(storage.availableTypes, 'session')).to.be.true;
            })
        });

        describe('get()', function() {
            context('when optional storageType is NOT passed', function() {
                beforeEach(function() {
                    win.sessionStorage[sessionKey] = sessionVal;
                });

                it('should default to \'session\'', function() {
                    expect(storage.get(sessionKey)).to.equal(sessionVal);
                });
            });

            context('when storageType is \'session\'', function() {
                beforeEach(function() {
                    win.sessionStorage[sessionKey] = sessionVal;
                });

                it('should get value from SessionStorage with provided key', function() {
                    expect(storage.get(sessionKey)).to.equal(sessionVal);
                });

                it('should return `undefined` if key not in SessionStorage', function() {
                    expect(storage.get(unsetKey)).to.be.undefined;
                });
            });

            context('when storageType is \'local\'', function() {
                beforeEach(function() {
                    win.localStorage[localKey] = localVal;
                });

                it('should get value from LocalStorage with provided key', function() {
                    expect(storage.get(localKey, 'local')).to.equal(localVal);
                });

                it('should return `undefined` if key not in LocalStorage', function() {
                    expect(storage.get(unsetKey)).to.be.undefined;
                });
            });

            context('when storageType is \'cookie\'', function() {
                beforeEach(function() {
                    doc._cookies.set(cookieKey, cookieVal);
                });

                it('should return value from cookies', function() {
                    expect(storage.get(cookieKey, 'cookie')).to.equal(cookieVal);
                });
            });

            context('when storageType is \'any\' should', function() {
                it('should return the key\'s value from LocalStorage when set', function() {
                    win.localStorage[localKey] = localVal;

                    expect(storage.get(localKey, 'any')).to.equal(localVal);
                });

                it('should return the key\'s value from SessionStorage when set', function() {
                    win.sessionStorage[sessionKey] = sessionVal;

                    expect(storage.get(sessionKey, 'any')).to.equal(sessionVal);
                });

                it('should return the key\'s value from cookies when set', function() {
                    doc._cookies.set(cookieKey, cookieVal);

                    expect(storage.get(cookieKey, 'any')).to.equal(cookieVal);
                });

                it('should return `undefined` if none of the types of storage are set', function() {
                    expect(storage.get(cookieKey, 'any')).to.be.undefined;
                });

                context('and the same key is set in multiple storage types should', function() {
                    it(
                    'return the first found value in reverse alphabetical order by storage name',
                    function() {
                        win.localStorage[sessionKey] = sessionVal;
                        win.sessionStorage[sessionKey] = sessionVal;
                        doc._cookies.set(sessionKey, sessionVal);

                        expect(storage.get(sessionKey)).to.equal(sessionVal);
                    })
                });
            });
        });

        describe('set()', function() {
            context('when optional storageType is NOT passed', function() {
                it('should default to SessionStorage ', function() {
                    storage.set(sessionKey, sessionVal);

                    expect(JSON.parse(win.sessionStorage[sessionKey])).to.equal(sessionVal);
                });
            });

            context('when storageType is session', function() {
                it('should set value in window.sessionStorage with provided key', function() {
                    storage.set(sessionKey, sessionVal);

                    expect(JSON.parse(win.sessionStorage[sessionKey])).to.equal(sessionVal);
                });
            });

            context('when storageType is local', function() {
                it('should set value in window.localStorage with provided key', function() {
                    storage.set(localKey, localVal, 'local');

                    expect(JSON.parse(win.localStorage[localKey])).to.equal(localVal);
                });
            });

            context('when storageType is cookie', function() {
                it('should set value in document.cookie with provided key', function() {
                    storage.set(cookieKey, cookieVal, 'cookie');

                    expect(doc.cookie).to.contain(`${cookieKey}="${cookieVal}"`);
                });

                it('should write a cookie with domain= the value of location.host', function() {
                    storage.set(cookieKey, cookieVal, 'cookie');

                    expect(doc.cookie).to.contain(`domain=${browser.location.host}`);
                });

                context('and when immortal is TRUE', function() {
                    it('should write a cookie that expires far in the future', function() {
                        const now = new Date();

                        storage.set(cookieKey, cookieVal, 'cookie', true);

                        const cookieExpiry = new Date(doc.cookie
                            .split('expires=')[1]
                            .split(';')[0]);

                        expect(cookieExpiry.getTime() > now.getTime()).to.be.true;
                    });
                });

                context('and when immortal is FALSE', function() {
                    it('should write a cookie that expires in the past', function() {
                        const now = new Date();

                        storage.set(cookieKey, cookieVal, 'cookie', false);

                        const cookieExpiry = new Date(doc.cookie
                            .split('expires=')[1]
                            .split(';')[0]);

                        expect(cookieExpiry.getTime() < now.getTime()).to.be.true;
                    });
                });

                context('and when immortal is NOT strictly boolean', function() {
                    it('should write a cookie with no explicit expiry date', function() {
                        storage.set(cookieKey, cookieVal, 'cookie', 'foo');

                        expect(_.includes(doc.cookie, 'expires')).to.be.false;
                    });
                });
            });
        });

        describe('unset()', function() {
            beforeEach(function() {
                doc.cookie = `${cookieKey}="${cookieVal}"`;
                win.localStorage[localKey] = localVal;
                win.sessionStorage[sessionKey] = sessionVal;
            });

            context('when called with no arguments', function() {
                it('should not remove any keys from any storage type', function() {
                    storage.unset();

                    expect(doc.cookie).to.be.ok;
                    expect(win.localStorage[localKey]).to.equal(localVal);
                    expect(win.sessionStorage[sessionKey]).to.equal(sessionVal);
                });
            });

            context('when one argument is passed', function() {
                context('and that argument is a VALID storageType', function() {
                    it('should unset ALL keys on ALL storages', function() {
                        storage.unset('all');

                        expect(doc.cookie).to.equal('');
                        expect(win.localStorage.length > 0).to.be.false;
                        expect(win.sessionStorage.length > 0).to.be.false;
                    });

                    it('should unset ALL keys on \'cookie\'', function() {
                        storage.unset('cookies');

                        expect(doc.cookie).to.equal('');
                        expect(win.localStorage[localKey]).to.equal(localVal);
                        expect(win.sessionStorage[sessionKey]).to.equal(sessionVal);
                    });

                    it('should unset ALL keys on \'local\'', function() {
                        storage.unset('locals');

                        expect(doc.cookie).to.be.ok;
                        expect(win.localStorage.length > 0).to.be.false;
                        expect(win.sessionStorage.length > 0).to.be.true;
                    });

                    it('should unset ALL keys on \'session\'', function() {
                        storage.unset('sessions');

                        expect(doc.cookie).to.be.ok;
                        expect(win.localStorage.length > 0).to.be.true;
                        expect(win.sessionStorage.length > 0).to.be.false;
                    });
                });

                context('and that argument is a INVALID storageType', function() {
                    it('should NOT affect that key in ANY storageType', function() {
                        storage.unset('foo');

                        expect(doc.cookie).to.be.ok;
                        expect(win.localStorage.length > 0).to.be.true;
                        expect(win.sessionStorage.length > 0).to.be.true;
                    });
                });
            });

            context('when key is passed and storageType is cookie', function() {
                it('should expire key in document.cookie', function() {

                });
            });

            context('when key is passed and storageType is local', function() {
                it('should unset key from LocalStorage', function() {
                    win.localStorage.foo = 'bar';
                    storage.unset(localKey, 'local');

                    expect(doc.cookie).to.be.ok;
                    expect(win.localStorage[localKey]).to.be.undefined;
                    expect(win.localStorage.foo).to.be.ok;
                    expect(win.sessionStorage.length > 0).to.be.true;
                });
            });

            context('when key is passed and storageType is \'session\'', function() {
                it('should unset key from SessionStorage', function() {
                    win.sessionStorage.foo = 'bar';
                    storage.unset(sessionKey, 'session');

                    expect(doc.cookie).to.be.ok;
                    expect(win.localStorage.length > 0).to.be.true;
                    expect(win.sessionStorage[sessionKey]).to.be.undefined;
                    expect(win.sessionStorage.foo).to.be.ok;
                });
            });
        });
    });


    // context independent tests
    describe('get()', function() {
        // make webStorage available
        beforeEach(function() {
            storage.refreshAvailableTypes();
        });

        it('should return `undefined` when key is not a string', function() {
            expect(storage.get({}, 'cookie')).to.be.undefined;
        });

        it('should return `undefined` key is a 0 char string', function() {
            expect(storage.get('', 'cookie')).to.be.undefined;
        });
    });

    describe('set()', function() {
        // make webStorage available
        beforeEach(function() {
            storage.refreshAvailableTypes();
        });

        it('should not set value when value is null', function() {
            expect(storage.set(sessionKey, null, 'session')).to.be.undefined;
        });

        it('should not set value when key is not a string', function() {
            expect(storage.set({}, sessionVal, 'session')).to.be.undefined;
        });

        it('should not set value when key is a 0 char string', function() {
            expect(storage.set('', sessionVal, 'session')).to.be.undefined;
        });

        /* redact() is no longer a method of helpers, so spy needs refactoring
        it('should call redact the set value', function() {
            const spy = sinon.spy(helpers, 'redact');

            storage.set(sessionKey, { password: sessionVal }, 'session');

            expect(spy).to.have.been.called;
        });
        */
    });

    describe('unset()', function() {
        // make webStorage available
        beforeEach(function() {
            storage.refreshAvailableTypes();

            doc.cookie = `${cookieKey}="${cookieVal}"`;
            win.localStorage[localKey] = localVal;
            win.sessionStorage[sessionKey] = sessionVal;
        });

        it('should not unset key when key is not a string', function() {
            storage.unset({});

            expect(doc.cookie).to.be.ok;
            expect(win.localStorage[localKey]).to.equal(localVal);
            expect(win.sessionStorage[sessionKey]).to.equal(sessionVal);
        });

        it('should not unset key when key is an empty string', function() {
            storage.unset('');

            expect(doc.cookie).to.be.ok;
            expect(win.localStorage[localKey]).to.equal(localVal);
            expect(win.sessionStorage[sessionKey]).to.equal(sessionVal);
        });
    });
});
