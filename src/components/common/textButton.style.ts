import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';
import { TextLinkStyleSchema } from './textLink.style';

export interface TextButtonStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): TextButtonStyleSchema => ({
    rootContainer: {
        flex: 1,
    },
});
