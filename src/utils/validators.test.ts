import {
    invalidAccountNumberLength,
    invalidRoutingNumberLength,
    isAccountNumberEmpty,
    isRoutingNumberEmpty,
} from './bankAccountValidators';
import {
    invalidDateChecker,
    invalidExpirationDateLength,
    isCreditCardFieldEmpty,
    isCreditCardNumberInvalid,
} from './creditCardValidators';

import { securityCodeValidator, validateMinimumPayment } from './inputValidator';

const shortRoutingNumber = '559';
const longRoutingNumber = '345345435345345';
const emptyRoutingNumber = '';
const validRoutingNumber = '123456789';

const shortAccountNumber = '846';
const longAccountNumber = '23423423423423532453452353457564653';
const emptyAccountNumber = '';
const validAccountNumber = '43534563456';

const minimumPay = '$1,000';
const enteredPay = '500';

const validDate = '11/29';
const expiredDate = '11/11';
const invalidDate = '12/99';
const fullDate = '11/19';
const shortDate = '1/1';
const emptyExpirationDate = '';

const emptyCreditCard = '';
const invalidCreditCard = '411111111111111111131111113';
const validCreditCard = '411114111111111111111';

const validSecurityCode = '0011';
const invalidSecurityCode = '0000';

describe(Boolean, () => {
    it('should pass', () => {
        expect(validateMinimumPayment(minimumPay, enteredPay)).toBe(true);
    });
});

// // TODO:  Make these tests work in multiple langugages
describe('test error on routing number that is too short', () => {
    it('should pass', () => {
        expect(invalidRoutingNumberLength(shortRoutingNumber)).toBe(true);
    });
});

describe('test error on routing number that is too long', () => {
    it('should pass', () => {
        expect(invalidRoutingNumberLength(longRoutingNumber)).toBe(true);
    });
});

describe('test empty routing error on routing number that is empty', () => {
    it('should pass', () => {
        expect(isRoutingNumberEmpty(emptyRoutingNumber)).toBe(true);
    });
});

describe('test empty card error on credit card number', () => {
    it('should pass', () => {
        expect(isCreditCardFieldEmpty(emptyCreditCard)).toBe(true);
    });
});

describe('test empty card error on entered credit card number', () => {
    it('should pass', () => {
        expect(isCreditCardFieldEmpty(validCreditCard)).toBe(false);
    });
});

describe('test invalid card error on valid credit card number', () => {
    it('should pass', () => {
        expect(isCreditCardNumberInvalid(validCreditCard)).toBe(false);
    });
});

describe('test invalid card error on invalid credit card number', () => {
    it('should pass', () => {
        expect(isCreditCardNumberInvalid(invalidCreditCard)).toBe(true);
    });
});

describe('test empty error on valid date', () => {
    it('should pass', () => {
        expect(isCreditCardFieldEmpty(validDate)).toBe(false);
    });
});

describe('test empty error on entered date', () => {
    it('should pass', () => {
        expect(isCreditCardFieldEmpty(emptyExpirationDate)).toBe(true);
    });
});

describe('test invalid date error on invalid date', () => {
    it('should pass', () => {
        expect(invalidDateChecker(invalidDate)).toBe(false);
    });
});

describe('test invalid date error on valid date', () => {
    it('should pass', () => {
        expect(invalidDateChecker(validDate)).toBe(false);
    });
});

describe('test invalid date error on expired date', () => {
    it('should pass', () => {
        expect(invalidDateChecker(expiredDate)).toBe(true);
    });
});

describe('test error on valid expiration date', () => {
    it('should pass', () => {
        expect(invalidExpirationDateLength(fullDate)).toBe(false);
    });
});

describe('test error on invalid expiration date', () => {
    it('should pass', () => {
        expect(invalidExpirationDateLength(shortDate)).toBe(true);
    });
});

describe('test error on valid routing number', () => {
    it('should pass', () => {
        expect(invalidRoutingNumberLength(validRoutingNumber)).toBe(false);
    });
});

describe('test error on valid routing number', () => {
    it('should pass', () => {
        expect(isRoutingNumberEmpty(validRoutingNumber)).toBe(false);
    });
});

describe('test error message account number that is too short', () => {
    it('should pass', () => {
        expect(invalidAccountNumberLength(shortAccountNumber)).toBe(true);
    });
});

describe('test error message on routing number that is too long', () => {
    it('should pass', () => {
        expect(invalidAccountNumberLength(longAccountNumber)).toBe(true);
    });
});

describe('test error message on account number that is empty', () => {
    it('should pass', () => {
        expect(isAccountNumberEmpty(emptyAccountNumber)).toBe(true);
    });
});

describe('test error message on valid routing number', () => {
    it('should pass', () => {
        expect(isAccountNumberEmpty(validAccountNumber)).toBe(false);
    });
});

describe('test error message on valid routing number', () => {
    it('should pass', () => {
        expect(invalidAccountNumberLength(validAccountNumber)).toBe(false);
    });
});

describe('test a valid security code of 4 digits', () => {
    it('should pass', () => {
        expect(securityCodeValidator(validSecurityCode)).toBe(true);
    });
});

describe('test an invalid security code of 4 zeroes', () => {
    it('should pass', () => {
        expect(securityCodeValidator(invalidSecurityCode)).toBe(false);
    });
});
