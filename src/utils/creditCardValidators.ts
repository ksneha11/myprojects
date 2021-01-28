export const invalidDateChecker = (value: string): boolean => {
    if (value) {
        const [month, year] = value.split('/');
        const expirationDate = new Date(Number('20' + year), Number(month), 0);
        const monthNum = Number(month);

        return isNaN(monthNum) || monthNum > 12 || monthNum < 1 || isNaN(Number(year)) || expirationDate <= new Date();
    } else {
        return true;
    }
};

export const invalidExpirationDateLength = (value: string): boolean => {
    return value?.replace('/', '')?.length < 4 ?? true;
};

export const isCreditCardFieldEmpty = (value: string): boolean => {
    if (value) {
        return value?.length === 0;
    } else {
        return true;
    }
};

export const isCreditCardNumberInvalid = (value: string) => {
    return luhnValidator(value);
};

// tslint:disable: no-conditional-assignment
const luhnValidator = (value: string) => {
    if (value?.length < 14 || !value) {
        return true;
    }

    // Note: Got a comment saying that all 0's as a CC number is not valid
    //       If you get a story that says the opposite remove the or and number check
    if (/[^0-9-\s]+/.test(value) || !Number(value)) {
        return true;
    }

    let numberToCheck = 0;
    let isEven = false;
    value = value.replace(/\D/g, '');

    for (let lengthOfValue = value.length - 1; lengthOfValue >= 0; lengthOfValue--) {
        const currentDigit = value.charAt(lengthOfValue);
        let digitAsNum = parseInt(currentDigit, 10);
        if (isEven) {
            if ((digitAsNum *= 2) > 9) {
                digitAsNum -= 9;
            }
        }
        numberToCheck += digitAsNum;
        isEven = !isEven;
    }
    return numberToCheck % 10 !== 0;
};
