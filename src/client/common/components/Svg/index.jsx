import React from 'react';
import PropTypes from 'prop-types';

// SVG Component that is basically just a shorthand way to include svg elements
// in the markup

// <Svg
//    glyph={Svg.GLYPHS.name}
//    svgTitle={'string'}
// />

const Svg = (props) => {
    const {
        ariaHidden,
        className,
        glyph,
        svgTitle,
        width,
        height,
    } = props;

    let { content } = props;

    if (typeof glyph === 'string' && glyph.length > 0) {
        content = (
            <use xlinkHref={Svg.GLYPHS[glyph]} />
        );
    }

    // If an optional title is specified, add to svg markup
    let title;
    if (svgTitle.length !== 0) {
        title = (
            <title>{svgTitle}</title>
        );
    }

    return (
        <svg
            aria-hidden={ariaHidden}
            className={className}
            role="img"
            height={height}
            width={width}
        >
            {title}
            {content}
        </svg>
    );
};

Svg.defaultProps = {
    // The following properties are defaults and can be overwritten in the JSX markup
    // <Svg svgTitle="chimp title" />
    className: '',
    glyph: null,
    svgTitle: '',
    content: null,

};


Svg.propTypes = {
    ariaHidden: PropTypes.bool,
    className: PropTypes.string,
    content: (props, propName) => {
        // THrow props validation error if no content is provided or if content is provided,
        // but it's not a valid svg element
        const validElements = [
            'path',
            'circle',
            'ellipse',
            'line',
            'polygon',
            'polyline',
            'rect',
            'svg',
            'symbol',
            'text',
            'use',
            'g',
            'text',
        ];

        if (props[propName] && (validElements.indexOf(props.type) !== -1)) {
            return new Error('content should be valid svg elements', validElements);
        }

        return null;
    },
    svgTitle: PropTypes.string,
    glyph: (props, propName) => {
        const prop = props[propName];
        // If a glyph is provided, check that it's in the Glyphs Object
        if (prop && !Svg.GLYPHS.hasOwnProperty(prop)) {
            return new Error(
                `An invalid Svg glyph "${prop}" has been passed,
                check that the glyph property is a key in the
                Svg.GLYPHS map in the Svg/index.jsx component.`
            );
        }

        return null;
    },
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Svg.GLYPHS = {
};

// CommonJs syntax to expose the Svg class when requring this module
export default Svg;
