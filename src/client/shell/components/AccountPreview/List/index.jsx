// Account Preview List
// ===
// Displays a list of Account Previews


// Vendor components
// ---
import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';


// UI components
// ---
import AccountPreview from 'client/shell/components/AccountPreview';
import GeminiLink from 'client/common/components/GeminiLink';
import Icon from 'client/common/components/Icon';
import Modal from 'client/common/components/Modal';


// Styles
// ---
import './list.scss';


import helpers from 'client/common/helpers/helpers';


class AccountPreviewList extends React.Component {
    closeDropdown() {
        helpers.window.closeDropdowns();
    }

    renderButton() {
        const { heading, items, moreLink } = this.props;

        const viewMoreLink = (
            <button
                type="button"
                onClick={this.closeDropdown}
                className="c-account-preview-list__more"
            >
                <Icon
                    glyph="dots"
                />
                {moreLink}
            </button>
        );

        const modalContent = (
            <div className="c-account-preview-list c--large">
                {items.map((item, idx) => (
                    <GeminiLink
                        className="c-account-preview-list__item"
                        key={idx}
                        path={item.location}
                    >
                        <AccountPreview
                            avatar={item.avatar}
                            balance={item.balance}
                            name={item.name}
                            accountType={item.accountType}
                        />
                    </GeminiLink>
                ))}
            </div>
        );

        return (
            <Portal
                closeOnEsc
                closeOnOutsideClick
                openByClickOn={viewMoreLink}
                className="bonobo"
            >
                <Modal
                    header={heading}
                    content={modalContent}
                />
            </Portal>
        );
    }

    render() {
        const { items, maxShow } = this.props;

        // Have to build the button before the items array is spliced, otherwise the items length
        // is not accurate.
        const showButton = (typeof maxShow !== 'undefined' && maxShow < items.length);
        const seeMoreLink = (showButton) ? this.renderButton() : null;

        // maxShow is optional so if it not passed we don't show button
        // but show all the results
        let trimmedItems = items;
        if (maxShow !== 'undefined') {
            // cut items based on maxShow
            trimmedItems = items.slice(0, maxShow);
        }

        return (
            <div className="c-account-preview-list">
                {trimmedItems.map((item, idx) => (
                    <GeminiLink
                        key={idx}
                        path={item.location}
                    >
                        <AccountPreview
                            avatar={item.avatar}
                            balance={item.balance}
                            name={item.name}
                            accountType={item.accountType}
                        />
                    </GeminiLink>
                ))}
                {seeMoreLink}
            </div>
        );
    }
}

AccountPreviewList.defaultProps = {
    maxShow: 2,
};

AccountPreviewList.propTypes = {
    className: PropTypes.string,
    maxShow: PropTypes.number,
    heading: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            avatar: PropTypes.string,
            balance: PropTypes.string,
            location: PropTypes.string,
            name: PropTypes.string,
            accountType: PropTypes.oneOf(['company', 'charity', 'personal']),
        })
    ),
    moreLink: PropTypes.string,
};

export default AccountPreviewList;
