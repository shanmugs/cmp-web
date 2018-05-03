// Welcome Modal
// ===
//
// Responsive global header component
//
import { connect } from 'react-redux';
import { closeWelcomeModal } from 'client/users/views/onboarding/actions';

// UI components
// ---
import WelcomeModal from './welcome-modal';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    closeWelcomeModal: () => dispatch(closeWelcomeModal()),
});

const WelcomeModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeModal);

export default WelcomeModalContainer;
