/**
 * Adds a dollar sign in front of the ammount and adds commas when relevant
 * the regex replace adds commans every third digit
 *
 * Ideally we'd use the Intl.NumberFormat library, but Android doesn't support that.
 * Instead we get this fun regex statement.
 */

export default (currencyValue: number | string): string => {
    if (typeof currencyValue === 'string') {
        currencyValue = currencyValue.replace(',', '');
    }
    return `\$${Number(currencyValue)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};
