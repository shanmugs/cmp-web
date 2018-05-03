const _ = require('lodash');
const confippet = require('electrode-confippet');
const winston = require('winston');

const { config } = confippet;
const validLevels = [
    'debug',
    'info',
    'warn',
    'error',
];
const defaultLevel = 'error';

// Log level Defaults to ERROR and falls back to ERROR if a value is set that's not contained in
// validLevels
let level = _.get(config.storeConfig.logging, 'level');
level = (_.includes(validLevels, level)) ? level : defaultLevel;

const loggerConfig = winston.config;

const logger = new (winston.Logger)({
    transports: [new winston.transports.Console({
        formatter(options) {
            // Disable timestamp in production environments because it's sent to logEntries
            // which adds the timestamp automatically
            const timeStamp = (config.storeConfig.env === 'development') ? `${options.timestamp()} ` : '';
            return `${timeStamp} ` +
            `${loggerConfig.colorize(options.level, options.level.toUpperCase())} ` +
            `${(options.message ? options.message : '')} ` +
            `${(options.meta && Object.keys(options.meta).length ? `\n\t ${JSON.stringify(options.meta)}` : '')}`;
        },
        humanReadableUnhandledException: true,
        prettyPrint: true,
        timestamp() {
            return new Date().toUTCString();
        },
    })],
});

logger.info(`Logging all messages at ${loggerConfig.colorize(level, level.toUpperCase())} and above`);

logger.level = level;
module.exports = logger;
