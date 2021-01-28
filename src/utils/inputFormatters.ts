export const noLetters = (value: string): string => {
    if (!value) {
        return '';
    }
    return value.replace(/([\D/]+)/g, '');
};

export const noLettersExpirationDate = (value: string): string => {
    return value.replace(/([^\d\/])*/g, '');
};

export const allowPeriods = (value: string): string => {
    return value.replace(/([^\d.])*/g, '');
};

export const trimZipCode = (zipCode: string): string => {
    return zipCode && zipCode.length > 5 ? zipCode.slice(0, 5) : zipCode;
};

export const formatPhoneNumber = (phoneNumber: string, extension?: string): string => {
    const formattedBaseNumber =
        phoneNumber && phoneNumber.length === 10
            ? `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
            : phoneNumber;

    return extension ? `${formattedBaseNumber} x ${extension}` : formattedBaseNumber;
};

export const onlyNumeric = (input: string) => {
    return input.replace(/[^0-9]/g, '');
};

/** First and last names can only have alphabet, dash, period, apostrophe and space. */
export const nameFormatter = (input: string) => {
    return input.replace(/[^A-Za-z-.'\s]/g, '');
};
