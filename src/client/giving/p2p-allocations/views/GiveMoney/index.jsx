/**
 * GiveMoney Component
 *
 * @see https://internal-release.24467.org/give/to/friend/new
 */

import React from 'react';
import {
    injectIntl,
} from 'react-intl';
import { // list alphabetically for grok-ability
    Breadcrumb,
    Container,
    Grid,
    Header,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import GiveMoneyForm from 'client/giving/p2p-allocations/components/GiveMoneyForm';
import { messages } from 'client/giving/common/messages';

class GiveMoney extends BaseComponent {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <Container
                as="main"
                className="v-p2p-allocation"
            >
                <Grid
                    className="u-margin-bottom-lg u-margin-top-lg"
                    columns={2}
                >
                    <Grid.Column
                        mobile={15}
                        computer={11}
                    >
                        <Grid
                            divided="vertically"
                        >
                            <Grid.Row>
                                <Grid
                                    centered
                                    columns={2}
                                >
                                    <Grid.Column>
                                        <Header
                                            as="h2"
                                        >
                                            {formatMessage(messages.giveHeader)}
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column
                                        textAlign="right"
                                    >
                                        <Breadcrumb size="small">
                                            <Breadcrumb.Section active>{formatMessage(messages.breadcrumbGive)}</Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section link>{formatMessage(messages.breadcrumbReview)}</Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section link>{formatMessage(messages.breadcrumbDone)}</Breadcrumb.Section>
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
                </Grid>
            </Container>
        );
    }
}

export default injectIntl(GiveMoney);
