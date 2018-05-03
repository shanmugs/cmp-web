import { expect } from 'chai';
import sinon from 'sinon';

import * as helpers from 'client/common/helpers';
import { getState } from 'client/common/store';

import getEndpointDetails from './getEndpointDetails';

describe('getEndpointDetails', function () {
    const sandbox = sinon.sandbox.create();
    const v1Url = '/foo';
    const v2Url = '/version2'; // set in /config/testState.js
    const parserOutput = {
        isExternal: false,
        url: '',
    };
    const {
        apiBasePath,
        appHost,
    } = getState('/config/endpoints');

    before(function() {
        sandbox.stub(helpers, 'parseLocation').callsFake(function locationParserStub() {
            return parserOutput;
        });
        sandbox.stub(helpers, 'getDataSourceUrl').callsFake(function dataSourceUrlStub() {
            return appHost;
        });
    });
    after(function() {
        sandbox.restore();
    });

    context('when route is external', function() {
        before(function() {
            parserOutput.isExternal = true;
        });
        it('should immediately return the output of parseLocation', function() {
            const externalUrl = 'http://www.example.com/foo/bar';
            parserOutput.url = externalUrl;

            const details = getEndpointDetails(externalUrl);

            expect(details, 'keys').to.have.all.keys(
                'isExternal',
                'url',
            );
            expect(details.isExternal, 'isExternal').to.be.true;
            expect(details.url, 'url').to.equal(externalUrl);
        });
    });

    context('when route is v1', function() {
        beforeEach(function() {
            parserOutput.isExternal = false;
            parserOutput.url = v1Url;
        });

        it('should return the full set of details', function() {
            const details = getEndpointDetails(v1Url);

            expect(details, 'keys').to.have.all.keys(
                'isExternal',
                'segments',
                'url',
            );
            expect(details.segments, 'keys').to.have.all.keys(
                'apiBasePath',
                'apiVersion',
                'origin',
                'pathname',
            );
            expect(details.isExternal, 'isExternal').to.be.false;
            expect(details.url, 'url').to.equal(`${appHost}${apiBasePath}1${v1Url}`);
            expect(details.segments.apiBasePath, 'apiBasePath').to.equal(apiBasePath);
            expect(details.segments.apiVersion, 'apiVersion').to.equal(1);
            expect(details.segments.origin, 'origin').to.equal(appHost);
            expect(details.segments.pathname, 'pathname').to.equal(v1Url);
        });
    });

    context('when route is v2', function() {
        beforeEach(function() {
            parserOutput.isExternal = false;
            parserOutput.url = v2Url;
        });

        it('should return the full set of details', function() {
            const details = getEndpointDetails(v2Url);

            expect(details, 'keys').to.have.all.keys(
                'isExternal',
                'segments',
                'url',
            );
            expect(details.segments, 'keys').to.have.all.keys(
                'apiBasePath',
                'apiVersion',
                'origin',
                'pathname',
            );
            expect(details.isExternal, 'isExternal').to.be.false;
            expect(details.url, 'url').to.equal(`${appHost}${apiBasePath}2${v2Url}`);
            expect(details.segments.apiBasePath, 'apiBasePath').to.equal(apiBasePath);
            expect(details.segments.apiVersion, 'apiVersion').to.equal(2);
            expect(details.segments.origin, 'origin').to.equal(appHost);
            expect(details.segments.pathname, 'pathname').to.equal(v2Url);
        });
    });
});
