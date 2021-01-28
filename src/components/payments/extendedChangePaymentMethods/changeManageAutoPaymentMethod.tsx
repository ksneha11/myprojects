import { BankAccount, CreditCard, PaymentMethod, PaymentType } from 'atlas-services/src/models';
import { UPDATE_CREDIT_CARD } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { ManageAutoActions } from '../../../context/navigation/actions/manageAuto.actions';
import ChangePaymentMethod from '../changePaymentMethods';

export default class ChangeManageAutoPaymentMethod extends ChangePaymentMethod {
    public render() {
        const labels = this.labels.pharmacy.changeManageAutoPaymentMethod;
        return (
            <ChangePaymentMethod
                addPaymentRouteName={ManageAutoActions.ADD_NEW_PAYMENT_PRESSED}
                editBankAccountRouteName={ManageAutoActions.EDIT_BANK_ACCOUNT_PRESSED}
                editCreditCardRouteName={ManageAutoActions.EDIT_CREDIT_CARD_PRESSED}
                hasRadioButtons={true}
                onPressSaveButton={this.onPressSaveButton}
                pageTitle={labels.pageTitle}
                saveButtonText={labels.saveButtonText}
                subHeaderLabel={labels.subHeaderLabel}
                {...this.props}
            />
        );
    }

    protected onPressSaveButton = (paymentMethod: PaymentMethod) => {
        // TODO: Find out if this is needed? Don't see the purpose of this call?
        // There's no UPDATE_BANK_ACCOUNT call currently so we can't do the same thing
        // for bank account
        if (paymentMethod.paymentType === PaymentType.CREDIT_CARD) {
            const creditCard = paymentMethod as CreditCard;
            this.context.appContext
                .getServiceExecutor()
                .execute(UPDATE_CREDIT_CARD, { payload: this.updateDefaultCreditCard(creditCard) })
                .then(() => {
                    this.appStateActions.payments.setSelectedPaymentMethod(creditCard);
                    this.navigate(ManageAutoActions.SAVE_PRESSED);
                });
        } else {
            const bankAccount = paymentMethod as BankAccount;
            this.appStateActions.payments.setSelectedPaymentMethod(bankAccount);
            this.navigate(ManageAutoActions.SAVE_PRESSED, { manageAutoBankAccount: bankAccount });
        }
    };

    protected updateDefaultCreditCard(creditCard: CreditCard): CreditCard {
        creditCard.isDefaultMethod = true;
        return creditCard;
    }
}
