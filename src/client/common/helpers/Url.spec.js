import _ from 'lodash';
import { expect } from 'chai';

import { Url } from './Url';

const testUrl = 'http://test:Qwerty123!@www.example.com:3000/some/path?foo=bar#hello';

describe('Url', function() {
    let url1;

    beforeEach(function() {
        url1 = new Url(testUrl);
    });

    describe('properties',  function() {
        it('should have properties matching the native implementation', function() {
            expect(url1).to.include.all.keys([
                'hash',
                'href',
                'host',
                'hostname',
                'origin',
                'password',
                'pathname',
                'port',
                'protocol',
                'search',
                // 'searchParams', // ← not yet needed
                'username',
            ]);
        });

        describe('hash', function() {
            const newHash = '#test';

            it('should match the supplied value', function() {
                expect(url1.hash).to.equal('#hello');
            });

            it('should accept a valid value assignment', function() {
                url1.hash = newHash;

                expect(url1.hash).to.equal(newHash);
            });

            it('should reject an invalid value assignment', function() {
                const invalidHash = 111;
                const oldHash = url1.hash;
                url1.hash = invalidHash;

                expect(url1.hash).to.equal(oldHash);
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = testUrl.replace(url1.hash, newHash);
                    url1.hash = newHash;

                    expect(url1.href).to.equal(newHref);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.hash, newHash);
                    const url2 = new Url(testUrl);
                    url1.hash = newHash;

                    expect(url1.hash).to.equal(newHash);
                    expect(url2.hash).to.equal('#hello');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.hash).to.equal('#intro');
                });
            });
        });

        describe('href', function() {
            it('should match the supplied value', function() {
                expect(url1.href).to.equal(testUrl);
            });

            it('should be read-only', function() {
                const newHash = '#test';
                const newHref = testUrl.replace(url1.hash, newHash);
                const oldHref = url1.href;
                url1.href = newHref;

                expect(url1.href).to.equal(oldHref);
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHash = '#test';
                    const newHref = testUrl.replace(url1.hash, newHash);
                    const url2 = new Url(testUrl);
                    url1.hash = newHash;

                    expect(url1.href).to.equal(newHref);
                    expect(url2.href).to.equal(testUrl);
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    const href = 'http://test@localhost:3000/hello/world?qux=zed#intro';
                    url1 = new Url(href);

                    expect(url1.href).to.equal(href);
                });
            });
        });

        describe('host', function() {
            const newHost = 'www.chimp.net:4000';

            it('should match the supplied value', function() {
                expect(url1.host).to.equal('www.example.com:3000');
            });

            it('should accept a valid value assignment', function() {
                url1.host = newHost;

                expect(url1.host).to.equal(newHost);
            });

            it('should reject an invalid value assignment', function() {
                const invalidHost = '[]';
                const oldHost = url1.host;
                url1.host = invalidHost;

                expect(url1.host).to.equal(oldHost);
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = testUrl.replace(url1.host, newHost);
                    url1.host = newHost;

                    expect(url1.href).to.equal(newHref);
                });

                it('should update in origin', function() {
                    const newOrigin = url1.origin.replace(url1.host, newHost);
                    url1.host = newHost;

                    expect(url1.origin).to.equal(newOrigin);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const url2 = new Url(testUrl);
                    url1.host = newHost;

                    expect(url1.host).to.equal(newHost);
                    expect(url2.host).to.equal('www.example.com:3000');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.host).to.equal('localhost:3000');
                });
            });
        });

        describe('hostname', function() {
            const newHostname = 'test.chimp.net';

            it('should match the supplied value', function() {
                expect(url1.hostname).to.equal('www.example.com');
            });

            it('should accept a valid value assignment', function() {
                url1.hostname = newHostname;

                expect(url1.hostname).to.equal(newHostname);
            });

            it('should reject an invalid value assignment', function() {
                const invalidHostname = '[]';
                const oldHash = url1.hostname;
                url1.hostname = invalidHostname;

                expect(url1.hostname).to.equal(oldHash);
            });

            describe('derived properties', function() {
                it('should update in host', function() {
                    const newHost = url1.host.replace(url1.hostname, newHostname);
                    url1.hostname = newHostname;

                    expect(url1.host).to.equal(newHost);
                });

                it('should update in href', function() {
                    const newHref = testUrl.replace(url1.hostname, newHostname);
                    url1.hostname = newHostname;

                    expect(url1.href).to.equal(newHref);
                });

                it('should update in origin', function() {
                    const newOrigin = url1.origin.replace(url1.hostname, newHostname);
                    url1.hostname = newHostname;

                    expect(url1.origin).to.equal(newOrigin);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.hostname, newHostname);
                    const url2 = new Url(testUrl);
                    url1.hostname = newHostname;

                    expect(url1.hostname).to.equal(newHostname);
                    expect(url2.hostname).to.equal('www.example.com');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.hostname).to.equal('localhost');
                });
            });
        });

        describe('origin', function() {
            const newOrigin = 'https://test1:Asdfg123$@www.chimp.net:8080';

            it('should be read-only', function() {
                const oldOrigin = url1.origin;
                const newHref = testUrl.replace(url1.origin, newOrigin);

                expect(url1.origin).to.equal(oldOrigin);
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.origin).to.equal('http://localhost:3000');
                });
            });
        });

        describe('password', function() {
            const newPassword = 'Asdfg123$';

            it('should match the supplied value', function() {
                expect(url1.password).to.equal('Qwerty123!');
            });

            it('should accept a valid value assignment', function() {
                url1.password = newPassword;

                expect(url1.password).to.equal(newPassword);
            });

            it('should reject an invalid value assignment', function() {
                const invalidPassword = ' ';
                const oldPassword = url1.password;
                url1.password = invalidPassword;

                expect(url1.password).to.equal(oldPassword);
            });

            it('should reject without a username', function() {
                const url2 = new Url('http://www.example.com');
                url2.password = newPassword;

                expect(url2.password).to.equal('');
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = url1.href.replace(url1.password, newPassword);
                    url1.password = newPassword;

                    expect(url1.href).to.equal(newHref);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.password, newPassword);
                    const url2 = new Url(testUrl);
                    url1.password = newPassword;

                    expect(url1.password).to.equal(newPassword);
                    expect(url2.password).to.equal('Qwerty123!');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test:Qwerty123!@localhost:3000/hello/world');

                    expect(url1.password).to.equal('Qwerty123!');
                });
            });
        });

        describe('pathname', function() {
            const newPathname = '/else/where';

            it('should match the supplied value', function() {
                expect(url1.pathname).to.equal('/some/path');
            });

            it('should accept a valid value assignment', function() {
                url1.pathname = newPathname;

                expect(url1.pathname).to.equal(newPathname);
            });

            it('should reject an invalid value assignment', function() {
                const oldPathname = url1.pathname;
                const invalidPathname = '?';
                url1.pathname = invalidPathname;

                expect(url1.pathname).to.equal(oldPathname);
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = testUrl.replace(url1.pathname, newPathname);
                    url1.pathname = newPathname;

                    expect(url1.href).to.equal(newHref);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.pathname, newPathname);
                    const url2 = new Url(testUrl);
                    url1.pathname = newPathname;

                    expect(url1.pathname).to.equal(newPathname);
                    expect(url2.pathname).to.equal('/some/path');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.pathname).to.equal('/hello/world');
                });
            });
        });

        describe('port', function() {
            const newPort = 8080;

            it('should match the supplied value', function() {
                expect(url1.port).to.equal('3000');
            });

            it('should accept a valid value assignment', function() {
                url1.port = newPort;

                expect(url1.port).to.equal(''+newPort);
            });

            it('should reject an invalid value assignment', function() {
                const oldPort = url1.port;
                const invalidPort = 1;
                url1.port = invalidPort;

                expect(url1.port).to.equal(oldPort);
            });

            describe('derived properties', function() {
                it('should update in origin', function() {
                    const newOrigin = url1.origin.replace(url1.port, newPort);
                    url1.port = newPort;

                    expect(url1.origin).to.equal(newOrigin);
                });
            });

            context('when explicitly assigning a default value', function() {
                it('should ignore 80 for http', function() {
                    const http = new Url('http://example.com:80');

                    expect(http.port).to.equal('');
                });
                it('should ignore 443 for https', function() {
                    const https = new Url('https://example.com:443');

                    expect(https.port).to.equal('');
                });
                it('should ignore 21 for ftp', function() {
                    const ftp = new Url('ftp://example.com:21');

                    expect(ftp.port).to.equal('');
                });
                it('should ignore 990 for ftps', function() {
                    const ftps990 = new Url('ftps://example.com:990');

                    expect(ftps990.port).to.equal('');
                });
                it('should ignore 998 for ftps', function() {
                    const ftps998 = new Url('ftps://example.com:998');

                    expect(ftps998.port).to.equal('');
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.port, newPort);
                    const url2 = new Url(testUrl);
                    url1.port = newPort;

                    expect(url1.port).to.equal(''+newPort);
                    expect(url2.port).to.equal('3000');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.port).to.equal('3000');
                });
            });
        });

        describe('protocol', function() {
            const newProtocol = 'ftp:';

            it('should match the supplied value', function() {
                expect(url1.protocol).to.equal('http:');
            });

            it('should accept a valid value assignment', function() {
                url1.protocol = newProtocol;

                expect(url1.protocol).to.equal(newProtocol);
            });

            it('should reject an invalid value assignment', function() {
                const invalidProtocol = 111;
                const oldProtocol = url1.protocol;
                url1.protocol = invalidProtocol;

                expect(url1.protocol).to.equal(oldProtocol);
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = testUrl.replace(url1.protocol, newProtocol);
                    url1.protocol = newProtocol;

                    expect(url1.href).to.equal(newHref);
                });

                it('should update in origin', function() {
                    const newOrigin = url1.origin.replace(url1.protocol, newProtocol);
                    url1.protocol = newProtocol;

                    expect(url1.origin).to.equal(newOrigin);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newProtocol = 'ftp:';
                    const newHref = testUrl.replace(url1.protocol, newProtocol);
                    const url2 = new Url(testUrl);
                    url1.protocol = newProtocol;

                    expect(url1.protocol).to.equal(newProtocol);
                    expect(url2.protocol).to.equal('http:');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.protocol).to.equal('http:');
                });
            });
        });

        describe('search', function() {
            const newSearch = '?qux=zed';

            it('should match the supplied value', function() {
                expect(url1.search).to.equal('?foo=bar');
            });

            it('should accept a valid value assignment', function() {
                url1.search = newSearch;

                expect(url1.search).to.equal(newSearch);
            });

            it('should encode special characters', function() {
                url1.search = '?👍=👍';

                expect(url1.search).to.equal('?%F0%9F%91%8D=%F0%9F%91%8D');
            });

            it('should reject an invalid value assignment', function() {
                let invalidSearch = 111;
                const oldSearch = url1.search;
                url1.search = invalidSearch;

                expect(url1.search).to.equal(oldSearch);

                invalidSearch = '111';
                url1.search = invalidSearch;

                expect(url1.search).to.equal(oldSearch);
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = testUrl.replace(url1.search, newSearch);
                    url1.search = newSearch;

                    expect(url1.href).to.equal(newHref);
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.search, newSearch);
                    const url2 = new Url(testUrl);
                    url1.search = newSearch;

                    expect(url1.search).to.equal(newSearch);
                    expect(url2.search).to.equal('?foo=bar');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.search).to.equal('?qux=zed');
                });
            });
        });

        describe('username', function() {
            const newUsername = 'test1';

            it('should match the supplied value', function() {
                expect(url1.username).to.equal('test');
            });

            it('should accept a valid value assignment', function() {
                url1.username = newUsername;

                expect(url1.username).to.equal(newUsername);
            });

            it('should reject an invalid value assignment', function() {
                const invalidUsername = ' ';
                const oldHash = url1.username;
                url1.username = invalidUsername;

                expect(url1.username).to.equal(oldHash);
            });

            describe('derived properties', function() {
                it('should update in href', function() {
                    const newHref = url1.href.replace(url1.username, newUsername);
                    url1.username = newUsername;

                    expect(url1.href).to.equal(newHref);
                });
            });

            context('when no password', function() {
                const hrefNoPassword = testUrl.replace(':Qwerty123!', '');

                it('should still recognise the username', function() {
                    url1 = new Url(hrefNoPassword);

                    expect(url1.username).to.equal('test');
                });

                describe('derived properties', function() {
                    it('should match in href', function() {
                        url1 = new Url(hrefNoPassword);

                        expect(url1.href).to.equal(hrefNoPassword);
                    });
                });
            });

            context('multiple instances', function() {
                it('should not collide', function() {
                    const newHref = testUrl.replace(url1.username, newUsername);
                    const url2 = new Url(testUrl);
                    url1.username = newUsername;

                    expect(url1.username).to.equal(newUsername);
                    expect(url2.username).to.equal('test');
                });
            });

            context('localhost', function() {
                it('should match the supplied value', function() {
                    url1 = new Url('http://test@localhost:3000/hello/world?qux=zed#intro');

                    expect(url1.username).to.equal('test');
                });
            });
        });

        describe('Symbol', function() {
            // it actually is accessible if you try real hard: Object.getOwnPropertySymbols()
            it('should not be accessable from outside', function() {
                expect(url1.Symbol).to.be.undefined;
            });
        })
    });

    describe('methods', function() {
        describe('toJSON()', function() {
            it('should return an object of associated properties and values', function() {
                const actualValue = JSON.stringify(url1);
                const expectedValue = JSON.stringify({
                    hash: '#hello',
                    href: testUrl,
                    host: 'www.example.com:3000',
                    hostname: 'www.example.com',
                    origin: 'http://www.example.com:3000',
                    password: 'Qwerty123!',
                    pathname: '/some/path',
                    port: '3000',
                    protocol: 'http:',
                    search: '?foo=bar',
                    username: 'test',
                });

                expect(actualValue).to.eql(expectedValue);
            });
        });

        describe('toString()', function() {
            it('should return the full url as a string', function() {
                expect(url1.toString()).to.equal(testUrl);
            });
        });
    });
});
