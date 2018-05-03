// ChimpFeatures Component
// ===
//
// Responsively displays features and benefits of Chimp. Used on Community join and P2P invite
// landing pages.
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


// UI components
// ---
import { InnerWrapper } from 'client/common/components/Layout';
import FeatureCard from 'client/common/components/FeatureCard';


// Component Styles
// ---
import './chimp-features.scss';


// Messages
// ---
const messageList = defineMessages({
    whatsChimpHeading: {
        description: 'foo',
        defaultMessage: 'But what does Chimp actually do?',
        id: 'chimpFeatures.heading',
    },
    whatsChimpDescription: {
        description: 'foo',
        defaultMessage: 'Chimp empowers people to give to and fundraise' +
                        ' for charity. Give how you want, when you want to the causes' +
                        ' you care about.',
        id: 'chimpFeatures.description',
    },
    whatsChimpGive: {
        description: 'foo',
        defaultMessage: 'Give to any charity of your choice',
        id: 'chimpFeatures.give',
    },
    whatsChimpTaxReceipt: {
        description: 'foo',
        defaultMessage: 'Get instant tax receipts',
        id: 'chimpFeatures.taxReveipts',
    },
    whatsChimpAnonymous: {
        description: 'foo',
        defaultMessage: 'Donate anonymously when you want',
        id: 'chimpFeatures.anonymous',
    },
    whatsChimpFriends: {
        description: 'foo',
        defaultMessage: 'Send charitable gifts to friends',
        id: 'chimpFeatures.friends',
    },
});

const ChimpFeatures = (props) => {
    const { className } = props;
    const { formatMessage } = props.intl;

    const componentClass = classNames(
        'c-chimp-features',
        className
    );

    return (
        <div className={componentClass}>
            <InnerWrapper isSmall isPadded>
                <h2 className="u-fs-md u-text-align-center u-margin-bottom-md">
                    {formatMessage(messageList.whatsChimpHeading)}
                </h2>
                <p className="u-text-align-center u-margin-bottom-xlg">
                    {formatMessage(messageList.whatsChimpDescription)}
                </p>
            </InnerWrapper>
            <div className="c-chimp-features__wrapper">
                <FeatureCard
                    className="u-text-align-center"
                    description={formatMessage(messageList.whatsChimpGive)}
                    icon="charity"
                    iconSize="lg"
                />
                <FeatureCard
                    className="u-text-align-center"
                    description={formatMessage(messageList.whatsChimpTaxReceipt)}
                    icon="taxReceipt"
                    iconSize="lg"
                />

                <FeatureCard
                    className="u-text-align-center"
                    description={formatMessage(messageList.whatsChimpAnonymous)}
                    icon="individual"
                    iconSize="lg"
                />
                <FeatureCard
                    className="u-text-align-center"
                    description={formatMessage(messageList.whatsChimpFriends)}
                    icon="gift"
                    iconSize="lg"
                />
            </div>
        </div>
    );
};

ChimpFeatures.propTypes = {
    className: PropTypes.string,
    intl: intlShape.isRequired,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(ChimpFeatures);
