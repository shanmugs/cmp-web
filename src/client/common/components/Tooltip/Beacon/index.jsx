import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

class Beacon extends BaseComponent {
    handleClick(e) {
        this.props.onClick && this.props.onClick(e);

        this.context.updateStep(this.props.direction);
    }

    render() {
        const props = this.props;

        // NOTE: {...props} must be first so className & onClick props will be overridden
        return (
            <button
                {...props}
                className={`${props.className} p-tooltip__beacon`}
                onClick={this.handleClick}
                type="button"
            >
                {props.children}
            </button>
        );
    }

}

const {
    arrayOf,
    element,
    func,
    oneOfType,
    string,
} = PropTypes;


Beacon.contextTypes = {
    updateStep: func,
};

Beacon.defaultProps = {
    onClick: _.noop,
    direction: 'next',
};

Beacon.defaultProps = {
    direction: 'next',
};

Beacon.propTypes = {
    className: string,
    children: oneOfType([
        arrayOf(element),
        string,
    ]),
    direction: string,
    onClick: func,
};

export default Beacon;
