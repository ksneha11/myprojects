import { ViewStyle } from 'react-native';
import { StyleSheetSchema } from '../../styles';

export interface EditPaymentMethodFormStyleSchema extends StyleSheetSchema {
    titleContainer: ViewStyle;
}

export default (): EditPaymentMethodFormStyleSchema => {
    return {
        titleContainer: {
            marginHorizontal: 20,
            marginVertical: 25,
        },
    };
};
