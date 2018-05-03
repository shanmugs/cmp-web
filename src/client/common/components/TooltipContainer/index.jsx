import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

class TooltipContainer extends BaseComponent {
    constructor(props) {
        super();
        // Casting to int, activeStep should start at 1 when isActive is truthy, otherwise is 0
        this.state = {
            isActive: props.isActive,
            activeStep: +props.isActive,
        };
    }

    getChildContext() {
        return {
            activeStep: this.state.activeStep,
            handleClose: this.handleClose,
            updateStep: this.updateStep,
        };
    }

    componentWillReceiveProps(nextProps) {
        const currentState = this.state;
        const nextState = {
            isActive: nextProps.isActive,
        };

        // If we're moving from non-active to active, trigger the first step
        // Have to do this check otherwise recieving new props would always reset to 1
        if (!currentState.activeStep && nextProps.isActive) {
            nextState.activeStep = 1;
        }

        if (!nextProps.isActive) {
            /**
             * Allows the parent component to disable the active TooltipContainer and subsequently
             * all of its TooltipContainerStepes.
             */
            nextState.activeStep = null;
        }

        this.setState(nextState);
    }

    handleClose() {
        const newState = {
            isActive: false,
            activeStep: null,
        };

        this.setState(newState);
    }

    updateStep(direction = 'next', cb = () => {}) {
        const currentStep = this.state.activeStep;

        const nextStep = direction === 'next'
            ? currentStep + 1
            : currentStep - 1;

        cb.call(this);

        this.setState({ activeStep: nextStep });
    }

    render() {
        const containerClasses = classNames(
            'p-tooltip-container',
            {
                'is--active': this.state.isActive,
            }
        );

        return (
            <div
                className={containerClasses}
                onClick={this.handleClick}
            >
                {this.props.children}
            </div>
        );
    }
}

const {
    arrayOf,
    bool,
    element,
    func,
    number,
    oneOfType,
} = PropTypes;

TooltipContainer.childContextTypes = {
    /**
     * activeStep
     * The value of the currently active TooltipContainerStep.
     * **Note** Multiple TooltipContainerSteps can have the same step value.
     * Ex Below the middle two TooltipContainerSteps will be active at the same time.
     * ```
    <TooltipContainer>
        <TooltipContainerStep
            order={1}
            // ...
        />
        <TooltipContainerStep
            order={2}
            // ...
        />
        <TooltipContainerStep
            order={2}
            // ...
        />
        <TooltipContainerStep
            order={3}
            // ...
        />
    </TooltipContainer>
      ```
     */
    activeStep: number,
    handleClose: func,
    updateStep: func,
};

TooltipContainer.propTypes = {
    children: oneOfType([
        arrayOf(element),
        element,
    ]),
    isActive: bool,
};

export default TooltipContainer;
