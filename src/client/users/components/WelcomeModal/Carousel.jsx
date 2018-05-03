// WelcomeModalCarousel Component
// ===
//
// Contents of the welcome modal with access to the closeModal method as a property
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
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
import Carousel from 'client/common/components/Carousel';
import FeatureCard from 'client/common/components/FeatureCard';


// Component Styles
// ---
import './welcome-modal.scss';


// Messages
// ---
const messageList = defineMessages({
    panel1Title: {
        id: 'welcome.title1',
        description: 'foo',
        defaultMessage: 'Welcome to your Chimp Account',
    },
    panel2Title: {
        id: 'welcome.title2',
        description: 'foo',
        defaultMessage: 'It makes giving easier',
    },
    panel3Title: {
        id: 'welcome.title3',
        description: 'foo',
        defaultMessage: 'So let\'s get started!',
    },
    welcomeCTANext: {
        id: 'welcome.ctaNext',
        description: 'foo',
        defaultMessage: 'Next',
    },
    welcomeCTAClose: {
        id: 'welcome.ctaClose',
        description: 'foo',
        defaultMessage: 'Start giving',
    },
    panel1Message: {
        id: 'welcome.message1',
        description: 'foo',
        defaultMessage: 'Chimp lets you give to charities, support your ' +
        'friends and family with charity dollars, and fundraise with others ' +
        'for any charity in Canada.',
    },
    panel2Message: {
        id: 'welcome.message2',
        description: 'foo',
        defaultMessage: 'Chimp automatically manages and organizes your ' +
        'giving activity, including tax receipts, so you can spend more of ' +
        'your time making a difference.',
    },
    panel3Message: {
        id: 'welcome.message3',
        description: 'foo',
        defaultMessage: 'Chimp lets you give when you want, how you want, ' +
        'all in one place. It’s your secure, online platform for making the ' +
        'change you want to see in the world.',
    },
});

// Welcome Image
const welcomeImage1 = require('client/common/images/jar-coins.svg');
const welcomeImage2 = require('client/common/images/paper-trays.svg');
const welcomeImage3 = require('client/common/images/computer-screen-heart.svg');


class WelcomeModalCarousel extends BaseComponent {

    onFinish() {
        this.props.onFinish();
    }

    next() {
        this.carousel.slickNext();
    }

    render() {
        const { assetPath } = this.props;
        const { formatMessage } = this.props.intl;

        const sliderConfig = {
            swipe: false,
        };

        return (
            <Carousel
                className="c-welcome-modal__carousel"
                ref={el => {this.carousel = el}}
                sliderConfig={sliderConfig}
            >
                <FeatureCard
                    title={formatMessage(messageList.panel1Title)}
                    imageSrc={`${assetPath}/${welcomeImage1}`}
                    description={formatMessage(messageList.panel1Message)}
                    descriptionElement="p"
                    cta={{
                        buttonClass: 'c--pop',
                        title: formatMessage(messageList.welcomeCTANext),
                        click: this.next,
                    }}
                />
                <FeatureCard
                    title={formatMessage(messageList.panel2Title)}
                    imageSrc={`${assetPath}/${welcomeImage2}`}
                    description={formatMessage(messageList.panel2Message)}
                    descriptionElement="p"
                    cta={{
                        buttonClass: 'c--pop',
                        title: formatMessage(messageList.welcomeCTANext),
                        click: this.next,
                    }}
                />
                <FeatureCard
                    title={formatMessage(messageList.panel3Title)}
                    imageSrc={`${assetPath}/${welcomeImage3}`}
                    description={formatMessage(messageList.panel3Message)}
                    descriptionElement="p"
                    cta={{
                        buttonClass: 'c--pop c--filled',
                        title: formatMessage(messageList.welcomeCTAClose),
                        click: this.onFinish,
                    }}
                />
            </Carousel>
        );
    }
}

// Explicitly state they type of properties you expect here
WelcomeModalCarousel.propTypes = {
    onFinish: PropTypes.func,
    intl: intlShape.isRequired,
    assetPath: PropTypes.string,
    sliderRef: PropTypes.func
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(WelcomeModalCarousel);
