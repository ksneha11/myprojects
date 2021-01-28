import React from 'react';
import AppComponent from '../../../common/appComponent';
import { ContactInfoAddPharmacyHomeDeliveryAddressView, ViewProps } from './';

interface State { }
interface Props extends Partial<ViewProps> { }

const defaultProps = {};

export default class ContactInfoAddPharmacyHomeDeliveryAddress extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {
        return <ContactInfoAddPharmacyHomeDeliveryAddressView {...this.props} style={this.style} />;
    }
}
