import React from 'react';
import _ from 'lodash';


const PrettyProps = (props) => {
    let output = '{';

    _.forEach(props, (val, key) => {
        output += `\n    ${key}: `;

        if (key === 'messages') {
            output += '{ ...MANY... }';
        } else if (_.isFunction(val)) {
            output += `${val.name}()`;
        } else if (_.isString(val)) {
            output += `"${val}"`;
        } else if (_.isArray(val)) {
            output += `[ ${val.join(', ')} ]`;
        } else if (key === 'params') {
            output += JSON.stringify(val);
        } else if (_.isPlainObject(val)) {
            output += `{ ${_.keys(val).join(', ')} }`;
        } else {
            output += _.toString(val);
        }
    });

    output += '\n}';

    return (
        <pre style={{ fontSize: '0.8em' }}>
            <strong>props: </strong>
            {output}
        </pre>
    );
};

export default PrettyProps;
