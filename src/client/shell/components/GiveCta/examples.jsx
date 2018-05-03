import React from 'react';
const examples = [];


const giveButton = (
    <a href="#" className="c-button c--light-inverted c--pop">
        Give
    </a>
);
const AddButton = (
    <a href="#" className="c-button c--light-inverted c--pop">
        Add
    </a>
);
const SendButton = (
    <a href="#" className="c-button c--light-inverted c--pop">
        Send
    </a>
);

const giveReadMoreButton = (
    <a href="#" className="c-button c--light">
        Create A giving Group
    </a>
);

examples.push({
    description: 'A CTA to Add',
    style: {},
    config: {
        button: AddButton,
        heading: 'Add Money to your Account',
        item: {
            heading: 'What is this?',
            content: {
                description: 'Your Chimp account is like a bank account for charity. Add money' +
                'now (or set up a monthly recurring donation) and you’ll be ready to give when' +
                ' needed.',
            },
        },
    },
});

examples.push({
    description: 'A CTA to give',
    style: {},
    config: {
        button: giveButton,
        heading: 'Give to a Charity or Giving Group',
        item: {
            heading: 'What is this?',
            content: {
                description: 'Give to any Canadian charity through Chimp—either directly, or by' +
                'supporting people raising money in a Giving Group.',
                button: giveReadMoreButton,
            },
        },
        type: 'give',
    },
});

examples.push({
    description: 'A CTA to Send',
    style: {},
    config: {
        button: SendButton,
        heading: 'Send Charity Dollars to Other People',
        item: {
            heading: 'What is this?',
            content: {
                description: 'Send more meaningful gifts, and empower your friends, family, and' +
                'wider circles to give wherever and whenever they want.',
            },
        },
        type: 'send',
    },
});

module.exports = examples;
