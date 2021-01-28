import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface RadioMenuItemStyleSchema extends StyleSheetSchema {
    optionContainer: ViewStyle;
    optionText: TextStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): RadioMenuItemStyleSchema => ({
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionText: {
        marginVertical: 20,
    },
});
