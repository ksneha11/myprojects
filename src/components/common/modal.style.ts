import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ModalStyleSchema extends StyleSheetSchema {
    backdrop: ViewStyle;
    contentContainer: ViewStyle;
    rootContainer: ViewStyle;
    rootContainerFixedBottom: ViewStyle;
    titleContainer: ViewStyle;
    titleText: TextStyle;
}

export default ({ colorSchema, hairlineWidth }: StyleSchemaParams): ModalStyleSchema => {
    return {
        backdrop: {
            backgroundColor: colorSchema.modals.backdrop,
        },
        contentContainer: {},
        dropdownDoneButton: {
            color: colorSchema.dropDown.iOS.header.textColor,
            fontSize: 17,
            paddingHorizontal: 15,
            paddingVertical: 12,
        },
        dropdownHeaderContainer: {
            backgroundColor: colorSchema.dropDown.iOS.header.backgroundColor,
            borderBottomColor: colorSchema.dropDown.iOS.header.borderColor,
            borderBottomWidth: hairlineWidth,
            borderTopColor: colorSchema.dropDown.iOS.header.borderColor,
            borderTopWidth: hairlineWidth,
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
        },
        rootContainer: {
            borderRadius: 10,
            height: 'auto',
            padding: 20,
            width: 'auto',
        },
        rootContainerFixedBottom: {
            bottom: 0,
            height: 'auto',
            left: 0,
            padding: 0,
            position: 'absolute',
            right: 0,
            width: '100%',
        },
        titleContainer: {
            backgroundColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
            paddingVertical: 14,
        },
        titleText: {
            color: colorSchema.pages.formColors.actionButtons.foregroundColor,
            fontSize: 16,
            textAlign: 'center',
        },
    };
};
