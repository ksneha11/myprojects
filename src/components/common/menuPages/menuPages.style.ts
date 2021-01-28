import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface MenuPagesStyleSchema extends StyleSheetSchema {
    dateOfBirth: TextStyle;
    horizontalRule: ViewStyle;
    horizontalRuleWithPadding: ViewStyle;
    memberInfoContainer: ViewStyle;
    memberInfoText: TextStyle;
    menuItemContainer: ViewStyle;
    menuItemText: TextStyle;
    pageTextContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth }: StyleSchemaParams): MenuPagesStyleSchema => {
    const textColor = colorSchema.pages.formColors.paragraphs;
    const linkColor = colorSchema.pages.formColors.links;

    return {
        dateOfBirth: { color: textColor, marginTop: 4 },
        horizontalRule: {},
        horizontalRuleWithPadding: {
            alignSelf: 'center',
            width: windowWidth - colorSchema.pages.layout.paddingHorizontal * 2,
        },
        memberInfoContainer: {
            marginStart: 20,
        },
        memberInfoText: {
            color: textColor,
        },
        menuItemContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: -20,
        },
        menuItemText: {
            color: linkColor,
            flexShrink: 1,
            marginEnd: 4,
        },
        pageTextContainer: {
            marginBottom: 50,
            marginStart: 20,
            marginTop: 13,
        },
        rootContainer: {},
        textContainer: {
            flex: 0,
            flexShrink: 1,
        },
    };
};
