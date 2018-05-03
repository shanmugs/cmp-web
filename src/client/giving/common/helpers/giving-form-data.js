
// @todo: Remove Once API call for Saved CreditCard Dropdown
// JIRA TICKET : GIVEB-106
const cardListOptions = [
    {
        key: 'new',
        value: 'new',
        text: 'Use a new credit card',
        data: '',
    },
    {
        key: '1',
        value: '1',
        text: 'John Doe Visa ending with 4242',
        data: {
            cardNumber: '4242 4242 4242 4242',
            nameOnCard: 'John',
            expiryMonth: 10,
            expiryYear: 2020,
            cvv: 123,
        },
    },
    {
        key: '2',
        value: '2',
        text: 'Mak Visa ending with 4141',
        data: {
            cardNumber: '4141 4141 4141 4141',
            nameOnCard: 'John2',
            expiryMonth: 11,
            expiryYear: 2022,
            cvv: 1234,
        },
    }];

// @todo GIVEB-106 Remove Once API call for donationMatch Dropdown
const donationMatchList = [
    {
        key: '1',
        value: '1',
        text: 'Absolute ($98 per month)',
        data: '',
    },
    {
        key: '2',
        value: '2',
        text: 'Do not match',
    }];

const addingToOptions = [
    {
        key: '0',
        value: '0',
        text: 'Select a destination account',
        data: '',
    },
    {
        key: '1',
        value: '1',
        text: 'Chimp’s Account (Balance: $0.00)',
    },
    {
        key: '2',
        value: '2',
        text: 'a third time’s Account (Balance: $0.00)',
    }];

const onWhatDayList = [
    {
        key: '1',
        value: '1',
        text: 'Add money on the 1st of every month.',
        data: '',
    },
    {
        key: '15',
        value: '15',
        text: 'Add money on the 15th of every month.',
    }];

export {
    cardListOptions,
    donationMatchList,
    addingToOptions,
    onWhatDayList,
};

