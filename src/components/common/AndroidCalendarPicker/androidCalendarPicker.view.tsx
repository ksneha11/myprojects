import moment, { Moment } from 'moment';
import React from 'react';
import { AccessibilityState, AccessibilityStates, Text, TouchableOpacity, View } from 'react-native';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import Input from '../form/input';
import Icon from '../icon';
import Modal from '../modal';
import defaultStyle, { DatePickerStyleSchema } from './androidCalendarPicker.style';

export interface Props extends StyleProps {
    accessibilityLabel?: string;
    currentMonth?: Moment;
    dateFormat?: string;
    generateWeeks: () => Day[][];
    nextMonthIcon?: JSX.Element;
    onCloseDatePicker: noop;
    onPressNextMonth: noop;
    onPressPreviousMonth: noop;
    previousMonthIcon?: JSX.Element;
    rightIcon?: IconNames;
    selectableDates: Moment[];
    selectedDate?: string;
    selectedDateString?: string;
    setDatePickerVisible: (isVisible: boolean) => void;
    setSelected: (day: Moment) => void;
    showDatePicker?: boolean;
    style?: Partial<DatePickerStyleSchema>;
}
const defaultProps = {
    accessibilityLabel: 'Pick a date',
    rightIcon: IconNames.INPUT_DATE_PICKER_ICON,
};

interface Day {
    date: Moment;
    isCurrentMonth: boolean;
    isSelected: boolean;
}

export default class AndroidDatePickerView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DatePicker';
    public style: DatePickerStyleSchema;
    public weeks: Day[][];

    constructor(props: Readonly<Props>) {
        super(props);
        const { currentMonth, selectedDate } = props;
        this.state = {
            currentMonth: currentMonth ? moment(currentMonth) : moment(selectedDate),
            selectedDate: moment(selectedDate),
            selectedDateString: moment(selectedDate).format(this.props.dateFormat),
            showDatePicker: false,
        };
    }

    public DatePicker = () => {
        return (
            <Modal
                isVisible={true}
                onClose={this.props.onCloseDatePicker}
                style={{
                    contentContainer: this.style.modelContentContainer,
                }}
            >
                <View style={this.style.calendarContainer}>
                    <this.HeaderBar />
                    <View style={this.style.calendarBodyContainer}>{this.weeks.map(this.Week)}</View>
                </View>
            </Modal>
        );
    };

    public Day = (day: Day, indexDay: number) => {
        let isTouchable = false;
        let dayStyle = {};
        let dayContainerStyle = {};
        let accessibilityStates: AccessibilityStates[] = [];
        const findSelectableDate = this.props.selectableDates.find(date =>
            moment(date.format('MM/DD/YYYY')).isSame(moment(day.date.format('MM/DD/YYYY')))
        );
        if (findSelectableDate) {
            accessibilityStates = day.isSelected ? ['selected'] : [];
            isTouchable = true;
            dayStyle = this.style.calendarDayCurrentMonthText;
            dayContainerStyle = this.style.calendarDayCurrentMonthContainer;
        }
        return (
            <View
                key={indexDay}
                style={[
                    this.style.calendarDayContainer,
                    dayContainerStyle,
                    day.isSelected ? this.style.calendarDaySelectedContainer : {},
                ]}
            >
                <TouchableOpacity
                    accessible
                    accessibilityLabel={day.date.format('Do')}
                    accessibilityRole="button"
                    accessibilityStates={accessibilityStates}
                    disabled={!isTouchable}
                    onPress={() => this.props.setSelected(day.date)}
                >
                    <Text
                        style={[
                            this.style.calendarDayText,
                            dayStyle,
                            day.isSelected && this.style.calendarDaySelectedText,
                        ]}
                    >
                        {day.date.date()}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    public HeaderBar = () => {
        return (
            <View style={this.style.calendarHeaderContainer}>
                <View style={this.style.calendarPreviousMonthContainer}>
                    <TouchableOpacity
                        accessible
                        accessibilityLabel={this.labels.androidCalendar.previousMonth.accessibilityLabel}
                        accessibilityRole="button"
                        onPress={this.props.onPressPreviousMonth}
                    >
                        {this.LeftIcon()}
                    </TouchableOpacity>
                </View>
                <View style={this.style.calendarMonthYearTitleContainer}>
                    <Text
                        accessible
                        accessibilityLabel={this.labels.androidCalendar.currentMonth.accessibilityLabel}
                        accessibilityRole="header"
                        style={this.style.calendarMonthYearTitleText}
                    >
                        {this.props.currentMonth.format('MMMM YYYY')}
                    </Text>
                </View>
                <View style={this.style.calendarNextMonthContainer}>
                    <TouchableOpacity
                        accessible
                        accessibilityLabel={this.labels.androidCalendar.nextMonth.accessibilityLabel}
                        accessibilityRole="button"
                        onPress={this.props.onPressNextMonth}
                    >
                        {this.RightIcon()}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    public LeftIcon = () => {
        return (
            this.props.previousMonthIcon || (
                <Icon
                    name={IconNames.APP_GO_BACK_NAVIGATE_ICON}
                    style={{ rootItem: this.style.calendarNavigationIcon }}
                />
            )
        );
    };

    public render() {
        this.weeks = this.props.generateWeeks();
        return (
            <>
                <Input
                    accessibilityLabel={this.props.accessibilityLabel}
                    onChangeText={() => {}}
                    onFocus={() => this.props.setDatePickerVisible(true)}
                    onPressRightIcon={() => this.props.setDatePickerVisible(true)}
                    placeholder={moment().format(this.props.dateFormat)}
                    rightIcon={this.props.rightIcon}
                    rightIconAccessibilityLabel={this.labels.androidCalendar.selectDate.accessibilityLabel}
                    style={{ rightIcon: this.style.inputRightIcon }}
                    value={this.props.selectedDateString}
                />
                {this.props.showDatePicker && <this.DatePicker />}
            </>
        );
    }

    public RightIcon = () => {
        return (
            this.props.nextMonthIcon || (
                <Icon
                    name={IconNames.LIST_ITEM_NAVIGATE_ICON}
                    style={{ rootItem: this.style.calendarNavigationIcon }}
                />
            )
        );
    };

    public Week = (week: Day[], indexWeek: number) => {
        return (
            <View key={indexWeek} style={this.style.calendarWeekContainer}>
                {week.map(this.Day)}
            </View>
        );
    };
}
