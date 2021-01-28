import {
    AccountBalance,
    AccountInfo,
    BankAccount,
    CreditCard,
    PaymentMethod,
    PaymentType,
} from 'atlas-services/src/models';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { FormView, H1, H2, HorizontalRule, P } from '..';
import { formatCurrency as defaultFormatCurrency, getAccessibleCreditCardExpirationDate } from '../../utils';
import { getMaskedBankName, getMaskedName } from '../../utils/paymentHelperMethods';
import { TextLink } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { PaymentConfirmationStyleSchema } from './paymentConfirmation.style';

export interface Props extends StyleProps {
    accountBalance?: AccountBalance;
    amountPaid?: string;
    children?: <C extends PaymentConfirmationView>(parent: C) => React.ReactNode;
    formatCurrency: (value: number | string) => string;
    getMaskedBankName?: (accountName: string) => string;
    getMaskedName?: (accountName: string) => string;
    isBalanceNotEmpty?: (balance: number) => boolean;
    isSpecialty: boolean;
    onPressMakePayment: noop;
    onPressPayNow?: (specialtyAccount: AccountInfo) => void;
    onSubmit?: noop;
    selectedPaymentMethod: PaymentMethod;
    specialtyAccounts: AccountInfo[];
    style?: Partial<PaymentConfirmationStyleSchema>;
}

export const defaultProps = {
    accountBalanceDetails: [],
    children: ({
        AccountBalanceInfo,
        AmountPaid,
        CurrentBalances,
        Divider,
        labels,
        PaymentConfirmationTitle,
        PaymentMethodContainer,
        props,
        SubTitle,
    }: PaymentConfirmationView) => {
        const { onSubmit } = props;
        return (
            <>
                <FormView
                    onPressPrimaryButton={onSubmit}
                    primaryButtonText={labels.pharmacy.paymentConfirmation.primaryButtonText}
                >
                    {({ Buttons }) => (
                        <ScrollView>
                            <PaymentConfirmationTitle />
                            <SubTitle />
                            <Divider />
                            <AmountPaid />
                            <CurrentBalances />
                            <PaymentMethodContainer />
                            <Divider />
                            <AccountBalanceInfo />
                            <Buttons />
                        </ScrollView>
                    )}
                </FormView>
            </>
        );
    },
    formatCurrency: defaultFormatCurrency,
    getMaskedBankName,
    getMaskedName,
    isSpecialty: false,
    onPressPayNow: () => {},
};

