export const cityNameValidator = (cityName: string) => {
    return /^[a-zA-Z.-]+(?:[\s-][\/a-zA-Z.]+)*$/.test(cityName);
};

export const emailAddressValidator = (email: string) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
};

export const securityCodeValidator = (code: string) => {
    return /^(?!0{4})\d{4}/.test(code);
};

export const memberIDNumeric = (memberID: string) => {
    return /^\w{9}$/.test(memberID);
};

export const getmemberIDValidatorWithPrefix = (prefixLength: number = 3, memberIDLength: number = 9) => {
    // factory method

    // rest 9 numeric
    const regex = '^[A-z]{' + prefixLength + '}\\w{' + memberIDLength + '}$';

    return (memberID: string) => {
        return new RegExp(regex, '').test(memberID);
    };
};

export const validateMinimumPayment = (minvalue: string, value: string) => {
    return Number(value) < Number(minvalue.replace(/([^\d.])*/g, ''));
};

export const zipCodeValidator = (zipCode: string) => {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
};
