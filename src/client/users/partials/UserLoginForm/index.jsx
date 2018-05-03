import React from 'react';
import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import _ from 'lodash';

import {
    Button,
    Form,
    Portal,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';

import * as actions from 'client/users/actions';

const i18n = defineMessages({
    email: {
        id: 'common.emailLabel',
        description: 'foo',
        defaultMessage: 'Email',
    },
    password: {
        id: 'common.passwordLabel',
        description: 'foo',
        defaultMessage: 'Password',
    },
    forgotPassword: {
        id: 'common.forgotPassword',
        description: 'foo',
        defaultMessage: 'Forgot your password?',
    },
    login: {
        id: 'common.login',
        description: 'foo',
        defaultMessage: 'Log In',
    },
});

const passwordRgx = /^(?=.*[A-Z])(?:.*[a-z])(?=.*\d)(?=.*\W)(?!.*(.).*\1.*\1)/;

const ForgotPasswordForm = () => {
    return (<p>Reset your password</p>);
};

class UserLoginForm extends BaseComponent {
    constructor(...args) {
        super(...args);

        this.state = {
            login: '',
            password: '',
        };
    }
    handleChange(event, { name, value }) {
        this.setState({ [name]: value });
    }

    handleSubmit() {
        this.setState({
            status: 'loading',
        });

        return actions.login(_.pick(this.state, ['login', 'password']));
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { login, password } = this.state;

        return(
            <Form
                noValidate
                onSubmit={this.handleSubmit}
                loading={this.state.status === 'loading'}
                error={this.state.status === 'error'}
                success={this.state.status === 'success'}
            >
                <Form.Field
                    required
                >
                    <label>{formatMessage(i18n.email)}</label>
                    <Form.Input
                        fluid
                        name="login"
                        onChange={this.handleChange}
                        placeholder="john@example.com"
                        required
                        type="email"
                        value={login}
                    />
                </Form.Field>
                <Form.Field
                    required
                >
                    <label>{formatMessage(i18n.password)}</label>
                    <Form.Input
                        fluid
                        name="password"
                        onChange={this.handleChange}
                        pattern={passwordRgx}
                        type="password"
                        value={password}
                    />
                </Form.Field>

                <Portal
                    trigger={
                        <Button
                            floated="right"
                            type="button"
                        >
                            {formatMessage(i18n.forgotPassword)}
                        </Button>
                    }
                >
                    <ForgotPasswordForm />
                </Portal>

                <Button
                    floated="left"
                    primary
                    type="submit"
                >
                    {formatMessage(i18n.login)}
                </Button>
            </Form>
        );
    }
};

export default injectIntl(UserLoginForm);
