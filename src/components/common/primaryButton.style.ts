import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface PrimaryButtonStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    buttonContainer: ViewStyle;
    text: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): PrimaryButtonStyleSchema => ({
    button: {
        backgroundColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
        borderRadius: 27.5,
        height: 50,
    },
    buttonContainer: {
        width: '100%',
    },
    darkDisabledButton: {
        backgroundColor: colorSchema.pages.formColors.disableable.disabledColor,
    },
    darkDisabledButtonTitle: {
        color: colorSchema.pages.formColors.disableable.disabledTitleColor,
    },
    text: {
        color: colorSchema.pages.formColors.actionButtons.foregroundColor,
        fontWeight: '500',
    },
});
