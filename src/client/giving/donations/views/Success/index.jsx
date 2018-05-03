/**
 * Success View
 *
 * @see https://24467.org/donations/2b3652be-05d7-4d1a-a7f0-261f23a0fbae/success
 */

import React from 'react';
import { Link } from 'react-router';

import {
    defineMessages,
    injectIntl,
} from 'react-intl';
import { // list alphabetically for grok-ability
    Breadcrumb,
    Button,
    Container,
    Grid,
    Header,
    Icon,
} from 'semantic-ui-react';

import BaseComponent from 'client/common/components/BaseComponent';
import { messages } from 'client/giving/common/messages';
import './success.scss';

class Success extends BaseComponent {
    render() {
        const { formatMessage } = this.props.intl;
        const {
            addMoneyFormData,
            creditCardData,
        } = this.props;
        return (
            <Container
                className="v-donations"
            >
                <Grid
                    className="u-margin-bottom-lg u-margin-top-lg"
                    columns={2}
                >
                    <Grid.Column
                        mobile={16}
                        computer={16}
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
                                        >
                                            {
                                                formatMessage({ id: 'giving.donations.success.confirmation' })
                                            }
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column
                                        textAlign="right"
                                    >
                                        <Breadcrumb size="mini">
                                            <Breadcrumb.Section
                                                className="breadcrumb-non-active"
                                            >
                                                {
                                                    formatMessage({ id: 'giving.breadcrumbGive' })
                                                }
                                            </Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section className="breadcrumb-non-active">
                                                {
                                                    formatMessage({ id: 'giving.breadcrumbReview' })
                                                }
                                            </Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section active>
                                                {
                                                    formatMessage({ id: 'giving.breadcrumbDone' })
                                                }
                                            </Breadcrumb.Section>
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
                            { !!addMoneyFormData.isRecurringDonation &&
                                (
                                    <Grid >
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <p
                                                    className="paragraph-first"
                                                >
                                                    {
                                                        formatMessage({ id: 'giving.donations.success.recurringDonation' }, {
                                                            amount: addMoneyFormData.amount,
                                                            name: addMoneyFormData.name,
                                                        })
                                                    }
                                                </p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <p
                                                    className="paragraph-second"
                                                >
                                                    {
                                                        formatMessage(
                                                            { id: 'giving.donations.success.recurringCreditCardMessage' },
                                                            {
                                                                amount: addMoneyFormData.amount,
                                                                cardType: creditCardData.cardType,
                                                                lastFourDigitCardNo: creditCardData.lastFourDigitCardNo,
                                                                name: creditCardData.nameOnCard,
                                                                recurringDate: addMoneyFormData.recurringDate,
                                                                recurringDay: addMoneyFormData.onWhatDay,
                                                            },
                                                        )
                                                    }
                                                </p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <p
                                                    className="paragraph-second"
                                                >
                                                    {
                                                        formatMessage({ id: 'giving.donations.success.recurringTaxReceiptMessage' })
                                                    }
                                                </p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <Button
                                                    as={Link}
                                                    color="blue"
                                                    content={
                                                        formatMessage({ id: 'giving.donations.success.recurringTransactions' })
                                                    }
                                                    to="/user/recurring-donations"
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                )
                            }
                            { !addMoneyFormData.isRecurringDonation &&
                                (
                                    <Grid >
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <p
                                                    className="paragraph-first"
                                                >
                                                    {
                                                        formatMessage({ id: 'giving.donations.success.addMoney' }, {
                                                            amount: addMoneyFormData.amount,
                                                            name: addMoneyFormData.name,
                                                        })
                                                    }
                                                </p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <p
                                                    className="paragraph-second"
                                                >
                                                    {
                                                        formatMessage({ id: 'giving.donations.success.creditCardMessage' }, {
                                                            cardType: creditCardData.cardType,
                                                            lastFourDigitCardNo: creditCardData.lastFourDigitCardNo,
                                                            name: creditCardData.nameOnCard,
                                                        })
                                                    }
                                                </p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row
                                            textAlign="center"
                                        >
                                            <Grid.Column>
                                                <Button
                                                    as={Link}
                                                    color="blue"
                                                    content={
                                                        formatMessage({ id: 'giving.donations.success.seeYourTaxReceipt' })
                                                    }
                                                    to="/user/tax-receipts"
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                )
                            }
                            <Grid.Row
                                textAlign="center"
                            >
                                <Grid.Column
                                    className="paragraph-second"
                                >
                                    {formatMessage({ id: 'common.or' })}&nbsp;
                                    <Link
                                        to="/users/dashboard"
                                    >
                                        {
                                            formatMessage({ id: 'giving.donations.success.goToYourDashboard' })
                                        }
                                    </Link>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

/* @todo GIVEB-126 Since we do not have any data in the store yet, so mocking some default props
assume some naming and condition but we need to change default props and adjust naming and condition
whenever all the views in the flow are complete and we have the related data in store.
*/
Success.defaultProps = {
    addMoneyFormData: {
        amount: '$100.00',
        isRecurringDonation: true,
        name: 'Jane',
        onWhatDay: '1st',
        recurringDate: 'April 1st, 2018',
    },
    creditCardData: {
        cardType: 'VISA',
        description: 'John Doe\'s visa ending with 4242',
        lastFourDigitCardNo: '4242',
        nameOnCard: 'Jane Prescott',
    },
};

export default injectIntl(Success);

