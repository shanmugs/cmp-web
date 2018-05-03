import React from 'react';
import PropTypes from 'prop-types';

import './phone-number.scss';


const {
    bool,
    oneOf,
    oneOfType,
    string,
} = PropTypes;

const formats = {
    'north-america': (num) => {
        const [
            ,
            country,
            area,
            exchange,
            subscriber,
        ] = num.match(/(\+\d)?(\d{3})(\d{3})(\d{4})/);
        const output = [];
        let i = 0;

        if (country) {
            output[0] = (<span className="phonenumber-country" key={i++}>{country}</span>);
        }

        output.push(...[
            <span className="phonenumber-area" key={i++}>{area}</span>,
            <span className="phonenumber-exchange" key={i++}>{exchange}</span>,
            <span className="phonenumber-subscriber" key={i++}>{subscriber}</span>,
        ]);

        return output;
    },
};

const PhoneNumber = ({
    className,
    isLink,
    number,
    region,
}) => {
/* eslint-disable react/jsx-closing-tag-location */
    const pieces = formats[region](`${number}`);
    const props = {
        className: 'phonenumber',
    };

    if (className) props.className += ` ${className}`;

    if (isLink) {
        return (
            <a
                href={`tel:${number}`}
                {...props}
            >{pieces}</a>
        );
    }

    return (
        <span {...props}>{pieces}</span>
    );
/* eslint-enable react/jsx-closing-tag-location */
};
PhoneNumber.defaultProps = {
    region: 'north-america',
};
PhoneNumber.propTypes = {
    className: string,
    isLink: bool,
    number: oneOfType([
        PropTypes.number,
        string,
    ]).isRequired,
    region: oneOf(Object.keys(formats)),
};

export default PhoneNumber;
