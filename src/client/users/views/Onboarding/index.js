// Onboarding Container to hook onboarding up to the global store
// ===
//
import { connect } from 'react-redux';
import {
    triggerOverlay,
    openWelcomeModal,
    setActiveOnboarding,
} from './actions';

import {
    cancelGiveTooltips,
    enableGiveTooltips,
    getUserDetails,
} from 'client/shell/components/header/actions';

// UI components
// ---
import Onboarding from './onboarding';


const mapStateToProps = (state) => state.onboarding;

const mapDispatchToProps = (dispatch) => ({
    triggerOverlay: (isLight) => dispatch(triggerOverlay(isLight)),
    openWelcomeModal: () => dispatch(openWelcomeModal()),
    enableGiveTooltips: () => dispatch(enableGiveTooltips()),
    cancelGiveTooltips: () => dispatch(cancelGiveTooltips()),
    setActiveOnboarding: (onboarding) => dispatch(setActiveOnboarding(onboarding)),
});

const OnboardingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Onboarding);


// Use default export for the connected component (for app)
export { Onboarding };
export default OnboardingContainer;
