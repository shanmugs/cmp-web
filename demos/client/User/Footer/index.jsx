import React from 'react';

import BaseComponent from 'client/common/helpers/BaseComponent';
import { connectBranch } from 'client/common/store';

import ViewModel, {
    branchOptions,
} from './ViewModel';


class Footer extends BaseComponent {
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
                <div style={{ borderTop: '1px solid #666' }}>
                    <h1>Loading...</h1>
                    <p>parentName: {props.parentName}</p>
                </div>
            );
        }


        return (
            <div style={{ borderTop: '1px solid #666' }}>
                <h1>{props.title}</h1>
                <p>parentName: {props.parentName}</p>
            </div>
        );
    }
}

export default connectBranch(Footer, branchOptions, ViewModel);
