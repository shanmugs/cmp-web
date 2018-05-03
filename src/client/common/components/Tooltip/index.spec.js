import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import Tooltip from './';
import CloseBtn from 'client/common/components/CloseBtn';
import Icon from 'client/common/components/Icon';

import { inspect } from 'util';

describe('Tooltip', () => {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Tooltip, {
            defaultProps: {
                children: [
                    <p key="1">Enim distillery.</p>,
                ],
                icon: 'foo',
                onClose() {},
                position: 'left',
            },
            withIntl: true,
        })(props, rendererType);
    };
    const selectors = {
        closeBtn: CloseBtn,
        content: '.c-tooltip__content',
        icon: Icon,
    };

    it('should display its content when it exists', () => {
        const children = getComponent().children();

        expect(children.containsMatchingElement(selectors.closeBtn), 'close button').to.be.true;
        expect(children.filter(selectors.content).containsMatchingElement(<p>Enim distillery.</p>), 'content')
            .to.be.true;
        expect(children.containsMatchingElement(selectors.icon), 'icon').to.be.true;
    });

    it('should hide its close button when no callback is supplied', () => {
        const wrapper = getComponent({
            onClose: null,
            content: '.c-tooltip__content',
            icon: Icon,
        });

        expect(wrapper.children(selectors.closeBtn).exists(), 'close button').to.be.false;
        expect(wrapper.children(selectors.content).exists(), 'content').to.be.true;
        expect(wrapper.children(selectors.icon).exists(), 'icon').to.be.true;
    });
});
