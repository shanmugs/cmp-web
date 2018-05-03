// OnboardingView
// ===
//
// This component handles the logic for rendering the onboarding experience

// Vendor components
// ---
// Import plugins from our node_modules directory
import PropTypes from 'prop-types';

import React from 'react';
import _ from 'lodash';

// UI components
// ---
import WelcomeModal from 'client/users/components/WelcomeModal';
import Overlay from 'client/common/components/Overlay';

// Helpers
// ---
import helpers from 'client/common/helpers/helpers';

// Import other components as dependencies
class OnboardingView extends React.Component {
    constructor(props) {
        super();

        // If we recieve props from the authentication API to say open modal
        // Fire off the openWelcome Modal
        const triggerWelcomeModal = props.authentication.onboarding.triggerWelcomeModal;
        if (triggerWelcomeModal) {
            props.openWelcomeModal();
        }

        // This object is used to map the API response to redux actions in the FE
        // As more possible after welcome panel onboarding types are added,
        // we need to add entries to this object.
        //
        // key (string): value we expect in authentication.onboarding.onboardings.onboarding_type
        // value (object) {
        //    open (func) method to fire after clicking though all  welcome panels
        //    close (func) method to fire when welcome modal 'x' is clicked
        // }
        this.onboardingMap = {
            giving: {
                open: props.enableGiveTooltips,
                close: props.cancelGiveTooltips,
            },
        };

        // Header onboarding only executes on the dashboard route
        if (helpers.getPathname().trim() === '/dashboard') {
            // Parse the props from the API and return the first Onboarding that matches something
            // in our onboarding Map. Call setActiveOnboarding with that returned onboarding.
            const activeOnboarding = this.getActiveOnboarding(
                props.authentication.onboarding.onboardings,
                this.onboardingMap
            );

            activeOnboarding && props.setActiveOnboarding(activeOnboarding);
        }
    }

    // Iterate though the the onboardingArray and compare it's onboarding_types to the keys in
    // the onboardingMap. Extract the properties we care about and merge in the open and close
    // methods from the onboardingMap for that type.
    //
    // param (array) onboardingArray: array of onboarding objects from API
    // param (object) onboardingMap: object keyed by onboarding type with open and close actions
    //
    // returns (object)
    // {
    //     id (number)
    //     state (null | string)
    //     type (string)
    //     openAction (func)
    //     closeAction (func)
    // }
    getActiveOnboarding(onboardingArray, onboardingMap) {
        let activeOnboarding = null;

        _.some(onboardingArray, (onboarding) => { // eslint-disable-line consistent-return
            const onboardingType = onboarding.onboarding_type;

            if (_.has(onboardingMap, onboardingType)) {
                activeOnboarding = {
                    id: onboarding.id,
                    state: onboarding.state,
                    type: onboardingType,
                };
                return true; // returning true in _.some() breaks the loop
            }
        });

        return activeOnboarding;
    }

    // Can render the Welcome Modal on the overlay or just an overlay for other components to
    // sit on top of
    render() {
        const props = this.props;
        let Modal = null;

        const isActive = props.activeOnboarding && !props.activeOnboarding.state;
        const onboardingActions = isActive && this.onboardingMap[props.activeOnboarding.type];

        // If showWelcomeModal is true, defer the onboarding open until the finish of the modal
        // panels. Otherwise execute the onboarding.open() immidatly
        if (props.showWelcomeModal) {
            // pass close/finish callbacks to the welcome Modal if an activeOnboarding is found.
            Modal = (
                <WelcomeModal
                    onFinish={isActive && onboardingActions.open}
                    onClose={isActive && onboardingActions.close}
                    assetPath={props.assetPath}
                />
            );
        } else {
            isActive && onboardingActions.open();
        }


        return props.showOverlay && (
            <Overlay isLight={props.isLight}>
                {Modal}
            </Overlay>
        );
    }
}
const {
    arrayOf,
    bool,
    func,
    oneOf,
    shape,
    string,
    number,
} = PropTypes;

OnboardingView.defaultProps = {
    authentication: {
        onboarding: {
            triggerWelcomeModal: false,
        },
    },
    activeOnboarding: null,
    showOverlay: false,
    isLight: true,
    showWelcomeModal: false,
    openWelcomeModal: () => {},
};

// Explicitly state the type of properties you expect here
OnboardingView.propTypes = {
    authentication: shape({
        onboarding: shape({
            triggerWelcomeModal: bool,
            onboardings: arrayOf(shape({
                onboarding_type: oneOf(['giving']),
            })),
        }),
    }),
    activeOnboarding: shape({
        id: number.isRequired,
        type: string.isRequired,
        state: string,
    }),
    showWelcomeModal: bool,
    openWelcomeModal: func,
    enableGiveTooltips: func,
    cancelGiveTooltips: func,
    setActiveOnboarding: func,
    assetPath: string,
    isLight: bool,
    showOverlay: bool,
};

export default OnboardingView;