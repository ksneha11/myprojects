import { AddUpdateSpecialtyAccountRequest, PaymentType } from 'atlas-services/src/models';
import { TransactionMode } from 'atlas-services/src/models/payment';
import { UPDATE_SPECIALTY_ACCOUNT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { BankAccountForm } from '..';
import { SpecialtyPaymentActions } from '../../../context/navigation/actions';

export default class AddSpecialtyBankAccount extends BankAccountForm {
    protected consolidateBankInfo = (): AddUpdateSpecialtyAccountRequest => {
        return {
            memberUid: this.props.specialtyMemberUid,
            paymentMethod: this.state.bankAccount,
            transactionMode: TransactionMode.ADD,
        };
    };

    protected isSaveDisabled = (): boolean => {
        return (
            this.isBillingAddressValid() ||
            this.props.isAccountNumberEmpty(this.state.bankAccount.accountNumber) ||
            this.props.invalidAccountNumberLength(this.state.bankAccount.accountNumber) ||
            this.props.invalidBankAccountType(this.state.bankAccount.bankAccountType) ||
            this.props.invalidRoutingNumberLength(this.state.bankAccount.routingNumber) ||
            this.props.isRoutingNumberEmpty(this.state.bankAccount.routingNumber)
        );
    };

    protected onPressSave = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(UPDATE_SPECIALTY_ACCOUNT, { payload: this.consolidateBankInfo() })
            .then(() => {
                this.onSaveNavigation();
            })
            .catch(this.logger.warn('UPDATE_SPECIALTY_ACCOUNT failed to add a Credit Card in addSpecialtyCreditCard'));
    };

    protected onSaveNavigation = () => {
        this.navigate(SpecialtyPaymentActions.SAVE_PRESSED, {
            specialtyMemberUid: this.props.specialtyMemberUid,
        });
    };
}
