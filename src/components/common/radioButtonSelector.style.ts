import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface RadioButtonSelectorStyleSchema extends StyleSheetSchema {
    actionContainer: ViewStyle;
    actionText: TextStyle;
    contentContainer: ViewStyle;
    defaultText: TextStyle;
    hasNoRadioButtonTextContainer: ViewStyle;
    hasRadioButtontextContainer: ViewStyle;
    iconStyle: TextStyle;
    radioButtonContainer: ViewStyle;
    rootContainer: ViewStyle;
    selectedContainerColor: ViewStyle;
    subContentContainer: ViewStyle;
    text: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): RadioButtonSelectorStyleSchema => {
    const textColor = colorSchema.pages.formColors.paragraphs;
    const linkColor = colorSchema.pages.formColors.actionButtons.backgroundColor;

    return {
        actionContainer: {
            paddingRight: 6,
        },
        actionText: {
            color: linkColor,
            fontSize: 16,
            fontWeight: '500',
        },
        contentContainer: {
            alignItems: 'flex-start',
            flexDirection: 'row',
            padding: 10,
            paddingTop: 15,
        },
        defaultText: {
            color: colorSchema.pages.text.h1,
            fontSize: 14,
            fontStyle: 'italic',
            marginTop: 10,
        },
        expiredText: {
            color: colorSchema.pages.formColors.validation.invalid,
        },
        hasNoRadioButtonTextContainer: {
            marginStart: 10,
        },
        hasRadioButtontextContainer: {
            marginStart: 20,
        },
        iconStyle: {
            color: linkColor,
        },
        radioButtonContainer: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 5,
            marginTop: 10,
            width: 20,
        },

        rootContainer: {
            backgroundColor: colorSchema.pages.formColors.actionButtons.foregroundColor,
            borderColor: colorSchema.menus.menuItems.borders,
            borderRadius: 5,
            borderWidth: StyleSheet.hairlineWidth,
            elevation: 1,
            flex: 1,
            flexDirection: 'row',
            height: 100,
            justifyContent: 'space-between',
            marginBottom: 14,
            marginTop: 6,
            shadowColor: colorSchema.pages.formColors.formField.inputBorders,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
        },
        selectedContainerColor: {
            backgroundColor: colorSchema.pages.formColors.cards.backgroundColor,
        },
        subContentContainer: {
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 12,
        },
        text: {
            color: textColor,
            fontSize: 16,
        },
    };
};
