import { PaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import AbstractChangeSpecialtyPaymentMethod from '../abstractChangeSpecialtyPaymentMethod';
import ChangePaymentMethodView from '../changePaymentMethods.view';

export default class ChangeSpecialtyPaymentMethod extends AbstractChangeSpecialtyPaymentMethod {
    public render() {
        return (
            <>
                <ChangePaymentMethodView
                    arePaymentMethodsPresent={this.state.arePaymentMethodsPresent}
                    bankAccounts={this.props.getBankAccounts(
                        this.state.selectedMember?.paymentMethods ?? this.props.selectedSpecialtyAccount?.paymentMethods
                    )}
                    creditCards={this.props.getCreditCards(
                        this.state.selectedMember?.paymentMethods ?? this.props.selectedSpecialtyAccount?.paymentMethods
                    )}
                    hasRadioButtons={this.props.hasRadioButtons}
                    isPrimaryButtonDisabled={this.state.isPrimaryButtonDisabled}
                    isSpecialty={true}
                    modalVisible={this.state.modalVisible}
                    multipleAccountsPresent={this.props.multipleAccountsPresent}
                    onPressAddPaymentMethod={this.onPressAddPaymentMethod}
                    onPressEditBankAccount={this.onPressEditBankAccount}
                    onPressEditCreditCard={this.onPressEditCreditCard}
                    onPressNeedToMakeChanges={this.onPressNeedToMakeChanges}
                    onPressOverlayClose={this.onPressOverlayClose}
                    onPressOverlayPrimary={this.onPressOverlayPrimary}
                    onPressPaymentMethod={this.onPressPaymentMethod}
                    onPressSave={this.onPressSave}
                    pageTitle={this.labels.pharmacy.changeSpecialtyPaymentMethods.pageTitle}
                    saveButtonText={
                        this.props.saveButtonText ?? this.labels.pharmacy.changeSpecialtyPaymentMethods.saveButtonText
                    }
                    selectedSpecialtyMemberUid={this.props.selectedSpecialtyAccount.memberUid}
                    selectedPaymentId={this.state.selectedPaymentMethod?.accountName}
                    subHeaderLabel={this.getSubHeader()}
                />
                <NavigationEvents onDidFocus={this.getPaymentMethods} />
            </>
        );
    }
}
