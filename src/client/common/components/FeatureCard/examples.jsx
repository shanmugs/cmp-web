// FeatureCard Component Examples

import React from 'react';

// Push additional examples to the array to output different states of your component to the
// styleguide
const examples = [];
/* eslint-disable */
const svgIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
        <path fill="#87D0CA" d="M24.8 15.8c-.1-.3-.3-.5-.6-.5l-4.2-.6-1.8-3.7c-.3-.5-1.1-.5-1.3 0L15 14.7l-4.2.6c-.3 0-.5.2-.6.5-.1.3 0 .6.2.8l3 2.9-.7 4.1c0 .3.1.6.3.7.2.2.5.2.8.1l3.7-1.9 3.7 1.9c.1.1.2.1.3.1.2 0 .3 0 .4-.1.2-.2.3-.5.3-.7l-.7-4.1 3-2.9c.3-.3.4-.6.3-.9z"/>
    </svg>
);
const svgIcon2 = (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
        <path fill="#E7E6E6" d="M17.5 5.6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3c0 .5-.4.8-.8.8zM17.5 33.8c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3c0 .5-.4.8-.8.8zM33.3 18.2h-3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3c.4 0 .8.3.8.8s-.4.8-.8.8zM4.7 18.2h-3c-.4 0-.7-.3-.7-.8s.3-.8.7-.8h3c.4 0 .8.3.8.8s-.4.8-.8.8zM25.5 10.4c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1l3.9-3.8c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-4 3.8c-.1.1-.3.2-.5.2zM5.7 29.9c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L9 24.8c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.9 3.8c-.2.1-.3.2-.5.2zM29.3 29.9c-.2 0-.4-.1-.5-.2L25 25.9c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.9 3.8c.3.3.3.8 0 1.1-.3.1-.5.2-.7.2zM9.5 10.4c-.2 0-.4-.1-.5-.2L5.1 6.4c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0L10 9.1c.3.3.3.8 0 1.1-.1.1-.3.2-.5.2z"/>
        <path fill="#FA4612" d="M24.8 15.2c-.1-.3-.3-.5-.6-.5l-4.2-.6-1.9-3.7c-.3-.5-1.1-.5-1.3 0L15 14.1l-4.2.6c-.3 0-.5.2-.6.5s0 .6.2.8l3 2.9-.7 4.1c0 .3.1.6.3.7.2.2.5.2.8.1l3.7-1.9 3.7 1.9c.1.1.2.1.3.1.2 0 .3 0 .4-.1.2-.2.3-.5.3-.7l-.7-4.1 3-2.9c.3-.3.4-.6.3-.9z"/>
    </svg>
);
const welcomeContent = (
    <div>
        <p>What can you do with a Chimp Account? Give to charities, give to friends and family, and fundraise with others.</p>
        <p>Let's start by giving to a charity.</p>
    </div>
);
/* eslint-enable */

examples.push({
    description: 'Feature Card with title and description',
    style: {},
    config: {
        description: 'You choose the charities and causes you want to support.',
        title: 'Give on your terms',
        className: 'u-text-align-center',
    },
});

examples.push({
    description: 'Feature Card with icon, title, and description',
    style: {},
    config: {
        description: 'Join others in supporting meaningful causes in your community.',
        title: 'Do good together',
        icon: 'individual',
        className: 'u-text-align-center',
    },
});

examples.push({
    description: 'Feature Card with icon and description',
    style: {},
    config: {
        description: 'Give to any charity of your choice',
        icon: svgIcon2,
        className: 'u-text-align-center',
    },
});

examples.push({
    description: 'Feature Card with icon and description',
    style: {},
    config: {
        description: 'Give to any charity of your choice',
        icon: svgIcon,
        className: 'u-text-align-center',
    },
});

examples.push({
    description: 'Feature Card with image and cta',
    style: { width: '400px' },
    config: {
        cta: {
            buttonClass: 'c--pop c--filled',
            title: 'Start Giving',
            url: '#',
        },
        title: 'Welcome to Chimp',
        description: welcomeContent,
        imageSrc: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13584097_909741105802060_140867359_n.jpg?ig_cache_key=MTI4NDI0MDYwNDI4NDc5OTk3Mg%3D%3D.2',
    },
});

module.exports = examples;
