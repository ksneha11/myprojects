import { PaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { PaymentActions } from '../../../context/navigation/actions';
import ChangePaymentMethod from '../changePaymentMethods';

export default class ChangePharmacyPaymentMethod extends ChangePaymentMethod {
    public name = 'ChangePharmacyPaymentMethod';

    public render() {
        const labels = this.labels.pharmacy.changePharmacyPaymentMethod;
        return (
            <ChangePaymentMethod
                addPaymentRouteName={PaymentActions.ADD_PHARMACY_PAYMENT_METHOD_PRESSED}
                editBankAccountRouteName={PaymentActions.PHARMACY_BANK_ACCOUNT_EDIT_PRESSED}
                editCreditCardRouteName={PaymentActions.PHARMACY_CREDIT_CARD_EDIT_PRESSED}
                hasRadioButtons={true}
                onPressSaveButton={this.onPressSaveButton}
                pageTitle={labels.pageTitle}
                saveButtonText={labels.saveButtonText}
                subHeaderLabel={labels.subHeaderLabel}
                {...this.props}
            />
        );
    }

    protected getDefaultPaymentMethod = (): PaymentMethod => {
        return this.appState.selectedPaymentMethod;
    };

    protected onPressSaveButton = (paymentMethod: PaymentMethod) => {
        if (paymentMethod && paymentMethod.accountName) {
            this.appStateActions.payments.setSelectedPaymentMethod(paymentMethod);
            this.appStateActions.payAccountBalance.setSelectedPbmPaymentMethod(paymentMethod);
        }
        this.props.navigation.pop();
    };
}
