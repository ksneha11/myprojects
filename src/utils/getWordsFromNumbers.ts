/**
 * Convert a number like "2021" into an accessible string like "two thousand twenty one".
 * @param {number} number The number to be converted
 * @param numberWords Object containing various numbers words in the correct language
 * @returns {string} Long numberString form of number ie.
 */
export const getWordsFromNumbers = (number: number, numberWords: any): string => {
    const first = numberWords.first;
    const tens = numberWords.tens;
    const bigNumberSuffix = numberWords.bigNumberSuffix;
    let numberString = '';

    for (let i = 0; i < bigNumberSuffix.length; i++) {
        let tempNumber = number % (100 * Math.pow(1000, i));
        if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
            numberString =
                Math.floor(tempNumber / Math.pow(1000, i)) < 20
                    ? first[Math.floor(tempNumber / Math.pow(1000, i))] + bigNumberSuffix[i] + ' ' + numberString
                    : tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
                      '-' +
                      first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
                      bigNumberSuffix[i] +
                      ' ' +
                      numberString;
        }

        tempNumber = number % Math.pow(1000, i + 1);
        if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) {
            numberString = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'hundred ' + numberString;
        }
    }
    return numberString.trim();
};
