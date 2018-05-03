// Checkbox Component
// ===
//
// Checkbox component that handles it's own state and provides lifecycle hooks
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

class Checkbox extends BaseComponent {
    constructor(props) {
        super();
        this.state = { checked: props.checked || false };
    }

    change() {
        const newCheckedState = !this.state.checked;
        const { changeCallback } = this.props;

        changeCallback(newCheckedState);
        this.setState({ checked: newCheckedState });
    }

    click(e) {
        // Clicks to the input element will automatically fire the onChange event.
        // this event prevents  double firing the change event, while ensuring clicks to the label
        // still update the component
        if (e.target !== this.refs.inputEl) {
            e.preventDefault();
            this.change(e);
        }
    }

    render() {
        const { name, id, className, label } = this.props;
        const { checked } = this.state;
        const change = this.change;
        const click = this.click;

        const labelClasses = classNames(
            'u-flex',
            'u-flex--items-center',
            className
        );

        const value = (checked) ? 'on' : false;

        return (
            <label onClick={click} className={labelClasses}>
                <input
                    ref="inputEl"
                    onChange={change}
                    id={id}
                    className="u-flex-none"
                    type="checkbox"
                    name={name}
                    checked={checked}
                    value={value}
                />
                <div>{label}</div>
            </label>
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
Checkbox.defaultProps = {
    changeCallback: () => {},
};

// Explicitly state they type of properties you expect here
Checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    changeCallback: PropTypes.func,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default Checkbox;
