import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface DropDownStyleSchema extends StyleSheetSchema {
    dropdownIcon: TextStyle;
    dropDownPicker: ViewStyle;
    dropDownText: TextStyle;
    iosDropDownContainer: ViewStyle;
    pickerAndroid: ViewStyle;
    pickerIOS: ViewStyle;
    rightIcon: TextStyle;
    rightIconContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): DropDownStyleSchema => {
    return {
        contentContainer: {
            backgroundColor: colorSchema.menus.menuItems.backgroundColor,
            height: '50%',
            width: '100%',
        },
        dropDownPicker: {},
        dropDownText: {
            color: colorSchema.pages.text.paragraph,
            fontFamily: colorSchema.typeFaceParagraph,
            fontSize: 14,
        },
        dropdownIcon: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontSize: 20,
            paddingEnd: 12,
        },
        iosDropDownContainer: {
            alignItems: 'center',
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 10,
            borderWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            height: 50,
            justifyContent: 'space-between',
            marginRight: 20,
            paddingHorizontal: 10,
            paddingLeft: 16,
            position: 'relative',
            width: '100%',
        },
        pickerAndroid: {
            borderColor: colorSchema.pages.formColors.formField.inputBorders,
            borderRadius: 10,
            borderStyle: 'solid',
            borderWidth: 1,
            flex: 1,
            flexGrow: 1,
            height: 50,
            marginVertical: 0,
            paddingHorizontal: 10,
            width: '100%',
        },
        pickerIOS: { width: '100%', height: '110%' },

        rightIcon: {
            color: colorSchema.pages.formColors.formField.inputIcons,
            fontSize: 20,
            height: 50,
            lineHeight: 50,
            paddingHorizontal: 14,
        },
        rightIconContainer: {
            bottom: 1,
            position: 'absolute',
            right: 0,
            top: 1,
        },
        rightIconContainerWithBorder: {
            borderLeftColor: colorSchema.pages.formColors.formField.inputBorders,
            borderLeftWidth: 1,
        },
        rightIconDisabled: {
            color: colorSchema.pages.formColors.formField.inputBorders,
            fontSize: 20,
            height: 47,
            lineHeight: 47,
            paddingHorizontal: 14,
        },
        rootContainer: {
            backgroundColor: 'rgba(0,0,0,.7)',
            flex: 1,
            justifyContent: 'flex-end',
        },
    };
};
