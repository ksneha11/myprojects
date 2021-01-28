import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface SetUpAutomaticPaymentsStyleSchema extends StyleSheetSchema {
    bodyChargeDisclaimerContainer: ViewStyle;
    bodyPaymentMethodContainer: ViewStyle;
    cancelEnrollmentContainer: ViewStyle;
    footerChangeSettingsTextContainer: ViewStyle;
    footerContainer: ViewStyle;
    headerMemberInfoStatus: TextStyle;
    headerName: TextStyle;
    horizontalRuleNoMargin: ViewStyle;
    paymentMethodDetailContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): SetUpAutomaticPaymentsStyleSchema => {
    return {
        bodyChargeDisclaimerContainer: {
            marginBottom: 25,
            marginTop: 15,
        },
        bodyPaymentMethodContainer: {},
        bodySettingsContainer: {
            marginVertical: 25,
        },
        cancelEnrollmentContainer: {
            marginBottom: 25,
        },
        cancelEnrollmentDialogPrimaryButtonText: {},
        footerChangeSettingsTextContainer: {
            alignItems: 'center',
            marginTop: 30,
        },
        footerContainer: {
            marginBottom: 50,
            marginTop: 40,
        },
        headerMemberInfoStatus: {
            marginBottom: 10,
        },
        headerName: {
            marginBottom: 5,
        },
        horizontalRuleNoMargin: {
            margin: 0,
        },
        paymentMethodDetailContainer: {
            marginBottom: 5,
        },
        rootContainer: {
            marginHorizontal: 20,
            marginTop: 30,
        },
    };
};