export default class PaymentConfirmationView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PaymentConfirmation';
    public style: PaymentConfirmationStyleSchema;

    public AccountBalanceInfo = (): JSX.Element => {
        const labels = this.labels.pharmacy.paymentConfirmation.accountBalance;
        const isAccountEmpty =
            (this.props.isSpecialty && this.props.isBalanceNotEmpty(this.appState.pbmAccountBalance)) ||
            (!this.props.isSpecialty && this.props.isBalanceNotEmpty(this.appState.specialtyAccountBalance));
        return (
            <>
                {isAccountEmpty && (
                    <View style={this.style.specialtyAccountBalanceContainer}>
                        <H2 style={{ h2: this.style.headerText }}>
                            {this.props.isSpecialty ? labels.header.pbm : labels.header.specialty}
                        </H2>
                        <P>
                            {this.props.isSpecialty
                                ? this.props.formatCurrency(this.appState.pbmAccountBalance)
                                : this.props.formatCurrency(this.appState.specialtyAccountBalance)}
                        </P>
                        <TextLink
                            isUnderlined={true}
                            onPress={this.props.onPressMakePayment}
                            style={{ textLink: this.style.makePaymentLink }}
                        >
                            {labels.makePayment}
                        </TextLink>
                    </View>
                )}
            </>
        );
    };

    public AmountPaid = () => {
        const labels = this.labels.pharmacy.paymentConfirmation.amountPaid;
        return (
            <View style={this.style.amountPaidContainer}>
                <H2 style={{ h2: this.style.pharmacyAccountTitle }}>
                    {this.props.isSpecialty ? labels.title.specialty : labels.title.pbm}
                </H2>
                <H2 style={{ h2: this.style.amountPaidText }}>{labels.subTitle}</H2>
                <H1>{this.props.formatCurrency(this.appState.payAccountBalanceCart.paymentAmount)}</H1>
            </View>
        );
    };

    public Container = ({ children }: { children: React.ReactNode }) => {
        return <ScrollView contentContainerStyle={this.style.rootContainer}>{children}</ScrollView>;
    };

    public CurrentBalances = () => {
        const labels = this.labels.pharmacy.paymentConfirmation.currentBalances;
        return this.props.isSpecialty && this.props.specialtyAccounts && this.props.specialtyAccounts.length > 1 ? (
            <View style={this.style.currentBalancesContainer}>
                <H2 style={{ h2: this.style.currentBalancesTitle }}>{labels.title}</H2>
                <P>{labels.text}</P>
                <this.Divider />
                <FlatList
                    data={this.props.specialtyAccounts}
                    keyExtractor={item => item.accountHolder.memberUid}
                    renderItem={this.renderMemberAccountBalance}
                />
            </View>
        ) : (
            <this.Divider />
        );
    };

    public Divider = (): JSX.Element => {
        return (
            <View style={this.style.horizontalRuleContainer}>
                <HorizontalRule />
            </View>
        );
    };

    public PaymentBankAccount = (bankAccount: BankAccount) => {
        const labels = this.labels.pharmacy.paymentConfirmation.paymentBankAccount;
        return (
            <View style={this.style.paymentMethodContainer}>
                <H2>{labels.paymentMethod}</H2>
                <P>{this.props.getMaskedBankName(bankAccount.accountName)}</P>
                <P>{this.formatLabel(labels.account, bankAccount.companyName)}</P>
            </View>
        );
    };

    public PaymentConfirmationTitle = (): JSX.Element => {
        return (
            <View style={this.style.confirmationTitleContainer}>
                <H1>{this.labels.pharmacy.paymentConfirmation.paymentConfirmationTitle}</H1>
            </View>
        );
    };

    public PaymentCreditCard = (creditCard: CreditCard): JSX.Element => {
        const labels = this.labels.pharmacy.paymentConfirmation.paymentCreditCard;
        const expirationDateAccessibilityLabel = `${labels.expires}, ${getAccessibleCreditCardExpirationDate(
            creditCard.expirationDate,
            this.labels.months,
            this.labels.numberWords
        )}`;
        return (
            <View style={this.style.paymentMethodContainer}>
                <H2>{labels.paymentMethod}</H2>
                <P>{this.props.getMaskedName(creditCard.accountName)}</P>
                <P accessibilityLabel={expirationDateAccessibilityLabel}>
                    {this.formatLabel(labels.expires, creditCard.expirationDate)}
                </P>
            </View>
        );
    };

    public PaymentMethodContainer = (): JSX.Element => {
        const paymentMethod: PaymentMethod = this.props.selectedPaymentMethod;

        return (
            <>
                {paymentMethod.paymentType === PaymentType.CREDIT_CARD
                    ? this.PaymentCreditCard(paymentMethod as CreditCard)
                    : this.PaymentBankAccount(paymentMethod as BankAccount)}
            </>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public SubTitle = (): JSX.Element => {
        return (
            <View style={this.style.subtitleTextContainer}>
                <P>{this.labels.pharmacy.paymentConfirmation.subtitle}</P>
            </View>
        );
    };

    protected renderMemberAccountBalance = ({ item }: { item: AccountInfo }) => {
        const labels = this.labels.pharmacy.paymentConfirmation.renderMemberAccountBalance;
        const name = item.accountHolder.firstName + ' ' + item.accountHolder.lastName;
        const hasAccountBalance = this.props.isBalanceNotEmpty(parseFloat(item.accountBalance));
        const isPaymentSent = item.accountBalancePaymentInfo && item.accountBalancePaymentInfo.recentPayment;
        return (
            <>
                {hasAccountBalance && (
                    <View style={this.style.renderMemberAccountBalanceContainer}>
                        <P>{name}</P>
                        <View style={this.style.renderMemberAccountBalancePaymentContainer}>
                            <P
                                style={{
                                    paragraph: isPaymentSent
                                        ? this.style.renderMemberAccountBalancePaymentSent
                                        : this.style.renderMemberAccountBalancePayNow,
                                }}
                            >
                                {this.props.formatCurrency(item.accountBalance)}
                            </P>
                            <TextLink isDisabled={isPaymentSent} onPress={() => this.props.onPressPayNow(item)}>
                                {isPaymentSent ? labels.textLink.paymentSent : labels.textLink.payNow}
                            </TextLink>
                        </View>
                    </View>
                )}
            </>
        );
    };
}
