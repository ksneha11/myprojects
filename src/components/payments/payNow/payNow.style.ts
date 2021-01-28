import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface PayNowStyleSchema extends StyleSheetSchema {
    accountAlertContainer: ViewStyle;
    activityPaymentContainer: ViewStyle;
    amountDueContainer: ViewStyle;
    amountDueValueContainer: ViewStyle;
    buttonContainer: ViewStyle;
    disclaimerTextContainer: ViewStyle;
    flexibleSpendingAccountAlert: ViewStyle;
    horizontalRuleContainer: ViewStyle;
    iconContainer: TextStyle;
    infoButton: TextStyle;
    infoIcon: TextStyle;
    noPaymentText: TextStyle;
    paymentAmountTextContainer: ViewStyle;
    paymentSectionContainer: ViewStyle;
    payPharmacyAccountTextContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): PayNowStyleSchema => {
    const linkColor = colorSchema.pages.formColors.actionButtons.backgroundColor;

    return {
        accountAlertContainer: {
            marginTop: 15,
        },
        activityPaymentContainer: {
            marginBottom: 15,
            marginTop: 25,
        },
        amountDueContainer: {
            justifyContent: 'center',
            marginTop: 10,
        },
        amountDueValueContainer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        buttonContainer: {
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'flex-end',
            marginVertical: 10,
        },
        disclaimerTextContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 42,
            marginTop: 35,
        },
        flexibleSpendingAccountAlert: {
            marginLeft: 10,
            marginRight: 35,
        },
        horizontalRuleContainer: {
            marginHorizontal: -5,
            marginTop: 36,
        },
        iconContainer: {
            color: colorSchema.pages.formColors.links,
            marginStart: 5,
            marginTop: 5,
        },
        infoButton: {
            color: linkColor,
            marginStart: 10,
        },
        infoIcon: {
            color: colorSchema.alerts.infoIcons,
            fontSize: 20,
        },
        noPaymentText: {
            marginTop: 40,
        },
        payPharmacyAccountTextContainer: {
            marginTop: 40,
        },
        paymentAmountTextContainer: {
            height: 33,
            marginTop: 18,
        },
        paymentSectionContainer: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        rootContainer: {
            flex: 1,
            marginHorizontal: 20,
        },
    };
};
