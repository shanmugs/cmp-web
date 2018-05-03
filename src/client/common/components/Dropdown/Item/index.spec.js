import React from 'react';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import Item from './index';
describe('Item', () => {
    const openDropdownSpy = sinon.spy();
    const closeDropdownsSpy = sinon.spy();
    const clickHandlerSpy = sinon.spy();
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(Item, {
            defaultProps: {
                children: Item,
                index: 1,
                dert: 'test',
                trigger: <span>Dropdown 1</span>,
            },
            context: {
                openNavIndex: null,
                openDropdown: openDropdownSpy,
                closeDropdowns: closeDropdownsSpy,
                clickHandler: clickHandlerSpy,
            }
        })(props, rendererType);
    };

    afterEach(() => {
        openDropdownSpy.resetHistory();
        closeDropdownsSpy.resetHistory();
        clickHandlerSpy.resetHistory();
    });

    it('updates p--open class in sync with state.isOpen', (done) => {
        const wrapper = getComponent();
        expect(wrapper.state('isOpen')).to.deep.equal(false);
        expect(wrapper.hasClass('p--open')).to.deep.equal(false);

        wrapper.setState({ isOpen: true }, () => {
            expect(wrapper.update().hasClass('p--open')).to.deep.equal(true);
            done();
        });
    });

    describe('toggleOpen', () => {
        it('calls context.closeDropdown when state.isOpen is TRUE', () => {
            const wrapper = getComponent();
            const instance = wrapper.instance();
            wrapper.setState({ isOpen: true });
            instance.toggleOpen();
            expect(closeDropdownsSpy).to.have.been.called;
        });

        it('calls context.openDropdown when state.isOpen is FALSE', () => {
            const instance = getComponent().instance();
            instance.toggleOpen();
            expect(openDropdownSpy).to.have.been.called;

        });

        it('calls context.openDropdown with the index prop', () => {
            const wrapper = getComponent({ index: 4 });
            const instance = wrapper.instance();
            instance.toggleOpen();
            expect(openDropdownSpy).to.have.been.calledWith(4);

        });
    });

    it('setting context.openNavIndex to the value of props.index will update state.isOpen to TRUE', () => {
        const wrapper = getComponent({ index: 2 });
        wrapper.setContext({ openNavIndex: 2 })

        expect(wrapper.state('isOpen')).to.deep.equal(true);
    });

    it('when context.openNavIndex is not the value of props.index will update state.isOpen to FALSE', () => {
        const wrapper = getComponent({ index: 2 });
        wrapper.setContext({ openNavIndex: 1 })
        expect(wrapper.state('isOpen')).to.deep.equal(false);

        wrapper.setContext({ openNavIndex: null })
        expect(wrapper.state('isOpen')).to.deep.equal(false);
    });

    describe('renders a trigger component', () => {
        it('with an onClick event that calls toggleOpen', () => {
            const Trigger = <div className="triggerClass">Trigger</div>;
            const wrapper = getComponent({ trigger: Trigger });
            const instance = wrapper.instance();

            const toggleOpenSpy = sinon.spy(instance, 'toggleOpen');

            const renderedTrigger = wrapper.find('.triggerClass');
            renderedTrigger.prop('onClick')();

            expect(toggleOpenSpy).to.have.been.called;
        });

        it('with an onClick event doesn\'t destroy existing onClick events', () => {
            const triggerSpy = sinon.spy();
            const Trigger = (
                <div
                    onClick={triggerSpy}
                    className="triggerClass"
                >
                    Trigger
                </div>
            );

            const wrapper = getComponent({ trigger: Trigger });
            const instance = wrapper.instance();

            const toggleOpenSpy = sinon.spy(instance, 'toggleOpen');

            const renderedTrigger = wrapper.find('.triggerClass');
            renderedTrigger.prop('onClick')();

            expect(triggerSpy).to.have.been.called;
            expect(toggleOpenSpy).to.have.been.called;
        });
    })
});
