import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface SpecialtyPayNowStyleSchema extends StyleSheetSchema {
    automaticPaymentBoxContainer: ViewStyle;
    automaticPaymentContainer: ViewStyle;
    automaticPaymentTextContainer: ViewStyle;
    disabledText: TextStyle;
    enrollmentStatusText: TextStyle;
    enrollmentStatusView: ViewStyle;
    formFieldWidth: ViewStyle;
    fullBalancePlacement: ViewStyle;
    linkText: ViewStyle;
    memberContainer: ViewStyle;
    memberNameContainer: ViewStyle;
    minimumPaymentText: ViewStyle;
    noPaymentText: TextStyle;
    partialFormFieldPlacement: ViewStyle;
    paymentCardContainer: ViewStyle;
    pendingPaymentContentContainer: ViewStyle;
    pendingPaymentTitle: TextStyle;
    radioButtonContentContainer: ViewStyle;
    radioButtonTitle: ViewStyle;
    radioContentPlacement: ViewStyle;
    radioText: TextStyle;
    rootContainer: ViewStyle;
    screenAlertErrorMessage: TextStyle;
    screenAlertIcon: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SpecialtyPayNowStyleSchema => {
    return {
        automaticPaymentBoxContainer: {
            marginTop: 36,
        },
        automaticPaymentContainer: {
            marginHorizontal: 20,
            marginTop: 11,
        },
        automaticPaymentTextContainer: {
            marginBottom: 22,
            marginTop: 12,
        },
        disabledText: {
            color: colorSchema.pages.text.disabled,
        },
        enrollmentStatusText: {},
        enrollmentStatusView: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
            width: 160,
        },
        formFieldWidth: {
            width: '75%',
        },
        fullBalancePlacement: {
            marginLeft: 30,
        },
        linkText: {
            marginTop: -2,
        },
        memberContainer: {
            marginTop: 31,
        },
        memberNameContainer: {
            flexDirection: 'row',
            marginBottom: 20,
            marginTop: 13,
        },
        minimumPaymentText: {
            marginLeft: 10,
        },
        noPaymentText: {
            marginTop: 40,
        },
        partialFormFieldPlacement: {
            marginLeft: 20,
        },
        paymentCardContainer: {
            marginVertical: 10,
        },
        pendingPaymentContentContainer: {
            marginTop: 40,
        },
        pendingPaymentTitle: {
            marginBottom: 15,
        },
        radioButtonContentContainer: {
            flexDirection: 'row',
        },
        radioButtonTitle: {
            marginBottom: 5,
            marginTop: 36,
        },
        radioContentPlacement: {
            marginLeft: 10,
            marginTop: 10,
        },
        radioText: {},
        rootContainer: {
            flex: 1,
            justifyContent: 'space-evenly',
        },
        screenAlertErrorMessage: {
            marginEnd: 25,
        },
        screenAlertIcon: {
            alignSelf: 'flex-start',
            marginTop: 5,
        },
    };
};
