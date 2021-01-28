import { ViewStyle } from 'react-native';
import { StyleSchemaParams, StyleSheetSchema } from '../../styles';

export interface ChangesNotSavedModalStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle;
}

export default ({ colorSchema, hairlineWidth, windowWidth }: StyleSchemaParams): ChangesNotSavedModalStyleSchema => ({
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
});
