import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ListModalStyleSchema extends StyleSheetSchema {
    contentContainer: ViewStyle;
    footer: ViewStyle;
    footerSafeAreaViewContainer: ViewStyle;
    footerText: TextStyle;
    header: ViewStyle;
    headerCenter: ViewStyle;
    headerCenterText: TextStyle;
    headerLeft: ViewStyle;
    headerLeftRightText: TextStyle;
    headerRight: ViewStyle;
    itemContainer: ViewStyle;
    itemDescription: TextStyle;
    itemMiddleContainer: ViewStyle;
    itemMiddleText: TextStyle;
    items: ViewStyle;
    itemSelectorIcon: TextStyle;
    itemSelectorIconContainer: ViewStyle;
    itemTitleContainer: ViewStyle;
    itemTitleText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ListModalStyleSchema => {
    const borderColor = colorSchema.menus.menuItems.borders;
    const textColor = colorSchema.pages.text.paragraph;

    return {
        contentContainer: {
            backgroundColor: colorSchema.menus.menuItems.backgroundColor,
            height: '50%',
            width: '100%',
        },
        footer: {
            alignItems: 'center',
            backgroundColor: colorSchema.modals.footerColor,
            borderTopColor: borderColor,
            borderTopWidth: 1,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            paddingBottom: 5,
        },
        footerSafeAreaViewContainer: {
            backgroundColor: colorSchema.modals.footerColor,
        },
        footerText: {
            color: colorSchema.pages.formColors.links,
            fontSize: 16,
        },
        header: {
            alignItems: 'center',
            borderBottomColor: '#e4e4e4',
            borderBottomWidth: 1,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            marginHorizontal: 20,
        },
        headerCenter: {
            alignItems: 'center',
            flex: 4,
            justifyContent: 'center',
        },
        headerCenterText: {
            color: textColor,
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 'bold',
        },
        headerLeft: {
            flex: 1,
            justifyContent: 'flex-start',
        },
        headerLeftRightText: {
            alignSelf: 'flex-end',
            fontSize: 16,
        },
        headerRight: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        itemContainer: {
            borderBottomColor: borderColor,
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: '5%',
            marginRight: '5%',
            overflow: 'hidden',
            paddingBottom: 14,
            paddingTop: 14,
            width: '90%',
        },
        itemDescription: {
            marginTop: 9,
        },
        itemMiddleContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingLeft: '5%',
            paddingRight: '5%',
        },
        itemMiddleText: {
            color: colorSchema.pages.text.disclaimerCopy,
            textAlign: 'right',
        },
        itemSelectorIcon: {
            color: colorSchema.pages.formColors.links,
        },
        itemSelectorIconContainer: {
            alignSelf: 'center',
            flex: 1,
            maxWidth: 30,
        },
        itemTitleContainer: {
            flex: 2,
            paddingLeft: '5%',
            paddingRight: '5%',
        },
        itemTitleText: {
            fontSize: 16,
        },
        items: {
            flexGrow: 1,
        },
        rootContainer: {
            backgroundColor: 'rgba(0,0,0,.7)',
            flex: 1,
            justifyContent: 'flex-end',
        },
    };
};
