import { ViewStyle } from 'react-native';
import { StyleSheetSchema } from '../../styles';

export interface EditSpecialtyPaymentMethodFormStyleSchema extends StyleSheetSchema {
    titleContainer: ViewStyle;
}

export default (): EditSpecialtyPaymentMethodFormStyleSchema => {
    return {
        titleContainer: {
            marginHorizontal: 20,
            marginVertical: 25,
        },
    };
};
