import React from 'react';
import { AddPaymentMethod } from '..';
import AddSpecialtyPaymentMethodView, { Props as ViewProps } from './addSpecialtyPaymentMethod.view';

export interface Props extends ViewProps {
    specialtyMemberUid?: string;
}

export interface State {
    selectedPaymentTypeIndex?: number;
}
export default class AddSpecialtyPaymentMethod extends AddPaymentMethod {
    public render() {
        return (
            <AddSpecialtyPaymentMethodView
                onPressPaymentType={this.onPressPaymentType}
                specialtyMemberUid={this.props.specialtyMemberUid}
                selectedPaymentTypeIndex={this.state.selectedPaymentTypeIndex}
            />
        );
    }

    protected onPressPaymentType = (index: number) => {
        this.setState({ selectedPaymentTypeIndex: index });
    };
}
