import { BankAccount } from 'atlas-services/src/models';
import { CREATE_BANK_ACCOUNT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import BankAccountForm from './bankAccountForm';

export default class AddBankAccount extends BankAccountForm {
    protected consolidateBankInfo = (): BankAccount => {
        return {
            ...this.state.bankAccount,
            firstName: this.appState.memberContext?.memberInfo?.firstName ?? '',
            lastName: this.appState.memberContext?.memberInfo?.lastName ?? '',
        };
    };

    protected onPressSave = (): void => {
        this.context.appContext
            .getServiceExecutor()
            .execute(CREATE_BANK_ACCOUNT, { payload: this.consolidateBankInfo() })
            .then(this.onSaveNavigation)
            .catch(exception => this.logger.warn('CREATE_BANK_ACCOUNT threw an error in AddBankAccount: ' + exception));
    };
}
