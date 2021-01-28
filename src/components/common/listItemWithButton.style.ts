import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ListItemWithButtonStyleSchema extends StyleSheetSchema {
    buttonContainer: ViewStyle;
    buttonLabel: TextStyle;
    subText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ListItemWithButtonStyleSchema => ({
    buttonContainer: {
        width: 100,
    },
    buttonLabel: {
        fontWeight: '600',
    },
    subText: {
        fontSize: 14,
        marginTop: 10,
    },
});
