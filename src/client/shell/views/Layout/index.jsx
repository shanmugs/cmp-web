import React from 'react';
import { IntlProvider } from 'react-intl'; // , addLocaleData
import _ from 'lodash';

import BaseComponent from 'client/common/components/BaseComponent';
import { connectBranch } from 'client/common/store';

import Layout from './Layout';


class LayoutContainer extends BaseComponent {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
        // this component updates ONLY if the local has changed
        // return nextProps.locale !== this.props.locale;
    }

    render() {
        const props = this.props;

        return (
            <IntlProvider
                locale={props.locale}
                key={props.locale}
                messages={props.messages}
            >
                <Layout {...props} />
            </IntlProvider>
        );
    }
}

export default connectBranch(LayoutContainer, '/intl');
