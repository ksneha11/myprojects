import moment, { Moment } from 'moment';
import React from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, Text, TouchableOpacity, View } from 'react-native';
import { TextLink } from '..';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import Modal from '../modal';
import defaultStyle, { DatePickerStyleSchema } from './datePicker.style';
import Input from './input';

export interface Props extends StyleProps {
    accessibilityLabel: string;
    dateFormat?: string;
    inputHeight?: number;
    maxDate?: Date;
    minDate?: Date;
    onBlur?: () => void;
    onChange: (date: string) => void;
    onFocus?: () => void;
    placeholder?: string;
    selectedDate?: Date;
    style?: Partial<DatePickerStyleSchema>;
}

interface State {
    selectedDate: Moment;
    selectedDateString: string;
    showDatePicker: boolean;
}

const defaultProps = {
    dateFormat: 'MM/DD/YYYY',
    inputHeight: 40,
    placeholder: '',
    selectedDate: new Date(),
};

export default class DatePicker extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DatePicker';
    public style: DatePickerStyleSchema;

    constructor(props: Readonly<Props>) {
        super(props);
        const { selectedDate } = props;
        this.state = {
            selectedDate: moment(selectedDate),
            selectedDateString: '',
            showDatePicker: false,
        };
    }

    public datePicker() {
        const minDateLimit = (this.props.minDate) ? { minDate: this.props.minDate } : null;
        const maxDateLimit = (this.props.maxDate) ? { maxDate: this.props.maxDate } : null;
        if (Platform.OS === 'ios') {
            return (
                <Modal onClose={this.onCloseDatePicker} isFixedBottom>
                    <View>
                        <View style={this.style.datePickerIOSButtonContainer}>
                            <this.NavigateDates />
                            <View>
                                <TextLink
                                    onPress={this.onCloseDatePicker}
                                    style={{ textLink: this.style.datePickerIOSDoneButton }}
                                >
                                    {this.labels.datePicker.done}
                                </TextLink>
                            </View>
                        </View>
                        <DatePickerIOS
                            style={this.style.datePickerIOS}
                            date={this.state.selectedDate.toDate()}
                            onTouchCancel={() => this.setState({ showDatePicker: false })}
                            onDateChange={date => this.setSelected(moment(date), true)}
                            mode="date"
                            minimumDate={minDateLimit?.minDate}
                            maximumDate={maxDateLimit?.maxDate}
                        />
                    </View>
                </Modal>
            );
        }
        if (Platform.OS === 'android') {
            try {
                DatePickerAndroid.open({
                    date: this.state.selectedDate.toDate(),
                    ...maxDateLimit,
                    ...minDateLimit
                }).then(actionProps => {
                    if (actionProps.action === DatePickerAndroid.dismissedAction) {
                        this.setState({ showDatePicker: false });
                    } else if (actionProps.action === DatePickerAndroid.dateSetAction) {
                        const { year, month, day } = actionProps;
                        // Have to provide ISO format(YYYY-MM-DD) to this instance of moment to prevent invalid date from displaying on android
                        this.setSelected(moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD'));
                    }
                });
                return <></>;
            } catch ({ code, message }) {
                this.logger.warn(`Cannot open android date picker, error code ${code}`, message);
            }
        }
    }

    public NavigateDates = () => {
        const labels = this.labels.datePicker.navigationDates;
        return (
            <>
                <View style={this.style.datePickerIOSNavigateDatesContainer}>
                    <TextLink
                        accessibilityLabel={labels.goBackOneDayAccessibilityLabel}
                        onPress={this.onPressDateChangeBack}
                        style={{ textLink: this.style.datePickerIOSNavigationIcon }}
                    >
                        {this.getIcon(IconNames.APP_GO_BACK_NAVIGATE_ICON)}
                    </TextLink>
                    <TextLink
                        accessibilityLabel={labels.goForwardOneDayAccessibilityLabel}
                        onPress={this.onPressDateChangeForward}
                        style={{ textLink: this.style.datePickerIOSNavigationIcon }}
                    >
                        {this.getIcon(IconNames.LIST_ITEM_NAVIGATE_ICON)}
                    </TextLink>
                </View>
            </>
        );
    };

    public render() {
        return (
            <>
                <Input
                    accessibilityLabel={this.props.accessibilityLabel}
                    height={this.props.inputHeight}
                    onChangeText={selectedDateString => {
                        this.setState({ selectedDateString });
                        const selectedDate = moment(selectedDateString);
                        this.props.onChange(selectedDateString);
                        if (selectedDateString === selectedDate.format(this.props.dateFormat)) {
                            this.setSelected(selectedDate);
                        }
                    }}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    placeholder={
                        this.props.placeholder.length ? this.props.placeholder : moment().format(this.props.dateFormat)
                    }
                    value={this.state.selectedDateString}
                    rightIcon={IconNames.INPUT_DATE_PICKER_ICON}
                    rightIconAccessibilityLabel={this.labels.datePicker.rightIconAccessibilityLabel}
                    onPressRightIcon={() => this.setState({ showDatePicker: true })}
                    style={{
                        multiline: this.style.inputMultiline,
                        rightIconContainer: this.style.rightIconContainer,
                        textInput: this.style.textInput,
                    }}
                />
                {this.state.showDatePicker && this.datePicker()}
            </>
        );
    }

    protected onCloseDatePicker = () => {
        this.setState({ showDatePicker: false });
    };

    protected onPressDateChangeBack = () => {
        const dateBack = moment(this.state.selectedDate).subtract(1, 'day');
        this.setState({ selectedDate: dateBack });
        this.setSelected(moment(dateBack), true);
    };

    protected onPressDateChangeForward = () => {
        const dateForward = moment(this.state.selectedDate).add(1, 'day');
        this.setState({ selectedDate: dateForward });
        this.setSelected(moment(dateForward), true);
    };

    protected setSelected = (selectedDate: Moment, showDatePicker = false) => {
        this.setState(
            {
                selectedDate,
                selectedDateString: selectedDate.format(this.props.dateFormat),
                showDatePicker,
            },
            () => this.props.onChange(this.state.selectedDateString)
        );
    };
}
