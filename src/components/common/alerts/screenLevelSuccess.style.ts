import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../styles';

export interface ScreenLevelSuccessStyleSchema extends StyleSheetSchema {
    alertContainer: ViewStyle;
    confirmIcon: TextStyle;
    container: ViewStyle;
    errorMessage: TextStyle;
    leftIcon: TextStyle;
    rootContainer: ViewStyle;
    successBody: TextStyle;
    successTitle: TextStyle;
    warningContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): ScreenLevelSuccessStyleSchema => ({
    alertContainer: {
        // TODO: This isn't great, but I haven't been able to use flex to make this not overflow
        width: '85%',
    },
    confirmIcon: {
        marginHorizontal: null,
        marginRight: 17,
    },
    container: {
        // Setting 10% opacity
        backgroundColor: colorSchema.alerts.successBackground + '10',
    },
    errorMessage: {
        color: colorSchema.pages.text.paragraph,
    },
    leftIcon: {
        fontSize: 30,
    },
    rootContainer: {
        flex: 1,
    },
    successBody: {},
    successTitle: {},
    warningContainer: {
        backgroundColor: colorSchema.alerts.successBackground + '10',
    },
});
