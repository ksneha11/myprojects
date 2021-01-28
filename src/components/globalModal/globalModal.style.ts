import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface GlobalModalStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): GlobalModalStyleSchema => {
    return {
        rootContainer: {},
    };
};
