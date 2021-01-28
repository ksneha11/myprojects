import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface TagButtonGroupStyleSchema extends StyleSheetSchema {
    allButtons: ViewStyle;
    buttonText: TextStyle;
    horizontalOptionsContainer: ViewStyle;
    icon: TextStyle;
    title: TextStyle;
    verticalOptionsContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): TagButtonGroupStyleSchema => {
    return {
        allButtons: {
            backgroundColor: colorSchema.pages.formColors.filterButtons.active.backgroundColor,
            borderRadius: 10,
            marginVertical: 2,
        },
        /**
         * Because React-Native-Elements has several 'wrappers' in their Button component I have to set the buttonWidth
         * not on buttonStyle but on containerStyle, so I'm separating it out from the normal button styling above.
         */
        buttonDimensions: {
            paddingHorizontal: 2,
            width: 'auto',
        },
        buttonText: {
            color: colorSchema.pages.formColors.filterButtons.active.foregroundColor,
            fontSize: 13,
        },
        horizontalOptionsContainer: {
            alignContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
        },
        icon: {
            color: colorSchema.pages.formColors.filterButtons.active.foregroundColor,
            marginLeft: 8,
        },
        rootContainer: {
            justifyContent: 'center',
            marginVertical: 10,
        },
        title: {
            color: colorSchema.pages.formColors.subHeaders,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 5,
        },
        verticalOptionsContainer: {
            flexDirection: 'column',
        },
    };
};
