import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import createComponentRenderer from 'client/utils/createComponentRenderer';

import {
    DropdownContainer,
    DropdownItem
} from './index';

xdescribe('DropdownContainer', () => {
    const Dropdownchildren = (
        <div>
            <DropdownItem
                index={1}
                trigger={<span className="test">Dropdown 1</span>}
            >
                Dropdown 1 content
            </DropdownItem>
            <DropdownItem
                index={3}
                trigger={<span>Dropdown 2</span>}
            >
                Dropdown 1 content
            </DropdownItem>
            <DropdownItem
                index={2}
                trigger={<span>Dropdown 3</span>}
            >
                Dropdown 1 content
            </DropdownItem>
        </div>
    );

    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(DropdownContainer, {
            defaultProps: {
                children: Dropdownchildren,
                element: 'div',
            },
        })(props, rendererType);
    };

    it('openNavIndex is null on mount', () => {
        const container = getComponent();

        expect(container.state().openNavIndex).to.be.null;
    });

    it('openDropdown should update the openNavIndex with the provided int', () => {
        const container = getComponent();
        const instance = container.instance();

        instance.openDropdown(1);
        expect(container.state().openNavIndex).to.equal(1);

        instance.openDropdown(2);
        expect(container.state().openNavIndex).to.equal(2);
    });

    it('closeDropdowns should update the openNavIndex to null', () => {
        const container = getComponent();
        const instance = container.instance();

        instance.openDropdown(1);
        expect(container.state().openNavIndex).to.equal(1);

        instance.closeDropdowns();
        expect(container.state().openNavIndex).to.be.null;
    });

    it('should render it\'s children', () => {
        const container = getComponent();

        expect(container.find(DropdownItem).length).to.equal(3);
    });

    it('has a configurable className', () => {
        const container = getComponent({ className: 'c-configurable' });

        expect(container.hasClass('c-configurable')).to.deep.equal(true);
    });

    it('attaches a the pageClick event to the window on click/touchEnd on mount', () => {
        const spy = sinon.spy(window, 'addEventListener');
        const instance = getComponent({}, 'full').instance();

        const events = {};
        const boundPageClick = instance.pageClick.bind(instance);

        for (var i = spy.callCount - 1; i >= 0; i--) {
            const call = spy.getCall(i);
            events[call.args[0]] = call.args[1];
        }

        expect(events.touchend.name).to.eql(boundPageClick.name);
        expect(events.click.name).to.eql(boundPageClick.name);
        window.addEventListener.restore();
    });

    it('removes the window pageClick events on unmount', () => {
        const spy = sinon.spy(window, 'removeEventListener');
        const wrapper = getComponent({}, 'full');
        const instance = wrapper.instance();
        wrapper.unmount();

        const events = {};
        const boundPageClick = instance.pageClick.bind(instance);

        for (var i = spy.callCount - 1; i >= 0; i--) {
            const call = spy.getCall(i);
            events[call.args[0]] = call.args[1];
        }

        expect(events.touchend.name).to.eql(boundPageClick.name);
        expect(events.click.name).to.eql(boundPageClick.name);
        window.removeEventListener.restore();
    });

    it('pageClick fires the closeDropdowns Method if clickIsOnComponent FALSE', () => {
        const instance = getComponent().instance();
        instance.clickIsOnComponent = false;
        const spy = sinon.spy(instance, 'closeDropdowns');
        instance.pageClick();

        expect(spy).to.have.been.called;
    });

    it('pageClick doesn\'t fires the closeDropdowns Method if clickIsOnComponent TRUE', () => {
        const instance = getComponent().instance();
        instance.clickIsOnComponent = true;
        const spy = sinon.spy(instance, 'closeDropdowns');
        instance.pageClick();

        expect(spy).to.not.have.been.called;
    });


});
