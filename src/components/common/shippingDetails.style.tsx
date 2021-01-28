import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ShippingDetailsStyleSchema extends StyleSheetSchema {
    shippingDetailsHeader: TextStyle;
    shippingLabel: TextStyle;
    shippingState: TextStyle;
    trackShipment: TextStyle;
}

export default ({}: StyleSchemaParams): ShippingDetailsStyleSchema => {
    return {
        shippingDetailsHeader: {
            marginHorizontal: 0,
            paddingBottom: 20,
            paddingTop: 30,
        },
        shippingLabel: {},
        shippingState: {
            marginTop: 0,
        },
        trackShipment: {
            marginTop: 0,
        },
    };
};
