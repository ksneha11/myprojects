import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../../../styles';

export interface SpecialtyFirstFillSuccessScreenSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({  }: StyleSchemaParams): SpecialtyFirstFillSuccessScreenSchema => {
    return {
        contentMargin: {
            marginHorizontal: 20,
        },
        rootContainer: {
            flex: 1,
            justifyContent: 'space-between',
        },
        secondaryButton: {
            marginTop: 30,
            paddingBottom: 20,
            width: '100%',
        },
    };
};
