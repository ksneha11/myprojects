import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface IconStyleSchema extends StyleSheetSchema {
    rootItem: TextStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): IconStyleSchema => ({
    rootItem: {},
});
