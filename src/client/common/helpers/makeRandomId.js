import _ from 'lodash';

/**
 * @description Creates a string of 5 (default) random alpha-numeric characters (default)
 * @param  {Number} outputLength The number of characters of the ID.
 * @param  {String} charSeed A string containing all possible values in the ID.
 * @return {String} A string of N length.
 */
const makeRandomId = (
    outputLength = 5,
    charSeed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) => {
    const charSeedLength = charSeed.length;
    let id = '';

    while (outputLength--) { // eslint-disable-line no-param-reassign, no-plusplus
        id += charSeed[_.random(charSeedLength - 1)];
    }

    return id;
};

export default makeRandomId;
