import { TextStyle } from 'react-native';
import { StyleSheetSchema } from '../../styles';

export interface PageHeaderStyleSchema extends StyleSheetSchema {
    pageHeader: TextStyle;
    pageTitle: TextStyle;
}

export default (): PageHeaderStyleSchema => {
    return {
        pageHeader: {
            alignItems: 'center',
            backgroundColor: '#408bc6', // pull this out into color scheme
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        pageTitle: {
            color: '#ffffff', // pull this out into color scheme
            fontFamily: 'Calibri-Bold',
            fontSize: 20,
            fontWeight: '500',
            paddingBottom: 10,
            paddingTop: 10,
        },
    };
};
