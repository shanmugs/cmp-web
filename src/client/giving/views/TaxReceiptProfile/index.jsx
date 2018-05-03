/**
 * TaxReceiptProfile Component
 *
 * @see https://internal-release.24467.org/give/to/friend/new and try adding a new credit card
 */

import React from 'react';
import { defineMessages } from 'react-intl';
import _ from 'lodash';
import {
    Breadcrumb,
    Button,
    Container,
    Form,
    Grid,
    Header,
} from 'semantic-ui-react';
import {
    connectBranch,
    getState,
} from 'client/common/store';

import BaseComponent from 'client/common/components/BaseComponent';
import TaxReceiptProfileForm from 'client/giving/partials/TaxReceiptProfileForm';
import { getTaxReceiptProfile } from 'client/giving/actions';
import { messages } from 'client/giving/common/messages';
import 'client/giving/common/common.scss';
import './tax-receipt-profile.scss';

// This value is temporarily added until Auth is done.
const CURRENT_USER_ID = getState('/config/CURRENT_USER_ID');

const messageList = defineMessages({
    taxReceiptRecipientPlaceHolder: {
        description: 'Place holder message for tax receipt recipient dropdown',
        defaultMessage: 'Add a new tax receipt recipient',
        id: 'taxReceiptProfile.taxReceiptRecipientPlaceHolder',
    },
    taxReceiptProfileMessage: {
        description: 'Message in the begining of tax receipt profile page',
        defaultMessage: 'A tax receipt will be issued for this donation. Who should be it be issued to?',
        id: 'taxReceiptProfile.taxReceiptProfileMessage',
    },
    taxReceiptProfileHeader: {
        description: 'Message for the tax receipt profile header',
        defaultMessage: 'Tax Receipts',
        id: 'taxReceiptProfile.taxReceiptProfileHeader',
    },
    taxReceiptRecipientLabel: {
        description: 'Message for the tax receipt dropdown label',
        defaultMessage: 'Tax Receipt Recipient',
        id: 'taxReceiptProfile.taxReceiptRecipientLabel',
    },
});

class TaxReceiptProfile extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            receiptOptions: [{ text: 'Add a new tax receipt recipient', value: 0 }],
            selectedProfile: null,
            selectedValue: 0,
        };
    }

    componentDidMount() {
        // @todo : AUTH-98 - API for logging into the Rails application
        const userId = Number(CURRENT_USER_ID);
        getTaxReceiptProfile(userId);
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps.taxReceiptProfile;
        if (!_.isEmpty(data) && !_.isEqual(data, this.props.taxReceiptProfile.data)) {
            this.populateOptions(data);
        }
    }

    populateOptions(taxReceipts) {
        const options = [];
        taxReceipts.map((item) => {
            const { attributes } = item;
            options.push({
                text: `${attributes.fullName} - ${attributes.addressOne} ${attributes.city}`,
                value: item.id,
            });
        });
        options.push({
            text: 'Add a new tax receipt recipient',
            value: 0,
        });
        const taxSelected = options[0].value;
        this.setState({
            selectedValue: taxSelected,
            selectedProfile: _.find(taxReceipts, { id: taxSelected }),
            receiptOptions: options,
        });
    }

    handleInputChange(e, { value }) {
        this.setState({
            selectedValue: value,
            selectedProfile: _.find(this.props.taxReceiptProfile.data, { id: value }),
        });
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <Container
                as="main"
            >
                <Grid
                    className="u-margin-bottom-lg u-margin-top-lg"
                    columns={2}
                >
                    <Grid.Column
                        mobile={16}
                        computer={14}
                    >
                        <Form>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column
                                        computer={4}
                                        mobile={4}
                                    >
                                        <Header
                                            computer="medium"
                                            mobile="tiny"
                                            color="grey"
                                        >{formatMessage(messageList.taxReceiptProfileHeader)}
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column
                                        textAlign="right"
                                        computer={10}
                                        mobile={16}
                                    >
                                        <Breadcrumb size="mini">
                                            <Breadcrumb.Section className="breadcrumb-non-active">{formatMessage(messages.breadcrumbGive)}</Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section active>{formatMessage(messages.breadcrumbTaxReceipt)}</Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section className="breadcrumb-non-active">{formatMessage(messages.breadcrumbReview)}</Breadcrumb.Section>
                                            <Breadcrumb.Divider icon="right chevron" />
                                            <Breadcrumb.Section className="breadcrumb-non-active">{formatMessage(messages.breadcrumbDone)}</Breadcrumb.Section>
                                        </Breadcrumb>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <p
                                            className="paragraph"
                                        >{formatMessage(messageList.taxReceiptProfileMessage)}
                                        </p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row
                                    verticalAlign="middle"
                                >
                                    <Grid.Column
                                        mobile={4}
                                        computer={3}
                                    >
                                        <label
                                            className="label"
                                        >
                                            {formatMessage(messageList.taxReceiptRecipientLabel)}
                                        </label>
                                    </Grid.Column>
                                    <Grid.Column
                                        mobile={11}
                                        computer={10}
                                    >
                                        <Form.Dropdown
                                            fluid
                                            id="taxReceiptRecipient"
                                            name="taxReceiptRecipient"
                                            options={this.state.receiptOptions}
                                            onChange={this.handleInputChange}
                                            selection
                                            value={this.state.selectedValue}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <TaxReceiptProfileForm data={this.state.selectedProfile} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

TaxReceiptProfile.defaultProps = {
    taxReceiptProfile: {
        data: [],
    },
};

export default connectBranch(TaxReceiptProfile, {
    mapPathsToProps: {
        taxReceiptProfile: '/giving/taxreceiptprofile',
    },
});
