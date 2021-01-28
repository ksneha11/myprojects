import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../../styles';

export interface ContactInfoAddAlternateAddressStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): ContactInfoAddAlternateAddressStyleSchema => {
    return {
        rootContainer: {},
    };
};
