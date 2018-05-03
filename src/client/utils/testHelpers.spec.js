import { resetStore } from 'client/common/store';

// Why this works: https://mochajs.org/#root-level-hooks
// Need to reset the store after every test case. This sets it back to the initialState defined in
// /config/testState.js
afterEach(function() {
    resetStore();
});
