const examples = [];

examples.push({
    description: 'Check this example out ',
    style: {
        backgroundColor: '#6C7D82',
    },
    config: {
        navItems: [
            {
                name: 'Features',
                location: '/features',
                subnav: {
                    sections: [],
                    links: [
                        {
                            name: 'Fundraising',
                            location: '/fundraising',
                        },
                        {
                            name: 'Ways to give',
                            location: '/ways-to-give',
                        },
                        {
                            name: 'Community',
                            location: '/community',
                        },
                        {
                            name: 'Accounts',
                            location: '/accounts',
                        },
                        {
                            name: 'Fees',
                            location: '/fees',
                        },
                        {
                            name: 'Trust',
                            location: '/trust',
                        },
                    ],
                },
            },
            {
                name: 'Solutions',
                location: '/Solutions',
                subnav: {
                    sections: [
                        {
                            location: '/individuals',
                            title: 'Individuals',
                            description: `You change the world. Make your giving
                                easier and more impactful.`,
                        },
                        {
                            location: '/workplace',
                            title: 'Workplace',
                            description: `Engage with employees and customers
                                in creating meaningful impact.`,
                        },
                        {
                            location: '/giving-groups',
                            title: 'Groups',
                            description: `Make an impact with your friends,
                                family and co-workers.`,
                        },
                        {
                            location: '/charities',
                            title: 'Charities',
                            description: `Share your story with an engaged community
                                of donors.`,
                        },
                    ],
                    heading: 'More Solutions',
                    links: [
                        {
                            name: 'Philanthropists',
                            location: '/philanthropists',
                        },
                        {
                            name: 'Education',
                            location: '/education',
                        },
                        {
                            name: 'Sports',
                            location: '/sports',
                        },
                        {
                            name: 'Funding Orgs',
                            location: '/funding-organizations',
                        },
                        {
                            name: 'Events',
                            location: '/events',
                        },
                        {
                            name: 'Families',
                            location: '/families',
                        },
                    ],
                },
            },
            {
                name: 'About',
                location: '/about',
                subnav: {
                    sections: [],
                    links: [
                        {
                            name: 'About Us',
                            location: '/about',
                        },
                        {
                            name: 'Our Story',
                            location: '/our-story',
                        },
                        {
                            name: 'Chimp Foundation',
                            location: '/chimp-foundation',
                        },
                        {
                            name: 'Team',
                            location: '/team',
                        },
                        {
                            name: 'Careers',
                            location: '/careers',
                        },
                        {
                            name: 'Press',
                            location: '/press',
                        },
                    ],
                },
            },
            {
                name: 'Support',
                location: '/support',
                subnav: {
                    sections: [],
                    links: [
                        {
                            name: 'Contact Us',
                            location: 'contact',
                        },
                        {
                            name: 'Help Centre',
                            location: 'http://help.chimp.net',
                        },
                    ],
                },
            },
        ],
        authentication: {
            isAuthenticated: false,
        },
        legacyMode: false,
        overlay: false,
        lightText: true,
        searchEndpoint: 'https://local.chimp.net:3000/',
        routes: {
            root: '/',
            logIn: '/login',
            signUp: '/users/new',
            createGroup: '/groups/new',
            donate: '/donations/new',
            give: '/give',
            send: '/give/to/friend/new',
        },
    },
});

