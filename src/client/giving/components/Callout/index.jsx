import React from 'react';
import PropTypes from 'prop-types';
import {
    Header,
    Segment,
} from 'semantic-ui-react';
import _ from 'lodash';


const {
    bool,
    oneOf,
    string,
} = PropTypes;

const squareStyle = {
    height: 210,
    width: 210,
};

const Callout = ({
    children,
    emphasis,
    focus,
    heading,
    inverted,
}) => {
    let color = null;
    const classNames = [
        'gemini',
        'callout',
    ];

    switch (emphasis) {
    case 'negative':
        color = 'red';
        break;
    case 'primary':
        classNames.push('brand-primary');
        break;
    case 'positive':
        color = 'green';
        break;
    case 'secondary':
        classNames.push('brand-secondary');
        break;
    default:
        break;
    }

    return (
        <Segment
            circular
            className={classNames.join(' ')}
            color={color}
            inverted={inverted}
            size="small"
            style={squareStyle}
        >
            <Header
                as="h2"
                className="callout-heading"
                content={heading}
            />
            <div
                className="callout-focus"
            >
                {focus}
            </div>
            {children}
        </Segment>
    );
};
Callout.defaultProps = {
    inverted: false,
};
Callout.propTypes = {
    emphasis: oneOf([
        'negative',
        'primary',
        'positive',
        'secondary',
    ]),
    focus: string.isRequired,
    heading: string.isRequired,
    inverted: bool,
};

export default Callout;
