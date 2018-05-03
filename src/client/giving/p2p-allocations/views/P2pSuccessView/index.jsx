/**
 * Success View
 *
 * @see https://24467.org/give/to/friend/1140/success
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {
    injectIntl,
} from 'react-intl';
import { // list alphabetically for grok-ability
    Breadcrumb,
    Button,
    Grid,
    Header,
    Icon,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import GeminiLink from 'client/common/components/GeminiLink';
import './p2p-success-view.scss';

class P2pSuccessView extends BaseComponent {
    render() {
        const {
            formatMessage,
            formatNumber,
        } = this.props.intl;
        const {
            allocation,
            paymentInstruments,
            wasToppedUp,
        } = this.props;
        const {
            amount,
        } = allocation;
        const numberOfRecipient = allocation.emailList.length;
        return (
            <Grid
                className="u-margin-bottom-lg u-margin-top-lg"
                container
                columns={2}
            >
                <Grid.Column
                    mobile={15}
                    computer={11}
                >
                    <Grid>
                        <Grid.Row>
                            <Grid
                                centered
                                columns={2}
                            >
                                <Grid.Column>
                                    <Header
                                        size="large"
                                        color="grey"
                                    >{formatMessage({ id: 'giving.successConfirmation' })}
                                    </Header>
                                </Grid.Column>
                                <Grid.Column
                                    textAlign="right"
                                >
                                    <Breadcrumb size="mini">
                                        <Breadcrumb.Section className="breadcrumb-non-active">{formatMessage({ id: 'giving.breadcrumbGive' })}</Breadcrumb.Section>
                                        <Breadcrumb.Divider icon="right chevron" />
                                        <Breadcrumb.Section className="breadcrumb-non-active">{formatMessage({ id: 'giving.breadcrumbReview' })}</Breadcrumb.Section>
                                        <Breadcrumb.Divider icon="right chevron" />
                                        <Breadcrumb.Section active>{formatMessage({ id: 'giving.breadcrumbDone' })}</Breadcrumb.Section>
                                    </Breadcrumb>
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column>
                                <Icon
                                    name="checkmark"
                                    color="green"
                                    size="huge"
                                />
                            </Grid.Column>
                        </Grid.Row>
                        {numberOfRecipient > 1 ?
                            (
                                <Grid.Row
                                    textAlign="center"
                                >
                                    <Grid.Column>
                                        <p
                                            className="p2p-allocation-success-from-to-paragraph"
                                        >
                                            {formatMessage({ id: 'giving.p2pAllocations.success.fromToMultipleRecipient' }, {
                                                number: numberOfRecipient,
                                                amount: formatNumber(amount, { style: 'currency', currency: 'CAD' }),
                                                total: formatNumber(numberOfRecipient * amount, { style: 'currency', currency: 'CAD' }),
                                            })}
                                        </p>
                                    </Grid.Column>
                                </Grid.Row>
                            ) :
                            (
                                <Grid.Row
                                    textAlign="center"
                                >
                                    <Grid.Column>
                                        <p
                                            className="p2p-allocation-success-from-to-paragraph"
                                        >
                                            {formatMessage({ id: 'giving.p2pAllocations.success.fromToSingleRecipient' }, {
                                                amount: formatNumber(amount, { style: 'currency', currency: 'CAD' }),
                                                emailAddress: allocation.emailList,
                                            })}
                                        </p>
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        }
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column>
                                <p
                                    className="p2p-allocation-success-paragraph"
                                >
                                    {formatMessage({ id: 'giving.p2pAllocations.success.signUpNecessityReminder' })}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        { wasToppedUp &&
                            <Grid.Row
                                textAlign="center"
                            >
                                <Grid.Column>
                                    <p
                                        className="p2p-allocation-success-paragraph"
                                    >
                                        {formatMessage({ id: 'giving.p2pAllocations.success.topUpMessage' }, {
                                            description: paymentInstruments.description,

                                        })}
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        }
                        { wasToppedUp ?
                            (
                                <Grid.Row
                                    textAlign="center"
                                >
                                    <Grid.Column>
                                        <Button
                                            as={GeminiLink}
                                            color="blue"
                                            content={formatMessage({ id: 'giving.p2pAllocations.success.goToTaxReceipts' })}
                                            path="/user/tax-receipts"
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            ) :
                            (
                                <Grid.Row
                                    textAlign="center"
                                >
                                    <Grid.Column>
                                        <Button
                                            as={Link}
                                            color="blue"
                                            content={formatMessage({ id: 'giving.p2pAllocations.success.giveAnotherGift' })}
                                            to="/give/to/friend/new"
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        }
                        <Grid.Row
                            textAlign="center"
                        >
                            <Grid.Column
                                className="p2p-allocation-success-paragraph"
                            >
                                {formatMessage({ id: 'common.or' })}&nbsp;
                                <GeminiLink
                                    path="/dashboard"
                                >
                                    {formatMessage({ id: 'giving.p2pAllocations.success.goToYourDashboard' })}
                                </GeminiLink>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        );
    }
}

/* TODO: Since we do not have any data in the store yet I am just mocking some default props and
go with the most complicated case (multiple recipient with top up). I also assume some
naming and condition but we need to change default props and adjust naming and condition
whenever all the views in the flow are complete and we
have the related data in store.
*/
P2pSuccessView.defaultProps = {
    allocation: { amount: 75, emailList: ['1@gmail.com', '2@gmail.com'] },
    paymentInstruments: { description: 'John Doe\'s Visa ending with 4242' },
    wasToppedUp: true,
};

const {
    array,
    bool,
    number,
    shape,
    string,
} = PropTypes;

P2pSuccessView.propTypes = {
    allocation: shape({
        amount: number,
        emailList: array,
    }),
    paymentInstruments: shape({
        description: string,
    }),
    wasToppedUp: bool,
};
export default injectIntl(P2pSuccessView);