examples.push({
    description: 'Dark Style',
    style: {},
    config: {
        navItems: [
                {
                    name: 'Features',
                    location: '/features',
                    subnav: {
                        sections: [],
                        links: [
                            {
                                name: 'Fundraising',
                                location: '/fundraising',
                            },
                            {
                                name: 'Ways to give',
                                location: '/ways-to-give',
                            },
                            {
                                name: 'Community',
                                location: '/community',
                            },
                            {
                                name: 'Accounts',
                                location: '/accounts',
                            },
                            {
                                name: 'Fees',
                                location: '/fees',
                            },
                            {
                                name: 'Trust',
                                location: '/trust',
                            },
                        ],
                    },
                },
                {
                    name: 'Solutions',
                    location: '/Solutions',
                    subnav: {
                        sections: [
                            {
                                location: '/individuals',
                                title: 'Individuals',
                                description: `You change the world. Make your giving
                                    easier and more impactful.`,
                            },
                            {
                                location: '/workplace',
                                title: 'Workplace',
                                description: `Engage with employees and customers
                                    in creating meaningful impact.`,
                            },
                            {
                                location: '/giving-groups',
                                title: 'Groups',
                                description: `Make an impact with your friends,
                                    family and co-workers.`,
                            },
                            {
                                location: '/charities',
                                title: 'Charities',
                                description: `Share your story with an engaged community
                                    of donors.`,
                            },
                        ],
                        heading: 'More Solutions',
                        links: [
                            {
                                name: 'Philanthropists',
                                location: '/philanthropists',
                            },
                            {
                                name: 'Education',
                                location: '/education',
                            },
                            {
                                name: 'Sports',
                                location: '/sports',
                            },
                            {
                                name: 'Funding Orgs',
                                location: '/funding-organizations',
                            },
                            {
                                name: 'Events',
                                location: '/events',
                            },
                            {
                                name: 'Families',
                                location: '/families',
                            },
                        ],
                    },
                },
                {
                    name: 'About',
                    location: '/about',
                    subnav: {
                        sections: [],
                        links: [
                            {
                                name: 'About Us',
                                location: '/about',
                            },
                            {
                                name: 'Our Story',
                                location: '/our-story',
                            },
                            {
                                name: 'Chimp Foundation',
                                location: '/chimp-foundation',
                            },
                            {
                                name: 'Team',
                                location: '/team',
                            },
                            {
                                name: 'Careers',
                                location: '/careers',
                            },
                            {
                                name: 'Press',
                                location: '/press',
                            },
                        ],
                    },
                },
                {
                    name: 'Support',
                    location: '/support',
                    subnav: {
                        sections: [],
                        links: [
                            {
                                name: 'Contact Us',
                                location: 'contact',
                            },
                            {
                                name: 'Help Centre',
                                location: 'http://help.chimp.net',
                            },
                        ],
                    },
                },
        ],
        authentication: {
            isAuthenticated: false,
        },
        legacyMode: false,
        overlay: false,
        lightText: false,
        searchEndpoint: 'https://local.chimp.net:3000/',
        routes: {
            root: '/',
            logIn: '/login',
            signUp: '/users/new',
            createGroup: '/groups/new',
            donate: '/donations/new',
            give: '/give',
            send: '/give/to/friend/new',
        },
    },
});

