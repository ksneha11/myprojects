import { RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import AppComponent from '../../common/appComponent';
import EditSpecialtyPaymentMethodView, { Props as ViewProps } from './editSpecialtyPaymentMethod.view';

export interface Props extends ViewProps {
    editablePaymentMethod?: RecurringPaymentMethod;
    specialtyMemberUid?: string;
}
export default class EditSpecialtyPaymentMethod extends AppComponent<Props> {
    public render() {
        return (
            <EditSpecialtyPaymentMethodView
                editablePaymentMethod={this.props.editablePaymentMethod}
                specialtyMemberUid={this.props.specialtyMemberUid}
                {...this.props}
            />
        );
    }
}
