import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface GradientAdvertisementStyleSchema extends StyleSheetSchema {
    button: ViewStyle;
    buttonText: TextStyle;
    contentText: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema }: StyleSchemaParams): GradientAdvertisementStyleSchema => {
    return {
        button: {
            backgroundColor: 'transparent',
            borderColor: colorSchema.menus.menuItems.backgroundColor,
            borderStyle: 'solid',
            borderWidth: 1,
            height: 35,
            marginBottom: 30,
            marginHorizontal: 12,
            width: '34%',
        },
        buttonText: {
            fontSize: 14,
            fontWeight: '600',
        },
        contentText: {
            color: colorSchema.menus.menuItems.backgroundColor,
            fontFamily: colorSchema.typeFaceTitle,
            fontSize: 24,
            fontWeight: '700',
            marginBottom: 20,
            marginHorizontal: 12,
            marginTop: 10,
        },
        rootContainer: {
            borderColor: colorSchema.menus.menuItems.backgroundColor,
            borderRadius: 10,
            borderStyle: 'solid',
            borderWidth: 1,
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: 12,
            paddingTop: 10,
        },
    };
};
