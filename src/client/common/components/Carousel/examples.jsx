// Carousel Component Examples
// ===
import React from 'react';

// Push additional examples to the array to output different states of your component to the
// styleguide
const examples = [];

examples.push({
    description: 'A preconfigured carousel for rendering arbitrary content at mobile sizes',
    style: {},
    config: {
        children: [
            <div><h3>Some Content</h3></div>,
            <div><h3>Some Different Content</h3></div>,
            <div><h3>More</h3></div>,
            <div><h3>Last thing</h3></div>,
        ],
    },
});

module.exports = examples;
