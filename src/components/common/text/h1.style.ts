import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface H1StyleSchema extends StyleSheetSchema {
    h1: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): H1StyleSchema => {
    return {
        h1: {
            color: colorSchema.pages.text.h1,
            fontFamily: colorSchema.typeFace,
            fontSize: 26,
        },
    };
};
