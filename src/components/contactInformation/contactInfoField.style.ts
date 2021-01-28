import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ContactInfoFieldStyleSchema extends StyleSheetSchema {
    addContainer: ViewStyle;
    addTextLink: TextStyle;
    field: ViewStyle;
    iconLeft: TextStyle;
    iconRight: TextStyle;
    menuItemRootContainer: ViewStyle;
    menuItemTextContainer: ViewStyle;
    menuItemTitleContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): ContactInfoFieldStyleSchema => ({
    addContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    addTextLink: {
        flex: 0,
        flexShrink: 1,
        textDecorationLine: 'underline',
    },
    field: {
        marginTop: null,
    },
    iconLeft: {
        paddingRight: 10,
    },
    iconRight: {
        color: colorSchema.pages.formColors.links,
    },
    menuItemRootContainer: {
        flex: 1,
        marginTop: 20,
    },
    menuItemTextContainer: {
        justifyContent: 'flex-start',
    },
    menuItemTitleContainer: {
        alignItems: 'flex-start',
    },
    rootContainer: {
        flex: 1,
    },
});
