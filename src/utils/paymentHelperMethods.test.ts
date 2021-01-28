import { invalidDateChecker } from './creditCardValidators';
// tslint:disable-next-line: no-duplicate-imports
import { formatExpirationDate, isExpired } from './paymentHelperMethods';

const expiredDate = '02/12';
const fullDate = '2/2023';
const fullDate2 = '02/2023';
const validDate = '02/29';
const validDate2 = '2/29';

describe('Test formatExpirationDate', () => {
    it('Should return fullDate formatted with correct full year if given halfDate', () => {
        const res = formatExpirationDate(validDate, true);
        expect(res).toEqual('02/2029');
    });

    it('Should return halfDate formatted with same year', () => {
        const res = formatExpirationDate(validDate2, false);
        expect(res).toEqual(validDate);
    });

    it('Should return fullDate with zero in front', () => {
        const res = formatExpirationDate(fullDate, true);
        expect(res).toEqual(fullDate2);
    });

    it('Should return the same date given', () => {
        const res = formatExpirationDate(fullDate2, true);
        expect(res).toEqual(fullDate2);
    });

    it('Should take a null and return null even if passed true', () => {
        const res2 = formatExpirationDate(null, true);
        expect(res2).toBe(null);
    });

    it('Should take a null and return null even if passed false', () => {
        const res = formatExpirationDate(null, false);
        expect(res).toBe(null);
    });
});

describe('Test isExpired', () => {
    it('If given Valid Date Should return false', () => {
        const res = isExpired(validDate);
        expect(res).toEqual(false);
    });

    it('If given expired Date Should return true', () => {
        const res = isExpired(expiredDate);
        expect(res).toEqual(true);
    });

    it('If given null Should return true', () => {
        const res = isExpired(null);
        expect(res).toBe(true);
    });
});