examples.push({
    description: 'Authenticated Header',
    style: {},
    config: {
        navItems: [
                {
                    name: 'Features',
                    location: '/features',
                    subnav: {
                        sections: [],
                        links: [
                            {
                                name: 'Fundraising',
                                location: '/fundraising',
                            },
                            {
                                name: 'Ways to give',
                                location: '/ways-to-give',
                            },
                            {
                                name: 'Community',
                                location: '/community',
                            },
                            {
                                name: 'Accounts',
                                location: '/accounts',
                            },
                            {
                                name: 'Fees',
                                location: '/fees',
                            },
                            {
                                name: 'Trust',
                                location: '/trust',
                            },
                        ],
                    },
                },
                {
                    name: 'Solutions',
                    location: '/Solutions',
                    subnav: {
                        sections: [
                            {
                                location: '/individuals',
                                title: 'Individuals',
                                description: `You change the world. Make your giving
                                    easier and more impactful.`,
                            },
                            {
                                location: '/workplace',
                                title: 'Workplace',
                                description: `Engage with employees and customers
                                    in creating meaningful impact.`,
                            },
                            {
                                location: '/giving-groups',
                                title: 'Groups',
                                description: `Make an impact with your friends,
                                    family and co-workers.`,
                            },
                            {
                                location: '/charities',
                                title: 'Charities',
                                description: `Share your story with an engaged community
                                    of donors.`,
                            },
                        ],
                        heading: 'More Solutions',
                        links: [
                            {
                                name: 'Philanthropists',
                                location: '/philanthropists',
                            },
                            {
                                name: 'Education',
                                location: '/education',
                            },
                            {
                                name: 'Sports',
                                location: '/sports',
                            },
                            {
                                name: 'Funding Orgs',
                                location: '/funding-organizations',
                            },
                            {
                                name: 'Events',
                                location: '/events',
                            },
                            {
                                name: 'Families',
                                location: '/families',
                            },
                        ],
                    },
                },
                {
                    name: 'About',
                    location: '/about',
                    subnav: {
                        sections: [],
                        links: [
                            {
                                name: 'About Us',
                                location: '/about',
                            },
                            {
                                name: 'Our Story',
                                location: '/our-story',
                            },
                            {
                                name: 'Chimp Foundation',
                                location: '/chimp-foundation',
                            },
                            {
                                name: 'Team',
                                location: '/team',
                            },
                            {
                                name: 'Careers',
                                location: '/careers',
                            },
                            {
                                name: 'Press',
                                location: '/press',
                            },
                        ],
                    },
                },
                {
                    name: 'Support',
                    location: '/support',
                    subnav: {
                        sections: [],
                        links: [
                            {
                                name: 'Contact Us',
                                location: 'contact',
                            },
                            {
                                name: 'Help Centre',
                                location: 'http://help.chimp.net',
                            },
                        ],
                    },
                },
        ],
        authentication: {
            isAuthenticated: true,
            accounts: [
                {
                    name: 'test',
                    link: '/contexts/60150',
                    avatar: '/assets/avatars/chimp-icon-company.png',
                    created_at: '2016-01-15T13:17:42.000-08:00',
                },
            ],
            groups: [
                {
                    name: 'The Bacon Group',
                    link: '/campaigns/test-de3fdf25-dc25-4a0a-b27a-cebd40959838',
                    avatar: '/assets/avatars/chimp-icon-giving-group.png',
                    created_at: '2016-01-12T11:42:36.000-08:00',
                },
                {
                    name: 'Dawn to dusk animal sanctuary',
                    link: '/campaigns/test-de3fdf25-dc25-4a0a-b27a-cebd40959838',
                    avatar: '/assets/avatars/chimp-icon-giving-group.png',
                    created_at: '2016-01-12T11:42:36.000-08:00',
                },
                {
                    name: 'test3',
                    link: '/campaigns/test-de3fdf25-dc25-4a0a-b27a-cebd40959838',
                    avatar: '/assets/avatars/chimp-icon-giving-group.png',
                    created_at: '2016-01-12T11:42:36.000-08:00',
                },
                {
                    name: 'test4',
                    link: '/campaigns/test-de3fdf25-dc25-4a0a-b27a-cebd40959838',
                    avatar: '/assets/avatars/chimp-icon-giving-group.png',
                    created_at: '2016-01-12T11:42:36.000-08:00',
                },
                {
                    name: 'test5',
                    link: '/campaigns/test-de3fdf25-dc25-4a0a-b27a-cebd40959838',
                    avatar: '/assets/avatars/chimp-icon-giving-group.png',
                    created_at: '2016-01-12T11:42:36.000-08:00',
                },
                {
                    name: 'test6',
                    link: '/campaigns/test-de3fdf25-dc25-4a0a-b27a-cebd40959838',
                    avatar: '/assets/avatars/chimp-icon-giving-group.png',
                    created_at: '2016-01-12T11:42:36.000-08:00',
                },
            ],
            campaigns: [
                {
                    name: 'YWAM Canada',
                    link: '/campaigns/ywam-canada',
                    avatar: '/system/groups/logos/629/display/data.png?1440089969',
                    created_at: '2013-12-16T14:24:59.000-08:00',
                },
                {
                    name: 'YWAM Canada',
                    link: '/campaigns/ywam-canada',
                    avatar: '/system/groups/logos/629/display/data.png?1440089969',
                    created_at: '2013-12-16T14:24:59.000-08:00',
                },
                {
                    name: 'YWAM Canada',
                    link: '/campaigns/ywam-canada',
                    avatar: '/system/groups/logos/629/display/data.png?1440089969',
                    created_at: '2013-12-16T14:24:59.000-08:00',
                },
            ],
            currentAccount: {
                name: 'test',
                balance: '$0.00',
                avatar: '/assets/avatars/chimp-icon-individual.png',
                accountType: 'personal',
            },
            routes: {
                accountSettings: '/user/edit',
                accountTaxReceipt: '/user/tax-receipts',
                accountTools: '/user/giving-tools',
                adminDashboard: '/chimp-admin/dashboard',
                logout: '/logout',
            },
        },
        legacyMode: false,
        overlay: false,
        lightText: false,
        searchEndpoint: 'https://local.chimp.net:3000/',
        routes: {
            root: '/',
            logIn: '/login',
            signUp: '/users/new',
            createGroup: '/groups/new',
            donate: '/donations/new',
            give: '/give',
            send: '/give/to/friend/new',
        },
    },
});

module.exports = examples;
