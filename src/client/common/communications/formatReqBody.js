/**
 * Convert the provided data hash to the specified format.
 * @param  {Object} data Data hash to be converted
 * @param  {string} format The output format
 * @return {(mixed|undefined|Error)} `undefined` when called without passing `data`; `Error` when
 * an unsupported `format` is supplied; otherwise, the requested format.
 */
const formatReqBody = (data, format) => {
    if (!data) return;

    switch(format) {
        case 'JSON':
            return JSON.stringify(data);
        default:
            throw new Error(`Unsupported request body format: ${format}`);
    }
};

export default formatReqBody;
