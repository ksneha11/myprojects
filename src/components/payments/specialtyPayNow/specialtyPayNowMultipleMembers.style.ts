import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface SpecialtyPayNowMultipleMembersStyleSchema extends StyleSheetSchema {
    automaticContainer: ViewStyle;
    automaticContentSpace: ViewStyle;
    contentContainer: ViewStyle;
    enrollmentText: TextStyle;
    horizontalRule: ViewStyle;
    icon: TextStyle;
    iconContainer: ViewStyle;
    infoButton: TextStyle;
    linkText: TextStyle;
    memberContainer: ViewStyle;
    paymentActivityContainer: ViewStyle;
    paymentContainer: ViewStyle;
    paymentContentContainer: ViewStyle;
    paymentsContent: TextStyle;
    paymentsTitle: TextStyle;
    payNowContainer: ViewStyle;
    payNowText: TextStyle;
    rootContainer: ViewStyle;
    totalBalanceContainer: ViewStyle;
    totalBalanceValue: TextStyle;
    totalBalanceValueContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): SpecialtyPayNowMultipleMembersStyleSchema => {
    const linkColor = colorSchema.pages.formColors.actionButtons.backgroundColor;

    return {
        automaticContainer: {
            marginTop: 10,
        },
        automaticContentSpace: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        contentContainer: {
            marginBottom: 13,
        },
        enrollmentText: {
            color: colorSchema.modals.backdrop,
            marginRight: 13,
            marginTop: 5,
        },
        horizontalRule: {
            borderBottomWidth: 1,
            marginVertical: null,
        },
        icon: {
            color: colorSchema.menus.menuItems.navigationIcons,
            height: 14,
            width: 14,
        },
        iconContainer: {
            left: 5,
            top: 5,
        },
        infoButton: {
            color: linkColor,
            marginStart: 10,
        },
        linkText: {
            color: colorSchema.pages.formColors.links,
            marginTop: 3,
            textDecorationLine: 'underline',
        },
        memberContainer: {
            marginTop: 30,
        },
        payNowContainer: {
            alignItems: 'flex-end',
            bottom: 3,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        payNowText: {
            color: colorSchema.pages.formColors.links,
            top: 5,
        },
        paymentActivityContainer: {
            flexDirection: 'row',
            marginTop: 25,
        },
        paymentContainer: {
            marginBottom: 15,
            marginTop: 35,
        },
        paymentContentContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        paymentsContent: {
            marginTop: 5,
        },
        paymentsTitle: {},
        rootContainer: {
            marginHorizontal: 20,
        },
        totalBalanceContainer: {
            justifyContent: 'center',
            marginTop: 10,
        },
        totalBalanceValue: {},
        totalBalanceValueContainer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
    };
};
