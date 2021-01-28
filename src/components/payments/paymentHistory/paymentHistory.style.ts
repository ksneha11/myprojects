import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface PaymentHistoryStyleSchema extends StyleSheetSchema {
    historyItemContainer: ViewStyle;
    historyItemDetailsContainer: ViewStyle;
    horizontalRuleNoMargin: ViewStyle;
    leftColumn: ViewStyle;
    rightColumn: ViewStyle;
    rootContainer: ViewStyle;
    subText: TextStyle;
    subTextDark: TextStyle;
    subTextLight: TextStyle;
    titleContainer: ViewStyle;
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): PaymentHistoryStyleSchema => {
    return {
        historyItemContainer: {
            marginVertical: 15,
        },
        historyItemDetailsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        horizontalRuleNoMargin: {
            margin: 0,
        },
        leftColumn: { flex: 4 },
        rightColumn: {
            alignItems: 'center',
            flex: 1,
            marginTop: 5,
        },
        rootContainer: {
            flex: 1,
            marginHorizontal: 20,
            marginTop: 20,
        },
        subText: {
            marginTop: 2,
        },
        subTextDark: {
            color: colorSchema.pages.text.h3,
        },
        subTextLight: {
            color: colorSchema.pages.text.disabled,
            fontWeight: '600',
        },
        titleContainer: {
            marginBottom: 10,
        },
    };
};
