import _ from 'lodash';

// import store from 'client/store';
import server from 'client/common/communications';


// convert array to a hash with keys matching values
export default _.keyBy([
    'OPEN_DRAWER',
    'CLOSE_DRAWER',
    'TRIGGER_ALLOCATION_ONBOARDING',
]);

export const cancelGiveTooltips = () => {
    // const id = store.getState().onboarding.activeOnboarding.id;
    const id = null;
    server.put('/api/v1/onboardings', id, { state: 'dismissed' });
    return { type: 'CANCEL_ALLOCATION_ONBOARDING' };
};
