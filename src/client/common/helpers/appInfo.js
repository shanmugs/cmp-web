// Keep info in separate file so can import into other helpers without circular import issues
import {
    getState,
} from 'client/common/store';

/**
 * Flag indicating if code is running on the server or the client
 * @type {boolean}
 */
// eslint-disable-next-line no-undef
const isRenderingOnServer = typeof window === 'undefined';

// @todo We no longer have a separte proxy app. Therefore,
// getDataSourceURL will always return chimpApiUrlOrigin, maybe we don't need this method? GIVEA-349
let dataSourceEndpoint = '';
const getDataSourceUrl = () => {
    if (dataSourceEndpoint) return dataSourceEndpoint;

    const CONFIG = getState('/config');
    return CONFIG.endpoints.chimpApiUrlOrigin;
};

export {
    isRenderingOnServer,
    getDataSourceUrl,
};
