import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import formToJson from './formToJson';


describe('formToJson helper', function() {
    const data = {
        firstName: 'John',
        lastName: 'Jingleheimer',
        contactInfo: {
            email: 'jj@example.com',
            tel: '555-555-5555',
        },
        password: 'abc123',
        country: 'ca',
        // avatar: '/Users/John Jingleheimer/Pictures/me.jpg',
        // cannot be set for security reasons
        dateOfBirth: '1970-01-01',
        spam: 'yes',
        preferredContact: 'email',
    };
    let wrapper;
    before(function() {
        wrapper = mount(
            <form
                id="signup"
                name="signup"
            >
                <input
                    name="first-name"
                    placeholder="first name"
                    type="text"
                    value={data.firstName}
                />
                <input
                    name="last-name"
                    placeholder="last name"
                    type="text"
                    value={data.lastName}
                />
                <fieldset name="contact-info">
                    <input
                        name="email"
                        placeholder="email"
                        type="email"
                        value={data.contactInfo.email}
                    />
                    <input
                        name="tel"
                        placeholder="phone number"
                        type="tel"
                        value={data.contactInfo.tel}
                    />
                </fieldset>
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    value={data.password}
                />
                <select
                    name="country"
                    value="ca"
                >
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                </select>
                {/* input[file].value cannot be set for security reasons
                <input
                    name="avatar"
                    type="file"
                    value={data.avatar}
                />
                */}
                <input
                    name="date-of-birth"
                    type="date"
                    value={data.dateOfBirth}
                />
                <hr />
                <input
                    checked={true}
                    name="spam"
                    type="checkbox"
                    value={data.spam}
                />
                <input
                    name="noop"
                    type="checkbox"
                    // intentionally no value
                />
                <input
                    checked={true}
                    name="preferred-contact"
                    type="radio"
                    value="email"
                />
                <input
                    name="preferred-contact"
                    type="radio"
                    value="phone"
                />
                <input
                    name="preferred-contact"
                    type="radio"
                    value="snail-mail"
                />
                <button type="submit">
                Submit
                </button>
            </form>
        );
    });
    after(function() {
        wrapper.unmount();
    });

    it('should ', function() {
        const output = formToJson(wrapper.instance());
        expect(output).to.deep.eq(data);
    });
});
