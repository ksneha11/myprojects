import { TextStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface BodyCopyStyleSchema extends StyleSheetSchema {
    bodyCopy: TextStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): BodyCopyStyleSchema => ({
    accessibilityField: {
        flex: 1,
    },
    bodyCopy: {
        color: colorSchema.pages.text.paragraph,
        flex: 0,
        flexShrink: 1,
        fontFamily: colorSchema.typeFaceParagraph,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },
});
