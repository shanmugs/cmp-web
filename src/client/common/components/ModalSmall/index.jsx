// ModalSmall Component
// ===
//
// A small modal component with built-in close button.
// A passed onClose method will be fired when the close button is clicked


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import Icon from 'client/common/components/Icon';

// Component Styles
// ---
import './modal-small.scss';


// Messages
// ---
// define all messages to be translated in the component.
// Actually translate them with this.props.formatMessage(this.messageName)
// This translation isn't in the lang files by default, run a 'npm run i18n:sync' to add the
// string to the lang files
const messageList = defineMessages({
    close: {
        id: 'common.close',
        description: 'foo',
        defaultMessage: 'Close',
    },
});

class ModalSmall extends BaseComponent {
    closeModal() {
        this.props.onClose();
    }

    CloseButton(props) {
        return (
            <button className="c-modal-small__close" onClick={props.onClick}>
                <Icon glyph="closeBaby" size="sm" />
                <span className="u-visually-hidden">
                    {props.intl.formatMessage(messageList.close)}
                </span>
            </button>
        );
    }

    render() {
        const CloseButton = this.CloseButton;
        const props = this.props;

        const containerClass = classNames(
            'c-modal-small__container',
            props.className
        );

        // Conditionally renders close button if onClose prop is provided
        return (
            <div className={containerClass}>
                <section className="c-modal-small">
                    {props.onClose &&
                        <CloseButton {...props} onClick={this.closeModal} />
                    }
                    {props.children}
                </section>
            </div>
        );
    }
}

ModalSmall.defaultProps = {
    onClose: null,
};

// Explicitly state they type of properties you expect here
ModalSmall.propTypes = {
    onClose: PropTypes.func,
    className: PropTypes.string,
    intl: intlShape.isRequired,
    children: PropTypes.element,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(ModalSmall);
