import { noLetters } from './inputFormatters';

const testOne = '4354oeuo4g';
const testOneResult = '43544';

const testTwo = '9367';
const testTwoResult = '9367';

describe('test that noLetters takes out letters', () => {
    it('should pass', () => {
        expect(noLetters(testOne)).toBe(testOneResult);
    });
});

describe('test that noLetters leaves numbers alone', () => {
    it('should pass', () => {
        expect(noLetters(testTwo)).toBe(testTwoResult);
    });
});
