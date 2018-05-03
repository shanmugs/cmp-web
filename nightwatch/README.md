# chimp-uia + Nightwatch.js
Nightwatch.js is an automated testing framework for web applications and websites, written in Node.js and using the Selenium WebDriver API.

It is a complete browser automation (End-to-End) solution which aims to simplify the process of setting up Continuous Integration and writing of automated tests.

This repo contains a suite of front-end UI tests written for chimp.net using Nightwatch.js

## To Run the Tests:

The minimum required java version for Selenium is 7.0.

### Setting your Browserstack Credentials

Each of us should have an account for Browserstack. In order to run any of the automated tests, you need to add your personal Browserstack credentials to the working directory.

Login to BrowserStack automate, and get your key from https://www.browserstack.com/automate/nightwatch#integration-with-browserstack

Copy down your credentials, and add them to your .zshrc file as follows:

export BROWSERSTACK_USER="your-username-here"
export BROWSERSTACK_KEY="your-key-here"

Now you can run tests through Bowserstack!

### Run from the Project Root Folder

Gone are the days where you had to navigate to a sub folder to run your automation. Now, Nightwatch can be run from the project's root folder. 

### Building your 'run' command

To run nightwatch, you need three things:

1) run command
2) the chosen environment
3) the chosen test suite

The tests are organized into folders under `nightwatch/tests/` and can be run individually, in groups, or as a full suite.

### Run Command

The run command is really straight forward. You'll append your settings to this:

`node nightwatch run`

### Chosen Test Environment

To see the list of available settings, enter `node nightwatch` or `node nightwatch list` into the terminal. Nightwatch will output a list of options. 

Decide whether you will be running a local instance, or a remote instance (ie. staging, production), and copy the slug for the appropriate environment. For example, if I want to run the tests against my local dev environment on safari, I would copy 'fe-local_os-x_sierra_safari'.

Now, you can add that to your run command, like so:
`--env 'fe-local_os-x_sierra_safari'`

#### Debugging Nightwatch environment config

Sometimes you need to see the exact Nightwatch environment configuration of a given environment, but they're dynamically built in `nightwatch/test-environments.js` and can't be viewed in the file system. But you can use the `node nightwatch list <envName>` command to print the JSON config object.

### Chosen Test Suite

Now we have to tell Nightwatch which tests to run. We can run tests by tag, by grouping (folder), by test file, or by test case.

To run by tag, you'll use:
`--tag staging`

Where 'staging' is the name of the desired tag. Some tags you would probably like to try are:
- staging
-- these are all of our complete tests that don't require manual set up conditions
- critical-stage
-- these are our critical-path tests, and re used for deployment smoke tests
- production
-- these are all of our complete tests that don't require manual set up conditions or completing real transactions, becaue we don't like using real money on production
- critical-prod
-- these are our critical-path tests that don't complete real-money transactions. We run these test to complete our production smoke tests post deployment
- unique-setup
-- these tests require direct manual intervention from the user, such as setting up a manual P2P and entering the tokenized url into the test

To run by group, you'll look at the project's folder structure under nightwatch/test, and choose the folder that makes the most sense for your needs. 

After selecting a grouping, you'll append it to the command with:
--group authentication/

Where 'authentication/' is the name of the folder grouping you'd like to run.

To run by test, you'll need the full path of the file you want to run. It'll look like this, in practice:
`--test nightwatch/tests/authentication/logIn.js`

Where 'authentication/logIn.js' is replaced by the group and the file name of the test you're trying to execute.

To run a specific testcase, you add the name of the test to the above, ie:
`--test nightwatch/tests/authentication/logIn.js --testcase 'Verify login page elements present'`

### Put it all together
Running a tag would look like:
`node nightwatch run --env 'fe-local_os-x_sierra_safari' --tag staging`

Running a group would look like:
`node nightwatch run --env 'fe-local_os-x_sierra_safari' --group authentication`

