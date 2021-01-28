import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ExpandableDropdownStyleSchema extends StyleSheetSchema {
    dropDownPicker: ViewStyle;
    expandedStyles: ViewStyle;
    horizontalRule: ViewStyle;
    iconRight: TextStyle;
    item: TextStyle;
    listItemContainer: ViewStyle;
    listRootContainer: ViewStyle;
    rootContainer: ViewStyle;
    selectedItem: ViewStyle;
    text: TextStyle;
    textField: ViewStyle;
    textFieldStyleHasFocus: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): ExpandableDropdownStyleSchema => ({
    dropDownPicker: {
        borderWidth: 0.5,
        flexDirection: 'row',
    },
    expandedStyles: {
        borderColor: colorSchema.pages.formColors.formField.inputBordersFocused,
    },
    horizontalRule: {
        borderBottomWidth: 1,
        marginVertical: null,
    },
    iconRight: {
        color: colorSchema.pages.text.paragraph,
        fontSize: 16,
        paddingEnd: 10,
        paddingStart: 10,
    },
    item: {
        color: colorSchema.pages.text.paragraph,
        marginStart: 5,
        marginTop: null,
        marginVertical: 5,
    },
    listItemContainer: {
        paddingEnd: 30,
        paddingStart: 10,
    },
    listRootContainer: {
        borderTopWidth: 0,
        borderWidth: 1,
        height: 230,
    },
    rootContainer: {},
    selectedItem: {
        backgroundColor: colorSchema.pages.formColors.formField.selectedBackground,
    },
    text: {
        flex: 1,
        marginTop: null,
    },
    textField: {
        alignItems: 'center',
        borderColor: colorSchema.pages.formColors.formField.inputBorders,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingStart: 10,
        paddingVertical: (38 - colorSchema.pages.layout.lineHeight) / 2
    },
    textFieldStyleHasFocus: {
        borderColor: colorSchema.pages.formColors.formField.inputBordersFocused,
    },
});
