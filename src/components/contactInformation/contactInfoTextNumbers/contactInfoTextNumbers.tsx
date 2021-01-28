import React from 'react';
import AppComponent from '../../common/appComponent';
import { ContactInfoTextNumbersView, ViewProps } from './';

interface State {}
interface Props extends ViewProps {}

const defaultProps = {};

class ContactInfoTextNumbers extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {
        return <ContactInfoTextNumbersView {...this.props} style={this.style} />;
    }
}

export default ContactInfoTextNumbers;
