import { Address, AddUpdateSpecialtyAccountRequest, RecurringPaymentMethod } from 'atlas-services/src/models';
import { TransactionMode } from 'atlas-services/src/models/payment';
import { UPDATE_SPECIALTY_ACCOUNT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import isEqual from 'lodash.isequal';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { CreditCardForm } from '..';
import { ProfileActions } from '../../../context/navigation/actions';
import { _omit, deepClone } from '../../../utils';
import CreditCardFormView from '../creditCardForm.view';
export default class EditSpecialtyCreditCard extends CreditCardForm {
    public render() {
        return (
            <>
                <CreditCardFormView
                    billingAddress={this.state.creditCard?.billingAddress}
                    creditCard={this.state.creditCard}
                    creditCardErrorText={this.state.creditCardErrorText}
                    expirationDateErrorText={this.state.expirationDateErrorText}
                    isEditable={false}
                    isSaveDisabled={this.state.isSaveDisabled}
                    isSetDefaultToggleDisabled={this.state.isSetDefaultToggleDisabled}
                    isSpecialty={this.props.isSpecialty}
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

    protected consolidateCardInfo = (): AddUpdateSpecialtyAccountRequest => {
        const editablePaymentMethod = this.props.editablePaymentMethod as RecurringPaymentMethod;
        return {
            memberUid: this.props.specialtyMemberUid,
            paymentMethod: {
                ...editablePaymentMethod,
                billingAddress: this.state.creditCard.billingAddress,
                expirationDate: this.props.formatExpirationDate(this.state.creditCard.expirationDate, true),
            },
            transactionMode: TransactionMode.EDIT,
        };
    };

    protected isBillingAddressUnchanged = (editedAddress: Address, propAddress: Address): boolean => {
        let isStreetAddress2 = true;

        if (!!propAddress.streetAddress2) {
            isStreetAddress2 = editedAddress.streetAddress1 === propAddress.streetAddress2;
        } else if (!propAddress.streetAddress2 && !!editedAddress.streetAddress2) {
            isStreetAddress2 = false;
        }

        return (
            editedAddress.streetAddress1 === propAddress.streetAddress1 &&
            isStreetAddress2 &&
            editedAddress.city === propAddress.city &&
            editedAddress.state === propAddress.state &&
            editedAddress.zipCode === propAddress.zipCode
        );
    };

    protected isSaveDisabled = () => {
        const newCard: RecurringPaymentMethod = this.state.creditCard;
        const propCard: RecurringPaymentMethod = deepClone(this.props.editablePaymentMethod);
        const isExpirationInvalid =
            this.props.invalidDateChecker(newCard.expirationDate) ||
            this.props.invalidExpirationDateLength(newCard.expirationDate) ||
            this.props.isCreditCardFieldEmpty(newCard.expirationDate);

        propCard.expirationDate = this.props.formatExpirationDate(propCard.expirationDate, false);

        return (
            this.isBillingAddressValid() ||
            isExpirationInvalid ||
            (isEqual(_omit(newCard, 'billingAddress'), _omit(propCard, 'billingAddress')) &&
                this.isBillingAddressUnchanged(newCard.billingAddress, propCard.billingAddress))
        );
    };

    protected loadPaymentMethod = () => {
        const creditCard: RecurringPaymentMethod = deepClone(this.props.editablePaymentMethod);
        creditCard.expirationDate = this.props.formatExpirationDate(creditCard.expirationDate, false);
        this.setState({
            creditCard,
        });
    };

    protected onPressSave = (): void => {
        this.context.appContext
            .getServiceExecutor()
            .execute(UPDATE_SPECIALTY_ACCOUNT, { payload: this.consolidateCardInfo() })
            .then(() => {
                this.onSaveNavigation();
            })
            .catch(this.logger.warn('UPDATE_SPECIALTY_ACCOUNT failed to add a Credit Card in editSpecialtyCreditCard'));
    };

    protected onSaveNavigation = () => {
        this.navigate(ProfileActions.SPECIALTY_PAYMENT_METHOD_PRESSED, {
            labels: this.labels,
            specialtyMemberUid: this.props.specialtyMemberUid,
        });
    };
}
