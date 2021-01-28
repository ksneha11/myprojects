import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ListExpandableStyleSchema extends StyleSheetSchema {
    itemContentContainer: ViewStyle;
    itemRootContainer: ViewStyle;
    itemToggleContainer: ViewStyle;
    itemToggleIcon: TextStyle;
    itemToggleTouchable: ViewStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ListExpandableStyleSchema => ({
    itemContentContainer: {
        flex: 1,
        padding: 20,
        paddingLeft: 0,
    },
    itemRootContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    itemToggleContainer: {
        flex: 0,
        paddingTop: 2,
    },
    itemToggleIcon: {
        color: colorSchema.list.expandIcon,
    },
    itemToggleTouchable: {
        flex: 1,
        padding: 20,
    },
    rootContainer: {
        borderTopColor: colorSchema.pages.formColors.horizontalSeparators,
        borderTopWidth: 1,
        flex: 1,
    },
});
