import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface FlatCardStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default (): FlatCardStyleSchema => {
    return {
        contentContainer: {
            paddingVertical: 20,
        },
        rootContainer: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            marginBottom: 0,
            marginTop: 0,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
    };
};
