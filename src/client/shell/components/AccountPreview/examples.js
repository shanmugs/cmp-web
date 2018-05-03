const examples = [];

examples.push({
    description: 'Displays an account preview with avatar, balance and type.',
    style: { maxWidth: '380px' },
    config: {
        avatar: 'https://de4pwptp22sm7.cloudfront.net/users/logos/25418/display/data.png?1449000171',
        balance: '$240.00',
        name: 'Rick Sanchez',
        accountType: 'personal',
    },
});

examples.push({
    description: 'Account Preview of current account',
    style: { maxWidth: '380px' },
    config: {
        avatar: 'https://dm3ijwouzgfsd.cloudfront.net/assets/avatars/chimp-icon-individual.png',
        balance: '$50.00',
        isCurrent: true,
        name: 'Summer Smith',
        accountType: 'personal',
    },
});

module.exports = examples;
