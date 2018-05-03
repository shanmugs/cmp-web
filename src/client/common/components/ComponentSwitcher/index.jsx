// ComponentSwitcher takes an array of instantiated React Components / elements And provides
// navigation methods so the components can implement switching to each other.

// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';


class ComponentSwitcher extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            componentIdx: this.props.defaultIdx,
        };
    }

    switchComponent(idx) {
        this.setState({ componentIdx: idx });
    }

    render() {
        const { components } = this.props;
        const { componentIdx } = this.state;

        const component = components[componentIdx];
        const componentWithMethod = React.cloneElement(
            component,
            { switchComponent: this.switchComponent }
        );

        return componentWithMethod;
    }
}

ComponentSwitcher.defaultProps = {
    defaultIdx: 0,
    components: [],
};

ComponentSwitcher.propTypes = {
    defaultIdx: PropTypes.number,
    components: PropTypes.arrayOf(PropTypes.element),
};

export default ComponentSwitcher;
