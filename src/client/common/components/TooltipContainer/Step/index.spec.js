import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import Step from './index';
import Fireworks from 'client/common/components/Fireworks';
import Tooltip from 'client/common/components/Tooltip';

describe('Step', () => {
    const updateStepSpy = sinon.spy();
    const handleCloseSpy = sinon.spy();

    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Step, {
            defaultProps: {
                children: [
                    <p key="1">Other stuff that's not related to tooltip.</p>,
                ],
                fireworksPosition: 'around',
                onClose() {},
                order: 1,
                tooltipOptions: {
                    children: [
                        <p>Tooltip content</p>,
                    ],
                    icon: 'foo',
                    tooltipPosition: 'left'
                },
            },
            context: {
                activeStep: 1,
                updateStep: updateStepSpy,
                handleClose: handleCloseSpy,
            },
            withIntl: true,
        })(props, rendererType);
    };

    afterEach( () => {
        updateStepSpy.resetHistory();
        handleCloseSpy.resetHistory()
    });

    it('should render tooltip and Fireworks when its order value matches the active step', () => {
        const tooltipStep = getComponent();

        expect(tooltipStep.find(Fireworks).length).to.deep.equal(1);
        expect(tooltipStep.find(Tooltip).length).to.deep.equal(1);
    });

    it('should not render tooltip and Fireworks when its order value does NOT matches the active step', () => {
        const tooltipStep = getComponent({ order: 2 });

        expect(tooltipStep.find(Fireworks).length).to.deep.equal(0);
        expect(tooltipStep.find(Tooltip).length).to.deep.equal(0);
    });

    it('should combine the tooltipOptions.onClose cb with the context.handleClose method and passes it to the Tooltip', () => {
        const spy = sinon.spy();
        const wrapper = getComponent({
            tooltipOptions: {
                onClose: spy,
            },
        });

        wrapper.find(Tooltip).prop('onClose')();

        expect(handleCloseSpy).to.have.been.called;
        expect(spy).to.have.been.called;
    });

    it('should pass context.handleClose cb to tooltip if no tooltipOptions.onClose provided', () => {
        const wrapper = getComponent();

        wrapper.find(Tooltip).prop('onClose')();

        expect(handleCloseSpy).to.have.been.called;
    });
});
