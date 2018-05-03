/**
 * ErrorView Component displays a user-friendly error message
 * Accepts error codes of 403, 404, 500
 * Displays appropriate message based on error type, or simply custom children,
 * or a generic message if nothing is provided
 */


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';

// Utilities
// ---
// import logger from 'client/common/logger';


// Component Styles
// ---
import './error-view.scss';

import errorImage from 'client/common/images/chimp-bricked.png';

import ErrorMessage from './ErrorMessage';

import RequestError from 'client/common/communications/RequestError';


const ErrorView = (props) => {
    return (
        <div className={`c-error-view ${props.className}`}>
            <div className="c-error-view__wrapper">
                <img
                    src={`${errorImage}`}
                    alt="Chimp bricked"
                    className="c-error-view__img"
                />
                <div className="c-error-view__content">
                    {
                        <ErrorMessage {...props.error} />
                    }
                </div>
            </div>
        </div>
    );
};

const {
    string,
} = PropTypes;

ErrorView.propTypes = {
    assetPath: string,
    className: string,
    error: PropTypes.instanceOf(Error).isRequired // Is RequestError
};

ErrorView.defaultProps = {
    assetPath: '/assets',
    className: '',
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default ErrorView;
