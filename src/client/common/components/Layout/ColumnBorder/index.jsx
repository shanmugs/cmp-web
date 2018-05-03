// ColumnBorder Component
// ===
//
// Displays an array of content in columns with borders
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// Component Styles
// ---
import './column-border.scss';

const ColumnBorder = (props) => {
    const { className, content } = props;

    const componentClass = classNames(
        'c-column-border',
        className
    );

    return (
        <div className={componentClass}>
            {content.map((item, idx) =>
                <div className="c-column-border__item" key={idx}>
                    {item}
                </div>
            )}
        </div>
    );
};

// Explicitly state they type of Components you expect here
ColumnBorder.propTypes = {
    className: PropTypes.string,
    content: PropTypes.array,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default ColumnBorder;
