import { AddUpdateSpecialtyAccountRequest, PaymentType } from 'atlas-services/src/models';
import { TransactionMode } from 'atlas-services/src/models/payment';
import { UPDATE_SPECIALTY_ACCOUNT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { SpecialtyPaymentActions } from '../../../context/navigation/actions';
import CreditCardForm from '../creditCardForm';

export default class AddSpecialtyCreditCard extends CreditCardForm {
    protected consolidateCardInfo = (): AddUpdateSpecialtyAccountRequest => {
        return {
            memberUid: this.props.specialtyMemberUid,
            paymentMethod: {
                ...this.state.creditCard,
                expirationDate: this.props.formatExpirationDate(this.state.creditCard.expirationDate, true),
            },
            transactionMode: TransactionMode.ADD,
        };
    };

    protected isSaveDisabled = () => {
        return (
            this.isBillingAddressValid() ||
            this.props.invalidDateChecker(this.state.creditCard.expirationDate) ||
            this.props.invalidExpirationDateLength(this.state.creditCard.expirationDate) ||
            this.props.isCreditCardFieldEmpty(this.state.creditCard.accountNumber) ||
            this.props.isCreditCardFieldEmpty(this.state.creditCard.expirationDate) ||
            this.props.isCreditCardNumberInvalid(this.state.creditCard.accountNumber)
        );
    };

    protected onPressSave = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(UPDATE_SPECIALTY_ACCOUNT, { payload: this.consolidateCardInfo() })
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
