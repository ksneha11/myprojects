import React from 'react';
import AppComponent from '../common/appComponent';
import AddPaymentMethodView, { Props as ViewProps } from './addPaymentMethod.view';

export interface Props extends ViewProps {
    onSaveRoute?: string;
    specialtyMemberUid?: string;
}

export interface State {
    onSaveRoute?: string;
    selectedPaymentTypeIndex?: number;
}

export default class AddPaymentMethod extends AppComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedPaymentTypeIndex: 0,
        };
    }

    public render() {
        return (
            <AddPaymentMethodView
                onPressPaymentType={this.onPressPaymentType}
                onSaveRoute={this.props.onSaveRoute}
                selectedPaymentTypeIndex={this.state.selectedPaymentTypeIndex}
                {...this.props}
            />
        );
    }

    protected onPressPaymentType = (index: number) => {
        this.setState({ selectedPaymentTypeIndex: index });
    };
}
