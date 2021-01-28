import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface InfoModalStyleSchema extends StyleSheetSchema {
    infoIcon: TextStyle;
}

export default ({ colorSchema }: StyleSchemaParams): InfoModalStyleSchema => ({
    infoIcon: {
        color: colorSchema.alerts.infoIcons,
        fontSize: 20,
    },
});
