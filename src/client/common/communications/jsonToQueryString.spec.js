import { expect } from 'chai';

import jsonToQueryString from './jsonToQueryString';

describe('jsonToQueryString', function () {
    it('should handle simple pairs', function() {
        expect( jsonToQueryString({q: 'red'}) ).to.equal('?q=red');
    });

    it('should handle multi-word keys and values', function() {
        expect( jsonToQueryString({'group by': 'red cross'}) ).to.equal('?groupBy=red+cross');
    });

    it('should handle special characters in values', function() {
        expect( jsonToQueryString({q: '👍'}) ).to.equal('?q=%F0%9F%91%8D');
    });

    it('should handle special array of values', function () {
        expect(jsonToQueryString({ q: ['a', 'b'] })).to.equal('?q=a,b');
    });
});
