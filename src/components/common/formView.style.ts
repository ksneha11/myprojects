import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface FormViewStyleSchema extends StyleSheetSchema {
    buttonContainer: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): FormViewStyleSchema => ({
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        width: '100%',
    },
    rootContainer: {
        flex: 1,
    },
});
