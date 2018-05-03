import React from 'react';
import _ from 'lodash';

import { connectBranch } from 'client/common/store';
import BaseComponent from 'client/common/components/BaseComponent';
import Navbar from 'client/shell/components/Demo/Navbar';
// import AskUs from 'client/common/components/ask-us/ask-us';

import ViewModel, {
    branchOptions,
} from './ViewModel';


class Home extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.viewModel = new ViewModel();
    }

    componentDidMount() {
        const data = this.props.data;

        // avoid re-fetching static community data we already have
        // NOTE: normally a container should pass props.branchId, which equals community-slug
        if (!data || !data.name) {
            this.viewModel.loadComponentData()
                .catch(console.error); // eslint-disable-line no-console
        }
    }

    /**
     * @constructor
     * @returns {Component}
     */
    HomeLayout(props) { // eslint-disable-line class-methods-use-this
        return (
            <div>
                <h1>Home Page</h1>
                <Navbar {...props} />
            </div>
        );
    }

    render() {
        const props = this.props;
        const data = props.data;
        const HomeLayout = this.HomeLayout;

        return (
            <HomeLayout {...props}>
            </HomeLayout>
        );
    }
}

export default connectBranch(Home, branchOptions, ViewModel);
