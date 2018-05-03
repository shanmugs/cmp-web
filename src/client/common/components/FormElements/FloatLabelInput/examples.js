// FloatLabel Component Examples
// Push additional examples to the array to output different states of your component to the
// styleguide
const examples = [];

examples.push({
    description: 'Float label',
    style: {},
    config: {
        inputId: 'email',
        labelText: 'Email',
    },
});

examples.push({
    description: 'Float label with pre-populated value',
    style: {},
    config: {
        inputId: 'email',
        labelText: 'Email',
        inputValue: 'rick@chimp.net',
        isDisabled: true,
    },
});

const fieldErrors = new Map();
fieldErrors.set('email', ['Email is required.', 'Email is not valid.']);
examples.push({
    description: 'Float label with errors',
    style: {},
    config: {
        inputId: 'email',
        labelText: 'Email',
        errors: fieldErrors,
    },
});

module.exports = examples;
