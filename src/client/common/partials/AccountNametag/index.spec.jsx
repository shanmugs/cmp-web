/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, no-unused-expressions, func-names */

import React from 'react';
import { expect } from 'chai';
import _ from 'lodash';

import { shallow } from 'enzyme';
import { createSandbox } from 'sinon';

import {
    Icon,
    Image,
} from 'semantic-ui-react';

import AccountNametag, {
    Avatar,
    accountTypes,
} from './';
import * as actions from './actions';


describe('AccountNametag', function () {
    const defaultProps = {
        account: {
            accountId: '258ddd13',
            displayName: 'John Jingleheimer',
            type: 'user',
        },
    };

    describe('general', function () {
        it('should apply `size` when provided', function () {
            const size = 'massive';
            const props = _.merge({ size }, defaultProps);
            const wrapper = shallow(<AccountNametag {...props} />, {
                disableLifecycleMethods: true,
            });
            expect(wrapper.find(Avatar).prop('size')).to.equal(size);
        });

        context('when account name is supplied', function () {
            it('should be include', function () {
                const wrapper = shallow(<AccountNametag {...defaultProps} />, {
                    disableLifecycleMethods: true,
                });
                expect(wrapper.find('.account-nametag-name').text())
                    .to.equal(defaultProps.account.displayName);
            });
        });
        context('when account name is disabled', function () {
            it('should be include', function () {
                const props = _.merge({}, defaultProps, { account: { displayName: false } });
                const wrapper = shallow(<AccountNametag {...props} />, {
                    disableLifecycleMethods: true,
                });
                expect(wrapper.find('.account-nametag-name').exists())
                    .to.be.false;
            });
        });
    });

    context('when account info is not supplied', function () {
        const sandbox = createSandbox();
        const spies = {};
        const rspData = {
            avatar: '/fetched/avatar.jpg',
            displayName: 'John Q Public',
        };

        it('should get it', function () {
            const rspPromise = Promise.resolve(rspData);
            const stub = sinon.stub(actions, 'fetchAccount').callsFake(function () {
                return rspPromise;
            });
            const props = _.merge({}, defaultProps);
            delete props.account.displayName;
            const wrapper = shallow(<AccountNametag {...props} />);

            return rspPromise.then(function () {
                wrapper.update(); // flush the state update from fetchAccount
            }).then(function () {
                const avatar = wrapper.find(Avatar);

                expect(avatar.prop('displayName'), 'has account name')
                    .to.equal(rspData.displayName);
                expect(avatar.prop('src'), 'has avatar src')
                    .to.equal(rspData.avatar);

                stub.restore();
            });
        });
    });


    describe('Avatar', function () {
        it('should apply `size` when provided', function () {
            const size = 'massive';
            const propsForImage = {
                size,
                src: '/avatar.jpg',
            };
            const avatarWithSrc = shallow(<Avatar {...propsForImage} />);
            expect(avatarWithSrc.prop('size'), 'Image size').to.equal(propsForImage.size);

            const propsForIcon = {
                size,
            };
            const avatarWithoutSrc = shallow(<Avatar {...propsForIcon} />);
            expect(avatarWithoutSrc.prop('size'), 'Icon size').to.equal(propsForIcon.size);
        });

        it('should apply `color` and `icon` when provided', function () {
            const propsForIcon = {
                color: 'blue',
                icon: 'visa',
            };
            const avatarWithoutSrc = shallow(<Avatar {...propsForIcon} />);

            expect(avatarWithoutSrc.prop('color'), 'Icon color').to.equal(propsForIcon.color);
            expect(avatarWithoutSrc.prop('name'), 'Icon name').to.equal(propsForIcon.icon);
        });
    });
});
