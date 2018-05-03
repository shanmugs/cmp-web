/* eslint-disable no-multi-spaces, key-spacing */
import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import BaseComponent from 'client/common/helpers/BaseComponent';
import { connectBranch } from 'client/common/store';

import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import History from './History';

import actions from './actions';
import ViewModel, {
    branchOptions,
} from './ViewModel';


class User extends BaseComponent {
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

        if (!props || !props.title) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }

        return (
            <div>
                <Header
                    parentName="User Component"
                    router={props.router}
                />

                <h1>{props.title}</h1>
                <p>{props.content}</p>
                <p>
                    <Link to="/">
                        <FormattedMessage
                            id="user.back"
                            defaultMessage="THIS STRING IS NOT TRANSLATED"
                            description="Go to Homepage"
                        />
                    </Link>
                </p>

                <blockquote>
                    {props.children}
                </blockquote>
                <Footer
                    parentName="User Component"
                />
            </div>
        );
    }
}

const {
    func,
} = React.PropTypes;

User.propTypes = {
    dispatch:   func.isRequired,
};


const connectedUser = connectBranch(User, branchOptions, ViewModel);

export {
    connectedUser as default,
    Profile,
    History,
};
