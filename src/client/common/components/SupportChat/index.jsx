import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import browser from 'client/common/helpers/browser';

const handleBeaconClick = (event) => {
    event.preventDefault();

    if (
        browser.window.SnapEngage
        && browser.window.SnapEngage.startLink
    ) {
        browser.window.SnapEngage.startLink();
    }
};

const SupportChat = ({ children: beacon }) => (
    <React.Fragment>
        <Helmet>
            <script
                async
                key="snapengage"
                src="//storage.googleapis.com/code.snapengage.com/js/226282b3-07f1-4cad-848b-67af2c3c9f7d.js"
            />
        </Helmet>
        {React.cloneElement(beacon, {
            onClick: handleBeaconClick,
        })}
    </React.Fragment>
);
SupportChat.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SupportChat;
