// CalloutAvatar Component Examples

// Push additional examples to the array to output different states of your component to the
// styleguide
const examples = [];

examples.push({
    description: 'Info',
    style: {},
    config: {
        type: 'info',
        children: 'An info Alert',
    },
});

examples.push({
    description: 'Success',
    style: {},
    config: {
        type: 'success',
        children: 'An Success Alert',
    },
});
examples.push({
    description: 'Warning',
    style: {},
    config: {
        type: 'warning',
        children: 'An warning Alert',
    },
});
examples.push({
    description: 'Error',
    style: {},
    config: {
        type: 'error',
        children: 'An error Alert',
    },
});


module.exports = examples;
