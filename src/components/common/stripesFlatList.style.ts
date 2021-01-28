import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface StripesFlatListStyleSchema extends StyleSheetSchema {
    leftContent: ViewStyle;
    leftContentText: TextStyle;
    oddRow: ViewStyle;
    rightContent: ViewStyle;
    rightContentText: TextStyle;
    rootContainer: ViewStyle;
    row: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): StripesFlatListStyleSchema => ({
    leftContent: { flex: 1 },
    leftContentText: {},
    oddRow: {
        backgroundColor: colorSchema.table.stripes.backgroundColor,
    },
    rightContent: { flex: 2, alignSelf: 'stretch' },
    rightContentText: {
        textAlign: 'left',
    },
    rootContainer: {},
    row: {
        alignSelf: 'stretch',
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        minHeight: 30,
        paddingBottom: 2,
        paddingHorizontal: 10,
        paddingTop: 8,
    },
});
