import moment from 'moment';
import { Comparison, Condition } from '../models';
export { setAccessibilityFocus } from './accessibility';
export { currentLocation } from './currentLocation';
export { debounce } from './debounce';
export { default as deepClone } from './deepClone';
export { default as Foresee } from './surveys/foresee';
export { default as formatCurrency } from './formatCurrency';
export { MemberPreferenceEmailTypes, getMemberPreferencesEmail } from './memberPreferenceEmail';
export { default as merge } from './merge';
export { createIndexFromPersonInfo } from './createIndexFromPersonInfo';
export { getFormattedAccountName } from './paymentHelperMethods';
export { formatPhoneNumber, inputPhoneNumberFormatter } from './phoneNumberFormatter';
export { getAccessibleCreditCardExpirationDate } from './getAccessibleCreditCardExpirationDate';
export { getActiveRoute } from './getActiveRoute';
export { getDistanceFromLatLong } from './getDistance';
export { getWordsFromNumbers } from './getWordsFromNumbers';
export { isPhoneNumberInvalid } from './phoneNumberValidator';
export { noLetters } from './inputFormatters';
export { openAddress, openLatLong } from './openAddress';
export { stopScreenAnimation } from './stopScreenAnimation';
export { default as Logger, LogLevel } from './logger';

export function toTitleCase(str: string) {
    return str
        .split(' ')
        .map(word => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''))
        .join(' ');
}

export function getMaskedText(maximumLength: number, displayText: string) {
    if (maximumLength <= displayText.length) {
        return '*'.repeat(maximumLength);
    }
    return `${displayText}${'*'.repeat(maximumLength - displayText.length)}`;
}

export function maskPasswordCharacters(password: string) {
    return password.replace(/./g, '\u2022');
}

export function capitalizeFirstLetter(str: string): string {
    return str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function undefinedAction() {
    throw new Error(`Undefined Action`);
}

export function getUnique(arr: any[]) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}

export function keyValues(obj: object) {
    return Object.keys(obj).map(key => [key, obj[key]]);
}

export function removeFromArray(arr: any[], ...valuesToRemove: any[]) {
    return arr.filter(value => !valuesToRemove.includes(value));
}

// Gets the value at path of object.
// Note: If provided path does not exists inside the object js will generate error.
export function _get(obj: any, path: string, defaultValue?: any) {
    return path.split('.').reduce((a, c) => (a && a[c] ? a[c] : defaultValue || null), obj);
}

export function objectToTextBlob(obj: any) {
    const blob = [];
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'object' && value) {
            blob.concat(objectToTextBlob(obj[key]));
        } else {
            blob.push(value);
        }
    });
    return blob.join(' / ');
}
export function _omit(obj: any, ...keys: string[]) {
    return (
        Object.keys(obj || {})
            .filter(key => keys.indexOf(key) < 0)
            .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {}) ?? []
    );
}

/*
 * A callback for use in array filter.
 */
export function hasText<T>(str: string, ...keyPaths: string[]): Condition<T> {
    return (item: T) => {
        const textsToSearch = keyPaths ? keyPaths.map(keyPath => _get(item, keyPath)) : [objectToTextBlob(item)];
        return textsToSearch
            .join(' ')
            .toLocaleLowerCase()
            .includes(str.toLocaleLowerCase());
    };
}

/*
 * A callback for use in array sort.
 */
export function byProperty<T>(propPath: string, reverse = false): Comparison<T> {
    return (item1: T, item2: T) => {
        const value1 = _get(item1, propPath);
        const value2 = _get(item2, propPath);
        if (typeof value2 === 'undefined' || value2 === null) {
            return reverse ? 1 : -1;
        }
        if (value1 > value2) {
            return reverse ? -1 : 1;
        }
        if (value1 < value2) {
            return reverse ? 1 : -1;
        }
        return 0;
    };
}

export function withinDateRange(start: moment.Moment, end: moment.Moment, date: moment.Moment) {
    return date.isSameOrAfter(start) && date.isSameOrBefore(end);
}

export function inTheLast(
    amount: moment.DurationInputArg1,
    unit: moment.unitOfTime.DurationConstructor,
    date: moment.Moment
) {
    return withinDateRange(moment().subtract(amount, unit), moment(), date);
}

export function isStringNumber(input: string) {
    return typeof input === 'string' && !Number.isNaN(Number(input));
}

/**
 * Generates groups of items based on a list of filters.
 *
 * @param items - An array of items
 * @param groupFilters - An array of filters to create groups with
 * @return {T[][]} An array of item groups
 *
 */
export function groupBy<T>(items: T[], ...groupFilters: Array<(item: T) => boolean>): T[][] {
    if (items.length === 0) {
        return [[...items]];
    }
    const groups: T[][] = [];
    let itemsRemaining = [...items];
    groupFilters.forEach(groupFilter => {
        const { matchingItems, otherItems } = partition(itemsRemaining, groupFilter);
        groups.push(matchingItems);
        itemsRemaining = otherItems;
    });
    return groups.concat([itemsRemaining]);
}

/**
 * Generates two groups of items based on a filter
 *
 * @param items - An array of items
 * @param partitionFilter - A filters to create a group with
 * @return { matchingItems: T[], otherItems: T[] } A list of items matching filter and a list of items that did not
 *
 */
export function partition<T>(
    items: T[],
    partitionFilter: (item: T) => boolean
): { matchingItems: T[]; otherItems: T[] } {
    const defaultValue = { matchingItems: [], otherItems: [] };
    if (items.length === 0) {
        return defaultValue;
    }
    return items.reduce((groups, elem) => {
        if (partitionFilter(elem)) {
            groups.matchingItems.push(elem);
        } else {
            groups.otherItems.push(elem);
        }
        return groups;
    }, defaultValue);
}

/**
 * Generates a flattened list of items
 *
 * @param arr - An array of items and item arrays
 * @return {string} A flattened list of only items
 *
 */
export function flattenDeep<T>(arr: Array<T | T[]>): T[] {
    return arr.reduce(
        (acc: T[], val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)),
        [] as T[]
    );
}
