import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CreditCardFormStyleSchema extends StyleSheetSchema {
    billingAddressContainer: ViewStyle;
    billingAddressContentContainer: ViewStyle;
    billingAddressHeader: TextStyle;
    cardIcon: ImageStyle;
    cardIcons: ImageStyle; // TODO: naming
    checkBoxContainer: ViewStyle;
    checkColor: TextStyle;
    contentContainer: ViewStyle;
    creditCardContainer: ViewStyle;
    creditCardContent: ViewStyle;
    creditCardLabel: TextStyle;
    defaultPaymentToggleContainer: ViewStyle;
    editCardIcon: ImageStyle;
    editCreditCardContainer: ViewStyle;
    editCreditCardContentContainer: ViewStyle;
    expirationWidth: TextStyle;
    formFieldContainer: ViewStyle;
    inputContainer: ViewStyle;
    labelsText: TextStyle;
    rootContainer: ViewStyle;
    selectDefaultContainer: ViewStyle;
    selectDefaultTextContainer: ViewStyle;
    selectDefaultTitleContainer: TextStyle;
    subHeaderContainer: ViewStyle;
    subHeaderText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): CreditCardFormStyleSchema => {
    return {
        billingAddressContainer: {
            marginTop: 15,
        },
        billingAddressContentContainer: {
            marginHorizontal: 20,
        },
        billingAddressHeader: {
            marginTop: 25,
        },
        cardIcon: {
            height: 30,
            marginStart: 20,
            width: 42,
        },
        cardIcons: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 10,
            marginTop: 15,
            width: '66%',
        },
        checkBoxContainer: {
            backgroundColor: colorSchema.menus.menuItems.backgroundColor,
            borderColor: colorSchema.menus.menuItems.backgroundColor,
            marginLeft: 15,
            marginRight: 16,
            marginTop: 37,
        },
        checkColor: {
            // this was undefined - leaving it blank for now
            color: undefined, // addCreditCard.checkBox.colors.checkColor,
        },
        contentContainer: {
            marginTop: 5,
        },
        creditCardContainer: {
            marginHorizontal: 10,
            marginTop: 20,
        },
        creditCardContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 6,
        },
        creditCardLabel: {},
        defaultPaymentToggleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 20,
        },
        editCardIcon: {
            height: 30,
            width: 42,
        },
        editCreditCardContainer: {
            marginHorizontal: 15,
        },
        editCreditCardContentContainer: {
            marginBottom: 10,
            marginHorizontal: 10,
            marginTop: 30,
        },
        expirationWidth: {
            width: '50%',
        },
        formFieldContainer: {
            marginTop: 32,
        },
        inputContainer: {
            marginStart: 5,
        },
        labelsText: {
            color: colorSchema.pages.formColors.formField.inputLabels,
            marginBottom: 6,
            marginHorizontal: 16,
        },
        rootContainer: {},
        selectDefaultContainer: {
            marginEnd: 20,
            marginStart: 15,
            marginTop: 20,
        },
        selectDefaultTextContainer: {
            marginEnd: 80,
        },
        selectDefaultTitleContainer: {},
        subHeaderContainer: {
            marginStart: 20,
            marginTop: 18,
        },
        subHeaderText: {},
    };
};
