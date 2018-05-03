// Footer Component
// ===
//
// Global footer container


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

// Helpers
// ---
import { connectBranch } from 'client/common/store';
import adaptiveComponentHelper from 'client/common/helpers/adaptiveComponentHelper';
import BaseComponent from 'client/common/components/BaseComponent';

// UI components
// ---
import Primary from 'client/shell/components/Footer/Primary';
import Mobile from 'client/shell/components/Footer/Primary/Mobile';
import Secondary from 'client/shell/components/Footer/Secondary';


// Component Styles
// ---
import './footer.scss';

class Footer extends BaseComponent {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        const { currentBreakpoint } = this.props.breakpoints;
        const {
            className,
            locale,
            hasOverlap,
        } = this.props;
        const isNotMobile = adaptiveComponentHelper.greaterThan('sm', currentBreakpoint);
        const isOverlapped = (
            hasOverlap
            && !isNotMobile
        );
        const PrimaryFooter = isNotMobile
            ? Primary
            : Mobile;
        const componentClass = classNames(
            className,
            'c-footer',
            {
                'c--overlap': isOverlapped,
            },
        );

        return (
            <footer
                className={componentClass}
                role="contentinfo"
            >
                <PrimaryFooter
                    locale={locale}
                />
                <Secondary
                    currentBreakpoint={currentBreakpoint}
                />
            </footer>
        );
    }
}

Footer.defaultProps = {
    hasOverlap: false,
};

Footer.propTypes = {
    className: PropTypes.string,
    currentBreakpoint: PropTypes.string,
    hasOverlap: PropTypes.bool,
    locale: PropTypes.string,
};

export { Footer };
export default connectBranch(Footer, {
    'branchPath': 'footer',
    mapPathsToProps: {
        breakpoints: '/layout/breakpoints',
    },
});