Running a testcase would look like:
`node nightwatch run --env 'fe-local_os-x_sierra_safari' --test nightwatch/tests/authentication/logIn.js --testcase 'Verify login page elements present'`

You get the idea :)

## Monitoring the Tests

Terminal will output the results of your tests, as normal. If you want to watch the video of the tests running, or retrieve failure screenshots, you now have to log in to Browserstack.

Log in and navigate to https://www.browserstack.com/automate

You can see the tests you've run in the sidebar on the left. Selecting any of the tests will show a page with a video of the execution and screenshots next to any failure condition. These can help you track down tests that are red in your terminal.

### Be aware that:

- the failure screenshots are taken for tests that have if/then conditions, even if they don't explicitly fail. For example, our log in command searches for the "not you?" link before logging the test account into the site. If it's not found, the screenshot is taken, even though the test itself passes.
- Browerstack does not report failed tests in the sidebar. You'll have to watch for failures in terminal, and then find the test by name, rather than by using red circles.
- If you exit a local test prematurely, selenium is not shutting down correctly. You will have to grep the process and kill it to free the port back up before you can start another local instance. Does that sound too complicated? Ok, just restart your computer. That'll work, too.

## Documentation
- [Nightwatchjs.org](http://nightwatchjs.org/)
- [Nightwatchjs.org Developer Guide](http://nightwatchjs.org/guide)
- [Nightwatch.js API Reference](http://nightwatchjs.org/api)
- [Nightwatch.js GitWiki](https://github.com/nightwatchjs/nightwatch/wiki)
- [Chimp Wiki Coverage and Planned Coverage](https://github.com/ChimpTech/Chimp/wiki/Quality-Assurance:-UI-Automation)


# Proposed Reorganization

# Nightwatch Conventions


## 1) What kind of tests should Nightwatch handle

Integration Tests should be handled by Nightwatch. If your test navigates UI then it's probably an integration test. Integration tests should test user flows through the application.  Any test that needs to query the database to determine it's success state should be handled by Capybara as unit tests. Additionally, any tests that verify email delivery or email links will need to be handled by Capybara. Nightwatch has no mail catching functionality.

If a test seems to need to both touch the UI and the database, consider breaking it into separate integration and a unit test.  

## 2) How frequently do we run Nightwatch
    
Nightwatch test execution time will grow quite large as our application grows. We should only run the integration tests when cutting a release.  If we feel like this isn't catching enough errors, then we could have them run on each merge to develop. But we should be careful not to strangle our development speed over-running nightwatch.

Once nightwatch is mature and running through circle, it will be easy to schedule the tests to run nightly against any number of branches or environments. I would recommend running against our active integration branches, using a heroku app.

## 3) Define Critical flows

Critical flows are defined as UI flows that directly impact the conversion of a user, for example through registration, or the addition and distribution of funds. You can see a full list of Critical Flows on [Confluence](https://chimptech.atlassian.net/wiki/display/DEV/Critical+Flows)   

## 4) Establish required testing dataset and process on adding to it

Nightwatch test accounts are currently documented in the [Wiki](https://github.com/ChimpTech/Chimp/wiki/Quality-Assurance:-UI-Automation#automation-test-accounts) and are accessed and stored in `nightwatch/page-objects/global/userData.js`.

Wherever possible, use existing data sets. If the existing data sets don't meet your needs, you can either:
- add a new data set
- modify an existing dataset

When creating a new data set, add it to the test data file and clearly label it with where it's used, and its purpose. In your PR, include the reason you feel existing data sets weren't sufficient, or were too risky to use.


### Sharing Test Data

As per our discussion in techinical backlog grooming, we should expose test data at an API endpoint only in test environments.
This will keep both our application and Nightwatch tests in sync and using the same data, and prevent us from duplicating account creation effort.

We can create a method in Nightwatch `nightwatch/globals.js` to query the endpoint on nightwatch start and expose those objects to the
nightwatch tests. 

Implementing this test data API would invalidate the previous data mentioned above in `nightwatch/page-objects/global/userData.js` 

## 5) Establish rules around manipulating data sets

Manipulating data on commonly used accounts can lead to tests becoming dependent on conditions set up by each other. This can become a big maintainablity problem and should be avoided at all costs (also prevents parallelization). Unfortunatly Nightwatch doesn't have the capacity to reset database state after each test scenario (maybe API endpoint to wipe and re-seed test data)

When modifying a data set, make sure that your changes don't break the conditions for existing tests. Each data set should indicate where it is used and for what reason in the comments, so double check that the related tests are unaffected. Add notes about your changes in the test data document.

If a test scenario requires an irreversible change to the dataset, consider creating a new user account to prevent dependencies on unreliable data. 

## 6) Code re-use strategies

Here's where we can most improve our Nightwatch experience.  Our tests are managable now that we have a small amount of coverage. As our code base grows, this organization will lead us to duplicate code, leading to inconsistant reimplementations of tests.

A common pattern to manage test code organization is the pageObject Model. Nightwatch has built in support for pageObjects in the form of auto-loading our pageObject files. A good case for pageObjects is made in this [article](http://martinfowler.com/bliki/PageObject.html).   Nightwatch provides some limited [documentation](http://nightwatchjs.org/guide#page-objects) for the feature. I've reimplemented our home.js tests to use limited set of page objects. Take a look at the code 

With page objects it should be much clearer where test code should go. We're essentially separating  our assertation
logic from our selection logic. This will make our test much more maintainable over the long run. 

### Example of a page Object:

    // /nightwatch/page-objects/login.js
    // ---

    var appSections = require('./global/appSections');
    var sections = appSections;
    // could add additional sections here with sections.sectionName = { selector: '.selectoClass' ...}


    module.exports = {
        url: function() {
            return this.api.launch_url + 'login';
        },
        sections: sections,
        commands: [{
            fillInForm: function () {
                 this
                    .verify.elementsPresent( '@passwordField' )
                    .verify.elementsPresent( '@loginField' )
                    .setValue('@loginField', 'username')
                    .setValue('@passwordField', 'Awef1234!');
                return this;
            },
            submit: function () {
                this
                    .verify.elementsPresent( '@submit' )
                    .triggerTouch('@submit');

                return this; // All commands should return 'this' object so tests are chainable.
            }
        }],
        elements: {
            form: '#login_form',
            loginField: 'input[name="login"]',
            passwordField: 'input[name="password"]',
            submit: '#button[type="submit"]'
            // ...
        }
    }

#### Url

A function that returns the URL of the pageObject. Can be accessed directly or the browser can navigate to this url value with the .naviagate() method called on the pageObject. eg: 
    
    var login = browser.page.login();
    login.navigate(); // directs browser to http://local.chimp.net:3000/login

### Sections

Sections are ways to break complex pages into more managable chunks.  Sections are just page objects nested within the currentPage Object. They support the same methods except the url, and replaces it with a selector property. An example of a section is the header, footer, or modal, but could be specific pieces of content on more complicated pages.  

I've set up a list of common selectors each page has and in the example abobe, `require()`'d the selectors object to reduce duplication of common selectors in pageObjects. Here's a simplified version of the Footer section:
    
    module.exports = {
        selector: '.c-footer',
        commands: [{
            toggleLanguage: function() {
                this.verify.containsText('@langToggleText', 'Parlez-vous français?')
                    .triggerTouch('@langToggle')
                    .waitForElementVisible('@langToggleText')
                    .verify.containsText('@langToggleText', 'Do you speak English?');
                
                return this;
            }
        }],
        elements: {
            preFooter: '.c-prefooter',
            footer: '.c-footer-primary',
            postFooter: '.c-postfooter',
            subFooter: '.c-footer-secondary',
            footerLogo: '.c-footer-secondary__logo',
            //...
            langToggleText: '.qa-lang-toggle span'

        }
    }

Notice the lack of the URL method, but the addition of the selector property.  Selectors are accessed in the following way. given that login.js page object has footer.js as a section:

    var login = browser.page.login();
    var footer = login.section.footer;

    // footer has access to @preFooter
    // calling elements on sections will prefix them with the section selector property
    // this looks for and element with `.c-footer .c-prefooter` selector
    footer.verify.elementsPresent('@preFooter') 
    
    login.verify.elementsPresent('@preFooter') // login can't call it's sections elements! This will error

The footer section here also has it's own commands independent of the login commands. They're totally separate objects but are accessable in a tree.

Also sections are nestable in each other. This can get crazy. Use sections to your own discression.


### Commands

Command should be common actions that will be preformed on this page. These commands make assertions against the `this` object, which is the pageObject. Because of this, a command can reference the elements of this pageobject through @ syntax
    
    fillInForm: function () {
        this
            .verify.elementsPresent( '@passwordField' )
            .verify.elementsPresent( '@loginField' )
            .setValue('@loginField', 'username')
            .setValue('@passwordField', 'Awef1234!');
        return this;
    },

This command verifies that the password and login field exist then fill them in. Note that every command should return the pageObject, `this` in the scope of a command so that tests that call these command can continue to chain methods on the returned pageObject.

### Elements

Contains all selectors relevant to the page with named keys and CSS selectors as values. These elements are accessable when assertations are run against the pageObject in a test with `@<keyString>`
    
    //(in test file)
    var loginPage = browser.page.login();
    loginPage.verifiy.elementsPresent('@form') // Uses the key with @ in front of it. 

### Woah, that sounds complicated, why are we using them?

Clear cut file structure. Each page/view in your app is a pageObject. Create a .js file in `/nightwatch/page-objects` and it'll be auto-loaded and accessable  at `browser.page.<fileName>();` in tests.  Where to store a selector is obvious based on it's page.

Encapsulated methods and elements: Do you have a fequent flow on a page, like filling in a form that takes multiple steps? Write it once on the page object, and then reference the same command in every test that needs to fill in that form..  If the patten is followed, our login assertations are only implemented once, ever! No more copy and pasting every assertation in every test. This cuts down on code duplication, and prevents us from reinventing the wheel.

One of our form's adds a field after we've already implemeted a test. Before we would have to update all of our tests that use the form and add the new step. Now we update the single command, and don't even touch our tests.

Sections allow us to write our header, footer and modal commands once and reference them from any page object. Again deduplicating code.


## 7) CSS selector best practices

CSS selectors are a complicated topic. There's many ways write them, but improper usage can lead to tests that report failures when a feature is still functional. As someone writing selectors for tests you should try to write selectors as loosley coupled to the HTML markup as possible while still accessing the data you need to test.  

Lets disect a tightly coupled selector and review how we can improve it. Heres a simplified version of some HTML we have in the app:

    <div class="c-community-sign-up-form" >
        <form class="u-flex u-flex--column u-flex--items-center" >
            <div class="c-float-label u-margin-bottom-md c--hide" >
                <label for="user[first_name]" class="c-float-label__label" >First Name</label>
                <input class="c-float-label__input" id="user[first_name]" name="user[first_name]" type="text" value="" placeholder="First Name" autocomplete="off" >
            </div>
            <div class="c-float-label u-margin-bottom-md c--hide" >
                <label for="user[last_name]" class="c-float-label__label" >Last Name</label>
                <input class="c-float-label__input" id="user[last_name]" name="user[last_name]" type="text" value="" placeholder="Last Name" autocomplete="off" >
            </div>
            <p class="u-margin-bottom-lg u-text-align-center" >
            <span >By signing up for a Chimp Account, you agree to accept our </span>
            <a href="/chimp-account-agreement" >Chimp Account Agreement</a>
            </p>
            <button class="c-button c--filled-secondary c--pop" type="submit" >Create Account</button>
        </form>
    </div>

And the selector used to get the first input 

    .c-community-sign-up-form > form > div:nth-child(1) > input


This selector uses the direct decendant operator ">" between every element, enforcing the exact heirarchy of elements. If we ever need to add divs or spans between the elements of the form for styling, it would break the selector, without really breaking the functionaltiy of the form.  Lets make this more flexible

    .c-community-sign-up-form form div:nth-child(1) input

This selector allows for any number of elements to exist between then root class and the form element, and the form element to the div, and so on.  This allows a lot more flexibility to style the content while maintaining the testability. This still enforces that the form uses div's as a way of grouping inputs and their labels though.  This is a pretty common pattern, but an equally common one is to use p tags. Again a switch that wouldn't impact the functionaltiy of our form. Let's simplify

    .c-community-sign-up-form form .c-float-label:nth-child(1) input

This works, and allows the .c-float-label to be any type of element the developer chooses. It's better than the previous selector but we can do better. nth-child is pretty fragile, and while helpful enforces an order on the developer to maintain tests. If UX research says that the first name field should go after the last name, this will break our tests yet again. 

What we're really after here is a way to uniquely identify the first_name input field. Here's where attribute selectors can help us.

    .c-community-sign-up-form form input[name="user[first_name]"]

Here's the ultimate in flexibility, We're looking for an input field that submits a user[first_name] key in a form, in the .c-community-sign-up-form.  If this element isn't found, We're positive that the form won't work because it's not submitting the correct data.  Not only will this test continue to work after many UI refactors, it'll ensure that our form submits the right data, and only error when it fails to do so.  

Attribute selectors are the way to go if at all possible.  They more often than not select for functionality over style. 

### That's all good, but I still can't select this element!

In the case that there's nothing uniquely identifiable on an element your're trying to test, throw a qa- class on it.  qa- classes are understood by the team to exclusivly expose hooks for tests to grab UI. Style should never be applied to them, and if no tests are using them they should be removed. But qa classes are a useful tool when you just can't get an element any other way.



## 8) Test bundling

This section will cover how to group and run tests, including their structure and organization. We'll be using two methods to organize our test suite: grouping by folders, and grouping by tags.


### Tags 

Tags are the simplest, so we'll start there. We need a way to make sure our tests aren't executing real money transactions on production, or creating junk data in our prod database. To help avoid that, we'll be tagging transaction tests and tests that generate random user accounts (ie. join community) with a keyword. Then, when we run our tests vs the production environment, we can exclude that keyword via the command line to keep our database clean, and our tests passing. Currently we're discussing using the keyword "transaction". Suggestions? Welcome.

Tags are applied to test object before the test functions like so:
    
    module.exports = {
        '@tags': ['transaction', 'marketing'],
        'demo login test': function (client) {
           // test code
        }
    };

We can then run all of our tests tagged with the transaction tag with `node nightwatch --tag transaction`. We can also exclude these tags(ie: in production) with `node nightwatch --skiptags transaction`

### Groups

Folders allow us to run smaller groupings of tests and will be broken down by feature under the /tests/ folder. To run a folder, you can use the command:

`node nightwatch --group navigation` where "navigation" is the title of your folder grouping.

We'll continue to add feature groupings as they make sense, while building out our coverage. At current, our test suite breaks down into the following folders:

- Navigation/
- Marketing/ 
- Dashboard/
- Donations/ (add money)
- Allocations/ (give money)
- Communities/

If it becomes necessary we can add sub-folders to these top-level features, for example:

- Dashboard/
    - accountSettings/
    - taxReceipts/
    - givingTools/
- Donations/
    - Community/
    - User/
- Allocations/
    - Beneficiary/
    - Groups/
    - User/

...etc. as the organization becomes necessary.



