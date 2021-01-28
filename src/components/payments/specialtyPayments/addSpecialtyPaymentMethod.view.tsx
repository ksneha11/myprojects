import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { H1, Selector } from '../../common';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { AddPaymentMethodFormStyleSchema } from '../addPaymentMethod.style';
import AddSpecialtyBankAccount from './addSpecialtyBankAccount';
import AddSpecialtyCreditCard from './addSpecialtyCreditCard';

export interface Props extends StyleProps {
    onPressPaymentType?: (index: number) => void;
    selectedPaymentTypeIndex?: number;
    specialtyMemberUid?: string;
}

export default class AddSpecialtyPaymentMethodView extends StyledComponent<Props> {
    public defaultStyle = defaultStyle;
    public name = 'AddSpecialtyPaymentMethod';
    public style: AddPaymentMethodFormStyleSchema;

    public ContentContainer = () => {
        const { selectedPaymentTypeIndex } = this.props;
        return selectedPaymentTypeIndex === 0 ? (
            <AddSpecialtyCreditCard isSpecialty specialtyMemberUid={this.props.specialtyMemberUid} />
        ) : (
            <AddSpecialtyBankAccount isSpecialty specialtyMemberUid={this.props.specialtyMemberUid} />
        );
    };

    public render() {
        const labels = this.labels.pharmacy.addPaymentMethod;
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={this.style.titleContainer}>
                        <H1>{labels.title}</H1>
                    </View>
                    <Selector
                        style={{ rootContainer: this.style.selectorRootContainer }}
                        activeIndex={this.props.selectedPaymentTypeIndex}
                        labels={[labels.paymentTypes.creditCard, labels.paymentTypes.bankAccount]}
                        onPress={index => this.props.onPressPaymentType(index)}
                    />
                    <this.ContentContainer />
                </ScrollView>
            </>
        );
    }
}
