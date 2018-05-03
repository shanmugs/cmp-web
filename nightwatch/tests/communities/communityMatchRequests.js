
module.exports = {

    '@tags': ['staging', 'critical-stage', 'gemini'],

    'setUp': function(browser) {
        makeAMatchedDonation(browser, 'chimpautomation+kevin@gmail.com', 'Qwerty1234!');
        makeAMatchedDonation(browser, 'chimpautomation+buzz@gmail.com', 'Qwerty1234!');
    },

    'Community Match Request: Company admin can approve multiple match requests': function(browser) {
        var login = browser.page.login();
        var communityMatchRequests = browser.page.communityMatchRequests();
        var communityAdmin = browser.page.communityAdmin();
        var requestsForm = communityMatchRequests.section.requestsForm;        
        var firstMatch = requestsForm.section.firstMatch;
        var secondMatch = requestsForm.section.secondMatch;
 

         login
            .navigate()
            .waitForElementVisible('@form')
            .fillInForm('chimpautomation+kevin@gmail.com', 'Qwerty1234!')
            .submitForm('@loginForm');

        browser.page.dashboard()
            .waitForElementVisible('@accountNav');

        communityMatchRequests
            .navigate()
            .waitForElementVisible('@adminButtons');

        communityMatchRequests
            .expect.section('@requestsForm').to.be.visible

        requestsForm.expect.section('@firstMatch').to.be.visible;
        requestsForm.expect.section('@secondMatch').to.be.visible;

        requestsForm
            .waitForElementVisible('@selectAllMatches')
            .triggerTouch('@selectAllMatches')
            .approveSelectedMatches();

        communityMatchRequests
            .waitForElementVisible('@confirmRequestsButton')
            .triggerTouch('@confirmRequestsButton');

        communityAdmin
            .waitForElementVisible('@adminButtons')
            .verify.containsText('@successFlashMessage', 'Nice chimping, those donation requests have now been matched.')

        browser.end();

    },

}


function makeAMatchedDonation(browser, email, password) {
    var login = browser.page.login();
    var header = login.section.header;
    var addMoney = browser.page.userAddMoney();
    var addMoney = browser.page.userAddMoney();
    var amountForm = addMoney.section.amountForm;
    var stripeForm = addMoney.section.stripeForm;
    var taxReceipt = addMoney.section.taxReceiptForm;
    var confirmPage = addMoney.section.confirmPage;

    login
        .navigate()
        .waitForElementVisible('@form')
        .fillInForm(email, password)
        .submitForm('@loginForm');

    browser.page.dashboard()
            .waitForElementVisible('@accountNav');

    addMoney.navigate();

    addMoney
        .expect.section('@amountForm').to.be.visible;


    // Only necessary if the user has multiple accounts associated with it
    var accountSelect = amountForm.elements.newDonationChooseFund.selector;
    browser.element('css selector', accountSelect, function(result){
        if (result.value && result.value.ELEMENT) {
            // If the links's present, click it, wait for the page to reload and fill in 
            // as usual
            amountForm
                .click('@newDonationChooseFund')
                .click('@newDonationChooseFundFirst')
                .click('@newDonationChooseFund')
        }       
    });

    amountForm
        .click('@newDonationStripeSelectFirst')
        .click('@newDonationStripeSelect')
        .fillInForm({
            amount: '5.00',
        });

    amountForm
        .verify.elementPresent('@employeeID')
        .triggerTouch('@employeeID')
        .selectOptionByText('@employeeMatch', 'Shady Potatoes');

    addMoney
        .submitForm('@newDonationForm');

    addMoney
        .expect.section('@confirmPage').to.be.visible;

    confirmPage
        .triggerTouch('@confirmButton');

    addMoney
        .waitForElementVisible('@success');

    header.logout();
}
