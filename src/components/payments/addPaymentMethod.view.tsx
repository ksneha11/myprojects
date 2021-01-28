import React from 'react';
import { ScrollView, View } from 'react-native';
import { _omit } from '../../utils';
import { H1, Selector } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import AddBankAccount from './AddBankAccount';
import AddCreditCard from './AddCreditCard';
import defaultStyle, { AddPaymentMethodFormStyleSchema } from './addPaymentMethod.style';

export interface Props extends StyleProps {
    onPressPaymentType?: (index: number) => void;
    onSaveRoute?: string;
    selectedPaymentTypeIndex?: number;
}

export default class AddPaymentMethodView extends StyledComponent<Props> {
    public defaultStyle = defaultStyle;
    public name = 'AddPaymentMethod';
    public style: AddPaymentMethodFormStyleSchema;

    public ContentContainer = () => {
        const { selectedPaymentTypeIndex } = this.props;
        return selectedPaymentTypeIndex === 0 ? (
            <AddCreditCard onSaveRoute={this.props.onSaveRoute} />
        ) : (
            <AddBankAccount onSaveRoute={this.props.onSaveRoute} />
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
