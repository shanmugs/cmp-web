import _ from 'lodash';

import realtypeof from './realtypeof';

const conditionalFields = ['checkbox', 'radio'];

/**
 * Read data from a Form and convert it to JSON.
 *
 * Kebab-case field names are converted to camelCase.
 *
 * By default, nested hashes will be created for fieldsets. To disable this behaviour, pass a
 * falsy value as a second argument.
 *
 * **Note**: Button elements are ignored. For passing additional data, use a hidden Input.
 * @todo Add support for input[file][multiple]
 * @param  {HTMLFormElement} formElm The form element from which to read.
 * @param  {boolean} [ignoreFieldsets=false] Whether to ignore fieldsets.
 * @return {(Object|undefined)} The data hash or undefined for an invalid argument.
 * @example
 ```
<form
    id="signup"
    name="signup"
>
    <input
        name="first-name"
        placeholder="first name"
        type="text"
        value="john"
    />
    <fieldset name="contact-info">
        <input
            name="email"
            placeholder="email"
            type="email"
            value="jj@example.com"
        />
        <input
            name="tel"
            placeholder="phone number"
            type="tel"
            value="555-555-5555"
        />
    </fieldset>
    <input
        name="password"
        placeholder="password"
        type="password"
        value="abc123"
    />
    <select name="country">
        <option value="ca" selected>Canada</option>
        <option value="uk">United Kingdom</option>
    </select>
    <hr />
    <button type="submit">
    Submit
    </button>
</form>
```
```
{
    "contactInfo": {
        "email": "jj@example.com",
        "tel": "555-555-5555"
    },
    "country": "ca",
    "firstName": "john",
    "password":"abc123"
}
```
 */
function formToJson(formElm, ignoreFieldsets) {
    const realtype = realtypeof(formElm);
    if (
        realtype !== 'element'
        && formElm.tagName !== 'FORM'
    )
        return console.error(
            new TypeError(`Invalid Argument: Must be a HTMLFormElement but got ${realtype}`),
        );

    const fields = formElm.elements;
    const skiplist = [];
    const processFieldset = (fieldset, {name, value}) => {
        skiplist.push(name);
        fieldset[name] = value;

        return fieldset;
    };
    const processFields = (data, elm) => {
        if (
            !ignoreFieldsets
            && elm.tagName === 'FIELDSET'
        ) {
            data[_.camelCase(elm.name)] = _.reduce(elm.elements, processFieldset, {});
        } else if (
            elm.tagName !== 'BUTTON'
            && elm.type !== 'button'
            && elm.type !== 'submit'
            && !_.includes(skiplist, elm.name)
            && !(
                _.includes(conditionalFields, elm.type)
                && !elm.checked
            )
        ) {
            data[_.camelCase(elm.name)] = elm.value;
        }

        return data;
    };

    return _.reduce(fields, processFields, {});
}

export default formToJson;
