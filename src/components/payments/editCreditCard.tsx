import { CreditCard, PaymentType } from 'atlas-services/src/models';
import { UPDATE_CREDIT_CARD } from 'atlas-services/src/services/middleware/serviceEndpoint';
import isEqual from 'lodash.isequal';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { _omit, deepClone } from '../../utils';
import CreditCardForm from './creditCardForm';
import CreditCardFormView from './creditCardForm.view';

export default class EditCreditCard extends CreditCardForm {
    public render() {
        return (
            <>
                <CreditCardFormView
                    creditCard={this.state.creditCard}
                    creditCardErrorText={this.state.creditCardErrorText}
                    expirationDateErrorText={this.state.expirationDateErrorText}
                    isEditable={false}
                    isSaveDisabled={this.state.isSaveDisabled}
                    isSetDefaultToggleDisabled={this.state.isSetDefaultToggleDisabled}
                    isSpecialty={false}
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
                <NavigationEvents onDidFocus={this.loadPaymentMethod} />
            </>
        );
    }

    protected consolidateCardInfo = (): CreditCard => {
        return {
            ...this.props.editablePaymentMethod,
            expirationDate: this.props.formatExpirationDate(this.state.creditCard.expirationDate, true),
            isDefaultMethod: this.state.creditCard.isDefaultMethod,
        };
    };

    protected isSaveDisabled = (): boolean => {
        const newCard: CreditCard = this.state.creditCard;
        const propCard: CreditCard = deepClone(this.props.editablePaymentMethod);
        const isExpirationInvalid =
            this.props.invalidDateChecker(newCard.expirationDate) ||
            this.props.invalidExpirationDateLength(newCard.expirationDate) ||
            this.props.isCreditCardFieldEmpty(newCard.expirationDate);

        if (!isExpirationInvalid) {
            this.setState({ expirationDateErrorText: '' });
        }

        propCard.expirationDate = this.props.formatExpirationDate(propCard.expirationDate, false);

        return isExpirationInvalid || isEqual(_omit(newCard, 'billingAddress'), _omit(propCard, 'billingAddress'));
    };

    protected loadPaymentMethod = () => {
        const creditCard: CreditCard = deepClone(this.props.editablePaymentMethod);
        creditCard.expirationDate = this.props.formatExpirationDate(creditCard.expirationDate, false);
        this.setState({
            creditCard,
            isSetDefaultToggleDisabled: creditCard.isDefaultMethod,
        });
    };

    protected onPressSave = () => {
        this.context.appContext
            .getServiceExecutor()
            .execute(UPDATE_CREDIT_CARD, { payload: this.consolidateCardInfo() })
            .then(() => {
                this.onSaveNavigation();
            });
    };

    protected onPressSelectDefaultPaymentMethod = () => {
        this.setState(
            {
                creditCard: {
                    ...this.state.creditCard,
                    isDefaultMethod: !this.state.creditCard.isDefaultMethod,
                },
            },
            () => this.setSaveDisabled()
        );
    };
}
