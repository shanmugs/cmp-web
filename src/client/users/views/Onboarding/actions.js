export const triggerOverlay = (isLight = true) => ({ type: 'SHOW_OVERLAY', payload: { isLight } });
export const hideOverlay = (isLight = true) => ({ type: 'HIDE_OVERLAY', payload: { isLight } });
export const openWelcomeModal = () => ({ type: 'OPEN_WELCOME_MODAL' });
export const closeWelcomeModal = () => ({ type: 'CLOSE_WELCOME_MODAL' });

export const setActiveOnboarding = (onboarding) => ({
    type: 'SET_ACTIVE_ONBOARDING',
    payload: {
        onboarding,
    },
});
