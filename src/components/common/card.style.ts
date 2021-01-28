import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CardStyleSchema extends StyleSheetSchema {
    actionContainer: ViewStyle;
    actionText: TextStyle;
    alertContainer: ViewStyle;
    contentContainer: ViewStyle;
    footerContainer: ViewStyle;
    iconStyle: TextStyle;
    infoStyle: ViewStyle;
    leftElement: ViewStyle;
    leftIcon: TextStyle;
    leftImage: ImageStyle;
    rightIcon: TextStyle;
    rootContainer: ViewStyle;
    subContent: ViewStyle;
    text: TextStyle;
    textContainer: ViewStyle;
    title: TextStyle;
    warningStyle: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): CardStyleSchema => {
    const textColor = colorSchema.pages.formColors.paragraphs;
    const linkColor = colorSchema.pages.formColors.actionButtons.backgroundColor;
    const white = colorSchema.menus.menuItems.backgroundColor;

    return {
        actionContainer: {
            paddingRight: 6,
        },
        actionText: {
            color: linkColor,
            fontSize: 16,
        },
        alertContainer: {
            marginTop: -7,
        },
        contentContainer: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            padding: 10,
            paddingTop: 15,
        },
        footerContainer: {
            alignItems: 'center',
            backgroundColor: white,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderColor: colorSchema.menus.menuItems.borders,
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
            height: 45,
            justifyContent: 'flex-end',
            marginTop: 15,
            paddingEnd: 20,
        },
        iconStyle: {
            color: linkColor,
        },
        infoStyle: {
            borderColor: colorSchema.alerts.infoIcons,
            borderWidth: 1,
        },
        leftElement: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginEnd: 20,
            marginTop: 10,
            width: 20,
        },
        leftIcon: {
            color: colorSchema.pages.formColors.actionIcons,
            fontSize: 25,
            paddingBottom: 15,
            paddingLeft: 10,
            paddingRight: 20,
            paddingTop: 3,
        },
        leftImage: {
            height: 32,
            marginBottom: 15,
            marginLeft: 10,
            marginRight: 20,
            marginTop: 3,
            width: 32,
        },
        rightIcon: {
            alignSelf: 'center',
            color: colorSchema.menus.menuItems.navigationIcons,
            fontSize: 26, // This is a unique icon size that would have to be overridden at the app level regardless
            marginStart: 20,
        },
        rootContainer: {
            backgroundColor: colorSchema.pages.formColors.cards.backgroundColor,
            borderColor: colorSchema.menus.menuItems.borders,
            borderRadius: 5,
            borderWidth: StyleSheet.hairlineWidth,
            elevation: 1,
            justifyContent: 'space-between',
            marginBottom: 14,
            marginTop: 6,
            shadowColor: colorSchema.pages.formColors.formField.inputBorders,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
        },
        subContent: {
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 12,
        },
        text: {
            color: textColor,
            fontSize: 14,
        },
        textContainer: {
            flex: 1,
        },
        title: {
            color: textColor,
            fontSize: 20,
            fontWeight: '500',
            marginBottom: 2,
        },
        warningStyle: {
            borderColor: colorSchema.alerts.warningIcons,
            borderWidth: 1,
        },
    };
};
