import { BankAccount, BankAccountType, CreditCard, PaymentMethod, PaymentType } from 'atlas-services/src/models';
import React from 'react';
import { IconNames, StyleSheetSchema } from '../../styles';
import { formatExpirationDate, getMaskedBankName, getMaskedName, isExpired } from '../../utils/paymentHelperMethods';
import { P } from '../common';
import Card, { defaultProps, Props } from '../common/card';
import StyledComponent from '../styledComponent';
import defaultStyle, { PaymentCardStyleSchema } from './paymentCard.style';

export const getPaymentCardProps = (paymentMethod: PaymentMethod, style?: PaymentCardStyleSchema) => {
    if (paymentMethod) {
        return paymentMethod.paymentType === PaymentType.CREDIT_CARD
            ? propsFromCreditCard(paymentMethod as CreditCard, style)
            : propsFromBankAccount(paymentMethod as BankAccount);
    } else {
        return [];
    }
};

const propsFromCreditCard = (creditCard: CreditCard, style?: PaymentCardStyleSchema) => {
    const expirationDate = isExpired(creditCard.expirationDate) ? (
        <P style={{ paragraph: style.expiredText }}>
            {`Expired ${formatExpirationDate(creditCard.expirationDate, true)} `}
        </P>
    ) : (
        `Expires ${formatExpirationDate(creditCard.expirationDate, true)}`
    );
    return [getMaskedName(creditCard.accountName), expirationDate];
};

const propsFromBankAccount = (bankAccount: BankAccount): string[] => {
    const bankAccountType = getBankAccountTypeLabel(bankAccount.bankAccountType);
    return [getMaskedBankName(bankAccount.accountName), bankAccountType];
};

const getBankAccountTypeLabel = (bankAccountType: BankAccountType): string => {
    switch (bankAccountType) {
        case BankAccountType.CHECKING_ACCOUNT:
            return 'Checking Account';
        case BankAccountType.SAVINGS_ACCOUNT:
            return 'Savings Account';
        case BankAccountType.NONE:
            return 'None';
        default:
            return null;
    }
};

interface PaymentCardProps extends Props {
    arePaymentsPresent?: boolean;
    isDefaultNecessary?: boolean;
    isPaymentNecessary?: boolean;
    isSpecialty?: boolean;
    paymentMethod: PaymentMethod;
}

const paymentCardDefaultProps = {
    arePaymentsPresent: true,
    ...defaultProps,
    footerIconName: IconNames.LIST_ITEM_NAVIGATE_ICON,
    isDefaultNecessary: true,
    isPaymentNecessary: true,
    isSpecialty: false,
    leftIconName: IconNames.PAYMENT_CARD_ICON,
};

export default class PaymentCard extends StyledComponent<PaymentCardProps> {
    public static defaultProps = paymentCardDefaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PaymentCard';
    public style: PaymentCardStyleSchema;

    public getAlertMessage() {
        const labels = this.labels.paymentCard;

        if (!this.props.arePaymentsPresent && !this.props.paymentMethod) {
            return labels.noPaymentMethod;
        }

        if (this.isCardExpired) {
            return labels.expiredCard;
        }

        if (this.props.alertMessage) {
            return this.props.alertMessage;
        } else if (
            !this.props.paymentMethod &&
            this.props.isDefaultNecessary &&
            this.props.isPaymentNecessary &&
            !this.props.isSpecialty
        ) {
            return labels.noDefaultPayment;
        } else if (!this.props.isPaymentNecessary) {
            return labels.paymentNotNecessary;
        } else if (!this.props.paymentMethod && this.props.isSpecialty && this.props.isPaymentNecessary) {
            return labels.noPrimaryMethod;
        } else if (!this.props.paymentMethod && !this.props.isSpecialty) {
            return labels.noPaymentMethod;
        }
    }

    public getAlertType() {
        if (this.props.alertType) {
            return this.props.alertType;
        } else if (!this.props.paymentMethod || !this.props.isPaymentNecessary) {
            return 'info';
        } else if (!!this.props.paymentMethod && this.isCardExpired) {
            return 'warning';
        }
    }

    public getFooterIcon(footerText: string) {
        if (footerText && footerText !== ' ') {
            return this.props.footerIconName;
        } else {
            return null;
        }
    }

    public getFooterText() {
        const labels = this.labels.paymentCard;
        if (!this.props.arePaymentsPresent && this.props.isPaymentNecessary) {
            return labels.footer.addPayment;
        }

        if (!this.props.isPaymentNecessary) {
            return ' ';
        } else if (this.props.isDefaultNecessary && this.props.arePaymentsPresent) {
            return labels.footer.changePayment;
        } else if (this.props.isSpecialty) {
            return labels.footer.changePayment;
        } else {
            return this.props.paymentMethod ? labels.footer.changePayment : labels.footer.addPayment;
        }
    }

    public render() {
        const footerText = this.getFooterText();
        const labels = this.labels.paymentCard;
        const styleOverrides = this.props.paymentMethod
            ? null
            : {
                  footerContainer: this.style.noPaymentMethodFooter,
                  leftIcon: this.style.noPaymentMethodIcon,
              };

        return (
            <Card
                alertMessage={this.getAlertMessage()}
                alertType={this.getAlertType()}
                content={getPaymentCardProps(this.props.paymentMethod, this.style)}
                footerAccessibilityHint={labels.footer.accessibilityHint}
                footerAccessibilityLabel={labels.footer.accessibilityLabel}
                footerText={footerText}
                style={styleOverrides}
                title={labels.title}
                {...this.props}
                footerIconName={this.getFooterIcon(footerText)}
            />
        );
    }

    protected get isCardExpired(): boolean {
        if (this.props.paymentMethod && this.props.paymentMethod.paymentType === PaymentType.CREDIT_CARD) {
            return isExpired((this.props.paymentMethod as CreditCard)?.expirationDate);
        } else {
            return false;
        }
    }
}
