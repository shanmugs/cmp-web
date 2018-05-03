import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import {
    Card,
    Container,
    Form,
    Grid,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import { connectBranch } from 'client/common/store';

import UserLoginForm from 'client/users/partials/UserLoginForm';

const i18n = defineMessages({
    signupBlurb: {
        id: 'signup.blurb',
        defaultMessage: 'CHIMP makes giving simple, social and, dare we say, better. (Yes, we dare.) Give it a try to see for yourself.',
        description: 'foo',
    },
    signupBtn: {
        id: 'signup.button',
        defaultMessage: 'Sign Up',
        description: 'foo',
    },
});

class UserLoginView extends BaseComponent {
    componentWillReceiveProps(nextProps) {
        if (_.get(nextProps, 'currentUser.isAuthenticated')) {
            this.props.router.push('/users/dashboard');
        }
    }

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <Container
                as="main"
                className="v-user-login"
            >
                <Grid
                    className="u-margin-bottom-lg u-margin-top-lg"
                    columns={2}
                >
                    <Grid.Column
                        width={12}
                    >
                        <UserLoginForm/>
                    </Grid.Column>
                    <Grid.Column
                        width={4}
                    >
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Not on Chimp?
                                </Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    <p>{formatMessage(i18n.signupBlurb)}</p>
                                    <Link
                                        to='users/new'
                                        className="ui button primary"
                                    >
                                        {formatMessage(i18n.signupBtn)}
                                    </Link>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default injectIntl(withRouter(connectBranch(UserLoginView, {
    mapPathsToProps: {
        currentUser: '/users/current',
    },
})));
