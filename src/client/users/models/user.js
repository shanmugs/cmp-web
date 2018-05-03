import server from 'client/common/communications';

const endpoints = {
    user: '/app',
    signUpPost: '/users',
};

const fetchAccountData = (params = {}, metadata) => {
    return server
        .get(
            endpoints.user,
            {
                params,
                ...metadata,
            }
        )
        .then((rsp) => {
            const data = rsp
                ? rsp.authentication
                : {};

            return data;
        })
        .catch((err) => {
            throw err || { message: 'Unknown Error' };
        });
};

export default {
    endpoints,
    fetchAccountData,
};
