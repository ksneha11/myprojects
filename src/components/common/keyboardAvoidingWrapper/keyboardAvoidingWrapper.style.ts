import { StyleSheet, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface KeyboardAvoidingWrapperStyleSchema extends StyleSheetSchema {
    wrapperContainer: ViewStyle
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): KeyboardAvoidingWrapperStyleSchema => ({
    wrapperContainer: {
        ...StyleSheet.absoluteFillObject
    },
});