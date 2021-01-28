import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface SecondaryButtonStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    buttonDisabled: ViewStyle;
    text: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SecondaryButtonStyleSchema => {
    const button = {
        backgroundColor: colorSchema.pages.formColors.actionButtons.foregroundColor,
        borderColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
        borderRadius: 27.5,
        borderWidth: 1,
        height: 50,
    };
    return {
        button,
        buttonContainer: {
            width: '100%',
        },
        buttonDisabled: { ...button, borderColor: colorSchema.pages.formColors.disableable.disabledColor },
        text: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontWeight: '600',
        },
    };
};
