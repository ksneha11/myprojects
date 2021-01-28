import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface HeaderStyleSchema extends StyleSheetSchema {
    backIcon: TextStyle;
    gradientColors: ViewStyle;
    headerContainer: ViewStyle;
    headerContent: ViewStyle;
    headerSafeAreaContainer: ViewStyle;
}

export default ({ colorSchema }: Partial<StyleSchemaParams>): HeaderStyleSchema => ({
    backIcon: {
        color: colorSchema.menus.menuItems.backgroundColor,
        fontSize: 30,
    },
    gradientColors: {
        borderBottomColor: colorSchema.headerGradient.endColor,
        borderTopColor: colorSchema.headerGradient.startColor,
    },
    headerContainer: {
        elevation: 0,
        flexDirection: 'column',
        shadowOpacity: 0,
        width: '100%',
    },
    headerContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
        marginTop: 0,
        paddingHorizontal: 20,
        width: '100%',
    },
    headerSafeAreaContainer: {
        backgroundColor: colorSchema.headerGradient.iOSSafeAreaColor,
    },
});
