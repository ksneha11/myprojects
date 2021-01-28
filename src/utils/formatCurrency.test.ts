import { formatCurrency } from './';

const currencyOne = '50';
const currencyOneResult = '$50.00';

const currencyTwo = '65.0';
const currencyTwoResult = '$65.00';

const currencyThree = '700.00';
const currencyThreeResult = '$700.00';

const currencyFour = '453.0234';
const currencyFourResult = '$453.02';

const currencyFive = '3223.34';
const currencyFiveResult = '$3,223.34';

const currencySix = '54345';
const currencySixResult = '$54,345.00';

describe('test adding decimal places when none present, dollar sign at the start', () => {
    it('should pass', () => {
        expect(formatCurrency(currencyOne)).toBe(currencyOneResult);
    });
});

describe('test adding decimal places when one present', () => {
    it('should pass', () => {
        expect(formatCurrency(currencyTwo)).toBe(currencyTwoResult);
    });
});

describe('test keeping format with correct decimals', () => {
    it('should pass', () => {
        expect(formatCurrency(currencyThree)).toBe(currencyThreeResult);
    });
});

describe('test removing extra decimals', () => {
    it('should pass', () => {
        expect(formatCurrency(currencyFour)).toBe(currencyFourResult);
    });
});

describe('test adding commas with 4 digits', () => {
    it('should pass', () => {
        expect(formatCurrency(currencyFive)).toBe(currencyFiveResult);
    });
});

describe('test commas with 5 digits', () => {
    it('should pass', () => {
        expect(formatCurrency(currencySix)).toBe(currencySixResult);
    });
});
