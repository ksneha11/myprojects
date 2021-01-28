import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ExpressRefillCheckoutSchema extends StyleSheetSchema {
    checkBox: ViewStyle;
    checkBoxContainer: ViewStyle;
    checkoutContainer: ViewStyle;
    disclaimerTextContainer: ViewStyle;
    flatListFooter: ViewStyle;
    horizontalRuleContainer: TextStyle;
    rootContainer: ViewStyle;
    rootView: ViewStyle;
    selectDefaultTitleContainer: TextStyle;
    statusText: TextStyle;
    subText: TextStyle;
    subTitleContainer: ViewStyle;
    title: ViewStyle;
    titleView: ViewStyle;
    toggleSwitch: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ExpressRefillCheckoutSchema => {
    return {
        checkBox: {
            flex: null,
            flexDirection: null,
            marginStart: 10,
        },
        checkBoxContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5,
        },
        checkoutContainer: {
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
        },
        disclaimerTextContainer: {
            marginTop: 10,
        },
        flatListFooter: {
            paddingBottom: 80,
        },
        horizontalRuleContainer: {
            marginBottom: 18,
            marginTop: 16,
        },
        rootContainer: {
            marginHorizontal: 20,
        },
        rootView: {
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        selectDefaultTitleContainer: {
            marginRight: 10,
            marginTop: 8,
        },
        statusText: {
            alignSelf: 'flex-start',
        },
        subText: {
            color: colorSchema.pages.text.paragraph,
            marginLeft: 4,
            marginTop: 2,
        },
        subTitleContainer: {
            flexDirection: 'row',
            marginTop: 8,
        },
        title: {
            marginTop: 22,
        },
        titleView: {
            width: '90%',
        },
        toggleSwitch: {
            alignSelf: 'flex-end',
            flexDirection: 'row',
            marginRight: 8,
            marginTop: 26,
        },
    };
};
