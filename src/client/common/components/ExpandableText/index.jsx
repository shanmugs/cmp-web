// ExpandableText Component
// ===
//
// Displays truncated text with a link to expand the full text.
//


// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    defineMessages,
    injectIntl,
    intlShape,
} from 'react-intl';

// Helpers
// ---
import BaseComponent from 'client/common/components/BaseComponent';

// Messages
// ---
const messageList = defineMessages({
    moreText: {
        description: 'foo',
        defaultMessage: 'Read more',
        id: 'common.readMore',
    },
});


class ExpandableText extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
        };
    }

    expand() {
        this.setState({
            isExpanded: true,
        });
    }

    renderContent(content, previewLength, displayPreviewLinkText) {
        let renderedContent = '';

        if (this.state.isExpanded || content.length <= previewLength) {
            renderedContent = (<p className="c-expandable-text__text">{content}</p>);
        } else {
            const truncatedText = content.substring(0, previewLength);
            renderedContent = (
                <div>
                    <p className="c-expandable-text__text">{truncatedText}...</p>
                    <a className="c-expandable-text__expand-link" href="#" onClick={this.expand}>
                        {displayPreviewLinkText}
                    </a>
                </div>
            );
        }
        return renderedContent;
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { className, content, previewLength, previewLinkText } = this.props;
        const { isExpanded } = this.state;

        const componentClass = classNames(
            'c-expandable-text',
            className,
            {
                'c--expanded': isExpanded,
            }
        );

        // Set the default previewLinkText to a translatable string
        // Maybe there is a better way to do this directly in defaultProps
        let displayPreviewLinkText = formatMessage(messageList.moreText);

        if ('previewLinkText' in this.props) {
            displayPreviewLinkText = previewLinkText;
        }

        return (
            <div className={componentClass}>
                {this.renderContent(content, previewLength, displayPreviewLinkText)}
            </div>
        );
    }
}

// Default Props are defined if no property with the same key is passed when instantiating this
// class
ExpandableText.defaultProps = {
    previewLength: 200,
};

// Explicitly state they type of Components you expect here
ExpandableText.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    previewLength: PropTypes.number,
    previewLinkText: PropTypes.string,
};

// Compose the component with the IntlProvider so that this.props.formatMessage is available
export default injectIntl(ExpandableText);
