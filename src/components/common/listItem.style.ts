import { TextStyle, ViewStyle } from 'react-native';
import { StyleSheetSchema } from '../../styles';

export interface ListItemStyleSchema extends StyleSheetSchema {
    contentContainer: ViewStyle;
    leftIcon: TextStyle;
    mainContent: ViewStyle;
    rightColumn: ViewStyle;
    rightIcon: TextStyle;
    rootContainer: ViewStyle;
    safeAreaViewContainer: ViewStyle;
    subText: TextStyle;
    title: TextStyle;
}

export default ({ colorSchema }): ListItemStyleSchema => {
    return {
        contentContainer: {
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 10,
        },
        leftIcon: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            marginTop: 3,
        },
        mainContent: {
            flex: 1,
            marginLeft: 5,
        },
        rightColumn: {
            justifyContent: 'center',
        },
        rightIcon: {
            color: colorSchema.pages.formColors.actionButtons.backgroundColor,
            fontSize: 18,
            fontWeight: 'bold',
        },
        rootContainer: {
            flex: 1,
            flexDirection: 'column',
        },
        safeAreaViewContainer: {
            flex: 1,
        },
        subText: {
            color: '#3d3d3d',
            fontSize: 12,
        },
        title: {
            color: '#3d3d3d',
            flex: 1,
            fontSize: 14,
            fontWeight: 'bold',
        },
    };
};
