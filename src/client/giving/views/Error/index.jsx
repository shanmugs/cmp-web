import React from 'react';

import {
    injectIntl,
    FormattedMessage,
} from 'react-intl';

import {
    Button,
    Grid,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import CommonIcon from 'client/common/components/Icon';
import GeminiLink from 'client/common/components/GeminiLink';
import './error.scss';

class Error extends BaseComponent {
    render() {
        const { formatMessage } = this.props.intl;

        return (
            <Grid
                className="u-margin-bottom-lg u-margin-top-lg"
                container
                columns={2}
            >
                <Grid.Column
                    mobile={16}
                    computer={12}
                >
                    <Grid>
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column>
                                <CommonIcon glyph="givingError" size="lg" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column>
                                <p
                                    className="error-heading"
                                >
                                    {formatMessage({ id: 'giving.error.heading' })}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column>
                                <div
                                    className="error-message"
                                >
                                    <FormattedMessage
                                        id="giving.error.message1"
                                        tagName="p"
                                        values={
                                            {
                                                email: <a href="mailto:hellochimp.net">hello@chimp.net</a>,
                                                telephone: <a href="tel:+18775310580">+1 (877) 531-0580</a>,
                                            }
                                        }
                                    />
                                    <p>
                                        {formatMessage({ id: 'giving.error.message2' })}
                                    </p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column
                                className="error-message"
                            >
                                <Button
                                    as={GeminiLink}
                                    color="blue"
                                    content={formatMessage({ id: 'giving.error.goToDashboard' })}
                                    path="/dashboard"
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        );
    }
}
export default injectIntl(Error);
