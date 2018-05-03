import React from 'react';
import PropTypes from 'prop-types';
import {
    Link,
} from 'react-router';
import {
    defineMessages,
} from 'react-intl';
import _ from 'lodash';

import {
    Button,
    Header,
    List,
    Segment,
} from 'semantic-ui-react';

import { Helmet } from 'react-helmet';

import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';
import browser from 'client/common/helpers/browser';
import PhoneNumber from 'client/common/components/PhoneNumber';
import SupportChat from 'client/common/components/SupportChat';

const {
    func,
    shape,
    string,
} = PropTypes;

const i18n = defineMessages({
    supportSearchAsk: {
        description: 'Link text directing user to the help pages',
        defaultMessage: 'Search / Ask a question',
        id: 'support.searchAsk',
    },
    supportEmailOrChat: {
        description: 'Link text directing user to the contact us page',
        defaultMessage: 'Email us or chat online',
        id: 'support.emailOrChat',
    },
    // supportPhone: {
    //     description: 'Label',
    //     defaultMessage: 'Email us or chat online',
    //     id: 'support.emailOrChat',
    // },
});

const contactInfo = {
    email: 'hello@chimp.net',
    tel: '+18775310580',
};

const initHelpScout = ({ HS, HSCW }, currentUser) => {
    const output = {
        HS,
        HSCW,
    };
    if (!_.isEmpty(HS) && !_.isEmpty(HSCW)) return output; // already initialised

    HS.beacon = HS.beacon || {};

    const { beacon } = HS;

    beacon.userConfig = {
        modal: true,
        color: '#ff4511',
        attachment: true,
        icon: 'question',
        showContactFields: true,
        topArticles: true,
    };
    beacon.readyQueue = [
        function setIdentity() {
            if (currentUser) {
                this.identify({
                    email: currentUser.email,
                    name: currentUser.fullName,
                });
            }
        },
    ];
    beacon.config = function initialHsConfig(e) {
        this.userConfig = e;
    };
    beacon.ready = function initialHsReady(e) {
        this.readyQueue.push(e);
    };
    HSCW.config = {
        docs: {
            enabled: true,
            baseUrl: 'https://chimp.helpscoutdocs.com/',
        },
        contact: {
            enabled: true,
            formId: '242acd18-63cb-11e5-8846-0e599dc12a51',
        },
    };

    return output;
};

class HelpCentre extends BaseComponent {
    constructor(props) {
        super(props);
        browser.window.HS = browser.window.HS || {};
        browser.window.HSCW = browser.window.HSCW || {};

        _.assign(
            this,
            initHelpScout(browser.window, props.currentUser),
        );
    }

    render() {
        const {
            currentBreakpoint,
            formatMessage,
        } = this.props;
        const scripts = [];
        const emailButtonProps = {
            content: formatMessage(i18n.supportSearchAsk),
            fluid: true,
        };

        if (adaptiveComponentHelper.greaterThan('xs', currentBreakpoint)) {
            scripts.push(<script
                async
                data-key="helpscout" // used for unit test
                key="helpscout"
                src="//djtflbt20bdde.cloudfront.net"
            />);

            emailButtonProps.onClick = () => this.HS.beacon.open();
        } else {
            emailButtonProps.as = 'a';
            emailButtonProps.href = '//help.chimp.net';
        }

        return (
            <React.Fragment>
                <Helmet>
                    {scripts}
                </Helmet>
                <Header
                    as="h3"
                    attached="top"
                    content={formatMessage({ id: 'common.helpCentre' })}
                    inverted
                />
                <Segment attached>
                    <Button {...emailButtonProps} />
                    <List>
                        <List.Item
                            icon="chat"
                            description={
                                <SupportChat>
                                    <a href={`mailto:${contactInfo.email}`}>
                                        {formatMessage(i18n.supportEmailOrChat)}
                                    </a>
                                </SupportChat>
                            }
                        />
                        <List.Item
                            icon="phone"
                            description={
                                <PhoneNumber number={contactInfo.tel} isLink />
                            }
                        />
                    </List>
                </Segment>
            </React.Fragment>
        );
    }
}
HelpCentre.propTypes = {
    currentBreakpoint: string.isRequired,
    currentUser: shape({
        email: string,
        fullName: string,
    }).isRequired,
    formatMessage: func.isRequired,
};

export default HelpCentre;
