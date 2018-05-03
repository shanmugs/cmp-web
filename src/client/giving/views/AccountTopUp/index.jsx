/**
 * Account TopUp View Component
 *
 * @see https://internal-release.24467.org/give/to/friend/new
 */

import React from 'react';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import {
    Container,
    Grid,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import { connectBranch } from 'client/common/store';
import AccountTopUpForm from 'client/giving/partials/AccountTopUpForm';

class AccountTopUp extends BaseComponent {
    render() {
        return (
            <Container
                as="main"
                className="v-account-top-up"
            >
                <Grid
                    className="u-margin-bottom-lg u-margin-top-lg"
                    columns={2}
                >
                    <Grid.Column
                        mobile={15}
                        computer={11}
                    >
                        <AccountTopUpForm />
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
export default injectIntl(withRouter(connectBranch(AccountTopUp)));
