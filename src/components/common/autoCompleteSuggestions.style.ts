import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface AutoCompleteSuggestionsStyleSchema extends StyleSheetSchema {
    androidContainer: ViewStyle;
    itemContainer: ViewStyle;
    itemList: ViewStyle;
    itemText: TextStyle;
    rootContainer: ViewStyle;
    rootContainerHidden: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): AutoCompleteSuggestionsStyleSchema => ({
    androidContainer: {
        height: 200,
    },
    iosContainer: {
        backgroundColor: colorSchema.pages.backgroundColor,
        height: 'auto',
        position: 'absolute',
        top: 36,
        width: '100%',
        zIndex: 10,
    },
    iosFullScreenContainer: {
        height: 'auto',
        marginTop: 5,
        width: '100%',
        zIndex: 10,
    },
    itemContainer: {
        borderBottomColor: colorSchema.pages.formColors.formField.inputBorders,
        borderBottomWidth: 1,
    },
    itemList: {
        height: 100,
    },
    itemText: {
        alignSelf: 'center',
        fontSize: 14,
        padding: 16,
        width: '100%',
    },
    rootContainer: {
        backgroundColor: colorSchema.pages.backgroundColor,
        flex: 1,
        width: '100%',
    },
    rootContainerHidden: {
        height: 0,
    },
});
