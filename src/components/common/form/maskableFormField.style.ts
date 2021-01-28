import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface MaskableFormFieldStyleSchema extends StyleSheetSchema {
    errorMessage: TextStyle;
    errorMessageContainer: ViewStyle;
    formFieldLabel: TextStyle;
    iconStyle?: TextStyle;
    inputContainerStyleHasError: ViewStyle;
    inputStyle: TextStyle;
    rightIconContainer: TextStyle;
    warningIcon: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): MaskableFormFieldStyleSchema => {
    const { formField } = colorSchema.pages.formColors;
    const fieldGutter = 10;
    return {
        errorMessage: {},
        errorMessageContainer: { paddingHorizontal: fieldGutter },
        formFieldLabel: {},
        iconStyle: {
            fontSize: 18,
            height: 20,
        },
        inputContainerStyleHasError: {
            borderColor: formField.inputErrorBorders,
        },
        inputStyle: {
            color: formField.inputTexts,
            fontFamily: colorSchema.typeFace,
            fontSize: 14,
        },
        rightIconContainer: {
            height: 24 /* Element's Input will default this to 40 */,
        },
        warningIcon: {},
    };
};
