const initialState = {
    showOverlay: false,
    isLight: true,
    showWelcomeModal: false,
    activeOnboarding: null,
};

const onboarding = (state = initialState, action) => {
    switch (action.type) {
    case 'SHOW_OVERLAY':
        return Object.assign({}, state, {
            showOverlay: true,
            isLight: action.payload.isLight,
        });
    case 'HIDE_OVERLAY':
        return Object.assign({}, state, {
            showOverlay: false,
            isLight: true, // Reset to default color
        });
    case 'OPEN_WELCOME_MODAL':
        return Object.assign({}, state, {
            showOverlay: true,
            isLight: false,
            showWelcomeModal: true,
        });
    case 'CLOSE_WELCOME_MODAL':
        return Object.assign({}, state, {
            showOverlay: false,
            isLight: false,
            showWelcomeModal: false,
        });
    case 'SET_ACTIVE_ONBOARDING':
        return Object.assign({}, state, {
            activeOnboarding: action.payload.onboarding,
        });
    default:
        return state;
    }
};

export default onboarding;
