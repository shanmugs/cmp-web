import { breakpoints } from 'client/globals';

import { isRenderingOnServer } from './appInfo';
import browser from './browser';

// map of components and callbacks to trigger when breakpoints change.
// Only accessed via registerAdaptiveComponent() and deregisterAdaptiveComponent()
const registeredAdaptiveComponents = new Map();

// singleton implementation from: http://amanvirk.me/singleton-classes-in-es6/
let instance = null;

// AdaptiveComponentHelper gives tools to set up a component to update it's state
// with a breakpoint string based on the browser width.
// registerAdaptiveComponent subscribes a component to events which fire on crossing the breakpoints
// specified in ../globals.js
class AdaptiveComponentHelper {
    // Setup Intial breakpoints and register events to fire when breakpoints are crossed
    constructor() {
        if (!instance) {
            instance = this;
        }

        const bpValues = breakpoints;
        const xsMax = bpValues.sm - 1;
        const smMin = bpValues.sm;
        const smMax = bpValues.md - 1;
        const mdMin = bpValues.md;
        const mdMax = bpValues.lg - 1;
        const lgMin = bpValues.lg;

        this.breakpoints = isRenderingOnServer
            ? {}
            : {
                xs: browser.window.matchMedia(`only screen and (max-width: ${xsMax}px)`),
                sm: browser.window.matchMedia(
                    `only screen
                    and (min-width: ${smMin}px)
                    and (max-width: ${smMax}px)`
                ),
                md: browser.window.matchMedia(
                    `only screen
                    and (min-width: ${mdMin}px)
                    and (max-width: ${mdMax}px)`
                ),
                lg: browser.window.matchMedia(`only screen and (min-width: ${lgMin}px)`),
            };

        this.bpOrder = Object.keys(this.breakpoints);
        this.registerMatchMediaEvents();

        return instance;
    }


    // Helper to evaluate if the evalutationBP is above the switchpoint
    // Useful if you want to execute code for every breakpoint above the switchPoint
    // Use:
    //     AdaptiveComponentHelper.greaterThan('md', 'lg'); // returns true lg is larger than md
    //     AdaptiveComponentHelper.greaterThan('md', 'sm'); // returns false sm is smaller than md
    //     AdaptiveComponentHelper.greaterThan('md', 'md'); // returns false the operator is not >=
    // Return: bool
    greaterThan(switchPoint, evaluationBP) {
        if (isRenderingOnServer) return;

        const spIdx = this.bpOrder.indexOf(switchPoint);
        const eIdx = this.bpOrder.indexOf(evaluationBP);

        return (eIdx > spIdx);
    }

    // Commenting out for now, We're going to try to not use lessThan, but may want it later
    // lessThan(switchPoint, evaluationBP){
    //     const spIdx = this.bpOrder.indexOf(switchPoint);
    //     const eIdx = this.bpOrder.indexOf(evaluationBP);
    //     console.log(evaluationBP + ' is less than ' + switchPoint);
    //     return (eIdx < spIdx);
    // }

    // Return the breakpoint string at the current window Size,
    // useful for setting initial state on the component triggering re-renders
    getCurrentBreakpoint() {
        if (isRenderingOnServer) return 'sm';

        const bpStrings = Object.keys(this.breakpoints);

        for (let i = 0; i < bpStrings.length; i++) {
            if (this.breakpoints[bpStrings[i]].matches) {
                return bpStrings[i];
            }
        }

        // If we iterate through all the breakpoins and don't match anything,
        // return largest breakpoint
        return bpStrings[3];
    }

    // Register a component and it's callback to be triggered when we cross a breakpoint
    registerAdaptiveComponent(component, callback) {
        if (isRenderingOnServer) return;

        registeredAdaptiveComponents.set(component, callback);
    }

    // Remove the notification, usually called in componentWillUnmount() calls
    deregisterAdaptiveComponent(component) {
        if (isRenderingOnServer) return;

        registeredAdaptiveComponents.delete(component);
    }

    // Registers one Breakpoint listener for each item in this.Breakpoints
    // On hitting one of the breakpoint change overs,
    // Fires one callback for each component registered in registeredAdaptiveComponents
    registerMatchMediaEvents() {
        if (isRenderingOnServer) return;

        const bpCount = this.bpOrder.length;
        for (let i = 0; i < bpCount; i++) {
            const breakPointKey = this.bpOrder[i];
            this.triggerRegisteredCallbacks(breakPointKey);
        }
    }

    triggerRegisteredCallbacks(breakPointKey) {
        if (isRenderingOnServer) return;
        this.breakpoints[breakPointKey].addListener((mediaQueryList) => {
            // If no components are registered, don't boter with the callbacks list
            const componentsRegistered = registeredAdaptiveComponents.size;

            if (componentsRegistered && mediaQueryList.matches) {

                registeredAdaptiveComponents.forEach((callback) => callback(breakPointKey));
                // ^ `Set` objects cannot be destructured
            }
        });
    }
}

export default new AdaptiveComponentHelper();
