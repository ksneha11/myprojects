import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ContactInfoTextNumbersStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): ContactInfoTextNumbersStyleSchema => {
    return {
        rootContainer: {},
    };
};
