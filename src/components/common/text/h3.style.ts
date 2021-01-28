import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface H3StyleSchema extends StyleSheetSchema {
    h3: TextStyle;
    h3Dark: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): H3StyleSchema => {
    return {
        h3: {
            color: colorSchema.pages.text.h3,
            fontFamily: colorSchema.typeFace,
            fontSize: 16,
            fontWeight: '500',
        },
        h3Dark: {
            color: colorSchema.pages.text.paragraph,
        },
    };
};
