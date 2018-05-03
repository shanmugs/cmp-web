/*
    Give Money view
*/

import React from 'react';
import { Link } from 'react-router';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import _ from 'lodash';
import {
    Breadcrumb,
    Card,
    Container,
    Grid,
    Header,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import GiveMoneyForm from 'client/giving/group-allocations/components/GiveMoneyForm';
import { messages } from 'client/giving/common/messages';

const messageList = defineMessages({
    contactBlurb: {
        description: 'Message for Contact Card',
        defaultMessage: 'There are lots of ways to find an answer.',
        id: 'groups.contactMessage',
    },
});

class GiveMoney extends BaseComponent {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <Container as="main" className="v-groupallocation">
                <Grid className="u-margin-bottom-lg u-margin-top-lg" columns={2}>
                    <Grid.Column mobile={15} computer={11} width={10}>
                        <Grid divided="vertically">
                            <Grid.Row>
                                <Grid centered columns={2}>
                                    <Grid.Column>
                                        <Header as="h2">{formatMessage(messages.giveHeader)}</Header>
                                    </Grid.Column>
                                    <Grid.Column textAlign="right">
                                        <Breadcrumb size="small">
                                            <Breadcrumb.Section active>
                                                {formatMessage(messages.breadcrumbGive)}
                                            </Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section link>
                                                {formatMessage(messages.breadcrumbReview)}
                                            </Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section link>
                                                {formatMessage(messages.breadcrumbDone)}
                                            </Breadcrumb.Section>
                                        </Breadcrumb>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <GiveMoneyForm />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Got a Question?
                                </Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    <p>{formatMessage(messageList.contactBlurb)}</p>
                                    <p>
                                        <input id="contactInput" name="contactInput" />
                                    </p>
                                    <Link to="users/new">
                                    Email Us or Chat Online
                                    </Link>
                                    <p>
                                        <b>Call 1 (877) 531-0580</b>
                                    </p>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default injectIntl(GiveMoney);
