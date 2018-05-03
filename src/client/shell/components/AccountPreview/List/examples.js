const examples = [];

examples.push({
    description: 'Displays a list of Account Previews',
    style: { maxWidth: '380px' },
    config: {
        items: [
            {
                avatar: 'https://de4pwptp22sm7.cloudfront.net/users/logos/25418/display/data.png?1449000171',
                balance: '$240.00',
                isCurrent: true,
                location: '#',
                name: 'Rick Sanchez',
                accountType: 'personal',
            },
            {
                avatar: 'https://staging.chimp.net/assets/avatars/chimp-icon-company.png',
                balance: '$5000.00',
                location: '#',
                name: 'Get Schwifty',
                accountType: 'company',
            },
        ],
    },
});

examples.push({
    description: 'Displays a list of Account Previews with a link to more',
    style: { maxWidth: '380px' },
    config: {
        heading: 'Switch Accounts',
        items: [
            {
                avatar: 'https://de4pwptp22sm7.cloudfront.net/users/logos/25418/display/data.png?1449000171',
                balance: '$240.00',
                isCurrent: true,
                location: '#',
                name: 'Rick Sanchez',
                accountType: 'personal',
            },
            {
                avatar: 'https://staging.chimp.net/assets/avatars/chimp-icon-company.png',
                balance: '$5000.00',
                location: '#',
                name: 'Get Schwifty',
                accountType: 'company',
            },
            {
                avatar: 'https://staging.chimp.net/assets/avatars/chimp-icon-company.png',
                balance: '$86000.00',
                location: '#',
                name: 'The Banana Stand',
                accountType: 'company',
            },
            {
                avatar: 'https://staging.chimp.net/assets/avatars/chimp-icon-charity.png',
                balance: '$800.00',
                location: '#',
                name: 'Good Companions 50 Plus Club',
                accountType: 'charity',
            },
            {
                avatar: 'https://staging.chimp.net/assets/avatars/chimp-icon-charity.png',
                balance: '$30.00',
                location: '#',
                name: 'Macdonald Dettwiler Space And Advanced Robotics Ltd Employees Charity Trust',
                accountType: 'charity',
            },
            {
                avatar: 'https://staging.chimp.net/assets/avatars/chimp-icon-charity.png',
                balance: '$287.00',
                location: '#',
                name: 'Pipsqueak Paddocks Miniature Horse Haven Society',
                accountType: 'charity',
            },
        ],
        moreLink: 'See 5 more Accounts',
    },
});

module.exports = examples;
