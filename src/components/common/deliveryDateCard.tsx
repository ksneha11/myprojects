import moment, { MomentInput } from 'moment';
import React from 'react';
import { View } from 'react-native';
import { AndroidDatePicker, H2, P } from '.';
import { IconNames } from '../../styles';
import StyledComponent from '../styledComponent';
import Card, { Props as CardProps } from './card';
import defaultStyle, { DeliveryDateCardStyleSchema } from './deliveryDateCard.style';
import DropDown from './form/dropDown';
import Icon from './icon';

interface Props extends CardProps {
    date: string;
    shippingDates: string[];
    style?: Partial<DeliveryDateCardStyleSchema>;
    subText?: string;
}

const defaultProps = {};

export default class DeliveryDateCard extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DeliveryDateCard';
    public style: DeliveryDateCardStyleSchema;

    public DatePicker = () => {
        const labels = this.labels.deliveryDateCard.datePicker;

        return (
            <View style={this.style.datePickerBoxContainer}>
                <DropDown
                    accessibilityLabel={labels.accessibilityLabel}
                    androidComponent={
                        <AndroidDatePicker
                            date={
                                this.appState.prescriptionCart.specialty.selectedShippingDate
                                    ? this.formatDate(this.appState.prescriptionCart.specialty.selectedShippingDate)
                                    : this.formatDate()
                            }
                            dates={this.props.shippingDates}
                            onSelectDate={newSelectDate => this.appStateActions.cart.setShippingDate(this.formatDate(newSelectDate))}
                        />
                    }
                    hasIconSeparator
                    items={this.props.shippingDates.map(date => ({
                        label: moment(date).format('dddd, MMMM DD, YYYY'),
                        value: this.formatDate(date),
                    }))}
                    onChange={({ value }) => this.appStateActions.cart.setShippingDate(this.formatDate(value))}
                    placeholder={labels.placeholder}
                    rightIconName={IconNames.INPUT_DATE_PICKER_ICON}
                    title={labels.title}
                    value={this.formatDate(this.props.date)}
                />
            </View>
        );
    };

    public render() {
        return (
            <Card
                leftIconName={IconNames.SHIPPING_OPTIONS_ICON}
                title={this.labels.deliveryDateCard.title}
                {...this.props}
            >
                {({ MainContent, props: { leftIconName, title }, style }) => {
                    return (
                        <>
                            <View style={style.rootContainer}>
                                <MainContent>
                                    <Icon
                                        name={leftIconName}
                                        style={{ rootItem: { ...style.leftIcon, ...this.style.leftIcon } }}
                                    />
                                    <this.TextContent subText={this.props.subText} cardStyle={style} title={title} />
                                </MainContent>
                            </View>
                        </>
                    );
                }}
            </Card>
        );
    }

    public SubText = ({ cardStyle, text }) => {
        return (
            <View style={this.style.subtextContainer}>
                <P style={{ paragraph: cardStyle.text }}>{text}</P>
            </View>
        );
    };

    public TextContent = ({ cardStyle, subText, title }) => {
        return (
            <View style={this.style.textContainer}>
                <this.Title cardStyle={cardStyle} title={title} />
                <this.SubText
                    cardStyle={cardStyle}
                    // default label for specialty shouldn't be in here like this
                    text={subText || this.labels.deliveryDateCard.textContent.subText}
                />
                <this.DatePicker />
            </View>
        );
    };

    public Title = ({ cardStyle, title }) => {
        return <H2 style={{ h2: cardStyle.title }}>{title}</H2>;
    };

    protected formatDate = (input: MomentInput) => {
        return moment(input).format('MM/DD/YYYY');
    }
}
