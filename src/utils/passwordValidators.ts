export function containsNumberUppercaseLetterAndSpecialCharacter(password: string) {
    // special characters are considered $ ! @ .
    return /^(?:(?=.*\d)(?=.*[A-Z])(?=.*[$!@\.]).*)$/.test(password);
}

export function doesNotContainThreeConsecutiveCharacters(password: string) {
    return !/(.)\1\1/.test(password);
}

export function doesNotContainThreeConsecutiveUsernameCharacters(password: string, username: string) {
    // comparison is not case sensitive
    const lowercasePassword = password ? password.toLowerCase() : '';
    const lowercaseUsername = username ? username.toLowerCase() : '';
    return !passwordContainsThreeConsecutiveUsernameCharacters(lowercasePassword, lowercaseUsername);
}

export function doesNotContainWhiteSpaceCharacters(password: string) {
    return /^\S*$/.test(password);
}

export function hasAtLeastEightCharacters(password: string) {
    return password.length >= 8;
}

function passwordContainsThreeConsecutiveUsernameCharacters(password: string, username: string) {
    if (password.length < 3) {
        return false;
    }

    let subStringStartIndex = 0;
    let subStringEndIndex = 4;

    while (subStringEndIndex <= password.length) {
        if (username.includes(password.slice(subStringStartIndex++, subStringEndIndex++))) {
            return true;
        }
    }

    return false;
}
