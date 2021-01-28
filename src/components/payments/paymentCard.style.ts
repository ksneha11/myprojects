import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface PaymentCardStyleSchema extends StyleSheetSchema {
    expiredText: TextStyle;
    noPaymentMethodFooter: ViewStyle;
    noPaymentMethodIcon: TextStyle;
}

export default ({}: StyleSchemaParams): PaymentCardStyleSchema => {
    return {
        expiredText: {},
        noPaymentMethodFooter: {
            marginTop: null,
        },
        noPaymentMethodIcon: {
            paddingBottom: 10,
        },
    };
};
