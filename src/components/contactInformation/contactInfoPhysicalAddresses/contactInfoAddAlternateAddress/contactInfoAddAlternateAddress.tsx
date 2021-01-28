import React from 'react';
import { ContactInfoAddAlternateAddressView, ViewProps } from '.';
import AppComponent from '../../../common/appComponent';

interface State { }
interface Props extends Partial<ViewProps> { }

const defaultProps = {};

export default class ContactInfoAddAlternateAddress extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {
        return <ContactInfoAddAlternateAddressView {...this.props} style={this.style} />;
    }
}
