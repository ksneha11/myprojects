import { TextStyle, ViewStyle } from 'react-native';
import { StyleSheetSchema } from '../../styles';

export interface AddPaymentMethodFormStyleSchema extends StyleSheetSchema {
    selectorRootContainer: ViewStyle;
    titleContainer: ViewStyle;
}

export default (): AddPaymentMethodFormStyleSchema => {
    return {
        selectorRootContainer: {
            marginTop: 5,
        },
        titleContainer: {
            marginHorizontal: 20,
            marginVertical: 20,
        },
    };
};
