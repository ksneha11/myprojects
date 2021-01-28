import { getWordsFromNumbers } from '.';

/**
 * Convert a credit card expiration in the form of Month/Year into an accessible string that
 * consists of the month in long month format ("January, March, etc.") and year.
 * This function is useful if you have
 * a date that does not include a day, such as a credit card expiration date for example.
 * If you need to convert a full date into an accessible string use the Moment's format('LL')
 * @param {string} expirationDate The date to be converted in a format like "3/2021"
 * @param {string[]} months Array of months in the correct language
 * @param numberWords Object containing various numbers words in the correct language
 * @returns {string} Accessible expiration date
 */
export const getAccessibleCreditCardExpirationDate = (
    expirationDate: string,
    months: string[],
    numberWords: any
): string => {
    const [month, year] = expirationDate?.split('/') ?? ['', ''];
    return `${months[parseInt(month, 10) - 1]}, ${getWordsFromNumbers(parseInt(year, 10), numberWords)}`;
};
