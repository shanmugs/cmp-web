import _ from 'lodash';

export default function whenAllPromisesSettled(...args) {
    const promises = _.toArray(args);

    // NOTE: some args MAY be arrays-of-promises; these are handled by recursion
    let remaining = promises.length;
    // let uid = `WLPS_${Math.floor(Math.random() * 100)}`;

    // return resolved promise if no promises were passed
    if (!remaining) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        for (const promise of promises) {
            // any argument can be an array of more promises
            if (_.isArray(promise)) {
                // handle array by calling recursively, with array _spread_ to individual arguments
                whenAllPromisesSettled(...promise)
                    .then(settled)
                    .catch(settledWithError);
            }
            else if (!promise || !promise.then) {
                // NOT A VALID PROMISE!
                settled();
            }
            else {
                promise
                    .then(settled)
                    .catch(settledWithError);
            }
        }

        // in case no promises passed!
        checkIfAllDone();


        function checkIfAllDone() {
            if (remaining === 0) {
                resolve();
            }
        }

        function settled(err) {
            remaining--;
            checkIfAllDone();
        }

        function settledWithError(err) {
            // Avoid messages that are just '0' - not sure why we get these?
            if (err && err.message && err.message.length > 2) {
                console.warn(err.message);
            }
            settled();
        }
    });
}
