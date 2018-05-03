import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import Beacon from './index';

describe('Beacon', () => {
    const clickHandlerSpy = sinon.spy();
    const updateStepSpy = sinon.spy();

    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Beacon, {
            defaultProps: {
                children: [
                    'give'
                ],
                direction: 'left',
                onClick: clickHandlerSpy,
            },
            context: {
                updateStep: updateStepSpy,
            },
        })(props, rendererType);
    };

    it('should call the supplied click handler in addition to its static handler', () => {
        const beacon = getComponent();
        const instance = beacon.instance();

        instance.handleClick();

        expect(clickHandlerSpy).to.have.been.called;
        expect(updateStepSpy).to.have.been.called;
    });
});
