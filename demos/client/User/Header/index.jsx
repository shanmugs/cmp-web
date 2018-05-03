import React from 'react';

import { connectBranch } from 'client/common/store';
import BaseComponent from 'client/common/helpers/BaseComponent';
import Navbar from 'client/shell/components/Demo/Navbar';

import ViewModel, {
    branchOptions,
} from './ViewModel';


class Header extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.viewModel = new ViewModel();
    }

    componentDidMount() {
        this.viewModel.loadComponentData()
            .catch(console.error); // eslint-disable-line no-console
    }

    render() {
        const props = this.props;

        if (!props.title) {
            return (
                <div>
                    <h1>Loading...</h1>
                    <p>parentName: {props.parentName}</p>
                </div>
            );
        }

        return (
            <div>
                <h1>{props.title}</h1>
                <Navbar {...props} />
            </div>
        );
    }
}

export default connectBranch(Header, branchOptions, ViewModel);
