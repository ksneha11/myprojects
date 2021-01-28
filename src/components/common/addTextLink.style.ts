import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface AddTextLinkStyleSchema extends StyleSheetSchema {
    addTextLink: TextStyle
    iconLeft: TextStyle
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): AddTextLinkStyleSchema => ({
    addTextLink: {
        fontSize: 16
    },
    iconLeft: {
        color: colorSchema.pages.formColors.links,
        fontSize: colorSchema.iconSizes.medium,
        marginRight: 10,
        paddingTop: 4,
    },
    rootContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 30,
    }
});
