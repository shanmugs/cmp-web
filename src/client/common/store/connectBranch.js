/* eslint-disable no-multi-spaces, key-spacing, brace-style, no-use-before-define,
        import/extensions, import/no-unresolved, import/no-extraneous-dependencies,
        react/forbid-prop-types, react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape } from 'react-intl';
import _ from 'lodash';
// import Immutable from 'seamless-immutable';

// TODO: Investigate why using named-import for 'BaseComponent' causes a circular-import error
import BaseComponent from 'client/common/components/BaseComponent';

import { getBranch } from './index';


/**
*   Connects a component to the redux store
*/
class BranchContainer extends BaseComponent {
    constructor(props, context) {
        super(props, context);

        // eslint-disable-next-line no-underscore-dangle
        this.component = props._component_;

        this.createBranch(props, context);
    }

    getChildContext() {
        const branch = this.branch;

        return {
            branch,
            dispatch: branch.dispatch, // TODO: this is already in props.dispatch, so remove?
        };
    }

    componentWillMount() {
        /*
         if (config.initialState) {
         this.skipRendering = true; // skip rendering *this time*, to avoid double-render
         this.forceUpdate(); // re-render *after* Redux state has had time to be set
         }
         */
    }

    componentDidMount() {
        // this.skipRendering = false; // clear flag set in componentWillMount

        const props = this.props;
        const proto = this.component.prototype;
        if (proto.routerWillLeave) {
            props.router.setRouteLeaveHook(props.route, proto.routerWillLeave);
        }
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
    }

    componentWillReceiveProps(props, context) {
        const prevConfig    = this.branchConfig;
        const config        = props.branchConfig;
        const params        = props.params || {};
        const branchIdParam = config.branchIdParamKey;

        // get 'next value' for all branch-location params
        const branchPath    = props.branchPath || config.branchPath;
        const branchId      = props.branchId   || config.branchId || params[branchIdParam] || null;
        const parentPath    = props.parentPath || config.parentPath || null;

        // compare next-values to current-values to see if any location-params changed
        const isNewBranchPath   = branchPath !== prevConfig.branchPath;
        const isNewBranchId     = branchId   !== prevConfig.branchId;
        const isNewParentPath   = parentPath !== prevConfig.parentPath;

        // context.branch always exists because every branch sets it, including rootBranch;
        // but if props.parentPath was passed, then it takes precedent so we ignore parentBranch
        const parentBranch      = context.parentBranch || null;
        const isNewParentBranch = !parentPath && parentBranch !== this.parentBranch;

        // if ANY location-param has changed, then we need to create a new branch
        if (   isNewBranchPath // eslint-disable-line space-in-parens
            || isNewBranchId
            || isNewParentPath
            || isNewParentBranch
        ) {
            if (prevConfig.destroyOnUnmount) {
                this.branch.destroy();
            }
            this.createBranch(props, context);
        }
    }

    componentWillUnmount() {
        if (this.branchConfig.destroyOnUnmount) {
            this.branch.destroy();
        }
    }

    // NOTE: args are nextProps & nextContext when called from componentWillReceiveProps
    createBranch(props, context) {
        const config = _.cloneDeep(props.branchConfig);

        // Can pass a branchId prop to have separate sub-branches for each 'item'
        // for example, each 'charity' could maintain its own page-state, if useful
        // Router may also pass a param to use as branchId, like 'params.slug'
        const params = props.params;
        let branchId = props.branchId;
        if (!branchId && params && config.branchIdParamKey) {
            branchId = params[config.branchIdParamKey];
        }
        config.branchId = branchId || null;
        this.branchId = config.branchId;

        // Can pass parentPath in props; else will use context.branch.getRootPath()
        // rootPath is used over branchPath so this branch's data will not affect the parent's
        this.parentBranch = context.branch || null;

        // Can pass branchPath in props
        if (props.branchPath) {
            config.branchPath = props.branchPath;
        }

        // Can pass rootPath in props; like from the GenericLegacyView to match route
        if (props.rootPath) {
            config.rootPath = props.rootPath;
        }

        // Can also pass parentPath in props
        if (props.parentPath) {
            config.parentPath = props.parentPath;
        }
        if (!config.parentPath && this.parentBranch) {
            // branch-off of the parent-component's "rootPath", not its data/branchPath
            config.parentPath = this.parentBranch.getRootPath();
        }

        this.branchConfig = config;
        this.branch = getBranch(config);
    }


    mapStateToProps() {
        return this.branch.mapStateToProps;
    }
    mapDispatchToProps() {
        return this.branch.mapDispatchToProps;
    }
    mergeProps(stateProps, dispatchProps, ownProps) {
        return this.branch.mergeProps(stateProps, dispatchProps, ownProps);
    }
    getConnectOptions() {
        return this.branch.getConnectOptions();
    }


    render() {
        const branch = this.branch;
        const props  = this.props;

        const componentProps = _.omit(props, ['parentPath', '_component_']);

        // NOTE: branch.initialState may not exist
        _.assign(componentProps, branch.initialState);

        const ConnectedComponent = connect(
            this.mapStateToProps,
            this.mapDispatchToProps,
            this.mergeProps,
            this.getConnectOptions(),
        )(this.component);

        // Add intl object to props, exactly as injectIntl() helper does.
        // Will not hurt if this is _also_ assigned by injectIntl because same object
        if (!componentProps.intl) {
            componentProps.intl = this.context.intl;
        }

        // injectIntl has a withRef option that uses the DEPRECATED ref="wrappedInstance";
        // and it can optionally add a corresponding getWrappedInstance() method.
        // This should not be needed, and is not recommended, so option is not included here.

        return (
            <ConnectedComponent {...componentProps} />
        );
    }
}

const {
    func,
    object,
    string,
} = PropTypes;

BranchContainer.propTypes = {
    branchId:   string,
    parentPath: string,
};

BranchContainer.contextTypes = {
    store:      object,
    branch:     object,
    dispatch:   func,
    intl:       intlShape,
};

BranchContainer.childContextTypes = {
    branch:     object,
    dispatch:   func,
};

/**
 * Wrapper for Redux-Connect helper that allows us to dynamically handle data-branching
 *
 * @example const wrappedComponent = connectBranch(component, branchConfig);
 *
 * @param {Component} component
 * @param {Object} branchConfig
 * @param {Function} [ViewModel]
 * @returns {Component}
 */
const connectBranch = (component, branchConfig, ViewModel) => {
    if (_.isString(branchConfig)) {
        branchConfig = { branchPath: branchConfig }; // eslint-disable-line no-param-reassign
    }

    // eslint-disable-next-line func-names
    const connectedComponent = props => (
        <BranchContainer
            {...props}
            branchConfig={branchConfig || {}}
            _component_={component}
        />
    );
    // add component.name as a property for debugging purposes; see BaseComponent
    connectedComponent.componentName = component.name;

    // IF a view-model was passed, add a method for fetching initial data
    if (ViewModel) {
        /**
         * Method used ONLY for server-side rendering; kick-off all requests.
         * If view has children with their own data, then call their vm's too.
         *
         * @return {Promise} Resolve promise when ALL requests complete, successful or not
         */
        connectedComponent.loadComponentData = (metadata) => {
            const vm = new ViewModel();

            return vm.loadComponentData
                ? vm.loadComponentData(metadata)
                : Promise.resolve();
        };
    }

    return connectedComponent;
};

export default connectBranch;
