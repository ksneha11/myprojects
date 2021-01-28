import { BankAccount, BankAccountType, CreditCard, PaymentMethod, PaymentType } from 'atlas-services/src/models';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { PaymentActions } from '../../context/navigation/actions';
import leftPad from '../../utils/leftPad';
import { formatExpirationDate, getMaskedBankName, getMaskedName, isExpired } from '../../utils/paymentHelperMethods';
import { P } from '../common';
import Icon from '../common/icon';
import RadioButtonSelector, {
    defaultProps as parentDefaultProps,
    Props as ParentProps,
} from '../common/radioButtonSelector';
import StyledComponent from '../styledComponent';
import defaultStyle, { PaymentRadioSelectorStyleSchema } from './paymentRadioSelector.style';

interface Props extends ParentProps {
    formatExpirationDate?: (expirationDate: string, fullDate: boolean) => string;
    getMaskedBankName?: (accountName: string) => string;
    getMaskedName?: (accountName: string) => string;
    isExpired?: (expirationDate: string) => boolean;
    isSpecialty?: boolean;
}

interface PaymentRadioSelectorProps extends Props {}

const paymentCardDefaultProps = {
    formatExpirationDate,
    getMaskedBankName,
    getMaskedName,
    isExpired,
    ...parentDefaultProps,
    // add default paymentCardDefaultProps here
};

