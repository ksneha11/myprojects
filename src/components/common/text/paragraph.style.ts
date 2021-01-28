import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ParagraphStyleSchema extends StyleSheetSchema {
    paragraph: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ParagraphStyleSchema => {
    return {
        paragraph: {
            color: colorSchema.pages.text.paragraph,
            fontFamily: colorSchema.typeFace,
            fontSize: 16,
        },
    };
};
