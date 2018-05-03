import { expect } from 'chai';
import sinon from 'sinon';

import * as routes from 'client/routes';

import isGeminiRoute from './isGeminiRoute';

describe('isGeminiRoute', function() {
    const sandbox = sinon.sandbox.create();

    before(function() {
        sandbox.stub(routes, 'routes').value([
            {
                path: '/',
                childRoutes: [
                    {
                        path: 'is',
                    },
                    {
                        path: 'a',
                        childRoutes: [
                            {
                                path: 'route',
                            }
                        ],
                    },
                    {
                        path: 'zed/:id',
                    },
                ],
            },
        ]);
    });

    after(function() {
        sandbox.restore();
    });

    context('when route IS whitelisted', function() {
        it('nested routes should return true', function() {
            expect(isGeminiRoute('/')).to.be.true;
            expect(isGeminiRoute('/is')).to.be.true;
            expect(isGeminiRoute('/a')).to.be.true;
            expect(isGeminiRoute('/a/route')).to.be.true;
        });

        context('and the route template contains parameter(s)', function() {
            it('"/zed/123" should still return true', function() {
                expect(isGeminiRoute('/zed/123')).to.be.true;
            });
        });
    });

    context('when route is NOT whitelisted', function() {
        it('should return false', function() {
            expect(isGeminiRoute('/is/not')).to.be.false;
            expect(isGeminiRoute('/is/not/a')).to.be.false;
            expect(isGeminiRoute('/is/not/a/route')).to.be.false;
            expect(isGeminiRoute('/zed/123/not')).to.be.false;
        });
    });
});
