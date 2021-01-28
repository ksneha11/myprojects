import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface MoreMenuStyleSchema extends StyleSheetSchema {
    appVersionContainer: ViewStyle;
    appVersionText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): MoreMenuStyleSchema => ({
    appVersionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: null,
        paddingTop: null,
        paddingVertical: 10,
    },
    appVersionText: {
        fontFamily: colorSchema.typeFaceParagraph,
    },
    rootContainer: {
        flex: 1,
    },
});
