import { BankAccount, BankAccountType, CreditCard, PaymentMethod, PaymentType } from 'atlas-services/src/models';
import leftPad from './leftPad';

// General Util Helper Methods

export const getBankAccounts = (paymentMethods: PaymentMethod[]): BankAccount[] => {
    return paymentMethods.filter(paymentMethod => paymentMethod.paymentType === PaymentType.BANK_ACCOUNT);
};

export const getCreditCards = (paymentMethods: PaymentMethod[]): CreditCard[] => {
    return paymentMethods.filter(paymentMethod => paymentMethod.paymentType === PaymentType.CREDIT_CARD);
};

export const getDefaultPaymentMethod = (paymentMethods: PaymentMethod[]): PaymentMethod => {
    return paymentMethods.find(paymentMethod => paymentMethod.isDefaultMethod);
};

// BankAccount Util Helper Methods
export const accountTypeLabel = (accountType: BankAccountType): string => {
    return accountType === BankAccountType.SAVINGS_ACCOUNT ? 'Savings' : 'Checking';
};

// ExpirationDate Formatters
// Changes fullDate to halfDate if fullDate is false
// Changes halfdate to fullDate if fullDate is true
export const formatExpirationDate = (expirationDate: string, fullDate: boolean): string => {
    if (expirationDate) {
        const [month, year] = expirationDate.split('/');
        let displayYear = year;
        if (displayYear.length < 3 && fullDate) {
            displayYear = '20' + year;
        } else if (displayYear.length > 2 && !fullDate) {
            displayYear = year.slice(2);
        }
        expirationDate = (month.length < 2 ? '0' + month : month) + '/' + displayYear;
        return `${expirationDate}`;
    } else {
        return null;
    }
};

export const getMaskedBankName = (accountName: string): string => {
    return `${leftPad('*', 2, 4, accountName)}`;
};

// CreditCard Util Helper Methods
export const getMaskedName = (accountName: string): string => {
    return `${accountName.slice(0, -5)} ${leftPad('*', 4, 4, accountName)}`;
};

export const isExpired = (expirationDate: string): boolean => {
    if (expirationDate) {
        const [month, year] = expirationDate.split('/');
        const today = new Date();
        const expireDay = new Date(Number((year.length > 2 ? '' : '20') + year), Number(month), 0);
        return expireDay < today;
    } else {
        return true;
    }
};

export const getFormattedAccountName = (accountName: string = '', labels: { [company: string]: string } = {}) => {
    // Comes something like AMEX-0002, return as Amex 0002
    const splitName = accountName.split('-');
    return `${labels[splitName[0]]} ${splitName[1]}`;
};
