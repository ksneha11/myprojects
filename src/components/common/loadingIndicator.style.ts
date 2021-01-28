import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface LoadingIndicatorStyleSchema extends StyleSheetSchema {
    overlay: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): LoadingIndicatorStyleSchema => ({
    overlay: {
        backgroundColor: 'transparent',
    },
    rootContainer: {
        elevation: null,
    },
});
