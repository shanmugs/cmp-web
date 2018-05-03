const examples = [];

const routes = {
    donate: '#',
};

examples.push({
    description: 'Displays a summary of a user account balance',
    style: {},
    config: {
        button: {
            title: 'Add Money',
            url: '#',
        },
        inYourAccount: ' in your Account',
        balance: '$1,630.00',
        routes,
    },
});

module.exports = examples;
