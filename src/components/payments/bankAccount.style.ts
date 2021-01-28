import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface BankAccountFormStyleSchema extends StyleSheetSchema {
    accountDetailsContainer: ViewStyle;
    accountNumberInputContainer: ViewStyle;
    accountTypeText: TextStyle;
    billingAddressContainer: ViewStyle;
    billingAddressContentContainer: ViewStyle;
    billingAddressHeader: TextStyle;
    contentContainer: ViewStyle;
    defaultContainerStyle: ViewStyle;
    defaultPaymentToggleContainer: ViewStyle;
    editInfoLabels: TextStyle;
    editInfoTextContainer: ViewStyle;
    horizontalAlignment: ViewStyle;
    horizontalExampleText: TextStyle;
    horizontalLine: ViewStyle;
    inputContainer: ViewStyle;
    inputPlace: ViewStyle; // TODO: naming
    labelsPlacement: ViewStyle; // TODO: naming
    labelsText: TextStyle;
    placeHolderImage: ViewStyle;
    placeHolderImageDimensions: ImageStyle;
    radioButtonAlignment: ViewStyle;
    radioButtonError: ViewStyle;
    radioButtonText: TextStyle;
    radioButtonTitle: TextStyle;
    rootContainer: ViewStyle;
    routingNumberInputContainer: ViewStyle;
    selectDefaultContainer: ViewStyle;
    selectDefaultTextContainer: ViewStyle;
    selectDefaultTitleContainer: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): BankAccountFormStyleSchema => {
    return {
        accountDetailsContainer: {
            marginTop: 35,
        },
        accountNumberInputContainer: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 5,
            borderWidth: 1,
            flex: 1,
            height: 50,
            marginRight: 15,
        },
        accountTypeText: {
            color: colorSchema.pages.text.disabled,
            fontSize: 14,
            fontWeight: '500',
        },
        billingAddressContainer: {
            marginTop: 15,
        },
        billingAddressContentContainer: {
            marginHorizontal: 20,
        },
        billingAddressHeader: {
            marginTop: 25,
        },
        contentContainer: {
            marginTop: 5,
        },
        defaultContainerStyle: {
            marginBottom: 10,
            marginEnd: 20,
            marginStart: 15,
        },
        defaultPaymentToggleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 20,
        },
        editInfoLabels: {
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 8,
        },
        editInfoTextContainer: {
            marginStart: 10,
        },
        horizontalAlignment: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },
        horizontalExampleText: {
            color: colorSchema.pages.text.disabled,
            fontSize: 14,
            marginTop: 45,
        },
        horizontalLine: {
            marginBottom: 17,
            marginHorizontal: 17,
            marginTop: 41,
            width: '31%',
        },
        inputContainer: {
            marginStart: 5,
        },
        inputPlace: {
            // TODO: naming
            marginLeft: 15,
            marginTop: 32,
        },
        labelsPlacement: {
            marginBottom: 6,
            marginHorizontal: 16,
        },
        labelsText: {
            color: colorSchema.pages.formColors.formField.inputLabels,
            fontSize: 16,
            fontWeight: '500',
        },
        placeHolderImage: {
            alignContent: 'center',
            display: 'flex',
            flex: 1,
            marginHorizontal: 16,
        },
        placeHolderImageDimensions: {
            height: 50,
            width: '100%',
        },
        radioButtonAlignment: {
            flexDirection: 'row',
            marginLeft: 30,
            marginTop: 17,
        },
        radioButtonError: {
            marginStart: 20,
            marginTop: 15,
        },
        radioButtonText: {
            color: colorSchema.pages.formColors.formField.inputLabels,
            fontSize: 14,
            marginLeft: 10,
            marginTop: 2,
        },
        radioButtonTitle: {
            color: colorSchema.pages.formColors.formField.inputLabels,
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 5,
            marginLeft: 25,
            marginTop: 18,
        },
        rootContainer: {},
        routingNumberInputContainer: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 5,
            borderWidth: 1,
            flex: 1,
            height: 50,
            marginRight: 15,
        },
        selectDefaultContainer: {
            marginEnd: 20,
            marginStart: 15,
        },
        selectDefaultTextContainer: {
            marginEnd: 80,
        },
        selectDefaultTitleContainer: {
            fontSize: 18,
            fontWeight: '500',
        },
    };
};
