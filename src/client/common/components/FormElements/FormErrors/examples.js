const examples = [];

examples.push({
    description: 'Displays a form error message',
    config: {
        showIcon: true,
        errorsArray: [
            'Sorry it doesn\'t look like this email adddress has been approved by Capital Power',
            'Your password is too short.',
        ],
    },
});

module.exports = examples;
