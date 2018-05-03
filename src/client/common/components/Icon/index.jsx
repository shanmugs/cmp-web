// Icon Component
// ===
// Icon Component that supports 3 sizes of Icon.

// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Svg from 'client/common/components/Svg';
import classNames from 'classnames';

// Helpers
// ---
import {
    connectBranch,
    getBranch,
} from 'client/common/store';
import { iconSizes } from 'client/globals';
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';
import helpers from 'client/common/helpers/helpers';

// Styles
// ---
import './icon.scss';

// Add glyphs to the GLYPH prop to load them into the spritesheet to make accessable to components
// Icon wraps svg component to actually render the svg, while providing size options.

// <Icon
//     glyph={Icon.GLYPHS.__glyph-name__
//     size="sm|md|lg"
//     svgTitle={'string'}
// />

class Icon extends BaseComponent {
    // Scales the width and height props of the svg element based on the size property and
    // current breakpoint mostly to make fallback size accurate.
    // Also solves issue with iOS8 sizing svg's by properties before CSS rules.
    // http://stackoverflow.com/questions/34793915/svg-image-does-not-resize-on-ios8

    // Set default width and height on <svg> element to prevent ‘Flash Of Unstyled SVG’
    // source: https://sarasoueidan.com/blog/svg-style-inheritance-and-FOUSVG/
    calculateFallbackHeight() {
        const { size } = this.props;
        const { currentBreakpoint } = this.props.breakpoints;
        const isDesktop = adaptiveComponentHelper.greaterThan('sm', currentBreakpoint);
        const baseIconSize = (isDesktop) ? iconSizes.desktop : iconSizes.mobile;

        let sizeMultiplier = 1;
        // These multipliers taken from icons.scss
        switch (size) {
        case 'sm':
            sizeMultiplier = 0.75;
            break;
        case 'md':
            sizeMultiplier = 1.5;
            break;
        case 'lg':
            sizeMultiplier = 2;
            break;
        default:
            sizeMultiplier = 1;
            break;
        }

        const widthAndHeight = {
            width: baseIconSize * sizeMultiplier,
            height: baseIconSize * sizeMultiplier,
        };

        return widthAndHeight;
    }

    render() {
        if (helpers.isSSR) return null;

        const { className, glyph, title, size, ariaHidden } = this.props;

        const componentClass = classNames(
            'c-icon',
            className,
            {
                'c--sm': size === 'sm',
                'c--md': size === 'md',
                'c--lg': size === 'lg',
            },
        );

        const widthAndHeight = this.calculateFallbackHeight();

        return (
            <Svg
                ariaHidden={ariaHidden}
                className={componentClass}
                glyph={glyph}
                svgTitle={title}
                {...widthAndHeight}
            />
        );
    }
}

Icon.defaultProps = {
    className: '',
    size: '',
    title: '',
    ariaHidden: true,
};

Icon.propTypes = {
    ariaHidden: PropTypes.bool,
    className: PropTypes.string,
    currentBreakpoint: PropTypes.string,
    glyph: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg', '']),
    title: PropTypes.string,
};


// The following is webpack specific, so prevents this code running on the server
// which doesn't run the assets through the svg-sprite-loader
if(!helpers.isSSR) {
    // Creates a webpack require context where each svg file is run through the sprite loader
    const req = require.context(
        '!!svg-sprite-loader?{"name": "[name]_[hash]", "prefixize": "true"}!./svg',
        false,
        /\.svg/
    );

    // Given a require context, build an object of file contents keyed to camelCased fileNames
    const requireGlyphsMap = (requireContext) => _.reduce(
        requireContext.keys(),
        (glyphs, path, i) => {

            // GIVEB-115 used replace instead of trimEnd.
            let key = _.replace(path, '.svg', '');
            key = _.trimStart(key, './');
            key = _.camelCase(key);
            glyphs[key] = requireContext(path);
            return glyphs;
        },
        {}
    );

    _.assign(Svg.GLYPHS, requireGlyphsMap(req));
}

const branchConfig = {
    branchPath: 'icon',
    mapPathsToProps: {
        breakpoints: '/layout/breakpoints',
    },
}

// getBranch(branchConfig);
// CommonJs syntax to expose the Icon class when requring this module
export default connectBranch(Icon, branchConfig);
