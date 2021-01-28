import { Dimensions, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface BottomDrawerStyle extends StyleSheetSchema {
    contentContainer: ViewStyle;
    modalBackdrop: ViewStyle;
    modalContainer: ViewStyle;
    modalHeader: ViewStyle;
    modalHook: ViewStyle;
    rootContainer: ViewStyle;
    shadows: ViewStyle;
}

export default ({ colorSchema, windowWidth }: StyleSchemaParams): BottomDrawerStyle => {
    return {
        contentContainer: {
            marginBottom: colorSchema.bottomNavigation.height,
            width: windowWidth,
        },
        fullScreen: {
            height: Dimensions.get('window').height,
        },
        modalBackdrop: {
            backgroundColor: colorSchema.modals.backdrop,
        },
        modalContainer: {
            backgroundColor: 'transparent',
            borderRadius: 8,
            bottom: 0,
            width: '100%',
        },
        modalHeader: {
            alignItems: 'center',
            flex: 0,
            flexShrink: 1,
            justifyContent: 'center',
            paddingTop: 15,
            paddingBottom: 20,
        },
        modalHook: {
            borderBottomWidth: 4,
            width: 100,
        },
        rootContainer: {
            backgroundColor: colorSchema.menus.menuItems.backgroundColor,
            borderBottomWidth: 0,
            borderColor: colorSchema.menus.menuItems.borders,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderWidth: 1,
            flex: 1,
            height: '100%',
            justifyContent: 'flex-end',
        },
        shadows: {
            ...colorSchema.shadow,
            elevation: 10,
            shadowOffset: { width: 0, height: -4 },
        },
    };
};
