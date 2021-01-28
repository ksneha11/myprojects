import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ConfirmationStyleSchema extends StyleSheetSchema {
    buttonContainer: ViewStyle;
    contentContainer: ViewStyle;
    headerTitle: TextStyle;
    headerTitleWithAddCardPharmacy: TextStyle;
    headerTitleWithAddCardSpecialty: TextStyle;
    headerTitleWithoutAddCard: TextStyle;
    horizontalLine: TextStyle;
    horizontalRuleContainer: TextStyle;
    prescriptionContainer: TextStyle;
    prescriptionRenewalContainer: TextStyle;
    rootContainer: ViewStyle;
    shippingAndPaymentContainer: ViewStyle;
    subHeader: TextStyle;
    subText: TextStyle;
    textLinkContainer: TextStyle;
}

export default ({ colorSchema, hairlineWidth }: StyleSchemaParams): ConfirmationStyleSchema => {
    return {
        buttonContainer: {
            margin: 20,
            paddingBottom: 30,
        },
        contentContainer: {
            flex: 1,
            flexDirection: 'row',
        },
        headerTitle: {
            marginBottom: 10,
            marginStart: 12,
        },
        headerTitleWithAddCardPharmacy: {
            marginBottom: 12,
            marginStart: 12,
            marginTop: 32,
        },
        headerTitleWithAddCardSpecialty: {
            marginBottom: 12,
            marginStart: 12,
            marginTop: 14,
        },
        headerTitleWithoutAddCard: {
            marginBottom: 14,
            marginStart: 12,
            marginTop: 12,
        },
        horizontalLine: {
            marginHorizontal: 12,
        },
        horizontalRuleContainer: {
            marginBottom: 18,
            marginTop: 16,
        },
        leftIcon: {},
        prescriptionContainer: {
            marginHorizontal: 15,
            marginTop: 22,
        },
        prescriptionRenewalContainer: {
            marginHorizontal: 15,
            marginTop: 38,
        },
        rootContainer: {
            flex: 1,
        },
        shippingAndPaymentContainer: {
            flex: 1,
            marginHorizontal: 15,
        },
        subHeader: {
            marginBottom: 24,
            marginHorizontal: 12,
        },
        subText: {
            color: colorSchema.pages.text.paragraph,
        },
        textLinkContainer: {
            marginTop: 10,
        },
    };
};
