import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface FormFieldStyleSchema extends StyleSheetSchema {
    autoCompleteRootContainer: ViewStyle;
    errorMessageContainer: ViewStyle;
    formFieldLabel: TextStyle;
    inputContainerStyle: ViewStyle;
    inputContainerStyleHasError: ViewStyle;
    inputStyle: TextStyle;
    inputStyleHasFocus: TextStyle;
    multilineDefault: ViewStyle;
    multilineHeight: ViewStyle;
    multilineWrapped: ViewStyle;
    rootContainer: ViewStyle;
    warningIcon: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): FormFieldStyleSchema => {
    const { formField } = colorSchema.pages.formColors;
    const fieldGutter = 10;
    return {
        autoCompleteRootContainer: {
            top: 75,
        },
        errorMessage: {},
        errorMessageContainer: { paddingHorizontal: fieldGutter },
        formFieldLabel: {
            color: formField.inputLabels,
            fontFamily: colorSchema.typeFace,
            fontSize: 16,
            fontWeight: '500',
            marginLeft: fieldGutter,
        },
        inputContainerStyle: {
            borderColor: formField.inputBorders,
            borderRadius: 10,
            borderWidth: 1,
            marginVertical: 6,
            paddingHorizontal: fieldGutter,
        },
        inputContainerStyleHasError: {
            borderColor: formField.inputErrorBorders,
        },
        inputStyle: {
            color: formField.inputTexts,
            fontFamily: colorSchema.typeFace,
            fontSize: 14,
            minHeight: 20 /* RN Elements defaults this to 40. */,
        },
        inputStyleHasFocus: {
            borderColor: formField.inputBordersFocused,
        },
        multilineDefault: {
            paddingTop: Platform.select({ ios: 10, android: null }),
        },
        multilineHeight: {
            height: Platform.select({ ios: 20, android: 0 }),
        },
        multilineWrapped: {
            paddingBottom: Platform.select({ ios: 5, android: null }),
        },
        rootContainer: {
            flexDirection: 'column',
            flexGrow: 0,
            justifyContent: 'flex-start',
            position: 'relative',
        },
        warningIcon: {},
    };
};
