import { ViewStyle } from 'react-native';
import { StyleSheetSchema } from '../../styles';

export interface InputWrapperStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default (): InputWrapperStyleSchema => ({
    rootContainer: {
        flex: 0,
        flexGrow: 1,
    },
});
