import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { H1 } from '../../..';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import { ContactInfoAddPharmacyHomeDeliveryAddressStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInfoAddPharmacyHomeDeliveryAddressView) => React.ReactNode;
    style?: Partial<ContactInfoAddPharmacyHomeDeliveryAddressStyleSchema>;
}

export const defaultProps = {
    children: ({ Title }: ContactInfoAddPharmacyHomeDeliveryAddressView) => {
        return <>
            <Title />
        </>;
    },
};

export default class ContactInfoAddPharmacyHomeDeliveryAddressView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoAddPharmacyHomeDeliveryAddress';
    public style: ContactInfoAddPharmacyHomeDeliveryAddressStyleSchema;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public Title = () => {
        // FIXME - Pull this from labels
        return (
            <H1> Add Pharmacy Home Delivery address </H1>
        )
    }
}
