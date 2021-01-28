import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CheckBoxStyleSchema extends StyleSheetSchema {
    checkboxTextLabel: TextStyle;
    iconActiveStyle: TextStyle;
    iconInactiveStyle: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): CheckBoxStyleSchema => {
    const fontSize = 16;
    const iconSize = 20;

    return {
        checkboxTextLabel: {
            color: colorSchema.pages.formColors.paragraphs,
            fontFamily: colorSchema.typeFace,
            fontSize,
            paddingLeft: 15,
        },
        iconActiveStyle: {
            color: colorSchema.checkbox.activeColor,
            fontSize: iconSize,
        },
        iconInactiveStyle: {
            color: colorSchema.checkbox.inactiveColor,
            fontSize: iconSize,
        },
        rootContainer: {
            flex: 1,
            flexDirection: 'row',
        },
    };
};
