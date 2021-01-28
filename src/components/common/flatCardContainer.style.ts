import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';
import CardStyle from './card.style';

export interface FlatCardContainerStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}
export default (styleParams: StyleSchemaParams): FlatCardContainerStyleSchema => {
    return {
        rootContainer: CardStyle(styleParams).rootContainer,
    };
};
