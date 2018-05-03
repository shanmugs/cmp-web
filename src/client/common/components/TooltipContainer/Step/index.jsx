import React from 'react';
import PropTypes from 'prop-types';

import Fireworks from 'client/common/components/Fireworks';
import Tooltip from 'client/common/components/Tooltip';

import '../tooltip-container.scss';

const Step = (props, context) => {
    const {
        children,
        fireworksPosition,
        order,
        tooltipOptions,
    } = props;

    // Trigger provided callback and the close method from the ancestor tooltip-container.
    const onTooltipClose = () => {
        tooltipOptions.onClose && tooltipOptions.onClose();

        context.handleClose();
    };

    const parts = context.activeStep === order
        ? [
            <Fireworks
                key={1}
                position={fireworksPosition}
            />,
            <Tooltip
                key={2}
                {...tooltipOptions}
                onClose={onTooltipClose}
            />,
        ]
        : null;

    return (
        <div
            className="p-tooltip-container__step"
        >
            {parts}
            {children}
        </div>
    );
};

const {
    arrayOf,
    element,
    func,
    number,
    oneOfType,
    shape,
    string,
} = PropTypes;

Step.contextTypes = {
    activeStep: number,
    handleClose: func,
    updateStep: func,
};

Step.propTypes = {
    children: oneOfType([
        arrayOf(element),
        element,
    ]),
    fireworksPosition: string,
    order: number,
    tooltipOptions: shape({
        children: oneOfType([
            arrayOf(element),
            element,
        ]),
        icon: string,
        tooltipPosition: string,
        onClose: func,
    }),
};

export default Step;
