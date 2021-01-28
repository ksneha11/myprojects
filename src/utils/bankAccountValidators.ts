import { BankAccountType } from 'atlas-services/src/models';

export const isAccountNumberEmpty = (value: string): boolean => {
    return !value;
};

export const invalidAccountNumberLength = (value: string): boolean => {
    return value && (value.length <= 3 || value.length >= 21);
};

export const invalidBankAccountType = (accountType: BankAccountType): boolean => {
    return (
        accountType &&
        accountType !== BankAccountType.CHECKING_ACCOUNT &&
        accountType !== BankAccountType.SAVINGS_ACCOUNT
    );
};

export const invalidRoutingNumberLength = (value: string): boolean => {
    return value && value.length !== 9;
};

export const isRoutingNumberEmpty = (value: string): boolean => {
    return !value;
};
