import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface CheckoutSectionStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    checkoutInfoItem: TextStyle;
    checkoutInfoSection: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): CheckoutSectionStyleSchema => ({
    button: {
        paddingHorizontal: 20,
    },
    checkoutInfoItem: {
        fontSize: 14,
    },
    checkoutInfoSection: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    rootContainer: {
        backgroundColor: colorSchema.modals.footerColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
