import { noLetters } from './inputFormatters';

export function isPhoneNumberInvalid(number: string) {
    const plainNumber = noLetters(number);

    return (
        !(plainNumber.length === 10) ||
        plainNumber === '0000000000' ||
        parseInt(plainNumber[0], 10) < 2 ||
        parseInt(plainNumber[3], 10) < 2
    );
}
