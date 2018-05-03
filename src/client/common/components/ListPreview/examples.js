const examples = [];


examples.push({
    description: 'Displays a list with an optional heading, icons, and arrow',
    style: {},
    config: {
        heading: 'Optional Title',
        showArrow: true,
        button: {
            title: 'See More',
            url: '#',
        },
        items: [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
            { name: 'Accounts', link: '#', type: 'Beneficiary' },
            { name: 'Fees', link: '#', type: 'Beneficiary' },
            { name: 'No Icon', link: '#', type: 'No Icon' },
        ],
    },
});


examples.push({
    description: `Displays a list with an optional heading,icons and NO
        ARROW and maximum items is set to 2`,
    style: {},
    config: {
        heading: 'Optional Title',
        showArrow: false,
        maxShow: 2,
        button: {
            title: 'See More',
            url: '#',
        },
        items: [
            { name: 'Kinetic Knights Robotics', link: '#', type: 'Group' },
            { name: 'First Robotics Canada', link: '#', type: 'Group' },
            { name: 'Community', link: '#', type: 'Beneficiary' },
            { name: 'Accounts', link: '#', type: 'Beneficiary' },
            { name: 'Fees', link: '#', type: 'Beneficiary' },
            { name: 'No Icon', link: '#', type: 'No Icon' },
        ],
    },
});


module.exports = examples;
