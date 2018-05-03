import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import { getState } from 'client/common/store';
import isGeminiRoute from 'client/common/helpers/isGeminiRoute';
import Url from 'client/common/helpers/Url';

const legacyBase = getState('/config/endpoints/railsAppUrlOrigin');

/**
 * Dynamically determine whether the link is to the Rails app ("legacy") or is internal (to the
 * Gemini app); as views are ported from Rails to Gemini, this component lets the rest of the
 * Gemini app be blissfully ignorant.
 *
 * @param  {Mixed}   props.children  The contents to be passed to the link (ex link text)
 * @param  {String}  props.className The value to be passed to the react `className`
 * @param  {String}  props.path      The path to be used in the link's href
 * @return {Element}                 Either an anchor tag (`<a>`) or a ReactRouter `<Link>`
 * component.
 */
const GeminiLink = ({ children, className, path }) => {
    if (isGeminiRoute(path)) return (
        <Link
            className={className}
            to={path}
        >
            {children}
        </Link>
    );

    return (
        <a
            className={className}
            href={(new Url(path, legacyBase)).href}
        >
            {children}
        </a>
    );
};

export default GeminiLink;
