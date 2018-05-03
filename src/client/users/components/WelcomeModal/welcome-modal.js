// WelcomeModal Component
// ===
//
// Implementation of the Welcome Modal
// Wraps the welcome modal content in the modal and applies events to the close
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import PropTypes from 'prop-types';

import React from 'react';
import _ from 'lodash';

// UI components
// ---
import ModalSmall from 'client/common/components/ModalSmall';
import Carousel from './Carousel';


// Component Styles
// ---
import './welcome-modal.scss';

const WelcomeModal = (props) => {
    const finishCb = () => {
        props.closeWelcomeModal();
        props.onFinish && props.onFinish();
    };

    const closeCb = () => {
        props.closeWelcomeModal();
        props.onClose && props.onClose();
    };

    return (
        <ModalSmall
            className="c-welcome-modal"
            onClose={closeCb}
        >
            <Carousel
                onFinish={finishCb}
                assetPath={props.assetPath}
            />
        </ModalSmall>
    );
};

const {
    func,
    string,
} = PropTypes;

WelcomeModal.defaultProps = {
    onClose: _.noop,
    onFinish: _.noop,
};

WelcomeModal.propTypes = {
    closeWelcomeModal: func.isRequired,
    assetPath: string.isRequired,
    onClose: func,
    onFinish: func,
};


export default WelcomeModal;