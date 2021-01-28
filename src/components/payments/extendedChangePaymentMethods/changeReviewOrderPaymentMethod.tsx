import { PaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { ReviewOrderActions } from '../../../context/navigation/actions/reviewOrder.actions';
import ChangePaymentMethod from '../changePaymentMethods';

export default class ChangeReviewOrderPaymentMethod extends ChangePaymentMethod {
    public render() {
        const labels = this.labels.pharmacy.changeReviewOrderPaymentMethod;
        return (
            <ChangePaymentMethod
                addPaymentRouteName={ReviewOrderActions.ADD_NEW_PAYMENT_OPTION_PRESSED}
                editBankAccountRouteName={ReviewOrderActions.EDIT_BANK_ACCOUNT_PAYMENT_OPTION_PRESSED}
                editCreditCardRouteName={ReviewOrderActions.EDIT_CREDIT_CARD_PAYMENT_OPTION_PRESSED}
                hasRadioButtons={true}
                onPressSaveButton={this.onPressSaveButton}
                pageTitle={labels.pageTitle}
                saveButtonText={labels.saveButtonText}
                subHeaderLabel={labels.subHeaderLabel}
                {...this.props}
            />
        );
    }

    protected getDefaultPaymentMethodId = (): string => {
        const selectedPayment = this.appState.prescriptionCart.pharmacy.paymentMethod;
        return selectedPayment && selectedPayment.accountName ? selectedPayment.accountName : '';
    };

    protected onPressSaveButton = (paymentMethod: PaymentMethod) => {
        if (paymentMethod && paymentMethod.accountName) {
            this.appStateActions.cart.setPaymentMethod(paymentMethod);
            this.appStateActions.payments.setSelectedPaymentMethod(paymentMethod);
        }
        this.props.navigation.pop();
    };
}
