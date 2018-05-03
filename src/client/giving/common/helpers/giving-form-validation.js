// Helper functions for giving flow form validations

// Regural expression to verify a valid email address
const emailRgx = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Check if a single email address is valid
export const isValidEmail = (email) => {
    return emailRgx.test(String(email).trim());
};

// Check if the input is a list of valid email adress separated by comma
export const isValidEmailList = (input) => {
    return _.every(input.split(','), isValidEmail);
};

// Check if the input length is less than 1000
export const isInputLengthLessThanOneThousand = (input) => {
    return input.length <= 1000;
};

// Check if input is a valid positive number
export const isValidPositiveNumber = (number) => {
    return number > 0 && !isNaN(number);
};

// Check if input is at least 1 dollar.
// Ignore the error if it is not a valid positive number
export const isAmountMoreThanOneDollor = (number) => {
    return isValidPositiveNumber(number) ? number >= 1 : true;
};

// Check if input is less than 1000000
// Ignore the error if it is not a valid positive number
export const isAmountLessThanOneBillion = (number) => {
    return isValidPositiveNumber(number) ? number <= 1000000000 : true;
};

// Check if input is blank
export const isInputBlank = (input) => {
    return input === '';
};

// Check if input has at least two chars
export const hasMinTwoChars = (input) => {
    return input.length >= 2;
};

// Check if input has at least five chars
export const hasMinFiveChars = (input) => {
    return input.length >= 5;
};
