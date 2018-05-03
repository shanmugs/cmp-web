/* eslint-env browser, mocha */
/* eslint-disable func-names, no-unused-expressions, prefer-arrow-callback */

import { expect } from 'chai';
import sinon from 'sinon';

import comms, {
    acceptableBodyTypes,
} from './';
import RequestError from './RequestError';

import * as helpers from 'client/common/helpers';
import * as store from 'client/common/store';
import * as app from 'server/app';


describe('Communications Helper', function () {
    const { window } = helpers.browser;
    const url = '/api/v2/test';
    const spies = {};
    const data = { email: 'test@example.tst' };
    let response = {};

    function resetSpies() {
        for (
            let keys = Object.keys(spies),
                i = keys.length - 1,
                key,
                spy;
            key = keys[i],
                spy = spies[key],
                i > -1;
            i--
        ) {
            spy.resetHistory && spy.resetHistory();
        }
    }
    function restoreSpies() {
        for (
            let keys = Object.keys(spies),
                i = keys.length - 1;
            i > -1;
            i--
        ) spies[keys[i]].restore();
    }

    before(function () {
        spies.fetch = sinon.stub(window, 'fetch').callsFake(function fetchStub(req) {
            const rsp = new Response(
                new Blob([JSON.stringify(response.body)], { type: 'application/json' }),
                response.config,
            );

            return response.success
                ? Promise.resolve(rsp)
                : Promise.reject(new TypeError('Failed to fetch'));
        });
        spies.loggerWarn = sinon.stub(console, 'warn');
        spies.timeout = sinon.stub(window, 'setTimeout').callsFake(
            function timeoutStub(callback, delay, ...params) {
                if (response.timeout) callback(...params);
            });
    });

    beforeEach(function () {
        response = {
            body: data,
            config: {
                status: 200,
                headers: {
                    'Set-Cookie': '_web_session_3_=foobar',
                    'X-Logged-In': true,
                },
            },
            success: true,
            timeout: false,
        };
    });

    afterEach(resetSpies);
    after(restoreSpies);

    describe('Request', function () {
        describe('aliases', function () {
            it('should behave the same as send', async function () {
                const config = { params: { foo: 'bar' } };

                await comms.delete(url, config);
                const deleteReq = spies.fetch.getCall(0).args[0];
                expect(deleteReq.method, `.delete's METHOD`).to.equal('DELETE');
                expect(deleteReq.url, `.delete's URL`).to.include(`${url}?foo=bar`);

                await comms.get(url, config);
                const getReq = spies.fetch.getCall(1).args[0];
                expect(getReq.method, `.get's METHOD`).to.equal('GET');
                expect(getReq.url, `.get's URL`).to.include(`${url}?foo=bar`);

                await comms.patch(url, config);
                const patchReq = spies.fetch.getCall(2).args[0];
                expect(patchReq.method, `.patch's METHOD`).to.equal('PATCH');
                expect(patchReq.url, `.patch's URL`).to.include(`${url}?foo=bar`);

                await comms.post(url, config);
                const postReq = spies.fetch.getCall(3).args[0];
                expect(postReq.method, `.post's METHOD`).to.equal('POST');
                expect(postReq.url, `.post's URL`).to.include(`${url}?foo=bar`);

                await comms.put(url, config);
                const putReq = spies.fetch.getCall(4).args[0];
                expect(putReq.method, `.put's METHOD`).to.equal('PUT');
                expect(putReq.url, `.put's URL`).to.include(`${url}?foo=bar`);
            });
        });

        describe('methods', function () {
            describe('DELETE', function () {
                it('should set appropriate config for the request', async function () {
                    await comms.send({
                        data,
                        endpoint: url,
                        method: 'DELETE',
                        params: { foo: 'bar' },
                    });

                    const [{
                        // cache,
                        credentials,
                        method,
                        mode,
                        url: reqUrl,
                    }] = spies.fetch.getCall(0).args;

                    // expect(cache, 'cache').to.equal('default'); // missing for some reason
                    expect(credentials, 'credentials').to.equal('include');
                    // cookies are not testable
                    expect(method, 'method').to.equal('DELETE');
                    expect(mode, 'mode').to.equal('cors');
                    expect(reqUrl, 'params').to.include('?foo=bar');
                    expect(reqUrl, 'url').to.include(url);
                });
            });

            describe('GET', function () {
                it('should set appropriate config for the request', async function () {
                    await comms.send({
                        endpoint: url,
                        method: 'GET',
                        params: { foo: 'bar' },
                    });

                    const [{
                        // cache,
                        credentials,
                        method,
                        mode,
                        url: reqUrl,
                    }] = spies.fetch.getCall(0).args;

                    // expect(cache, 'cache').to.equal('default'); // missing for some reason
                    expect(credentials, 'credentials').to.equal('include');
                    // cookies are not testable
                    expect(method, 'method').to.equal('GET');
                    expect(mode, 'mode').to.equal('cors');
                    expect(reqUrl, 'params').to.include('?foo=bar');
                    expect(reqUrl, 'url').to.include(url);
                });

                context('when data is supplied', function () {
                    it('should throw a warning and discard the data', async function () {
                        await comms.send({
                            data,
                            endpoint: url,
                            method: 'GET',
                        });

                        expect(spies.loggerWarn.called, 'logger called').to.be.true;
                        expect(spies.loggerWarn.getCall(0).args[0], 'logger message')
                            .to.include('GET');

                        const [ req ] = spies.fetch.getCall(0).args;

                        let didThrow = false;
                        try {
                            await req.json()
                        } catch (err) {
                            didThrow = true;
                        }
                        expect(didThrow).to.be.true;
                        // cannot get expect(fn).to.throw() to work 😡
                    });
                });
            });

            describe('PATCH', function () {
                it('should set appropriate config for the request', async function () {
                    await comms.send({
                        data,
                        endpoint: url,
                        method: 'PATCH',
                        params: { foo: 'bar' },
                    });

                    const [{
                        // cache,
                        credentials,
                        method,
                        mode,
                        url: reqUrl,
                    }] = spies.fetch.getCall(0).args;

                    // expect(cache, 'cache').to.equal('default'); // missing for some reason
                    expect(credentials, 'credentials').to.equal('include');
                    // cookies are not testable
                    expect(method, 'method').to.equal('PATCH');
                    expect(mode, 'mode').to.equal('cors');
                    expect(reqUrl, 'params').to.include('?foo=bar');
                    expect(reqUrl, 'url').to.include(url);
                });
            });

            describe('POST', function () {
                it('should set appropriate config for the request', async function () {
                    const reqConfig = {
                        data,
                        format: 'JSON',
                        endpoint: url,
                        method: 'POST',
                        params: { foo: 'bar' },
                    };
                    await comms.send(reqConfig);

                    const [ req ] = spies.fetch.getCall(0).args;

                    expect(await req.json(), 'body').to.eql(reqConfig.data);
                    // expect(req.cache, 'cache').to.equal('default'); // missing for some reason
                    expect(req.credentials, 'credentials').to.equal('include');
                    // cookies are not accessible/testable
                    expect(req.method, 'method').to.equal('POST');
                    expect(req.mode, 'mode').to.equal('cors');
                    expect(req.url, 'params').to.include('?foo=bar');
                    expect(req.url, 'url').to.include(url);
                });
            });

            describe('PUT', function () {
                it('should set appropriate config for the request', async function () {
                    await comms.send({
                        data,
                        endpoint: url,
                        method: 'PUT',
                        params: { foo: 'bar' },
                    });

                    const [{
                        // cache,
                        credentials,
                        method,
                        mode,
                        url: reqUrl,
                    }] = spies.fetch.getCall(0).args;

                    // expect(cache, 'cache').to.equal('default'); // missing for some reason
                    expect(credentials, 'credentials').to.equal('include');
                    // cookies are not testable
                    expect(method, 'method').to.equal('PUT');
                    expect(mode, 'mode').to.equal('cors');
                    expect(reqUrl, 'params').to.include('?foo=bar');
                    expect(reqUrl, 'url').to.include(url);
                });
            });

            context('when an unsupport type of data is supplied', function () {
                before(function () {
                    spies.consoleErr = sinon.stub(console, 'error');
                });
                after(function () {
                    spies.consoleErr.restore();
                    delete spies.consoleErr;
                });

                context('and data is allowed', function () {
                    it('should throw', async function () {
                        let reqErr;
                        try {
                            reqErr = await comms.send({
                                data: new Map(),
                                endpoint: url,
                                method: 'POST',
                            });
                        } catch (err) {
                            reqErr = err;
                        }

                        // this should use a spy on RequestError
                        // but sinon doesn't work on Constructors
                        expect(reqErr.constructor, 'is RequestError')
                            .to.be.instanceof(RequestError.constructor);
                        expect(reqErr.error, 'error contains type and allowed types')
                            .to.include(...acceptableBodyTypes)
                            .and.to.include('map');
                        expect(reqErr.status, 'status').to.equal(0);
                        expect(reqErr.url, 'url').to.equal(url);
                    });
                });
                context('and data is NOT allowed', function () {
                    it('should NOT throw', async function () {
                        const rspGET = await comms.send({
                            data: new Map(),
                            endpoint: url,
                            method: 'GET',
                        });
                        const rspHead = await comms.send({
                            data: new Map(),
                            endpoint: url,
                            method: 'HEAD',
                        });

                        expect(rspGET instanceof RequestError, 'GET').to.be.false;
                        expect(rspHead instanceof RequestError, 'HEAD').to.be.false;
                    });
                });
            });
        });

        context('when the request cannot be made', function () {
            before(function () {
                spies.consoleErr = sinon.stub(console, 'error');
            });
            after(function () {
                spies.consoleErr.restore();
                delete spies.consoleErr;
            });

            it('should notify the caller', function () {
                response.success = false;

                return comms.send({
                    method: 'GET',
                    url: 'https://www.example.com', // intentional protocol violation
                }).catch(function (err) {
                    expect(err.constructor instanceof TypeError.constructor).to.be.true;
                });
            });
        });

        context('when client-side', function clientSideCases() {
        });

        context.skip('when server-side', function serverSideCases() {
            before(function () {
                if (
                    typeof process === 'object'
                    && process + '' === '[object process]'
                ) this.skip();
            });

            const ssrReqConfig = {
                endpoint: url,
                method: 'GET',
                sessionId: 123,
            };

            before(function () {
                helpers.isRenderingOnServer = true;
                spies.getSSRCookies = sinon.stub(app, 'getSSRCookies')
                    .callsFake(function (val = 'foobar') {
                        return `_web_session_3_=${val}`;
                    });
            });
            after(function () {
                helpers.isRenderingOnServer = true;
            });

            it('should set appropriate config for the request', async function () {
                await comms.send(ssrReqConfig);

                const [{
                    headers,
                }] = spies.fetch.getCall(0).args;

                expect(headers.get('cookie'), 'cookie').to.equal('_web_session_3_=foobar');
            });
        });
    });

    describe('Response', function () {
        it.skip('should check auth state', async function () {
            await comms.send({
                data,
                endpoint: url,
                method: 'GET',
                params: { foo: 'bar' },
            });

            const [{
                cache,
                credentials,
                method,
                mode,
                url: reqUrl,
            }] = spies.fetch.getCall(0).args;

            // expect(cache, 'cache').to.equal('default'); // missing for some reason
            expect(credentials, 'credentials').to.equal('include');
            // cookies are not testable
            expect(method, 'method').to.equal('DELETE');
            expect(mode, 'mode').to.equal('cors');
            expect(reqUrl, 'params').to.include('?foo=bar');
            expect(reqUrl, 'url').to.include(url);
        });

        context('when the response is "good"', function () {
            it('should resolve with the response body', async function () {
                const rsp = await comms.send({
                    endpoint: url,
                    method: 'GET',
                });

                expect(rsp).to.eql(response.body);
            });

            it('should normalise an empty body', async function () {
                response.body = undefined;

                const rsp = await comms.send({
                    endpoint: url,
                    method: 'GET',
                });

                expect(rsp).to.eql({});
            });
        });

        describe('errors', function () {
            before(function () {
                spies.consoleErr = sinon.stub(console, 'error');
            });
            after(function () {
                spies.consoleErr.restore();
                delete spies.consoleErr;
            });

            context('when the response is "bad"', function () {
                it('should detect "bad" status', function () {
                    response.body = {
                        errors: [{ type: 'error', id: 456 }],
                    };
                    response.config.status = 500;

                    return comms.send({
                        data,
                        endpoint: url,
                        method: 'GET',
                    }).catch(function (reqErr) {
                        const [{
                            url: reqUrl,
                        }] = spies.fetch.getCall(0).args;

                        expect(reqErr.constructor, 'return RequestError')
                            .to.be.an.instanceof(RequestError.constructor);
                        expect(reqErr.url, 'url').to.equal(reqUrl);
                        expect(reqErr.errors, 'errors').to.eql(response.body.errors);
                    });
                });

                it('should handle a "bad" status with no response body', function () {
                    response.body = undefined;
                    response.config.status = 500;

                    return comms.send({
                        data,
                        endpoint: url,
                        method: 'GET',
                    }).catch(function (reqErr) {
                        const [{
                            url: reqUrl,
                        }] = spies.fetch.getCall(0).args;

                        expect(reqErr.constructor).to.be.an.instanceof(RequestError.constructor);
                        expect(reqErr.url).to.equal(reqUrl);
                        expect(reqErr.error).to.be.ok;
                    });
                });
            });

            context('when the response times out', function () {
                it('should abort', async function () {
                    response.timeout = true;

                    return comms.send({
                        method: 'GET',
                        endpoint: url, // intentional protocol violation
                    }).catch(function (reqErr) {
                        expect(reqErr.constructor, 'is RequestError')
                            .to.be.an.instanceof(RequestError.constructor);
                        expect(reqErr.error, 'error message').to.be.ok;
                        expect(reqErr.status, 'status').to.equal(408);
                        expect(reqErr.url, 'url').to.includes(url);
                    });
                });
            });
        });

        context.skip('when server-side', function () {
            it('should record session cookie to pass along to client', async function () {
                const setSSRCookie = sinon.spy(app, 'setSSRCookie');

                await comms.send(ssrReqConfig);

                const [
                    sessionId,
                    value,
                ] = spies.setSSRCookie.getCall(0).args;
                expect(spies.setSSRCookie.calledWith(
                    ssrReqConfig.sessionId,
                    '_web_session_3_=foobar'
                )).to.be.true;
                setSSRCookie.restore();
            });
        });
    });
});
