import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface GradientHeaderStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
    shadowContainer: ViewStyle;
    title: TextStyle;
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): GradientHeaderStyleSchema => ({
    rootContainer: {
        flex: 0,
    },
    shadowContainer: {
        backgroundColor: colorSchema.pages.backgroundColor,
        elevation: 3,
        shadowColor: colorSchema.pages.formColors.formField.inputBorders,
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    title: {
        color: colorSchema.pageHeader.title,
        fontSize: 24,
        marginBottom: 10,
        marginHorizontal: 20,
        marginTop: 12,
    },
});
