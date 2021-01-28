import { TextStyle, ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ErrorModalStyleSchema extends StyleSheetSchema {
    buttonContainer: ViewStyle;
    buttonWrapper: ViewStyle;
    footerContainer: ViewStyle;
    modalBodyCopy: TextStyle;
    rootContainer: ViewStyle;
}

export default ({ colorSchema, windowWidth, hairlineWidth }: StyleSchemaParams): ErrorModalStyleSchema => {
    return {
        buttonContainer: {
            flex: 0,
            width: '47.5%',
        },
        buttonWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
        },
        footerContainer: {
            alignSelf: 'center',
            marginTop: 20,
        },
        modalBodyCopy: {
            textAlign: 'center',
        },
        rootContainer: {},
        twoButtonWrapper: {
            justifyContent: 'space-between',
        },
    };
};
