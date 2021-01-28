import { PaymentMethod, PaymentType } from 'atlas-services/src/models';
import React from 'react';
import { View } from 'react-native';
import { EditSpecialtyBankAccount, EditSpecialtyCreditCard } from '.';
import { H1 } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { EditSpecialtyPaymentMethodFormStyleSchema } from './editSpecialtyPaymentMethod.style';

export interface Props extends StyleProps {
    editablePaymentMethod?: PaymentMethod;
    specialtyMemberUid?: string;
}

export default class EditSpecialtyPaymentMethodView<P extends Props = Props> extends StyledComponent<P> {
    public defaultStyle = defaultStyle;
    public name = 'EditSpecialtyPaymentMethod';
    public style: EditSpecialtyPaymentMethodFormStyleSchema;

    public ContentContainer = () => {
        return this.props.editablePaymentMethod.paymentType === PaymentType.CREDIT_CARD ? (
            <>
                <View style={this.style.titleContainer}>
                    <H1>{this.labels.pharmacy.editPaymentMethod.editCreditCard}</H1>
                </View>
                <EditSpecialtyCreditCard
                    editablePaymentMethod={this.props.editablePaymentMethod}
                    isSpecialty
                    specialtyMemberUid={this.props.specialtyMemberUid}
                />
            </>
        ) : (
            <>
                <View style={this.style.titleContainer}>
                    <H1>{this.labels.pharmacy.editPaymentMethod.editBankAccount}</H1>
                </View>
                <EditSpecialtyBankAccount
                    editablePaymentMethod={this.props.editablePaymentMethod}
                    isSpecialty
                    specialtyMemberUid={this.props.specialtyMemberUid}
                />
            </>
        );
    };

    public render() {
        return (
            <>
                <View>
                    <this.ContentContainer />
                </View>
            </>
        );
    }
}
