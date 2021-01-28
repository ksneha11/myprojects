export function isValidLength(min: number, max: number) {
    return (username: string): boolean => username && username.length >= min && username.length <= max;
}

export function isValidMatch(regex: RegExp) {
    return (username: string) => regex.test(username);
}

export function hasNoSpaces(username: string) {
    return /^\S+$/.test(username);
}

export function doesNotStartWithNumber(username: string) {
    return /^[^0-9].*/.test(username);
}

export function doesNotHaveTwoLettersFollowedNyNumbers(username: string) {
    return isValidMatch(/^(?!([\D][\D]\d+$))/)(username);
}

export function doesNotStartOrEndWithPeriod(username: string) {
    return !username.startsWith('.') && !username.endsWith('.');
}

export function doesNotUseSpecialCharactersWithExceptions(username: string) {
    return isValidMatch(/^[a-zA-Z0-9\$\!\.\@]+$/)(username);
}
