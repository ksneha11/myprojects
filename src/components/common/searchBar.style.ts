import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface SearchBarStyleSchema extends StyleSheetSchema {
    actions: TextStyle;
    androidSearchField: ViewStyle;
    clearInputIcon: TextStyle;
    clearInputIconButton: ViewStyle;
    dropDownArea: ViewStyle;
    leftIconPosition: ViewStyle;
    rightIconButton: ViewStyle;
    rightIconContainer: ViewStyle;
    rootContainer: ViewStyle;
    rowContainer: ViewStyle;
    rowText: TextStyle;
    searchField: ViewStyle;
    searchIcon: TextStyle;
    searchIconButton: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SearchBarStyleSchema => {
    const searchBarHeight = 36;
    return {
        actions: {
            color: colorSchema.pages.formColors.links,
            fontSize: 16,
            fontWeight: '500',
            minWidth: 60,
            paddingLeft: 27,
        },
        androidSearchField: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 20,
            borderWidth: 1,
            flex: 1,
            height: searchBarHeight + 5,
            paddingLeft: 16,
            paddingRight: 32,
            width: '100%',
        },
        clearInputIcon: {
            color: colorSchema.modals.backdrop,
            fontSize: 16,
        },
        clearInputIconButton: {
            paddingHorizontal: 11,
            paddingVertical: 10,
        },
        dropDownArea: {
            backgroundColor: colorSchema.menus.menuItems.backgroundColor,
            height: 'auto',
            position: 'absolute',
            top: searchBarHeight,
            width: '100%',
            zIndex: 10,
        },
        dropDownList: {
            height: 100,
        },
        fullScreenContainer: {
            flex: 1,
        },
        inputContainer: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 3,
            height: searchBarHeight,
            justifyContent: 'center',
        },
        leftIconPosition: {
            left: 8,
            position: 'absolute',
        },
        rightIconButton: {
            height: 36,
            width: 40,
        },
        rightIconContainer: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
        rootContainer: {
            flexDirection: 'row',
            overflow: 'visible',
            width: '100%',
        },
        rowContainer: {
            borderBottomColor: colorSchema.pages.formColors.formField.inputBorders,
            borderBottomWidth: 1,
        },
        rowText: {
            alignSelf: 'center',
            fontSize: 14,
            padding: 16,
            width: '100%',
        },
        searchCancelButton: {
            height: searchBarHeight,
            lineHeight: searchBarHeight,
            paddingLeft: 25,
        },
        searchField: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 20,
            borderWidth: 1,
            flex: 1,
            flexGrow: 1,
            height: searchBarHeight,
            paddingLeft: 16,
            paddingRight: 32,
            width: '100%',
        },
        searchIcon: {
            color: colorSchema.pages.formColors.formField.inputIcons,
            fontSize: 20,
        },
        searchIconButton: {
            paddingHorizontal: 8,
            paddingVertical: 8,
        },
    };
};
