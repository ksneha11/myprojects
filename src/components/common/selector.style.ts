import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface SelectorStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SelectorStyleSchema => {
    const linkColor = colorSchema.pages.formColors.actionButtons.backgroundColor;

    return {
        activeButton: {
            backgroundColor: linkColor,
            borderColor: colorSchema.pages.formColors.links,
            borderWidth: 1,
        },
        activeButtonLabel: {
            color: colorSchema.menus.menuItems.backgroundColor,
            fontWeight: '700',
            justifyContent: 'center',
        },
        buttonContainer: {
            flex: 1,
        },
        buttonText: {
            fontSize: 12,
        },
        inactiveButton: {
            backgroundColor: colorSchema.pages.formColors.toggleable.inactive.backgroundColor,
            borderColor: colorSchema.pages.formColors.links,
            borderWidth: 1,
        },
        inactiveButtonLabel: {
            color: colorSchema.pages.formColors.links,
            fontWeight: '700',
            justifyContent: 'center',
        },
        leftButton: {
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 0,
            marginLeft: 15,
        },
        rightButton: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 18,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 18,
            marginLeft: -1,
            marginRight: 15,
        },
        rootContainer: {
            flex: 1,
        },
    };
};
