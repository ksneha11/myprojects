import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface TextLinkStyleSchema extends StyleSheetSchema {
    alternateColor: TextStyle;
    isDisabled: TextStyle;
    smallText: TextStyle;
    textLink: TextStyle;
    underlinedStyle: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): TextLinkStyleSchema => ({
    alternateColor: {
        color: colorSchema.alerts.warningIcons,
        textDecorationColor: colorSchema.alerts.warningIcons,
    },
    finePrint: {
        fontFamily: colorSchema.typeFaceHelper,
        fontSize: 12,
        lineHeight: 16,
    },
    isDisabled: {
        color: colorSchema.pages.text.disabled,
    },
    smallText: {
        fontSize: 14,
    },
    textLink: {
        color: colorSchema.pages.formColors.links,
        fontFamily: colorSchema.typeFace,
        fontSize: 16,
    },
    underlinedStyle: {
        textDecorationColor: colorSchema.pages.formColors.links,
        textDecorationLine: 'underline',
    },
});
