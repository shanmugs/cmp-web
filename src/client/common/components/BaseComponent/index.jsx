import React from 'react';
import _ from 'lodash';

import ErrorView from 'client/shell/views/ErrorView';

// import { onFirstViewMounted } from './app';


const valid400ErrorCodes = [
    404,
    408,
];

// we can skip all standard React methods because they already have a bound context (I think)
const standardMethods1 = /^(?:constructor|render|shouldComponentUpdate|)$/;
const standardMethods2 = /^component(?:Will|Did)(?:Mount|Unmount|ReceiveProps|Update)$/;

function getCustomMethods(obj) {
    let customMethods = [];
    let protoMethods = [];
    let proto = Object.getPrototypeOf(obj);

    // filter-function that IGNORES non-method properties and standard React methods
    const onlyOwnMethods = prop => (
        typeof proto[prop] === 'function' &&
        !standardMethods1.test(prop) &&
        !standardMethods2.test(prop)
    );

    // process the methods of this object PLUS all of its super-classes
    // collect the names of all custom methods - avoid duplicates with _.union()
    while (proto instanceof React.Component) {
        // get names of all the methods in this prototype
        protoMethods = Object.getOwnPropertyNames(proto).filter(onlyOwnMethods);
        // add methods from this prototype-level to array - if not already in it
        customMethods = _.union(customMethods, protoMethods);
        // recurse up the prototype chain (prototype of prototype)
        proto = Object.getPrototypeOf(proto);
    }

    return customMethods;
}

const cacheKeyResolver = (obj) => {
    const proto = Object.getPrototypeOf(obj) || {};
    return proto.name || (proto.constructor || {}).name;
};
// memoize method so we only have to process each component ONCE
const memoizedGetCustomMethods = _.memoize(getCustomMethods, cacheKeyResolver);


/** 
 *  Does all the stuff every component should do out of the box: 
 *  binds custom methods, ressurects .mounted, maintains .context, some server error handling 
 */
class BaseComponent extends React.Component {
    /**
    *   constructor
    *   @param {object} props
    *   @param {object} context
    */
    constructor(props, context) {
        super(props, context);

        this.mounted = false;

        // const customMethods = memoizedGetCustomMethods(this);
        const customMethods = getCustomMethods(this); // CT-4204
        if (customMethods.length) {
            _.bindAll(this, customMethods);
        }

        // flag used by ServerError methods below
        this._serverErrorCode = null;
    }

    /* KEEP this debugging output because useful whenever need to test flow or sequence
    componentWillMount() {
        const props = this.props;
        const component = props.children; // may be null or undefined (not sure why?)
        const type = component && component.type;
        const name = type && (type.componentName || type.name);

        if (name) {
            console.info(`${name}.componentWillMount()`); // component-name only
            // console.info(`${name}.componentWillMount() props:`, props); // include props
        }
    }
    */

    componentDidMount() {
        this.mounted = true;

        // Fire app process that will run after the first view mounts.
        // This may start preloading or similar processes.
        // Pass this component so method can read data from it to use in logic.
        // onFirstViewMounted(this);
    }

    /* TODO: remove debugging output when all testing of BranchConnect is completed
    componentWillReceiveProps(nextProps) {
        const props = this.props;
        const component = props.children; // eslint-disable-line react/prop-types
        const type = component && component.type;
        const name = type && type.name;
        // isEqual does a deep-compare of objects
        const isEqual = _.isEqual(nextProps, props);

        // log if props ARE equal because _theoretically_ the branch object should block those
        if (isEqual) {
            console.info(
                'componentWillMount:',
                name,
                'Props are Equal?',
                String(isEqual).toUpperCase()
            );
        }
    }
    */

    /*
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // this code assumes immutable objects
        const context = this.context
        return nextState !== this.state || (nextContext && context && nextContext !== context);
    }
    */

    componentWillUpdate(nextProps, nextState, nextContext) {
        // context does not automatically set/update this.context, so set it
        this.context = nextContext;
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    /**
     * Helper method to set flag for a fatal server error; used by related methods below
     * @TODO MAY want to make this capable of handling custom errors as well as codes.
     * @param {number} code
     */
    setServerError(code = null) {
        if (!_.isNull(code) && !this.isServerError(code)) {
            // TODO: Replace console.error, when devLogger can be used this early in instantiation
            /* eslint-disable */
            console.error(`Component tried to set an invalid serverErrorCode: ${code}`)
            /* eslint-enable */
            return;
        }

        // if a no code passed, clear this._serverErrorCode with default null val
        this._serverErrorCode = code;
    }

    hasServerError() {
        return !!this._serverErrorCode;
    }

    /** Returns TRUE for all 5XX codes and select 4XX codes
     * @param {number|string} code
     */
    isServerError(code) { // eslint-disable-line class-methods-use-this
        const parsedCode = parseInt(code, 10)
        return (600 > parsedCode && parsedCode >= 500)
            || _.includes(valid400ErrorCodes, parsedCode);
    }

    // Functional stateless component
    // Defaults to the _serverErrorCode set in memory if no errorType prop is passed
    ServerError({ errorType = this._serverErrorCode }) {
        return (
            <ErrorView errorType={errorType} />
        );
    }
}

export default BaseComponent;