export default class PaymentRadioSelector extends StyledComponent<PaymentRadioSelectorProps> {
    public static defaultProps = paymentCardDefaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PaymentRadioSelector';
    public style: PaymentRadioSelectorStyleSchema;

    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <RadioButtonSelector {...this.props} style={{ rootContainer: this.style.rootContainer }}>
                {(parent: RadioButtonSelector) => {
                    const { CardRadioButton, CardAction, CardText, MainContent, style, SubContent } = parent;
                    const {
                        hasRadioButtons,
                        lowerRightIconName,
                        isSelected,
                        item,
                        onActionPress,
                        onRadioPress,
                    } = parent.props;
                    const {
                        action,
                        actionAccessibilityLabel,
                        actionText,
                        content,
                        contentAccessibilityLabel,
                    } = this.getPaymentCardProps(item);
                    return (
                        <>
                            <MainContent>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel={contentAccessibilityLabel}
                                    accessibilityStates={isSelected ? ['selected'] : []}
                                    onPress={onRadioPress}
                                    style={this.style.cardStyle}
                                >
                                    {hasRadioButtons && (
                                        <CardRadioButton
                                            isSelected={isSelected}
                                            item={item}
                                            onPress={onRadioPress}
                                            style={style}
                                        />
                                    )}
                                </TouchableOpacity>
                                <CardText content={content} />
                            </MainContent>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel={actionAccessibilityLabel}
                                style={this.style.cardStyle}
                            >
                                <SubContent action={action} onActionPress={onActionPress}>
                                    <CardAction actionText={actionText} />
                                    <Icon
                                        name={actionText && lowerRightIconName}
                                        style={{ rootItem: { ...style.iconStyle, ...this.style.iconStyle } }}
                                    />
                                </SubContent>
                            </TouchableOpacity>
                        </>
                    );
                }}
            </RadioButtonSelector>
        );
    }

    protected getActionLabel = (paymentMethod: PaymentMethod): string => {
        if (paymentMethod.paymentType === PaymentType.CREDIT_CARD) {
            return this.getCreditCardActionLabel(paymentMethod);
        } else {
            return this.getBankAccountActionLabel(paymentMethod);
        }
    };

    protected getBankAccountActionLabel = (paymentMethod: PaymentMethod): string => {
        let actionLabel = '';
        const bankAccount = paymentMethod as BankAccount;

        // TODO: Re-enable when we have our bank account edit service up
        actionLabel = `${this.formatLabel(
            this.labels.pharmacy.paymentRadioSelector.bankAccount.bankAccountActionAccessiblityLabel,
            bankAccount.companyName,
            leftPad('*', 2, 4, bankAccount.accountName)
        )}`;
        actionLabel = actionLabel.replace(/,/g, '');
        return actionLabel;
    };

    protected getBankAccountContentLabel = (paymentMethod: PaymentMethod): string => {
        let accountType = '';
        let contentLabel = '';
        const bankAccount = paymentMethod as BankAccount;

        if (bankAccount.bankAccountType && !this.props.isSpecialty) {
            accountType =
                bankAccount.bankAccountType === BankAccountType.CHECKING_ACCOUNT
                    ? `${this.labels.pharmacy.paymentRadioSelector.bankAccount.bankAccountTypeChecking}`
                    : `${this.labels.pharmacy.paymentRadioSelector.bankAccount.bankAccountTypeSavings}`;
        }
        contentLabel = `${this.formatLabel(
            this.labels.pharmacy.paymentRadioSelector.bankAccount.bankAccountAccessibilityLabel,
            this.props.getMaskedBankName(bankAccount.accountName),
            accountType,
            bankAccount.companyName,
            bankAccount.isDefaultMethod
                ? this.labels.pharmacy.paymentRadioSelector.currentDefaultCardAccessibilityLabel
                : this.labels.pharmacy.paymentRadioSelector.nonDefaultAccessibilityLabel
        )}`;
        return contentLabel.replace(/,/g, '');
    };

    protected getContentLabel = (paymentMethod: PaymentMethod): string => {
        if (paymentMethod.paymentType === PaymentType.CREDIT_CARD) {
            return this.getCreditCardContentLabel(paymentMethod);
        } else {
            return this.getBankAccountContentLabel(paymentMethod);
        }
    };

    protected getCreditCardActionLabel = (paymentMethod: PaymentMethod): string => {
        const creditCard = paymentMethod as CreditCard;

        const actionLabel = `${this.formatLabel(
            this.labels.pharmacy.paymentRadioSelector.creditCard.creditCardActionAccessibilityLabel,
            creditCard.companyName,
            leftPad('*', 4, 4, creditCard.accountName)
        )}`;
        return actionLabel.replace(/,/g, '');
    };

    protected getCreditCardContentLabel = (paymentMethod: PaymentMethod): string => {
        const creditCard = paymentMethod as CreditCard;

        const contentLabel = `${this.formatLabel(
            this.labels.pharmacy.paymentRadioSelector.creditCard.creditCardAccessibilityLabel,
            this.props.getMaskedName(creditCard.accountName),
            this.props.isExpired(creditCard.expirationDate)
                ? `${this.formatLabel(
                      this.labels.pharmacy.paymentRadioSelector.creditCard.invalidExpiryCardAccessibilityLabel,
                      creditCard.expirationDate
                  )}`
                : `${this.formatLabel(
                      this.labels.pharmacy.paymentRadioSelector.creditCard.validExpiryCardAccessibilityLabel,
                      creditCard.expirationDate
                  )}`,
            creditCard.isDefaultMethod
                ? this.labels.pharmacy.paymentRadioSelector.currentDefaultCardAccessibilityLabel
                : this.labels.pharmacy.paymentRadioSelector.nonDefaultAccessibilityLabel
        )}`;
        return contentLabel.replace(/,/g, '');
    };

    protected getExpiryDateText = (expirationDate: string, isDateExpired: boolean) => {
        const styles = isDateExpired ? this.style.expiredText : null;
        let expiredText = isDateExpired
            ? `${this.formatLabel(
                  this.labels.pharmacy.paymentRadioSelector.creditCard.invalidExpiryCardAccessibilityLabel,
                  this.props.formatExpirationDate(expirationDate, true)
              )}`
            : `${this.formatLabel(
                  this.labels.pharmacy.paymentRadioSelector.creditCard.validExpiryCardAccessibilityLabel,
                  this.props.formatExpirationDate(expirationDate, true)
              )}`;
        expiredText = expiredText.replace(/,/g, '');
        return <P style={{ paragraph: styles }}>{expiredText}</P>;
    };

    protected getPaymentCardProps = (paymentMethod: PaymentMethod) => {
        return paymentMethod.paymentType === PaymentType.CREDIT_CARD
            ? this.propsFromCreditCard(paymentMethod as CreditCard)
            : this.propsFromBankAccount(paymentMethod as BankAccount);
    };

    protected isDefaultTag = (isDefaultPay: boolean) => {
        let text = isDefaultPay ? this.labels.pharmacy.paymentRadioSelector.defaultPayment : '';
        text = text.replace(/,/g, '');
        return <P style={{ paragraph: this.style.defaultText }}>{text}</P>;
    };

    protected paymentAccessibilityLabel = (
        paymentMethod: PaymentMethod
    ): { actionAccessibilityLabel: string; contentAccessibilityLabel: string } => {
        const actionAccessibilityLabel = this.getActionLabel(paymentMethod);
        const contentAccessibilityLabel = this.getContentLabel(paymentMethod);

        return { actionAccessibilityLabel, contentAccessibilityLabel };
    };

    protected propsFromBankAccount = (bankAccount: BankAccount): Partial<Props> => {
        const { actionAccessibilityLabel, contentAccessibilityLabel } = this.paymentAccessibilityLabel(bankAccount);
        let accountType = '';
        if (bankAccount.bankAccountType && !this.props.isSpecialty) {
            accountType =
                bankAccount.bankAccountType === BankAccountType.CHECKING_ACCOUNT
                    ? `${this.labels.pharmacy.paymentRadioSelector.bankAccount.bankAccountTypeChecking}`
                    : `${this.labels.pharmacy.paymentRadioSelector.bankAccount.bankAccountTypeSavings}`;
        }
        return {
            // TODO: Define these when we have a bank account edit service
            action: PaymentActions.BANK_ACCOUNT_EDIT_PRESSED,
            actionAccessibilityLabel,
            actionText: this.props.isSpecialty ? 'Edit' : null,
            content: [
                this.props.getMaskedBankName(bankAccount.accountName),
                bankAccount.companyName,
                accountType,
                '',
                this.props.isSpecialty ? '' : this.isDefaultTag(bankAccount.isDefaultMethod),
            ],
            contentAccessibilityLabel,
        };
    };

    protected propsFromCreditCard = (creditCard: CreditCard): Partial<Props> => {
        const { actionAccessibilityLabel, contentAccessibilityLabel } = this.paymentAccessibilityLabel(creditCard);
        return {
            action: PaymentActions.CREDIT_CARD_EDIT_PRESSED,
            actionAccessibilityLabel,
            actionText: this.labels.pharmacy.paymentRadioSelector.edit,
            content: [
                this.props.getMaskedName(creditCard.accountName),
                this.getExpiryDateText(creditCard.expirationDate, this.props.isExpired(creditCard.expirationDate)),
                '',
                this.props.isSpecialty ? '' : this.isDefaultTag(creditCard.isDefaultMethod),
            ],
            contentAccessibilityLabel,
        };
    };
}
