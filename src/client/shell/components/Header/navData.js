// Vendor Components
// ---
import {
    defineMessages,
} from 'react-intl';

// Messages
// ---
const messageList = defineMessages({
    navFeatures: {
        id: 'header.navigation.features',
        defaultMessage: 'Features',
    },
    navFundraising: {
        id: 'header.navigation.fundraising',
        defaultMessage: 'Fundraising',
    },
    navWaysToGive: {
        id: 'header.navigation.waysToGive',
        defaultMessage: 'Ways to give',
    },
    navCommunity: {
        id: 'header.navigation.community',
        defaultMessage: 'Community',
    },
    navAccounts: {
        id: 'header.navigation.accounts',
        defaultMessage: 'Accounts',
    },
    navFees: {
        id: 'header.navigation.fees',
        defaultMessage: 'Fees',
    },
    navTrust: {
        id: 'header.navigation.trust',
        defaultMessage: 'Trust',
    },
   navSolutions: {
        id: 'header.navigation.solutions',
        defaultMessage: 'Solutions',
    },
    navIndividuals: {
        id: 'header.navigation.individuals',
        defaultMessage: 'Individuals',
    },
    navIndividualsDesc: {
        id: 'header.navigation.individuals.description',
        defaultMessage: 'You change the world. Make your giving easier and more impactful.',
    },
    navWorkplace: {
        id: 'header.navigation.workplace',
        defaultMessage: 'Workplace',
    },
    navWorkplaceDesc: {
        id: 'header.navigation.workplace.description',
        defaultMessage: 'Engage with employees and customers in creating meaningful impact.',
    },
    navGroups: {
        id: 'header.navigation.groups',
        defaultMessage: 'Groups',
    },
    navGroupsDesc: {
        id: 'header.navigation.groups.description',
        defaultMessage: 'Make an impact with your friends, family and co-workers.',
    },
    navCharities: {
        id: 'header.navigation.groups.charities',
        defaultMessage: 'Charities',
    },
    navCharitiesDesc: {
        id: 'header.navigation.groups.charities.description',
        defaultMessage: 'Share your story with an engaged community of donors.',
    },
    navMoreSolutions: {
        id: 'header.navigation.moreSolutions',
        defaultMessage: 'More Solutions',
    },
    navPhilanthropists: {
        id: 'header.navigation.philanthropists',
        defaultMessage: 'Philanthropists',
    },
    navEducation: {
        id: 'header.navigation.education',
        defaultMessage: 'Education',
    },
    navSports: {
        id: 'header.navigation.sports',
        defaultMessage: 'Sports',
    },
    navFundingOrgs: {
        id: 'header.navigation.fundingOrgs',
        defaultMessage: 'Funding Orgs',
    },
    navEvents: {
        id: 'header.navigation.events',
        defaultMessage: 'Events',
    },
    navFamilies: {
        id: 'header.navigation.families',
        defaultMessage: 'Families',
    },
    navAbout: {
        id: 'header.navigation.about',
        defaultMessage: 'About',
    },
    navAboutUs: {
        id: 'header.navigation.aboutUs',
        defaultMessage: 'About Us',
    },
    navOurStory: {
        id: 'header.navigation.ourStory',
        defaultMessage: 'Our Story',
    },
    navChimpFoundation: {
        id: 'header.navigation.chimpFoundation',
        defaultMessage: 'Chimp Foundation',
    },
    navTeam: {
        id: 'header.navigation.team',
        defaultMessage: 'Team',
    },
    navCareers: {
        id: 'header.navigation.careers',
        defaultMessage: 'Careers',
    },
    navPress: {
        id: 'header.navigation.press',
        defaultMessage: 'Press',
    },
    navSupport: {
        id: 'header.navigation.support',
        defaultMessage: 'Support',
    },
    navContactUs: {
        id: 'header.navigation.contactUs',
        defaultMessage: 'Contact Us',
    },
    navHelpCentre: {
        id: 'header.navigation.helpCentre',
        defaultMessage: 'Help Centre',
    },
});

export default (intl) => {
    const { formatMessage } = intl;

    return [
        {
          name: formatMessage(messageList.navFeatures),
          location: "/features",
          subnav: {
             sections: [

             ],
             links: [
                {
                   name: formatMessage(messageList.navFundraising),
                   location: "/fundraising",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navWaysToGive),
                   location: "/ways-to-give",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navCommunity),
                   location: "/community",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navAccounts),
                   location: "/accounts",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navFees),
                   location: "/fees",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navTrust),
                   location: "/trust",
                   isExternal: true,
                }
             ]
          }
        },
        {
          name: formatMessage(messageList.navSolutions),
          location: "/Solutions",
          subnav: {
             sections: [
                {
                   location: "/individuals",
                   title: formatMessage(messageList.navIndividuals),
                   description: formatMessage(messageList.navIndividualsDesc),
                   isExternal: true,
                },
                {
                   location: "/workplace",
                   title: formatMessage(messageList.navWorkplace),
                   description: formatMessage(messageList.navWorkplaceDesc),
                   isExternal: true,
                },
                {
                   location: "/giving-groups",
                   title: formatMessage(messageList.navGroups),
                   description: formatMessage(messageList.navGroupsDesc),
                   isExternal: true,
                },
                {
                   location: "/charities",
                   title: formatMessage(messageList.navCharities),
                   description: formatMessage(messageList.navCharitiesDesc),
                   isExternal: true,
                }
             ],
             heading: formatMessage(messageList.navMoreSolutions),
             links: [
                {
                   name: formatMessage(messageList.navPhilanthropists),
                   location: "/philanthropists",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navEducation),
                   location: "/education",
                   isExternal: true,
                },
                {
                   "name": formatMessage(messageList.navSports),
                   "location":"/sports",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navFundingOrgs),
                   location: "/funding-organizations",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navEvents),
                   location: "/events",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navFamilies),
                   location: "/families",
                   isExternal: true,
                }
             ]
          }
        },
        {
          name: formatMessage(messageList.navAbout),
          location: "/about",
          subnav: {
             sections: [

             ],
             links: [
                {
                   name: formatMessage(messageList.navAboutUs),
                   location: "/about",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navOurStory),
                   location: "/our-story",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navChimpFoundation),
                   location: "/chimp-foundation",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navTeam),
                   location: "/team",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navCareers),
                   location: "/careers",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navPress),
                   location: "/press",
                   isExternal: true,
                }
             ]
          }
        },
        {
          name: formatMessage(messageList.navSupport),
          location: "/support",
          subnav: {
             sections: [

             ],
             links: [
                {
                   name: formatMessage(messageList.navContactUs),
                   location: "/contact",
                   isExternal: true,
                },
                {
                   name: formatMessage(messageList.navHelpCentre),
                   location: "http://help.chimp.net",
                   isExternal: true,
                }
             ]
          }
        }
    ];
}
