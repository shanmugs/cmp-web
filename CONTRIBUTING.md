# Directory Architecture

## Components and classes
Folders/files that export a class (or a pre-es6 Constructor) have PascalCase filenames (the class lives in an `index.jsx`). See [React](#react) below. The reason is for matching reference:

 ```js
 import SomeComponent from '…/SomeComponent';

 // …

 <SomeComponent>
 ```

## Helpers and utils

Folders/files that contain helpers/utils have camelCase filenames: `someHelper.js`. The reason is for matching reference:

 ```js
 import someHelper from '…/someHelper';

 // …

 someHelper(foo, bar);
 ```

## Everything else

Use kebab-case for file and folder names

## Modularisation

Each piece should be as modular as is practical and possible: Everything specific to a paricular piece of functionality should cohabitate, with an inside-out approach. Take `SomeView` for example: Its actions, specs, and styles all live in the same folder. This means you as a developer don't need to be familiar with the larger application structure to find immediate resources, makes import paths significantly shorter, and shields it from outside changes (ex if all the styles lived in the same directory, and that directory moved, all references would require updates).

### Domains

Domains are modules of a large feature-set that roughly correlate to top-level segments in app paths (eg `/users/login` → `users`).

#### Components

Components are molecule-level bits of UI (presentation component) or logic (container component). They **never** contain partials. Examples of a component are a `Button` or even an `Accordion`—which can contain `Buttons`, `Headers`, `Icons`, plus collapse and expand logic (that logic is limited to the behaviour of itself and does not affect the application at large). A domain's components are "private"—if they're needed by another domain, the component should be moved to `common`.

#### Partials

Partials are encaposlated bits of UI _and_ application-level functionality that can be used in views. Partials can contain many components. An example of a partial is the `UserLoginForm` which provides the actual login form and handles the login action (and subsequently updates the Store). It is used by `UserLoginView` and could also be by a `UserLoginModal` (for when a user tries to perform a protected action but the session has timed out). A domain's Partials are "public".

#### Partials vs Components

|category|Component|Partial|
|:-------|:-------:|:-----:|
|Connects to the Store|✗|✓|
|Contains UI|✓|✓|
|Contains other components|✓|✓|
|Dispatches Actions|✗|✓|
|Knows about the application|✗|✓|

## Sample architecture

```
src/client
  ├─┬ common/helpers
  │ ├── someCommonHelper.js
  │ ├── someCommonHelper.spec.js
  │ ├── SomePolyfill.js // ← exports class/constructor
  │ └── SomePolyfill.spec.js
  └─┬ [domain]
    ├─┬ components
    │ └─┬ SomeCustomComponent
    │   ├── index.jsx // ← exports class
    │   ├── index.spec.jsx
    │   └── some-custom-component.scss
    ├─┬ partials
    │ └─┬ SomePartial
    │   ├── index.jsx // ← exports class
    │   ├── index.spec.jsx
    │   └── some-partial.scss
    ├─┬ views
    │ └─┬ SomeView
    │   ├── index.jsx // ← exports class
    │   ├── index.spec.jsx
    │   └── some-view.scss
    └── actions.js
```

# Important components and utils

|name|Usage|
|----|-----|
|[Communications](src/client/common/communications/index.js) ("Comms") utility|http(s) requests (promise-based using the Fetch API)|
|[connectBranch](src/client/common/store/connectBranch.js)|connect a component to the store (automatically adds `branch` and `dispatch` to the component's `props`|
|[realtypeof](src/client/common/helpers/realtypeof.js)|what everyone wanted `typeof` to be: `realtypeof(new Map())` → 'map'|
|[routes](src/client/routes.js)|configure routes|
|[Router](src/client/Router.jsx)|hook up routes to components|
|[storage](src/client/common/helpers/storage.js)|interact with cookies and WebStorage (Local and Session)|
|[Store](src/client/common/store/index.js)|interact with the store, branches, data, etc|

# Gotchas

## `Error: Cannot call a class as a function`

You forgot to extend `BaseComponent` (or `React.Component`).

## `Error: Cannot read property '__reactAutoBindPairs' of undefined`

When using both `injectIntl` and `withRouter`, injectIntl must wrap withRouter like `injectIntl(withRouter(YourComponent))`, because reasons.

## `Error: componentOrConnector is not a function`

You forgot to export your new component.

## `Error: Missing attribute value for attribute path of element file`

This is thrown by a horribly written Karma plugin, `karma-sonarqube-unit-reporter`, when a file does not contain `describe(` exactly (ex you might have `describe.only(`, which is perfectly valid). To work around this nonsense, add the following to `/archetypes/config/karma/karma.conf.js`

```js
// be sure to add lodash at the top of the file:
// const _ = require('lodash');

_.pull(settings.plugins, 'karma-sonarqube-unit-reporter');
_.pull(settings.reporters, 'sonarqubeUnit');
delete settings.sonarQubeUnitReporter;
```

## `SublimeLinter env: node: No such file or directory`

This is thrown when Sublime can't find the binary for nodejs (which it uses to run eslint). In our setup, this is caused by using nodenv. There are 2 workarounds:

* Add the following to your SublimeLinter settings:
```
"paths": {
    "osx": [
        "/usr/local/var/nodenv/shims/node"
    ],
},
```
* Fix your shell:
  1. Move sourcing of `~/.shell_aliases` and `~/.shell_env` from `~/.zshrc` into `~/.zprofile`
  1. Update `~/.zshrc` to source `~/.zprofile`

Note, that there is also a bug (SublimeTextIssues/Core#1877) where this error is thrown every time SublimeText starts up. This is also caused by using nodenv because SublimeText finishes initialising before the nodejs binary is available in $PATH. You can either:

* Wait a few seconds for the issue will resolve itself.
* Start SublimeText from Terminal: `subl`

## Enzyme `wrapper.debug()` returns `<undefined />`

Enzyme does not support returning an array of components/nodes (airbnb/enzyme#1149). Instead wrap the components in `<React.Fragment>` (added in React v16). Note that this will result in wrapper itself being a `<Symbol(react.fragment)>`; however, its `children()` etc function normally.

## My new view can't be found

Routes must be registered in 3 places:

* [routes.js](src/client/routes.js)<sup>†</sup>
* [Router.jsx](src/client/Router.jsx)<sup>†</sup>
* [nginx.config.erb](config/nginx.config.erb/) (required for deployed environments)

<sup>†</sup> These must be separated into 2 files to avoid a circular dependency.

# General Guidelines

1. Simple unordered lists should be alphabetised to facilitate groking: Everyone already knows alphabetical order and it requires no additional/esoteric knowledge.

# Git

## Branches

|Name/Prefix|Usage|Private (🔒) vs Public (👁)|
|:----------|:----|:--------------------------:|
|`develop`¹|Stable branch base|👁|
|`master`¹|Mainline branch|👁|
|`bugs/`|Contains a bugfix|👁|
|`features/`|Contains a new feature|👁|
|`protos/`|Contains a feature prototype|🔒|
|`releases/`|Release branch|👁|
|`tasks/`|Contains a piece of a change/feature/update (not stand-alone)|🔒|

¹ Protected branches. Github will not allow direct pushes to these or unapproved PRs to be merged into them.

|Action|Private|Public|
|:-----|:-----:|:----:|
|Branch base|✗|✓|
|Commit directly|✓|✗|
|History re-write (forced push)|✓|❗️|
|Merge|Squash merge|Merge|

❗️Must be coordinated with all contributors

### Branch naming

Branches should be named with prefixe(s) from the table above, the ticket number¹, a concise summary in kebab-case, and delimited with forward slashes `/`.

* `protos/WC-123/auth-token`
* `protos/WC-123/tasks/WC-124_add-token-handling-to-comms-util`
* `features/WC-125/new-spa-login-view`
* `features/WC-125/tasks/WC-126_add-login-view-route`
* `features/WC-125/tasks/WC-127_add-login-form-partial`

This allows visual git tools to group them into folders:

```
branches
  ├─┬ protos
  │ └─┬ WC-123
  │   └─┬ auth-token
  │     └─┬ tasks
  │       └── WC-124_add-token-handling-to-comms-util
  └─┬ features
    └─┬ WC-125
      └─┬ new-spa-login-view
        └─┬ tasks
          ├── WC-126_add-login-view-route
          └── WC-127_add-login-form-partial
```

## Summaries

**Must**

* Contain with a ticket number
* Contain 50 or fewer characters¹
* Use present-tense
 * Bad: "WC-123 Resolve**d** invisiable Header on mobile"
 * Good: "WC-123 Resolve invisible Header on mobile"

**Can**

* Be prefixed with an emoji: "🐞 WC-123 Resolve invisible Header on mobile"

¹ Otherwise github truncates with `…`

Commit bodies can contain whatever (but keep it PG-13).

# Code Guidelines

## "Styling"

* Your IDE MUST match the settings found in chimp-client.sublime-project.
* We use AirBnB's eslint configuration
* You MUST install a linter for your IDE. For sublime please follow these instructions:
 1. Install [SublimeLinter](http://www.sublimelinter.com/en/latest/installation.html#installing-via-pc)
 2. Install [SublimeLinter-eslint](https://github.com/SublimeLinter/SublimeLinter-eslint) and follow instructions
  closely
 3. Make sure your [path](http://www.sublimelinter.com/en/latest/usage.html#how-linter-executables-are-located) is setup correctly:

## "Done"

1. Code is dev complete
1. Happy path is passes locally (by author)
1. Feature/change is approved by Stakeholder (PM/PO)
1. Pull request has comments by author relevant for reviewer
1. Code is reviewed & approved
1. Ticket is updated with QA and Release notes
1. Code is tested & approved by QA

### Dev complete

Before progressing to review, code

**Must** have:

* Documentation via line comments and JSDoc
* 100% spec coverage (branches, functions, lines, and statements)¹
* `@todo`s include a Jira ticket number: `// @todo WC-123 fix circular dep`
* Support for i18n for new copy text

If any of the above are not met due to a blocker, there **must** be a code comment with a `@todo`.

¹ A coverage report is generated to `/coverage/` every time tests are run.

**Should** have:

* Examples in the jsDocs
* Scenarios for producing errors
* Caveats for gotchas

### Code Documentation

Code documentation via JSDoc is required for all classes, helpers, and polyfills. Please see the JSDoc [documentation](http://usejsdoc.org/) and the [Google Closure Type System](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System), specifically, [§ The JavaScript Type Language](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#the-javascript-type-language) and [§ The JavaScript Type Language](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#types-in-javascript) for typing examples.

The minimum descriptors for JSDoc blocks are:

* description
* `@param`s
* `@return`

## React

Follow the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react)

### View Components

**Must**

* Be a class
* Extend `BaseComponent` (or `React.Component`)

**Should**

* Have a `static loadComponentData()` method that returns a promise
* Check in `componentDidMount()` whether its data has been loaded
 * Load its data if not already available

## Redux

We follow the basics of Redux: We specify [`Actions`](https://redux.js.org/docs/basics/Actions.html) and emit them with [`dispatch()`](https://redux.js.org/docs/basics/DataFlow.html). We have a [generic Reducer](src/client/common/store/genericReducer.js), although it is possible to specify bespoke Reducers when connecting a component to the Store. The generic Reducer is automatically applied for all Actions unless bespoke Reducers have been supplied. Dispatches follow the [Flux standard Action](https://github.com/acdlite/flux-standard-action).

### Actions and Action Creators

One of the "advanced" topics in Redux is [Action Creators](https://redux.js.org/docs/advanced/ExampleRedditAPI.html#action-creators-and-constants). We use this exclusively for triggering asynchronous actions (small "a") and dispatching updates to the Store.

This creates a "pub-sub" relationship ([Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)), wherein Partials and Views publish Actions and data via `dispatch()` to the Store and subscribe to relevant updates via `connectBranch()` & `mapPathsToProps`.

An example of this is the `UserLoginView` and the `UserLoginForm`: The form triggers login action creators (and subsequently a Fetch request) and publishes login actions, and the view subscribes to `Store.users.current` (`/users/current`), and observes the changes in its React lifecycle method `componentWillReceiveProps()`.

Actions belong to their domain and are "public".

### Page Navigation in Multiple Steps Forms

When navigating from one page to another while completing forms in a flow (i.e. Giving Flow), we need to somehow have access to the data in form input along the way and specially at the end. We also want to keep the state of the data when user navigating back to the previous page. in order to achieve this, everytime user presses continue and go to the next page, and Action get fired and pass the data via `dispatch()` to the Store. Then every other views that have subscribed to the same `branchPath` can have access to that data in their props.

### Special sauce

The main difference with our implementation is "branches": When a component is connected to the Store, it is connected to at a specific crux, which will be automatically added to its `props` (along with the branch's info and the `dispatch` method). The component will only receive updates for the part of the Store to which it is connected; by default, `connectBranch` assumes its component's hierachy. The branch path(s) can be specified explicitly like so:

```js
connectBranch(SomeComponent, {
    parentPath: '/a',
    // omitting the leading '/' will result in the branch being nested in the store
    // relative to SomeComponent's hierarchy
    rootPath: 'b',
    branchPath: 'c',
    // …
});
```

The above will result in `SomeComponent` subscribing and dispatching updates to `Store.a.b.c`; it will also receive updates from above, such as from `Store.a.b`. `SomeComponent` will not receive updates to `Store.a.b.c.d` or to `Store.x.y.z` (and will thus not trigger render or any other lifecycle method), unless explicitly configured via `mapPathsToProps`:

```js
connectBranch(SomeComponent, {
    parentPath: '/a',
    rootPath: 'b',
    branchPath: 'c',
    mapPathsToProps: {
        xyz: '/x/y/z',
    },
    // …
});
```

Updates to `Store.x.y.z` will be available to `SomeComponent` via `props.xyz` (and will trigger lifecycle methods as normal).

It is possible to dispatch Actions from one branch to another, but this is generally not recommended.

```jsx
dispatch({
    type: actions.SOME_ACTION,
    payload: data,
    meta: {
         path: '/foo/bar/qux',
    },
});
```

## HTML

Pursuant to [General Guidelines #1](#general-guidelines), html attributes and properties should be alphabetically ordered, each on their own line.

**Bad**

```html
<input onChange={this.handleChange} hidden className={classnames} />
```

**Good**

```html
<input
    className={classnames}
    hidden
    onChange={this.handleChange}
/>
```

## JavaScript

Follow the [Airbnb JavaScript Styleguide](https://github.com/airbnb/javascript), but note [our few exceptions](./.eslintrc).

## Styles

Semantic-UI should provide most styles.

Styles for custom components should cohabitate with that component.

Pursuant to [General Guidelines #1](#general-guidelines), css properties should be alphabetically ordered.

Follow the [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css).

### Setting SUI variables and overrides

Overrides and Variables go in the appropriate sub-directory of `src/client/common/styles/semantic-ui`, and must **exactly** match the directory structure of the `semantic-ui-less` repo (otherwise it will just be ignored).

Ex. For setting the `@border` variable specifically for `Segment`, the following would be added to `client/common/styles/semantic-ui/site/elements/segment.variables`, and it will get picked up automatically.

```less
@border: none;
```

### Classname prefixes

|prefix|denotes|example|
|------|-------|-------|
|`.c-`|component|`.c-fireworks`|
|`.p-`|plugin|`.p-datepicker`|
|`.u-`|utility class|`.u-small`|
|`.qa-`|automated test selector|`.qa-form-error`|

# Unit Tests
Specs use the following:

* [Karma](https://karma-runner.github.io/1.0/config/configuration-file.html) spec runner
* [Mocha](https://mochajs.org/) testing framework
* [Chai expect](http://chaijs.com/api/bdd/) assertion library
* [Sinon](http://sinonjs.org/) spies, stubs, and mocks
* [Enzyme](https://github.com/airbnb/enzyme/blob/master/README.md#basic-usage) interacting with React components

Specs should **not** verify a dependency's functionality. For example, React already guaranties the UI of following, and ReactIntl verifies the `defineMessages()` and `formatMessage()`, so there is nothing for us to spec here:

```jsx
const i18n = defineMessages({
    greetUser: {
        defaultMessage: 'Hello, {name}!',
        description: 'A salutation to a user',
        id: 'greeting.user',
    },
});

const Greet = ({formatMessage, name}) => (
    <span>{
        formatMessage(
            i18n.greetUser,
            {
                name,
            },
        )
    }</span>
);

export default Greet;
```

In the above, if `Greet` contained SomeOtherComponent, you should also **not** assert any of its functionality in `Greet`'s spec (it should be asserted in and only in `SomeOtherComponent`'s spec).

Specs **should** verify its own logic. Consider the following:

```jsx
const i18n = defineMessages(/* same as previous example */);

const Greet = ({className, formatMessage, name}) => (
    <span
        className={[
            'greeting',
            className,
        ].join(' ')}
    >{
        formatMessage(/* … */)
    }</span>
);

export default Greet;
```

In the above, the supplied `className` could get dropped or improperly concatenated (`greetingsome-value` instead of `greeting some-value`).

Alternatively, there might be "this or that" logic:

```jsx
const i18n = defineMessages(/* same as previous example */);

const Greet = ({as, formatMessage, name}) => React.createElement(
    as,
    {},
    formatMessage(/* … */),
);
Greet.defaultProps = {
    as: 'span',
};

export default Greet;
```

You might be tempted to spec the above to assert the outputted element matches whatever was supplied in `as`. **IT'S A TRAP!** The above should **not** be spec'ed. There is nothing there that is not already guarantied by a vendor: React covers `React.createElement()` and JSX in general. ReactIntl still covers `defineMessages()` and `formatMessage()`.

However, the following **should** be verified in a unit test:

```jsx
const i18n = defineMessages(/* same as previous example */);

const Greet = ({formatMessage, names}) => {
    if (names.length > 1) {
        return (
            <ul className="greetings">
                {_.map(names, (name) => (
                    <li className="greeting">{
                        formatMessage(/* … */)
                    }</li>
                ))}
            </ul>
        );
    }

    return (
        <span
            className="greeting"
        >{
            formatMessage(/* … */)
        }</span>
    );
};
```

In this example, the logic is entirely controlled by us: Do X and Y when length; otherwise, do Z.

You would assert that the output is a `ul` with N `li` children when `names` contains more than 1, and that N equals the count of `names`. And you would assert that the output is a `span` when `names` contains exactly 1.

## Definitions

### `describe`

The name of a class, method, or property. There should be 1 root-level describe per spec file.

Spec-level variable declarations must be inside the spec's root `describe` to avoid unintended and/or premature execution (ex when outside and `.only` is used on a different spec, the outside setup will still execute).

```js
describe('Plant{}', function () {
    const someVarForTheWholeSpec = // …
    
    describe('photosynthesis()', function () {
```

### `context`

The situation and/or conditions; starts with "when". If there are multiple conditions (ex "and" or "or"), nest the `context`s:

```js
context('when `water` is a small number', function() {
    context('and `heat` is a big number', function() {
```

### `it`

The result; starts with "should".

```js
context('when `water` is a small number', function() {
    it('should reduce output', …)

    context('and `heat` is a big number', function() {
        it('should significantly reduce output', …)
    });
});

context('when `water` is 0', function() {
    it('should cease output', …)
```

## Examples

The general skeleton of a spec should look like the following:

```js
import React from 'React';
import _ from 'lodash';

import { expect } from 'chai';

import Form from './';
import ErrorMessage from './ErrorMessage';

describe('Form', function() {
    const dummyData = // …
    // …

    context('when there is a validation error', function() {
        const invalidData = _.merge({ … }, dummyData);

        it('should update the UI', function() {
            // …

            expect(form.hasClass('error'), 'css classname')
                .to.be.true;
            expect(submitButton.prop('disabled'), 'disable submit')
                .to.be.true;
            // …
        });
    });

    context('when the submission response is a failure', function() {
        it('should display an error message', function() {
            // …

            expect(form.find(ErrorMessage).exists()).to.be.true;
            // …
        });
    });
});
```

**Okay**

```js
it('should replace the values of default keys', function() {
    // …

    expect(redactedData).to.deep.eq({
        defaultKey1: '*',
        foo: 'a',
        qux: {
            defaultKey2: '*',
            something: 'b',
        },
    });
});
```

**Better**

```js
it('should replace the values of default keys', function() {
    // …

    expect(redactedData.defaultKey1, 'defaultKey1').to.equal('*');
    expect(redactedData.foo, 'foo').to.equal('a');
    expect(redactedData.qux.defaultKey2, 'qux.defaultKey2')
        .to.equal('*');
    expect(redactedData.qux.zed, 'qux.zed')
        .to.equal('b');
});

it('should maintain the original structure', function() {
    // …

    expect(
        _.keys(redactedData),
        'first level properties'
    )
        .to.have.all.keys(_.keys(dummyData));
    expect(
        _.keys(redactedData.qux),
        'second level properties'
    )
        .to.have.all.keys(_.keys(dummyData));
});
```

## Tips and Tricks

When writing specs, you often don't need everything that `yarn run test` does. Instead you can use `clap test-frontend`:

1. Temporarily (**don't check it in!**) add the code from [§ Gotchas](#error-missing-attribute-value-for-attribute-path-of-element-file) to [`karma.config.js`](archetypes/karma/karma.config.js)
1. Add `.only` to your spec's root `describe`: `describe.only(`
1. Run `clap test-frontend`

Not following these instructions _exactly_ will result in garbage output.

File references and line numbers from `clap test-frontend` are actually accurate.