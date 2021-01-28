import {
    Address,
    BankAccount,
    BankAccountType,
    PaymentMethod,
    PaymentType,
    RecurringPaymentMethod,
} from 'atlas-services/src/models';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import {
    invalidAccountNumberLength,
    invalidBankAccountType,
    invalidRoutingNumberLength,
    isAccountNumberEmpty,
    isRoutingNumberEmpty,
} from '../../utils/bankAccountValidators';
import { noLetters } from '../../utils/inputFormatters';
import { zipCodeValidator } from '../../utils/inputValidator';
import { getMaskedBankName } from '../../utils/paymentHelperMethods';
import AppComponent from '../common/appComponent';
import BankAccountFormView, { Props as ViewProps } from './bankAccountForm.view';

export interface Props extends ViewProps {
    editablePaymentMethod?: PaymentMethod | RecurringPaymentMethod;
    getMaskedBankName?: (accountName: string) => string;
    invalidAccountNumberLength?: (accountNumber: string) => boolean;
    invalidBankAccountType?: (AccountType: BankAccountType) => boolean;
    invalidRoutingNumberLength?: (routingNumber: string) => boolean;
    isAccountNumberEmpty?: (accountNumber: string) => boolean;
    isRoutingNumberEmpty?: (routingNumber: string) => boolean;
    noLetters?: (accountNumber: string) => string;
    onSaveRoute?: string;
    specialtyMemberUid?: string;
    zipCodeValidator?: (zipcode: string) => boolean;
}
export interface State {
    accountNumberError: string;
    bankAccount: BankAccount | RecurringPaymentMethod;
    bankAccountTypeError: string;
    isSaveDisabled: boolean;
    isSetDefaultToggleDisabled: boolean;
    routingNumberError?: string;
}

export const defaultProps = {
    getMaskedBankName,
    invalidAccountNumberLength,
    invalidBankAccountType,
    invalidRoutingNumberLength,
    isAccountNumberEmpty,
    isRoutingNumberEmpty,
    noLetters,
    onSaveRoute: '',
    zipCodeValidator,
};

