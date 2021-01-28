import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface PageTitleStyleSchema extends StyleSheetSchema {
    pageTitleText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): PageTitleStyleSchema => {
    return {
        pageTitleText: {
            color: colorSchema.pages.formColors.sectionHeaders,
            fontSize: 26,
        },
        rootContainer: {
            marginBottom: 8,
            marginStart: 20,
            marginTop: 30,
        },
    };
};
