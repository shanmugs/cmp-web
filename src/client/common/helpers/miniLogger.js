/**
 * For when the main Logger would create a circular dependency
 */

const isRenderingOnServer = typeof window === 'undefined';

export default function log(enable, type, ...args) {
    if (enable) {
        // handle location-specific logging: browser vs server
        if (type === 'browser' && isRenderingOnServer) return;
        if (type === 'server' && !isRenderingOnServer) return;

        if (/(browser|sever)/.test(type)) type = 'info'; // eslint-disable-line no-param-reassign

        console[type](...args); // eslint-disable-line no-console
    }
};
