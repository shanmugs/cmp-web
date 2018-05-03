import React from 'react';
import { injectIntl } from 'react-intl';
import {
    Breadcrumb,
    Container,
    Grid,
    Header,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import AddMoneyForm from 'client/giving/donations/partials/AddMoneyForm';
import { messages } from 'client/giving/common/messages';


class AddMoney extends BaseComponent {
    render() {
        const { formatMessage } = this.props.intl;

        return (
            <Container as="main" className="v-groupallocation">
                <Grid className="u-margin-bottom-lg u-margin-top-lg" columns={2}>
                    <Grid.Column mobile={15} computer={11} width={10}>
                        <Grid divided="vertically">
                            <Grid.Row>
                                <Grid columns={2}>
                                    <Grid.Column width={6} textAlign="left">
                                        <Header as="h2">{formatMessage(messages.addMoneyToAccountLabel)}</Header>
                                    </Grid.Column>
                                    <Grid.Column textAlign="right" width={10}>
                                        <Breadcrumb size="small">
                                            <Breadcrumb.Section active>
                                                {formatMessage(messages.breadcrumbAddMoney)}
                                            </Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="caret right" />
                                            <Breadcrumb.Section link>
                                                {formatMessage(messages.breadcrumbReview)}
                                            </Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="caret right" />
                                            <Breadcrumb.Section link>
                                                {formatMessage(messages.breadcrumbDone)}
                                            </Breadcrumb.Section>
                                        </Breadcrumb>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <AddMoneyForm />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default injectIntl(AddMoney);

