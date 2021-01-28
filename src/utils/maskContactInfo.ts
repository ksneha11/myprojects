import { formatPhoneNumber } from './phoneNumberFormatter';

export const maskEmail = (email: string) => {
    const firstLetter = email.slice(0, 1);
    const remainingEmailCharacters = email.slice(1);
    const regex = /[^@\n](?=[^@\n]*?@)/g;
    const maskedEmail = remainingEmailCharacters.replace(regex, '\u2022');
    return firstLetter + maskedEmail;
};

export const maskPhone = (phone: string) => {
    const formattedNumber = formatPhoneNumber(phone);
    const maskedNumber = formattedNumber.replace(/\d(?=.{4})/g, '\u2022');
    return maskedNumber;
};
