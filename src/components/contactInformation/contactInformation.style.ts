import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ContactInformationStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
    titleContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): ContactInformationStyleSchema => {
    return {
        rootContainer: {
            flex: 1,
            flexGrow: 1,
        },
        titleContainer: {
            marginBottom: 20,
            marginTop: 25,
            paddingHorizontal: 20,
        },
    };
};
