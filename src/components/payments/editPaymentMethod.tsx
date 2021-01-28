import { PaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import AppComponent from '../common/appComponent';
import EditPaymentMethodView, { Props as ViewProps } from './editPaymentMethod.view';

export interface Props extends ViewProps {
    editablePaymentMethod: PaymentMethod;
    onSaveRoute?: string;
}

export interface State {}
const defaultProps = {};
export default class EditPaymentMethod extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    public render() {
        return (
            <EditPaymentMethodView
                editablePaymentMethod={this.props.editablePaymentMethod}
                onSaveRoute={this.props.onSaveRoute}
                {...this.props}
            />
        );
    }
}
