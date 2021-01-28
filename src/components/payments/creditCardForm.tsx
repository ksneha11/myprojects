import { Address, CreditCard, PaymentMethod, PaymentType, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import {
    invalidDateChecker,
    invalidExpirationDateLength,
    isCreditCardFieldEmpty,
    isCreditCardNumberInvalid,
} from '../../utils/creditCardValidators';
import { noLetters, noLettersExpirationDate } from '../../utils/inputFormatters';
import { zipCodeValidator } from '../../utils/inputValidator';
import { formatExpirationDate } from '../../utils/paymentHelperMethods';
import AppComponent from '../common/appComponent';
import CreditCardFormView, { Props as ViewProps } from './creditCardForm.view';

export const defaultProps = {
    formatExpirationDate,
    invalidDateChecker,
    invalidExpirationDateLength,
    isCreditCardFieldEmpty,
    isCreditCardNumberInvalid,
    isSpecialty: false,
    noLetters,
    noLettersExpirationDate,
    onSaveRoute: '',
    zipCodeValidator,
};

export interface Props extends Partial<ViewProps> {
    editablePaymentMethod?: PaymentMethod | RecurringPaymentMethod;
    formatExpirationDate?: (expirationDate: string, fullDate: boolean) => string;
    invalidDateChecker?: (expirationDate: string) => boolean;
    invalidExpirationDateLength?: (expirationDate: string) => boolean;
    isCreditCardFieldEmpty?: (value: string) => boolean;
    isCreditCardNumberInvalid?: (accounNumber: string) => boolean;
    noLetters?: (accountNumber: string) => string;
    noLettersExpirationDate?: (expirationDate: string) => string;
    onSaveRoute?: string;
    specialtyMemberUid?: string;
    zipCodeValidator?: (zipcode: string) => boolean;
}

export interface State {
    creditCard: CreditCard | RecurringPaymentMethod;
    creditCardErrorText: string;
    expirationDateErrorText: string;
    isSaveDisabled: boolean;
    isSetDefaultToggleDisabled: boolean;
}

/**
 * Base form for add and edit credit card to extend
 * Notes:
 * - isSpecialty should come from the places extending this not from this component itself
 * - Specific Save logic can go here
 */

export default class CreditCardForm<
    P extends Omit<Props, 'children'> = Props,
    S extends State = State
> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;
    constructor(props: P) {
        super(props);
        this.state = {
            creditCard: {
                accountName: '',
                accountNumber: '',
                billingAddress: props.editablePaymentMethod?.billingAddress ?? ({} as Address),
                companyName: '',
                expirationDate: '',
                isDefaultMethod: false,
                isExclusiveToMember: true,
                paymentType: PaymentType.CREDIT_CARD,
            } as CreditCard | RecurringPaymentMethod,
            creditCardErrorText: '',
            expirationDateErrorText: '',
            isSaveDisabled: true,
            isSetDefaultToggleDisabled: false,
        } as S;
    }

    public render() {
        return (
            <>
                <CreditCardFormView
                    billingAddress={this.state.creditCard?.billingAddress}
                    creditCard={this.state.creditCard}
                    creditCardErrorText={this.state.creditCardErrorText}
                    expirationDateErrorText={this.state.expirationDateErrorText}
                    isEditable={true}
                    isSaveDisabled={this.state.isSaveDisabled}
                    isSetDefaultToggleDisabled={this.state.isSetDefaultToggleDisabled}
                    isSpecialty={false}
                    isDefaultPaymentMethod={this.state.creditCard.isDefaultMethod}
                    onBlurCreditCardNumber={this.onBlurCreditCardNumber}
                    onBlurExpirationDate={this.onBlurExpirationDate}
                    onChangeAddressInformation={this.onChangeAddressInformation}
                    onChangeCardNumber={this.onChangeCardNumber}
                    onChangeExpirationDate={this.onChangeExpirationDate}
                    onPressSelectDefaultPaymentMethod={this.onPressSelectDefaultPaymentMethod}
                    setCreditCardErrorText={this.setCreditCardErrorText}
                    onFocusExpirationDate={this.onFocusExpirationDate}
                    onPressSave={this.onPressSave}
                    {...this.props}
                />
                <NavigationEvents onWillFocus={this.loadPaymentMethod} />
            </>
        );
    }
    protected isBillingAddressValid = (): boolean => {
        const { dropDownInitialValue } = this.labels.addresses.addressInformation;
        return !(
            this.state.creditCard.billingAddress.streetAddress1 &&
            this.state.creditCard.billingAddress.city &&
            this.state.creditCard.billingAddress.state &&
            this.state.creditCard.billingAddress.state !== dropDownInitialValue &&
            this.state.creditCard.billingAddress.zipCode &&
            this.props.zipCodeValidator(this.state.creditCard.billingAddress.zipCode)
        );
    };

    protected isSaveDisabled = () => {
        return (
            this.props.invalidDateChecker(this.state.creditCard.expirationDate) ||
            this.props.invalidExpirationDateLength(this.state.creditCard.expirationDate) ||
            this.props.isCreditCardFieldEmpty(this.state.creditCard.accountNumber) ||
            this.props.isCreditCardFieldEmpty(this.state.creditCard.expirationDate) ||
            this.props.isCreditCardNumberInvalid(this.state.creditCard.accountNumber)
        );
    };

    protected loadPaymentMethod = () => {};

    protected onBlurCreditCardNumber = () => {
        this.setCreditCardErrorText();
    };

    protected onBlurExpirationDate = () => {
        this.setExpirationDateErrorText();
    };

    protected onChangeAddressInformation = (billingAddress: Address) => {
        this.setState(
            {
                creditCard: {
                    ...this.state.creditCard,
                    billingAddress,
                },
            },
            () => {
                this.setSaveDisabled();
            }
        );
    };

    protected onChangeCardNumber = (creditCardNumber: string) => {
        this.setState(
            {
                creditCard: {
                    ...this.state.creditCard,
                    accountNumber: this.props.noLetters(creditCardNumber),
                },
            },
            () => this.setSaveDisabled()
        );
    };

    protected onChangeExpirationDate = (expirationDate: string) => {
        let formattedExpirationDate = expirationDate;
        if (formattedExpirationDate.length > 2 && !formattedExpirationDate.includes('/')) {
            formattedExpirationDate = formattedExpirationDate.slice(0, 2) + '/' + formattedExpirationDate.slice(2);
        } else if (formattedExpirationDate.length === 2 && formattedExpirationDate.includes('/')) {
            formattedExpirationDate = '0' + formattedExpirationDate;
        }
        this.setState(
            {
                creditCard: {
                    ...this.state.creditCard,
                    expirationDate: noLettersExpirationDate(formattedExpirationDate),
                },
            },
            () => this.setSaveDisabled()
        );
    };

    protected onFocusExpirationDate = () => {
        this.setCreditCardErrorText();
    };

    protected onPressSave = () => {};

    protected onPressSelectDefaultPaymentMethod = () => {
        this.setState({
            creditCard: {
                ...this.state.creditCard,
                isDefaultMethod: !this.state.creditCard.isDefaultMethod,
            },
        });
    };

    protected onSaveNavigation = () => {
        this.props.onSaveRoute ? this.navigate(this.props.onSaveRoute) : this.navigateBack();
    };

    protected setCreditCardErrorText = () => {
        const labels = this.labels.pharmacy.creditCardForm.creditCardError;
        let creditCardErrorText = '';
        if (!this.props.editablePaymentMethod?.accountName) {
            if (this.props.isCreditCardFieldEmpty(this.state.creditCard.accountNumber ?? '')) {
                creditCardErrorText = labels.creditCardNumberEmpty;
            } else if (this.props.isCreditCardNumberInvalid(this.state.creditCard.accountNumber ?? '')) {
                creditCardErrorText = labels.creditCardNumberInvalid;
            }
        }
        this.setState({ creditCardErrorText }, () => this.setSaveDisabled());
    };

    protected setExpirationDateErrorText = () => {
        const labels = this.labels.pharmacy.creditCardForm.creditCardError;
        const expirationDate = this.state.creditCard.expirationDate ?? '';
        let expirationError = '';
        if (this.props.isCreditCardFieldEmpty(expirationDate)) {
            expirationError = labels.expirationDateEmpty;
        } else if (
            this.props.invalidDateChecker(expirationDate) ||
            this.props.invalidExpirationDateLength(expirationDate)
        ) {
            expirationError = labels.expirationDateInvalid;
        }
        this.setState({ expirationDateErrorText: expirationError }, () => this.setSaveDisabled());
    };

    protected setSaveDisabled = () => {
        this.setState({ isSaveDisabled: this.isSaveDisabled() });
    };
}
