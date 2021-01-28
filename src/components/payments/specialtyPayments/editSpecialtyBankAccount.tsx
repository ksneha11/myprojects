import { Address, AddUpdateSpecialtyAccountRequest, RecurringPaymentMethod } from 'atlas-services/src/models';
import { TransactionMode } from 'atlas-services/src/models/payment';
import { UPDATE_SPECIALTY_ACCOUNT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import isEqual from 'lodash.isequal';
import React from 'react';
import { BankAccountForm } from '..';
import { ProfileActions } from '../../../context/navigation/actions';
import { _omit, deepClone } from '../../../utils';
import BankAccountFormView from '../bankAccountForm.view';

export default class EditSpecialtyBankAccount extends BankAccountForm {
    public componentDidMount() {
        this.setBankAccount();
    }

    public render() {
        return (
            <>
                <BankAccountFormView
                    accountNumberError={this.state.accountNumberError}
                    bankAccount={this.state.bankAccount}
                    bankAccountEditable={false}
                    billingAddress={this.state.bankAccount?.billingAddress}
                    isSaveDisabled={this.state.isSaveDisabled}
                    isSpecialty={this.props.isSpecialty}
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
            </>
        );
    }

    protected consolidateBankInfo = (): AddUpdateSpecialtyAccountRequest => {
        const editablePaymentMethod = this.props.editablePaymentMethod as RecurringPaymentMethod;
        return {
            memberUid: this.props.specialtyMemberUid,
            paymentMethod: {
                ...editablePaymentMethod,
                billingAddress: this.state.bankAccount.billingAddress,
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
        const newAccount: RecurringPaymentMethod = deepClone(this.state.bankAccount);
        const propAccount: RecurringPaymentMethod = deepClone(this.props.editablePaymentMethod);
        return (
            this.isBillingAddressValid() ||
            (isEqual(_omit(newAccount, 'billingAddress'), _omit(propAccount, 'billingAddress')) &&
                this.isBillingAddressUnchanged(newAccount.billingAddress, propAccount.billingAddress))
        );
    };

    protected onPressSave = (): void => {
        this.context.appContext
            .getServiceExecutor()
            .execute(UPDATE_SPECIALTY_ACCOUNT, { payload: this.consolidateBankInfo() })
            .then(() => {
                this.onSaveNavigation();
            })
            .catch(
                this.logger.warn('UPDATE_SPECIALTY_ACCOUNT failed to add a Credit Card in editSpecialtyBankAccount')
            );
    };

    protected onSaveNavigation = () => {
        this.navigate(ProfileActions.SPECIALTY_PAYMENT_METHOD_PRESSED, {
            labels: this.labels,
            specialtyMemberUid: this.props.specialtyMemberUid,
        });
    };

    protected setBankAccount = () => {
        const bankAccount: RecurringPaymentMethod = deepClone(this.props.editablePaymentMethod);
        this.setState({
            bankAccount,
        });
    };
}
