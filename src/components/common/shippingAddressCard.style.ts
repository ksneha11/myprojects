import { Text, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams } from '../../styles';
import { CardStyleSchema } from './card.style';

export interface ShippingAddressStyleSchema extends Partial<CardStyleSchema> {
    contentContainer: ViewStyle;
}

export default ({}: StyleSchemaParams): ShippingAddressStyleSchema => {
    return {
        contentContainer: {
            marginBottom: -20,
        },
    };
};
