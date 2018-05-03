// Modal Component
// ===
//
// Dumb container that has two slots for components, A header and Content.
// Content can be hidden with the hideContent Prop
// When implementing this, It needs to be wrapped in a Portal to pass in the closePortal() function2
// Example:
//        <Portal closeOnEsc closeOnOutsideClick openByClickOn={trigger} className="bonobo">
//            <Modal/>
//        </Portal>
//


// Vendor Components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';


// UI components
// ---
import Icon from 'client/common/components/Icon';
import { InnerWrapper } from 'client/common/components/Layout';


// Styles
// ---
import './modal.scss';


// Messages
// ---
const messageList = defineMessages({
    close: {
        id: 'common.close',
        description: 'foo',
        defaultMessage: 'Close',
    },
});


class Modal extends React.Component {
    // Set up all child components, to have access to the the closePortal function by accessing
    // the context object
    getChildContext() {
        return { closeModal: this.props.closePortal };
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'relative';
    }

    componentWillUnmount() {
        document.body.style.overflow = null;
        document.body.style.position = null;
    }

    render() {
        const {
            closePortal,
            hideContent,
            content,
            header,
            headerIsCentered,
            intl,
        } = this.props;
        const { formatMessage } = intl;

        const modalTitleClass = classNames(
            'c-modal__title',
            {
                'u-flex--justify-center': headerIsCentered,
            }
        );

        const modalContentClass = classNames(
            'c-modal__content',
            {
                'c--active': !hideContent,
                'c--hide': hideContent,
            }
        );

        let headerComponent = header;
        if (typeof header === 'string') {
            headerComponent = <h2 className="c-modal__title-string">{header}</h2>;
        }

        return (
            <section className="c-modal bonobo">
                <header
                    className="c-modal__header"
                >
                    <InnerWrapper className="c-modal__inner-wrapper">
                        <div className={modalTitleClass}>
                            {headerComponent}
                        </div>
                        <button
                            type="button"
                            onClick={closePortal}
                            className="c-modal__close"
                        >
                            <Icon glyph="close" />
                            <span className="u-visually-hidden">
                                {formatMessage(messageList.close)}
                            </span>
                        </button>
                    </InnerWrapper>
                </header>
                <div
                    className={modalContentClass}
                >
                    <InnerWrapper className="c-modal__inner-wrapper">
                        {content}
                    </InnerWrapper>
                </div>
            </section>
        );
    }
}

Modal.childContextTypes = {
    closeModal: PropTypes.func,
};

Modal.defaultProps = {
    hideContent: false,
    headerIsCentered: false,
};

Modal.propTypes = {
    closePortal: PropTypes.func,
    content: PropTypes.any.isRequired,
    header: PropTypes.any.isRequired,
    hideContent: PropTypes.bool,
    intl: intlShape.isRequired,
    headerIsCentered: PropTypes.bool,
};

export default injectIntl(Modal);
