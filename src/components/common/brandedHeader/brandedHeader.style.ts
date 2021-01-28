import { ImageStyle, Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface BrandedHeaderStyleSchema extends StyleSheetSchema {
    brandedImage: ImageStyle;
    contentContainer: ViewStyle;
    profileIcon: ViewStyle;
    profileIconText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): BrandedHeaderStyleSchema => {
    return {
        brandedImage: {
            height: 35,
            marginStart: 20,
            width: 130,
        },
        contentContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
            marginTop: 12,
        },
        profileIcon: {
            alignItems: 'center',
            backgroundColor: colorSchema.pages.formColors.actionButtons.backgroundColor,
            borderRadius: 15,
            height: 30,
            justifyContent: 'center',
            marginEnd: 20,
            width: 30,
        },
        profileIconText: {
            color: colorSchema.pages.formColors.actionButtons.foregroundColor,
            fontSize: 16,
            marginLeft: Platform.select({ android: null, ios: 1 }),
            marginTop: Platform.select({ android: null, ios: 1 }),
        },
        rootContainer: {
            backgroundColor: colorSchema.pages.backgroundColor,
            elevation: 4,
            shadowColor: colorSchema.pages.formColors.formField.inputBorders,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
        },
    };
};
