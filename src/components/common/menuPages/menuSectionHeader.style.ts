import { TextStyle, ViewStyle } from 'react-native';
import { StyleSheetSchema } from '../../../styles';

export interface MenuSectionHeaderSchema extends StyleSheetSchema {
    sectionHeader: TextStyle;
    sectionHeaderContainer: ViewStyle;
}

export default (): MenuSectionHeaderSchema => {
    return {
        sectionHeader: {},
        sectionHeaderContainer: {
            marginBottom: 25,
            marginStart: 20,
            marginTop: 30,
        },
    };
};