export default class BankAccountForm<P extends Props = Props, S extends State = State> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;
    constructor(props: P) {
        super(props);
        this.state = {
            accountNumberError: '',
            bankAccount: {
                accountID: '',
                accountName: '',
                accountNumber: '',
                bankAccountType: BankAccountType.NONE,
                billingAddress: props.editablePaymentMethod?.billingAddress ?? ({} as Address),
                firstName: '',
                isDefaultMethod: false,
                // Apparently is always true for PBM at least
                isExclusiveToMember: true,
                lastName: '',
                paymentType: PaymentType.BANK_ACCOUNT,
                routingNumber: '',
            },
            bankAccountTypeError: '',
            isSaveDisabled: true,
            isSetDefaultToggleDisabled: false,
            routingNumberError: '',
        } as S;
    }

    public onBlurAccountNumber = () => {
        const labels = this.labels.pharmacy.bankAccountForm.accountNumberError;
        let accountNumberError = '';
        if (this.props.isAccountNumberEmpty(this.state.bankAccount.accountNumber)) {
            accountNumberError = labels.accountNumberEmpty;
        } else if (this.props.invalidAccountNumberLength(this.state.bankAccount.accountNumber)) {
            accountNumberError = labels.accountNumberLength;
        }
        this.setState({ accountNumberError }, () => this.setSaveDisabled());
    };

    public render() {
        return (
            <>
                <BankAccountFormView<ViewProps>
                    accountNumberError={this.state.accountNumberError}
                    bankAccount={this.state.bankAccount}
                    bankAccountEditable={true}
                    bankAccountTypeError={this.state.bankAccountTypeError}
                    billingAddress={this.state.bankAccount?.billingAddress}
                    isSaveDisabled={this.state.isSaveDisabled}
                    isSetDefaultToggleDisabled={this.state.isSetDefaultToggleDisabled}
                    isSpecialty={false}
                    onBlurAccountNumber={this.onBlurAccountNumber}
                    onBlurRoutingNumber={this.onBlurRoutingNumber}
                    onChangeAccountNumber={this.onChangeAccountNumber}
                    onChangeBankAccountType={this.onChangeBankAccountType}
                    onChangeAddressInformation={this.onChangeAddressInformation}
                    onChangeRoutingNumber={this.onChangeRoutingNumber}
                    onFocusAccountNumber={this.onFocusAccountNumber}
                    onFocusRoutingNumber={this.onFocusRoutingNumber}
                    onPressSave={this.onPressSave}
                    onPressSelectDefaultPaymentMethod={this.onPressSelectDefaultPaymentMethod}
                    routingNumberError={this.state.routingNumberError}
                    {...this.props}
                />
                <NavigationEvents onWillFocus={this.loadPaymentMethod} />
            </>
        );
    }

    protected getAccountType = (bankAccountType: BankAccountType): string => {
        const accountLabels = this.labels.pharmacy.bankAccountForm.accountTypeContainer;
        return bankAccountType === BankAccountType.CHECKING_ACCOUNT
            ? accountLabels.checkingAccount
            : accountLabels.savingsAccount;
    };

    protected isBillingAddressValid = (): boolean => {
        const { dropDownInitialValue } = this.labels.addresses.addressInformation;
        return !(
            this.state.bankAccount.billingAddress.streetAddress1 &&
            this.state.bankAccount.billingAddress.city &&
            this.state.bankAccount.billingAddress.state &&
            this.state.bankAccount.billingAddress.state !== dropDownInitialValue &&
            this.state.bankAccount.billingAddress.zipCode &&
            this.props.zipCodeValidator(this.state.bankAccount.billingAddress.zipCode)
        );
    };

    protected isSaveDisabled = (): boolean => {
        return (
            this.props.isAccountNumberEmpty(this.state.bankAccount.accountNumber) ||
            this.props.invalidAccountNumberLength(this.state.bankAccount.accountNumber) ||
            this.props.invalidBankAccountType(this.state.bankAccount.bankAccountType) ||
            this.props.invalidRoutingNumberLength(this.state.bankAccount.routingNumber) ||
            this.props.isRoutingNumberEmpty(this.state.bankAccount.routingNumber)
        );
    };

    protected loadPaymentMethod = () => {};

    protected onBlurRoutingNumber = () => {
        const labels = this.labels.pharmacy.bankAccountForm.routingNumberError;
        let routingNumberError = '';
        if (this.props.isRoutingNumberEmpty(this.state.bankAccount.routingNumber)) {
            routingNumberError = labels.routingNumberEmpty;
        } else if (invalidRoutingNumberLength(this.state.bankAccount.routingNumber)) {
            routingNumberError = labels.routingNumberLength;
        }
        this.setState({ routingNumberError }, () => this.setSaveDisabled());
    };

    protected onChangeAccountNumber = (accountNumber: string) => {
        this.setState(
            {
                bankAccount: {
                    ...this.state.bankAccount,
                    accountNumber: this.props.noLetters(accountNumber),
                },
            },
            () => this.setSaveDisabled()
        );
    };

    protected onChangeAddressInformation = (billingAddress: Address) => {
        this.setState(
            {
                bankAccount: {
                    ...this.state.bankAccount,
                    billingAddress,
                },
            },
            () => {
                this.setSaveDisabled();
            }
        );
    };

    protected onChangeBankAccountType = (bankAccountType: BankAccountType) => {
        this.setState(
            {
                bankAccount: {
                    ...this.state.bankAccount,
                    bankAccountType,
                },
            },
            () => this.setSaveDisabled()
        );
    };

    protected onChangeRoutingNumber = (routingNumber: string) => {
        this.setState(
            {
                bankAccount: {
                    ...this.state.bankAccount,
                    routingNumber: this.props.noLetters(routingNumber),
                },
            },
            () => this.setSaveDisabled()
        );
    };

    protected onFocusAccountNumber = () => {
        const labels = this.labels.pharmacy.bankAccountForm;
        let routingNumberError = '';
        let bankAccountTypeError = '';

        if (this.props.invalidBankAccountType(this.state.bankAccount.bankAccountType)) {
            bankAccountTypeError = labels.changeBankAccountType;
        }

        if (this.props.isRoutingNumberEmpty(this.state.bankAccount.routingNumber)) {
            routingNumberError = labels.routingNumberError.routingNumberEmpty;
        } else if (this.props.invalidRoutingNumberLength(this.state.bankAccount.routingNumber)) {
            routingNumberError = labels.routingNumberError.routingNumberLength;
        }
        this.setState(
            {
                bankAccountTypeError,
                routingNumberError,
            },
            () => this.setSaveDisabled()
        );
    };

    protected onFocusRoutingNumber = () => {
        let bankAccountTypeError = '';
        if (this.props.invalidBankAccountType(this.state.bankAccount.bankAccountType)) {
            bankAccountTypeError = this.labels.pharmacy.bankAccountForm.changeBankAccountType;
        }
        this.setState(
            {
                bankAccountTypeError,
            },
            () => this.setSaveDisabled()
        );
    };

    protected onPressSave = () => {
        this.onSaveNavigation();
    };

    protected onPressSelectDefaultPaymentMethod = () => {
        this.setState({
            bankAccount: {
                ...this.state.bankAccount,
                isDefaultMethod: !this.state.bankAccount.isDefaultMethod,
            },
        });
    };

    protected onSaveNavigation = () => {
        this.props.onSaveRoute ? this.navigate(this.props.onSaveRoute) : this.navigateBack();
    };

    protected setSaveDisabled = () => {
        this.setState({ isSaveDisabled: this.isSaveDisabled() });
    };
}
