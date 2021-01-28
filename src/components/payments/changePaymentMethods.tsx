import React from 'react';
import { NavigationEvents } from 'react-navigation';
import AbstractChangePaymentMethods, {
    Props as ParentProps,
    State as ParentState,
} from './abstractChangePaymentMethod';
import ChangePaymentMethodView from './changePaymentMethods.view';

export default class ChangePaymentMethod<
    P extends ParentProps = ParentProps,
    S extends ParentState = ParentState
> extends AbstractChangePaymentMethods<P, S> {
    public render() {
        return (
            <>
                <ChangePaymentMethodView
                    arePaymentMethodsPresent={this.state.arePaymentMethodsPresent}
                    bankAccounts={this.props.getBankAccounts(this.state.paymentMethods)}
                    creditCards={this.props.getCreditCards(this.state.paymentMethods)}
                    hasRadioButtons={this.props.hasRadioButtons}
                    isPrimaryButtonDisabled={this.state.isPrimaryButtonDisabled}
                    isSpecialty={false}
                    modalVisible={this.state.modalVisible}
                    onPressAddPaymentMethod={this.onPressAddPaymentMethod}
                    onPressEditBankAccount={this.onPressEditBankAccount}
                    onPressEditCreditCard={this.onPressEditCreditCard}
                    onPressNeedToMakeChanges={this.onPressNeedToMakeChanges}
                    onPressOverlayClose={this.onPressOverlayClose}
                    onPressOverlayPrimary={this.onPressOverlayPrimary}
                    onPressPaymentMethod={this.onPressPaymentMethod}
                    onPressSave={this.onPressSave}
                    pageTitle={this.labels.pharmacy.changePaymentMethods.titles.pbm}
                    pbmPhoneNumber={this.state.pbmPhoneNumber}
                    saveButtonText={
                        this.props.saveButtonText ?? this.labels.pharmacy.changePaymentMethods.saveButtonText
                    }
                    selectedPaymentId={this.state.selectedPaymentMethod?.accountName}
                    subHeader={this.getSubHeader()}
                />
                <NavigationEvents onDidFocus={this.getPaymentMethods} />
            </>
        );
    }
}
