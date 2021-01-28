import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface MenuItemStyleSchema extends StyleSheetSchema {
    iconLeft: TextStyle;
    iconRight: TextStyle;
    rootContainer: ViewStyle;
    subtext: TextStyle;
    textContainer: ViewStyle;
    title: TextStyle;
    titleContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): MenuItemStyleSchema => {
    return {
        // TODO: these styles aren't going to be right
        iconLeft: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontSize: 30,
        },
        iconRight: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontSize: 16,
        },
        rootContainer: {
            borderBottomWidth: 0,
            height: 35,
            justifyContent: 'center',
            marginHorizontal: 20,
            paddingBottom: 0,
        },
        safeAreaViewWrapper: {
            flex: 1,
        },
        subtext: {
            color: colorSchema.pages.text.paragraph,
            fontFamily: colorSchema.typeFaceParagraph,
            fontSize: 12,
            lineHeight: 16,
            marginTop: 5,
        },
        textContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '90%',
        },
        title: {},
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
        },
    };
};
