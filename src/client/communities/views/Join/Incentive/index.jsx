// Incentive Component
// ===
//
// Displays a paragraph with an incentive amount for joining a Community/Company
//


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


// Messages
// ---
const messageList = defineMessages({
    incentiveCopy: {
        description: 'foo',
        defaultMessage: 'Join today and {name} will send you {value} charity dollars to give ' +
        'to the charities of your choice.',
        id: 'communityJoinContent.incentive',
    },
});

const Incentive = (props) => {
    const { className, value, intl, name } = props;
    const { formatMessage } = intl;
    const message = formatMessage(messageList.incentiveCopy, { name, value });

    const componentClass = classNames(
        'c-community-incentive',
        className,
    );

    return <p className={componentClass}>{message}</p>;
};

// Default Props are defined if no property with the same key is passed when instantiating this
// class
Incentive.defaultProps = {
    communityType: 'general',
};

// Explicitly state they type of Components you expect here
Incentive.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(Incentive);
