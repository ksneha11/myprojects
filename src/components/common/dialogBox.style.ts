import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface DialogBoxStyleSchema extends StyleSheetSchema {
    alternateButtonContainer: ViewStyle;
    alternateButtonText: TextStyle;
    primaryButtonContainer: ViewStyle;
    primaryButtonText: TextStyle;
    titleContainer: ViewStyle;
    titleText: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): DialogBoxStyleSchema => {
    return {
        alternateButtonContainer: {
            alignSelf: 'flex-end',
            marginTop: 20,
        },
        alternateButtonText: {
            fontWeight: '500',
        },
        primaryButtonContainer: {
            alignSelf: 'flex-end',
            marginTop: 20,
        },
        primaryButtonText: {
            fontWeight: '500',
        },
        titleContainer: {},
        titleText: {},
    };
};
