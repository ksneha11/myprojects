import { PaymentType, RecurringPaymentMethod } from 'atlas-services/src/models';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconNames } from '../../../../styles';
import { dateSuffix } from '../../../../utils/dateSuffix';
import { H2, P, RadioButton, RadioButtonGroup } from '../../../common';
import ListModal, { ListModalItem } from '../../../common/listModal';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import defaultStyle, { SelectRecurringPaymentDateStyleSchema } from './selectRecurringPaymentDate.style';

interface Props extends StyleProps {
    children: (parent: SelectRecurringPaymentDate) => React.ReactNode;
    dateItems: ListModalItem[];
    datePickerModalVisible: boolean;
    onCloseDatePicker: noop;
    onPressPaymentDateOption: (index) => void;
    selectedDateLabel: string;
    selectedPaymentDateOptionIndex: number;
    selectedPaymentMethod: RecurringPaymentMethod;
    style?: Partial<SelectRecurringPaymentDateStyleSchema>;
    toggleDatePickerModal: noop;
}

const defaultProps: Partial<Props> = {
    children: ({ PaymentDate, DatePickerModal }) => {
        return (
            <>
                <PaymentDate />
                <DatePickerModal />
            </>
        );
    },
};

export default class SelectRecurringPaymentDate extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SelectDate';
    public style: SelectRecurringPaymentDateStyleSchema;

    public ActiveBalanceDue = ({}) => {
        const labels = this.labels.pharmacy.selectDate.activeBalanceDue;
        const day = new Date().getDate() >= 28 ? 1 : new Date().getDate() + 1;
        const dayString = this.formatLabel(labels.subTitle, String(day) + dateSuffix(day));

        return (
            <View>
                <H2 style={{ h2: this.style.paymentDateHeader }}>{labels.title}</H2>
                <P style={{ paragraph: this.style.paymentDateContainer }}>{dayString}</P>
            </View>
        );
    };

    public DatePicker = ({ onPress, selectedDate, style }): JSX.Element => {
        return (
            <TouchableOpacity
                accessibilityLabel={this.labels.pharmacy.selectDate.datePicker.accessibilityLabel}
                key={selectedDate}
                onPress={onPress}
                style={style.datePickerBox}
            >
                <P style={{ paragraph: style.datePickerText }}>{selectedDate}</P>
                {this.getIcon(IconNames.DROPDOWN_ICON, { style: style.dropdownIcon })}
            </TouchableOpacity>
        );
    };

    public DatePickerModal = (): JSX.Element => {
        const labels = this.labels.pharmacy.selectDate.datePickerModal;
        return (
            <ListModal
                isVisible={this.props.datePickerModalVisible}
                initialItem={{
                    children: this.props.dateItems,
                    label: labels.initialItem,
                }}
                headerLeftText={() => labels.header.leftText}
                headerMiddleText={() => labels.header.middleText}
                onPressHeaderLeft={this.props.onCloseDatePicker}
                onClose={this.props.onCloseDatePicker}
            />
        );
    };

    public NoBalanceBankAccount = ({}) => {
        const labels = this.labels.pharmacy.selectDate.noBalanceBankAccount;
        return (
            <View style={this.style.paymentDateContainer}>
                <H2 style={{ h2: this.style.paymentDateHeader }}>{labels.title}</H2>
                <P style={{ paragraph: this.style.paymentDateBankAccountHeader }}>{labels.subtitle}</P>
                {this.DatePicker({
                    onPress: this.props.toggleDatePickerModal,
                    selectedDate: this.props.selectedDateLabel,
                    style: this.style,
                })}
            </View>
        );
    };

    public PaymentDate = ({}) => {
        if (this.appState.specialtyAccountBalance >= 3) {
            return <this.ActiveBalanceDue />;
        }
        if (
            this.props.selectedPaymentMethod &&
            this.props.selectedPaymentMethod.paymentType === PaymentType.CREDIT_CARD
        ) {
            const labels = this.labels.pharmacy.selectDate.paymentDate.radioButtonGroup;
            return (
                <RadioButtonGroup
                    customButton={this.RadioButtonContainer}
                    isVertical
                    radioButtonGroupAccessibilityLabel={labels.accessibilityLabel}
                    radioButtonGroupTitle={labels.title}
                    radioButtonItems={[labels.items.immediatePayment, labels.items.monthly]}
                />
            );
        }
        return <this.NoBalanceBankAccount />;
    };

    public RadioButtonContainer = ({ index, buttonInfo }): JSX.Element => {
        const isActive: boolean = index === this.props.selectedPaymentDateOptionIndex;

        return (
            <View key={index} style={this.style.radioButtonContainer}>
                <View style={this.style.radioButtonLine}>
                    <RadioButton selected={isActive} onPress={() => this.props.onPressPaymentDateOption(index)} />
                    <P style={{ paragraph: this.style.radioText }}>{buttonInfo}</P>
                </View>
                <this.RadioButtonDetails index={index} />
            </View>
        );
    };

    public RadioButtonDetails = ({ index }): JSX.Element => {
        return index === 0 ? (
            <View key={Math.random()} style={this.style.radioSubtextContainer}>
                <P style={{ paragraph: this.style.infoText }}>
                    {this.labels.pharmacy.selectDate.radioButtonDetails.subText}
                </P>
            </View>
        ) : (
            <View style={this.style.datePickerContainer}>
                {this.DatePicker({
                    onPress: this.props.toggleDatePickerModal,
                    selectedDate: this.props.selectedDateLabel,
                    style: this.style,
                })}
            </View>
        );
    };

    public render() {
        return <View style={this.style.rootContainer}>{this.props.children(this)}</View>;
    }
}
