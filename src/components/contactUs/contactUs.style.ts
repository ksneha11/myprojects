import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ContactUsStyleSchema extends StyleSheetSchema {
    address: ViewStyle;
    rootContainer: ViewStyle;
    sectionHeader: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): ContactUsStyleSchema => {
    return {
        address: {
            marginTop: null,
        },
        rootContainer: {
            marginBottom: 30,
            marginHorizontal: colorSchema.pages.layout.paddingHorizontal,
            marginTop: 30,
        },
        sectionHeader: {
            marginTop: 20,
        },
    };
};
