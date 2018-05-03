import React from "react";

import createComponentRenderer from "client/utils/createComponentRenderer";
import { expect } from 'chai';

import { CommunityJoin } from './index';
import Incentive from './Incentive';
import ConfigurableHeader from 'client/common/components/ConfigurableHeader';

import messageList from 'client/common/language/enMessages.json';

describe('Join', function () {
    const getComponent = (props = {}, rendererType = 'shallow') => {
        return createComponentRenderer(CommunityJoin, {
            defaultProps: {
                name: 'test Community',
                avatar: '/path/to/someimg.jpg',
                routes: {
                    terms: '#',
                },
                params: {
                    slug: 'Whatever',
                },
                breakpoints: {
                    currentBreakPoint: "sm",
                }
            },
            withIntl: true
        })(props, rendererType);
    };

    it('should show the incentive copy if incentiveEnabled is true', function () {
        const wrapper = getComponent({incentiveEnabled: true, incentiveValue: '10'});
        expect(wrapper.find(Incentive).length).to.deep.equal(1);
    });

    it('should not show the incentive copy if incentiveEnabled  is false', function () {
        const wrapper = getComponent({incentiveEnabled: false});
        expect(wrapper.find(Incentive).length).to.equal(0);
    });

    it('ConfigurableHeader should recieve the default program message if no givingProgramMessage is passed',
        function () {
            const wrapper = getComponent();
            // TODO: figure out how to build parameterized strings from the messageList
            // to compare since the messageList has the template strings with tokens like {name}
            expect(wrapper.find(ConfigurableHeader).prop('message')).to.equal(messageList['communityJoinContent.default.message']);
        }
    );

    it('ConfigurableHeader should recieve givingProgramMessage if passed ', function () {
        const customMessage = 'custom string';
        const wrapper = getComponent({givingProgramMessage: customMessage});
        expect(wrapper.find(ConfigurableHeader).prop('message')).to.equal(customMessage);
    });
});
