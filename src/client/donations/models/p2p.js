import server from 'client/common/communications';

const fetchP2p = (token, params = {}) => {
    if (!token) return Promise.reject('A p2p token is required');
    return server
        .get(
            `/claim/p2p/${token}`,
            {params},
        )
        .then((data = {}) => data)
        .catch((err) => {
            throw err || { message: 'Unknown Error' };
        });
};

export default {
    fetchP2p,
};
