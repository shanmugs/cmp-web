import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import TooltipContainer from './index';
import Step from './Step';

describe('TooltipContainer', () => {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(TooltipContainer, {
            defaultProps: {
                children: [
                    <Step key={0} order={1}>
                        <div />
                    </Step>,
                    <Step key={1} order={2}>
                        <div />
                    </Step>,
                    <Step key={2} order={2}>
                        <div />
                    </Step>,
                    <Step key={3} order={3}>
                        <div />
                    </Step>
                ],
                isActive: true,
            },
        })(props, rendererType);
    };

    it('should render the 1st Step when Container\'s `isActive` is truthy', () => {
        const container = getComponent({});
        const instance = container.instance();

        const tooltipSteps = container.find(Step);

        expect(tooltipSteps.length).to.equal(4);

        expect(instance.state.activeStep).to.equal(1);
    });

    it('should update its Steps when StepBeacon is clicked: next', () => {
        const container = getComponent();
        const instance = container.instance();
        instance.updateStep();

        expect(container.state('activeStep')).to.equal(2);
    });

    it('should update its Steps when StepBeacon is clicked: previous', () => {
        const container = getComponent();
        const instance = container.instance();

        container.setState({ activeStep: 3 });

        instance.updateStep('previous');

        expect(container.state('activeStep')).to.equal(2);
    });

    it('should call the supplied callback with context', () => {
        const container = getComponent();
        const instance = container.instance();
        const cb = sinon.spy();

        instance.updateStep('previous', cb);

        expect(cb.getCall(0).thisValue).to.equal(instance);
    });

    it('should hide itself when deactivated', () => {
        const container = getComponent();
        const instance = container.instance();

        expect(container.state('isActive')).to.be.true;

        instance.handleClose();

        expect(container.state('isActive')).to.be.false;
        expect(container.state('activeStep')).to.be.null;
    });

    it('reactivating after mounting should set the activeStep to 1', () => {
        const container = getComponent({ isActive: false });
        container.setProps({ isActive: true });

        expect(container.state('activeStep')).to.deep.equal(1);
    });
});
