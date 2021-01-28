import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface PaymentConfirmationStyleSchema extends StyleSheetSchema {
    amountPaidContainer: ViewStyle;
    amountPaidText: TextStyle;
    confirmationTitleContainer: ViewStyle;
    currentBalancesContainer: ViewStyle;
    currentBalancesTitle: TextStyle;
    horizontalRuleContainer: ViewStyle;
    makePaymentLink: TextStyle;
    paymentMethodContainer: ViewStyle;
    pharmacyAccountTitle: TextStyle;
    remainingBalanceContainer: ViewStyle;
    renderMemberAccountBalanceContainer: ViewStyle;
    renderMemberAccountBalancePaymentContainer: ViewStyle;
    renderMemberAccountBalancePaymentSent: TextStyle;
    renderMemberAccountBalancePayNow: TextStyle;
    rootContainer: ViewStyle;
    specialtyAccountBalanceContainer: ViewStyle;
    subtitleTextContainer: ViewStyle;
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): PaymentConfirmationStyleSchema => {
    return {
        amountPaidContainer: {
            marginTop: 15,
        },
        amountPaidText: {
            color: colorSchema.pages.formColors.subHeaders,
            marginBottom: 5,
        },
        confirmationTitleContainer: {
            marginTop: 40,
        },
        currentBalancesContainer: {
            marginTop: 20,
        },
        currentBalancesTitle: {
            marginBottom: 5,
        },
        headerText: {
            marginBottom: 2,
        },
        horizontalRuleContainer: {
            marginHorizontal: -5,
            marginTop: 10,
        },
        makePaymentLink: {
            marginTop: 20,
        },
        paymentMethodContainer: {
            marginTop: 15,
        },
        pharmacyAccountTitle: {
            marginBottom: 15,
        },
        remainingBalanceContainer: {
            marginBottom: 5,
            marginTop: 15,
        },
        renderMemberAccountBalanceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
        },
        renderMemberAccountBalancePayNow: {
            marginEnd: 50,
        },
        renderMemberAccountBalancePaymentContainer: {
            flexDirection: 'row',
        },
        renderMemberAccountBalancePaymentSent: {
            marginEnd: 25,
        },

        rootContainer: {
            flex: 1,
            marginBottom: 40,
            marginHorizontal: 20,
        },
        specialtyAccountBalanceContainer: {
            alignItems: 'center',
            backgroundColor: colorSchema.alerts.defaultBackground,
            marginBottom: 30,
            marginTop: 10,
            padding: 10,
        },
        subtitleTextContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: 10,
        },
    };
};
