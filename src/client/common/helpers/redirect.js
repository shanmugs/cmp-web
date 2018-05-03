/* eslint-disable consistent-return, no-undef */
const redirect = (
    path,
    _blank,
) => {
    if (!path) return;

    if (typeof window !== 'undefined') {
        if (_blank) {
            return window.open(path);
        }

        // TODO: This will break the SPA because does not use the router; is that the intent?
        window.location = path;
    }
};
/* eslint-enable consistent-return */

export default redirect;
