// SignUpForm Component Examples
// Push additional examples to the array to output different states of your component to the
// styleguide
const examples = [];


examples.push({
    description: 'Community Sign Up Form Component',
    style: {},
    config: {
        routes: {
            accountAgreement: '/chimp-account-agreement',
        },
    },
});

examples.push({
    description: 'Community Sign Up Form with Errors',
    style: {},
    config: {
        routes: {
            accountAgreement: '/chimp-account-agreement',
        },
        formErrors: [
            'Oh no!',
            'Hmm, we couldn\'t register you with that info.',
        ],
    },
});

module.exports = examples;
