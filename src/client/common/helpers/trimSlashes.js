import _ from 'lodash';

const rgxSlashStart = /^\//g;
const rgxSlashEnd = /\/$/g;

/**
 * Trim leading and trailing slashes in a string
 * @param  {String} path The string to trim
 * @return {String}      The trimmed string
 */
const trimSlashes = (path) => _.trim(path)
    .replace(rgxSlashStart, '')
    .replace(rgxSlashEnd, '');

export default trimSlashes;
