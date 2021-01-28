import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams } from '../../../../styles';
import { CardStyleSchema } from '../../../common/card.style';

export interface MakePaymentStyleSchema extends Partial<CardStyleSchema> {
    mainContainer: ViewStyle;
    rootContainer: ViewStyle;
    textContainer: ViewStyle;
    textContentContainer: ViewStyle;
}

export default ({  }: StyleSchemaParams): MakePaymentStyleSchema => {
    return {
        mainContainer: {
            marginTop: 10,
        },
        rootContainer: {
            marginHorizontal: 20,
            marginTop: 12,
        },
        textContainer: {
            flexDirection: 'column',
        },
        textContentContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
            marginTop: 15,
            paddingBottom: 5,
        },
    };
};
