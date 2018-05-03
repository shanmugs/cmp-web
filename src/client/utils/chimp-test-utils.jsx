import React from 'react';
import TestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';

const componentHasConfigurableClass = function(Component, requiredProps = {}) {
    const customClass = 'qa-custom-class';

    this.renderer = TestUtils.createRenderer();
    this.renderer.render(
        <Component {...requiredProps} />
    );

    const defaultClassDOM = this.renderer.getRenderOutput();
    expect(defaultClassDOM.props.className).toExclude(customClass);

    this.renderer.render(
        <Component {...requiredProps} className="qa-custom-class"/>
    );

    const customClassDOM = this.renderer.getRenderOutput();
    expect(customClassDOM.props.className).toInclude(customClass);
};

const rendersChildren = function(Component, requiredProps = {}) {
    // Strip out children if they're required props, we'll sub in our own
    const { children, ...rest } = requiredProps;

    this.renderer = TestUtils.createRenderer();
    expect(
        <Component {...rest} >
            <div><h3>Some Different Content</h3></div>
            <div><h3>More</h3></div>
            <div><h3>Last thing</h3></div>
        </Component>
    ).toIncludeJSX(
        <div><h3>Some Different Content</h3></div>
    ).toIncludeJSX(
        <div><h3>Last thing</h3></div>
    ).toIncludeJSX(
        <div><h3>Last thing</h3></div>
    );
};

const commonTests = {
    componentHasConfigurableClass,
    rendersChildren,
};

export { commonTests };
