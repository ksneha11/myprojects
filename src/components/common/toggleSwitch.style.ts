import { Platform, TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ToggleSwitchStyleSchema extends StyleSheetSchema {
    activeButtonColor: TextStyle;
    activeColor: TextStyle;
    activeTrackColor: TextStyle;
    inactiveButtonColor: TextStyle;
    inactiveColor: TextStyle;
    rootContainer: ViewStyle;
    switchContainer: ViewStyle;
    trackColorInactive: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): ToggleSwitchStyleSchema => ({
    activeButtonColor: { color: colorSchema.toggleSwitch.activeButton },
    activeColor: { color: colorSchema.toggleSwitch.active },
    activeTrackColor: Platform.select({
        android: {
            color: colorSchema.toggleSwitch.active,
        },
        ios: {
            color: colorSchema.toggleSwitch.activeButton,
        },
    }),
    inactiveButtonColor: { color: colorSchema.toggleSwitch.inactiveButton },
    inactiveColor: { color: colorSchema.toggleSwitch.inactive },
    rootContainer: {},
    switchContainer: { transform: [{ scaleX: 1.1 }] },
    trackColorInactive: { color: colorSchema.toggleSwitch.inactive },
});
