// CalloutAvatar Component Examples

import React from 'react';

// Push additional examples to the array to output different states of your component to the
// styleguide
const examples = [];
const csContent = (
    <div>
        <p>
            Have questions? We're here for you! Email us at hello@chimp.net or call 1 (877) 531-0580
        </p>
        <a href="#" className="c-button c--pop">
            Chat Live Now
        </a>
    </div>
);

examples.push({
    description: 'Used on a Community header',
    style: { maxWidth: '380px', backgroundColor: '#16486D', padding: '1em 1em 0' },
    config: {
        animate: true,
        avatar: 'https://chimp.net/assets/avatars/chimp-icon-company.png',
        avatarAlt: 'Capital Power Avatar',
        content: 'Welcome! We want Capital Power\'s people to increase the impact of' +
            ' their charitable giving.',
        contentClass: 'u-fs-md',
    },
});

examples.push({
    description: 'Used for CS callout',
    style: { maxWidth: '380px', padding: '1em 1em 0' },
    config: {
        avatar:
            'https://de4pwptp22sm7.cloudfront.net/users/logos/19706/display/data.png?1438891784',
        avatarAlt: 'Paige Avatar',
        content: csContent,
    },
});

module.exports = examples;
