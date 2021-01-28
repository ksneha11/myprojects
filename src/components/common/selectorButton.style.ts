import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface SelectorButtonStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    text: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SelectorButtonStyleSchema => ({
    button: {
        backgroundColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
        borderRadius: 15,
        paddingVertical: 5,
    },
    buttonContainer: {
        width: '100%',
    },
    text: {
        color: colorSchema.pages.formColors.actionButtons.foregroundColor,
        fontSize: 14,
        fontWeight: '500',
    },
});
