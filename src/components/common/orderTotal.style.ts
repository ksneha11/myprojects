import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface OrderTotalStyleSchema extends StyleSheetSchema {
    dataFormat: TextStyle;
    disclaimerText: TextStyle;
    flatListLeftContent: ViewStyle;
    flatListRighContent: ViewStyle;
    horizontalRuleContainer: ViewStyle;
    orderInfo: TextStyle;
    orderInfoContainer: ViewStyle;
    orderRow: ViewStyle;
    orderTotal: TextStyle;
    pharmacyBalance: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): OrderTotalStyleSchema => ({
    dataFormat: {
        fontSize: 14,
    },
    disclaimerText: {
        fontStyle: 'italic'
    },
    flatListLeftContent: {
        alignItems: 'flex-start',
    },
    flatListRighContent: {
        alignItems: 'flex-end',
    },
    horizontalRuleContainer: {
        marginHorizontal: 10,
        marginVertical: 15,
    },
    orderInfo: {
        fontWeight: '500',
    },
    orderInfoContainer: {
        marginBottom: 25,
        marginStart: 10,
        marginTop: 10,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    orderTotal: {
        fontWeight: '700',
    },
    pharmacyBalance: {
        fontSize: 14,
        fontWeight: '500',
    },
    rootContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 15,
    },
});
