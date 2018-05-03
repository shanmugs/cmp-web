import _ from 'lodash';
import log from './miniLogger';

const segmentNames = [
    'protocol',
    'protocolDelimiter', // necessary evil
    'auth',
    'authDelimiter', // necessary evil
    'hostname',
    'portDelimiter', // necessary evil
    'port',
    'pathname',
    'search',
    'hash',
];
const excludeNames = [
    'authDelimiter',
    'portDelimiter',
    'protocolDelimiter',
];

const rgxUsername = /\S+/;
const rgxPassword = /\S+/;
const rgxSegments = {
    // https://gist.github.com/dperini/729294
    // Author: Diego Perini
    // Updated: 2010/12/05
    // License: MIT
    protocol: /^((?:https?|ftps?):)/,
    protocolDelimiter: /(\/\/)/,
    auth: new RegExp([
        '(',
            rgxUsername.source,
            '(?::',
            rgxPassword.source,
        ')?',
        '(?=@)',
        ')?',
    ].join('')),
    // auth: /(\S+(?::\S*)?(?=@))?/,
    authDelimiter: /(@)?/, // necessary evil
    host: new RegExp([
        '(',
            // IP address exclusion
            // private & local networks
            '(?!(?:10|127)(?:\\.\\d{1,3}){3})',
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})',
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})',
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])',
            '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}',
            '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))',
        '|',
            // host name
            '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)',
            // domain name
            '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*',
            // TLD identifier
            '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))?',
            // TLD may end with dot
            '\\.?',
        ')'
    ].join('')),
    portDelimiter: /(:)?/,
    port: /(\d{2,5})?/,
    pathname: /(\/{0,1}[^?#]*)/,
    search: /(\?[^#]*)?/,
    hash: /(#.*)?$/,
};
const rgxHostPort = new RegExp([
    rgxSegments.host.source,
    rgxSegments.portDelimiter.source,
    rgxSegments.port.source,
].join(''));

const rgxFullUrl = new RegExp([
    rgxSegments.protocol.source,
    rgxSegments.protocolDelimiter.source,
    rgxSegments.auth.source,
    rgxSegments.authDelimiter.source,
    rgxSegments.host.source,
    rgxSegments.portDelimiter.source,
    rgxSegments.port.source,
    rgxSegments.pathname.source,
    rgxSegments.search.source,
    rgxSegments.hash.source,
].join(''), 'i');

/**
 * The native implementation ignores explicit values that are the default
 * @param  {Number|String} port     The TCP port
 * @param  {String} protocol The TCP protocol to use: http(s) or ftp(s)
 * @return {String}          The value to be used. **NOTE** It is a string, not a number.
 */
function checkPort(port, protocol) {
    const isSecure = protocol.slice(-2)[0] === 's';
    const isHttp = (/https?/).test(protocol);
    let val = '' + port; // cast to string (native impl stores port as a string because reasons)

    switch (val) {
        case '21':
            if (!isHttp && !isSecure) val = '';
            break;
        case '80':
            if (isHttp && !isSecure) val = '';
            break;
        case '443':
            if (isHttp && isSecure) val = '';
            break;
        case '990': // intentional fall-through
        case '998':
            if (!isHttp && isSecure) val = '';
            break;
        default: break;
    }

    return val;
}

function escapeQueryString(pair) {
    const [k, val] = pair.split('=');
    const key = encodeURI(k);

    if (val) return `${key}=${encodeURI(val)}`;
    return key;
}

const segments = Symbol(); // makes it (mostly) inaccessable from outside
function Url(pathOrUrl, base) {
    let url = '';

    pathOrUrl = pathOrUrl.trim(); // eslint-disable-line no-param-reassign

    if (typeof pathOrUrl !== 'string') return log(
        true,
        'error',
        new TypeError(`Failed to construct 'URL': Invalid argument type: ${pathOrUrl}`)
    );

    if (base) {
        if (rgxSegments.protocol.test(base)) url = base + pathOrUrl;
        else return log(
            true,
            'error',
            new TypeError(`Failed to construct 'URL': Invalid URL pattern: ${base}`)
        );
    } else if (rgxSegments.protocol.test(pathOrUrl)) url = pathOrUrl;
    else return log(
        true,
        'error',
        new TypeError(`Failed to construct 'URL': Invalid URL pattern: ${pathOrUrl}`)
    );

    const allProps = _.zipObject(
        segmentNames,
        _.tail(url.match(rgxFullUrl))
    );

    _.each(allProps, (val, key) => allProps[key] = allProps[key] || ''); // avoid `undefined`s

    allProps.port = checkPort(allProps.port, allProps.protocol);

    Object.defineProperties(this, {
        [segments]: {
            enumerable: false,
            value: allProps,
        },
        hash: {
            enumerable: true,
            get() {
                return this[segments].hash;
            },
            set(val) {
                if (
                    typeof val === 'string'
                    && val.match(rgxSegments.hash)
                    // test() would always return true because this segment is optional
                ) {
                    return this[segments].hash = val;
                }
            },
        },
        href: {
            enumerable: true,
            get() {
                return _.reduce(segmentNames, (href, name) => href += this[segments][name], '');
            },
            set() {},
        },
        host: {
            enumerable: true,
            get() {
                return `${this.hostname}${this[segments].portDelimiter}${this.port}`;
            },
            set(val) {
                if (rgxSegments.host.test(val)) {
                    [
                        this.hostname,
                        this.port,
                    ] = _.at(val.match(rgxHostPort), [1,3]);

                    return this.host;
                }
            }
        },
        hostname: {
            enumerable: true,
            get() {
                return this[segments].hostname;
            },
            set(val) {
                if (rgxSegments.host.test(val)) {
                    return this[segments].hostname = val;
                }
            },
        },
        origin: {
            enumerable: true,
            get() {
                return `${this.protocol}//${this.host}`;
            },
            set() {},
        },
        password: {
            enumerable: true,
            get() {
                return this[segments].auth.split(':')[1] || '';
            },
            set(val) {
                if (this.username && rgxPassword.test(val)) {
                    const currentPassword = this.password;

                    return this[segments].auth = currentPassword
                        ? this[segments].auth.replace(currentPassword, val)
                        : val;
                }
            },
        },
        pathname: {
            enumerable: true,
            get() {
                return this[segments].pathname;
            },
            set(val) {
                if (
                    typeof val === 'string'
                    && val.match(rgxSegments.pathname)[0]
                    // test() would always return true because this segment is optional
                ) {
                    return this[segments].pathname = val;
                }
            },
        },
        port: {
            enumerable: true,
            get() {
                return this[segments].port;
            },
            set(val) {
                if (('' + val).match(rgxSegments.port)[0]) {
                    // test() would always return true because this segment is optional
                    const segs = this[segments];
                    const newPort = checkPort(val, segs.protocol);

                    segs.portDelimiter = newPort
                        ? ':'
                        : '';

                    return segs.port = newPort;
                }
            },
        },
        protocol: {
            enumerable: true,
            get() {
                return this[segments].protocol;
            },
            set(val) {
                if (rgxSegments.protocol.test(val)) {
                    return this[segments].protocol = val;
                }
            },
        },
        search: {
            enumerable: true,
            get() {
                return this[segments].search;
            },
            set(val) {
                if (
                    typeof val === 'string'
                    && val.match(rgxSegments.search)[0]
                    // test() would always return true because this segment is optional
                ) {
                    let newVal = val;
                    if (decodeURI(val) === val) // not encoded
                        newVal = '?' + _.map(val.slice(1).split('&'), escapeQueryString).join('&');
                    return this[segments].search = newVal;
                }
            },
        },
        username: {
            enumerable: true,
            get() {
                const { auth } = this[segments];
                if (auth) {
                    const [username] = auth.split(':');
                    return username || auth;
                }
                return '';
            },
            set(val) {
                if (rgxUsername.test(val)) {
                    const currentUsername = this.username;

                    return this[segments].auth = currentUsername
                        ? this[segments].auth.replace(currentUsername, val)
                        : val;
                }
            },
        },
    });
};

Object.defineProperties(Url.prototype, {
    toJSON: {
        value() {
            return _.omit(this);
        }
    },
    toString: {
        value() {
            return this.href;
        }
    },
});

const URL = URL || Url;

export {
    URL as default,
    Url, // ← for testability
};
