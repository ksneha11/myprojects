import { PaymentMethod, PaymentType } from 'atlas-services/src/models';
import React from 'react';
import { View } from 'react-native';
import { _omit } from '../../utils';
import { H1 } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import { EditCreditCard } from './';
import defaultStyle, { EditPaymentMethodFormStyleSchema } from './editPaymentMethod.style';

export interface Props extends StyleProps {
    // TODO: When we have editBankAccount for PBM use this to pick between them
    editablePaymentMethod: PaymentMethod;
    onSaveRoute?: string;
}

export default class EditPaymentMethodView<P extends Props = Props> extends StyledComponent<P> {
    public defaultStyle = defaultStyle;
    public name = 'EditPaymentMethod';
    public style: EditPaymentMethodFormStyleSchema;

    // TODO: Right now only CreditCards are editable for PBM once bank accounts are editable add logic checking paymentType like in EditSpecialty
    public ContentContainer = () => {
        return (
            <>
                <View style={this.style.titleContainer}>
                    <H1>{this.labels.pharmacy.editPaymentMethod.editCreditCard}</H1>
                </View>
                <EditCreditCard
                    onSaveRoute={this.props.onSaveRoute}
                    editablePaymentMethod={this.props.editablePaymentMethod}
                />
            </>
        );
    };

    public render() {
        return (
            <>
                <View style={this.style.contentContainer}>
                    <this.ContentContainer />
                </View>
            </>
        );
    }
}
