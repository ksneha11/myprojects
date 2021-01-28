import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../../styles';

export interface SelectRecurringPaymentDateStyleSchema extends StyleSheetSchema {
    datePickerBox: ViewStyle;
    datePickerContainer: ViewStyle;
    datePickerText: TextStyle;
    dropdownIcon: TextStyle;
    infoText: TextStyle;
    paymentDateBankAccountHeader: TextStyle;
    paymentDateContainer: TextStyle;
    paymentDateHeader: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SelectRecurringPaymentDateStyleSchema => {
    const textColor = colorSchema.pages.text.paragraph;

    return {
        datePickerBox: {
            alignItems: 'center',
            borderColor: colorSchema.menus.menuItems.borders,
            borderWidth: 1,
            flexDirection: 'row',
            flexGrow: 1,
            height: 50,
            justifyContent: 'space-between',
        },
        datePickerContainer: {
            marginEnd: 20,
            marginStart: 30,
        },
        datePickerText: {
            color: colorSchema.pages.formColors.box.placeholder,
            fontSize: 14,
            opacity: 0.6,
            paddingStart: 10,
        },
        dropdownIcon: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontSize: 20,
            paddingEnd: 12,
        },
        infoText: {
            color: textColor,
            fontFamily: 'Roboto',
            fontSize: 14,
        },
        paymentDateBankAccountHeader: {
            marginVertical: 10,
        },
        paymentDateContainer: {
            marginBottom: 35,
        },
        paymentDateHeader: {
            marginBottom: 10,
            marginTop: 20,
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
            fontSize: 18,
            paddingStart: 10,
        },
        rootContainer: {
            paddingHorizontal: 20,
        },
    };
};
