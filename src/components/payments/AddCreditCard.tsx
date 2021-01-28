import { CreditCard } from 'atlas-services/src/models';
import { CREATE_CREDIT_CARD } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import CreditCardForm from './creditCardForm';

export default class AddCreditCard extends CreditCardForm {
    protected consolidateCardInfo = (): CreditCard => {
        return {
            ...this.state.creditCard,
            expirationDate: this.props.formatExpirationDate(this.state.creditCard.expirationDate, false),
        };
    };

    protected onPressSave = (): void => {
        this.context.appContext
            .getServiceExecutor()
            .execute(CREATE_CREDIT_CARD, { payload: this.consolidateCardInfo() })
            .then(this.onSaveNavigation)
            .catch(exception => this.logger.warn('CREATE_CREDIT_CARD threw an error in AddCreditCard: ' + exception));
    };
}
