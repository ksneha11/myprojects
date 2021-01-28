// Purpose: This function accepts a valid phone number strips it of other characters besides the number (cleaned)
//          then takes that number and splits it using match into 4 parts: the international code, the first 3 digits, the next 3, and then the last 4

// TODO: contactInfoVoiceNumbers.view.tsx is using this see if they still need it because this kind of just is a more complicated version of
//       formatPhoneNumber in inputFormatter.ts
export function formatPhoneNumber(phoneNumberString: string) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    if (cleaned.length > 11 || cleaned.length <= 10) {
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        // If there's anything in match (second check to make sure we got everything correctly) it takes it and sends it back with the international code
        // attached if there isn't one present
        if (match) {
            // TODO: double check if we want to return this actually might not be necessary
            const intlCode = match[1] ? '+1 ' : '';
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        } else {
            return phoneNumberString;
        }
    } else {
        return phoneNumberString;
    }
}

export function hideAndFormatPhoneNumber(phoneNumber: string): string {
    const hiddenPhoneNumber = phoneNumber.replace(/^.{6}/g, 'XXXXXX');
    return '(' + hiddenPhoneNumber.slice(0, 3) + ')' + ' ' + hiddenPhoneNumber.slice(3, 6) + '-' + hiddenPhoneNumber.slice(6);
}

export function inputPhoneNumberFormatter(phoneNumberString: string) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');

    if (cleaned.length > 3 && cleaned.length <= 6) {
        cleaned = '(' + cleaned.slice(0, 3) + ')' + ' ' + cleaned.slice(3);
    } else if (cleaned.length > 6) {
        cleaned = '(' + cleaned.slice(0, 3) + ')' + ' ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6);
    }

    return cleaned;
}
