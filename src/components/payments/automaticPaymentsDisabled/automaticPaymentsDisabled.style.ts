import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface AutomaticPaymentsDisabledStyleSchema extends StyleSheetSchema {
    discliamerContainer: ViewStyle;
    enrollmentStatusContainer: ViewStyle;
    footerContainer: ViewStyle;
    headerContainer: ViewStyle;
    horizontalRuleNoMargin: ViewStyle;
    iconRight: TextStyle;
    memberInfoContainer: ViewStyle;
    rootContainer: ViewStyle;
    setUpAdditionalMembersContainer: ViewStyle;
}

export default ({
    colorSchema,
    windowWidth,
    hairlineWidth,
}: StyleSchemaParams): AutomaticPaymentsDisabledStyleSchema => {
    return {
        discliamerContainer: {
            marginTop: 10,
        },
        enrollmentStatusContainer: {
            flexDirection: 'row',
            marginBottom: 25,
            marginTop: 10,
        },
        footerContainer: {
            marginTop: 40,
        },
        headerContainer: {
            marginTop: 30,
        },
        horizontalRuleNoMargin: {
            margin: 0,
        },
        iconRight: {
            color: colorSchema.menus.menuItems.navigationIcons,
            marginRight: 5,
        },
        memberInfoContainer: {
            marginTop: 30,
        },
        rootContainer: {
            marginHorizontal: 20,
        },
        setUpAdditionaMembersTextContainer: {
            flex: 19,
            marginRight: 10,
        },
        setUpAdditionalMembersContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
        },
        setUpContainer: {
            marginLeft: 10,
        },
    };
};
