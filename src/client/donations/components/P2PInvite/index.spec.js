import React from "react";

import createComponentRenderer from "client/utils/createComponentRenderer";
import { expect } from 'chai';

import ConfigurableHeader from 'client/common/components/ConfigurableHeader';
import P2pInvite from './';
import ExpandableText from 'client/common/components/ExpandableText';

describe('P2pInvite', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(P2pInvite, {
            defaultProps: {
                p2pData: {
                    giftAmount: '10',
                    avatar: '/path/to/someimg.jpg',
                    routes: {
                        terms: '#',
                    },
                    senderDisplayName: 'senderName'
                },
            },
            withIntl: true
        })(props, rendererType);
    };

    describe('header', () => {
        context('when no giftMessage is supplied', () => {
            it(
                'it should display a default message & but no title',
                () => {
                    const wrapper = getComponent();

                    const CHeader = wrapper.find(ConfigurableHeader);

                    // TODO: figure out how to build parameterized strings from the messageList
                    // to compare since the messageList has the template strings with tokens like {giftAmount}

                    expect(CHeader.prop('message')).includes('senderName');
                    expect(CHeader.prop('message')).includes('10');
                    expect(CHeader.prop('title')).to.be.empty;
                }
            );
        });

        context('when a giftMessage *is* supplied', () => {
            it(
                'it should display a title with gift amount and a message in an ExpandableText component',
                () => {
                    const giftMessage = 'A test message';
                    const wrapper = getComponent({ p2pData: { giftMessage } });
                    const CHeader = wrapper.find(ConfigurableHeader);

                    expect(CHeader.prop('message')).to.deep.equal(
                        <ExpandableText content={giftMessage} />
                    );
                    expect(CHeader.prop('title')).includes('senderName');
                    expect(CHeader.prop('title')).includes('10');
                }
            );
        });
    });
});
