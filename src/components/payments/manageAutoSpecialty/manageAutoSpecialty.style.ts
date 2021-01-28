import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';
export interface ManageAutoSpecialtyStyleSchema extends StyleSheetSchema {
    activityPaymentContainer: ViewStyle;
    boxHeader: TextStyle;
    buttonContainer: ViewStyle;
    dividerContainer: ViewStyle;
    headerText: TextStyle;
    iconContainer: TextStyle;
    infoText: TextStyle;
    memberInfoStatus: TextStyle;
    paymentCardContainer: ViewStyle;
    paymentDateContainer: ViewStyle;
    paymentLimitForm: ViewStyle;
    paymentLimitInfoConatiner: ViewStyle;
    paymentProcessingText: TextStyle;
    paymentSectionContainer: ViewStyle;
    pendingPaymentContentContainer: ViewStyle;
    rootContainer: ViewStyle;
    screenAlertErrorMessage: TextStyle;
    screenAlertIcon: TextStyle;
    sectionContainer: ViewStyle;
    subHeaderText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ManageAutoSpecialtyStyleSchema => {
    const textColor = colorSchema.pages.text.paragraph;

    return {
        activityPaymentContainer: {
            marginBottom: 15,
            marginHorizontal: 20,
            marginTop: 25,
        },
        boxHeader: {
            paddingBottom: 10,
            paddingTop: 36,
        },
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 50,
        },
        datePickerBox: {
            alignItems: 'center',
            borderColor: colorSchema.menus.menuItems.borders,
            borderWidth: 1,
            flexDirection: 'row',
            flexGrow: 1,
            height: 50,
            justifyContent: 'space-between',
            marginEnd: 20,
            marginStart: 30,
        },
        datePickerText: {
            color: colorSchema.pages.formColors.box.placeholder,
            fontFamily: colorSchema.typeFace,
            opacity: 0.6,
            paddingStart: 10,
        },
        dividerContainer: {
            paddingHorizontal: 15,
        },
        headerText: {
            color: textColor,
            fontFamily: colorSchema.typeFace,
            lineHeight: 40,
        },
        iconContainer: {
            color: colorSchema.pages.formColors.links,
            marginStart: 5,
            marginTop: 5,
        },
        infoText: {
            color: textColor,
            fontFamily: colorSchema.typeFace,
        },
        memberInfoStatus: {
            color: colorSchema.pages.text.disabled,
            fontFamily: colorSchema.typeFace,
        },
        paymentCardContainer: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        paymentDateContainer: {
            paddingHorizontal: 20,
        },
        paymentLimitForm: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 10,
            borderWidth: 1,
            height: 50,
            marginStart: -10,
            marginVertical: 6,
            width: 180,
        },
        paymentLimitInfoConatiner: {
            paddingStart: 20,
            paddingVertical: 20,
        },
        paymentProcessingText: {
            marginBottom: 15,
        },
        paymentSectionContainer: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        pendingPaymentContentContainer: {
            marginHorizontal: 20,
            marginVertical: 20,
        },
        radioButtonContainer: {
            paddingVertical: 10,
        },
        radioButtonLine: {
            flexDirection: 'row',
            paddingVertical: 10,
        },
        radioSubtextContainer: {
            marginBottom: 12,
            marginStart: 30,
        },
        radioText: {
            color: textColor,
            fontFamily: colorSchema.typeFace,
            paddingStart: 10,
        },
        rootContainer: {
            flex: 1,
        },
        screenAlertErrorMessage: {
            marginEnd: 25,
        },
        screenAlertIcon: {
            alignSelf: 'flex-start',
            marginTop: 5,
        },
        sectionContainer: {
            paddingHorizontal: 20,
            paddingTop: 30,
        },
        subHeaderText: {
            color: textColor,
            fontFamily: colorSchema.typeFace,
        },
    };
};
