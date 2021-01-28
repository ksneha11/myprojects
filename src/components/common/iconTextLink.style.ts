import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface IconTextLinkStyleSchema extends StyleSheetSchema {
    disabledIcon: TextStyle;
    disabledText: TextStyle;
    icon: TextStyle;
    rootContainer: ViewStyle;
    text: TextStyle;
    textContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): IconTextLinkStyleSchema => ({
    disabledIcon: {
        color: colorSchema.pages.formColors.disableable.disabledColor,
    },
    disabledText: {
        color: colorSchema.pages.formColors.disableable.disabledColor,
    },
    icon: {
        color: colorSchema.pages.formColors.links,
        fontSize: 22,
    },
    rootContainer: {
        alignContent: 'center',
        flex: 0,
        flexDirection: 'row',
    },
    text: {
        color: colorSchema.pages.formColors.links,
        fontSize: 16,
        fontWeight: '500',
    },
    textContainer: {},
});
