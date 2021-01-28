import { isEmailAddressValid } from './emailValidator';

const validEmail = 'string@gmail.com';
const validEmail2 = 'louisDarnStrong@jazz.gov';
const validEmail3 = 'louis.typingAgain@gmail.gov';
const invalidEmail = 'string@mail';
const invalidEmail2 = 'xzczdfa.gmail.com';

describe('test to see if valid email returns true', () => {
    it('should pass', () => {
        expect(isEmailAddressValid(validEmail)).toBe(true);
    });
});

describe('test to see if valid email returns true', () => {
    it('should pass', () => {
        expect(isEmailAddressValid(validEmail2)).toBe(true);
    });
});

describe('test to see if valid email returns true', () => {
    it('should pass', () => {
        expect(isEmailAddressValid(validEmail3)).toBe(true);
    });
});

describe('test to see if invalid email returns false', () => {
    it('should pass', () => {
        expect(isEmailAddressValid(invalidEmail)).toBe(false);
    });
});

describe('test to see if invalid email returns false', () => {
    it('should pass', () => {
        expect(isEmailAddressValid(invalidEmail2)).toBe(false);
    });
});
