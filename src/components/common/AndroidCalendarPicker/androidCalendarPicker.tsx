import moment, { Moment } from 'moment';
import React from 'react';
import StyledComponent from '../../styledComponent';
import AndroidDatePickerView, { Props as ViewProps } from './androidCalendarPicker.view';

interface Props extends Partial<ViewProps> {
    date?: string;
    dates: string[];
    onSelectDate?: (date: string) => void;
}

interface State {
    currentMonth: Moment;
    showDatePicker: boolean;
}

const defaultProps = {
    date: '',
    dateFormat: 'MM/DD/YYYY',
};

export default class AndroidDatePicker extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public selectedDateString: string;

    constructor(props: Readonly<Props>) {
        super(props);

        const dateMoment = props.date ? moment(props.date) : moment();
        this.selectedDateString = dateMoment.format(props.dateFormat);
        this.state = {
            currentMonth: dateMoment,
            showDatePicker: false,
        };
    }

    public render() {
        this.selectedDateString = moment(new Date(this.props.date)).format(this.props.dateFormat);
        return (
            <AndroidDatePickerView
                dateFormat={this.props.dateFormat}
                generateWeeks={this.generateWeeks}
                onCloseDatePicker={this.onCloseDatePicker}
                onPressNextMonth={this.onPressNextMonth}
                onPressPreviousMonth={this.onPressPreviousMonth}
                selectedDate={this.props.date}
                selectedDateString={this.selectedDateString}
                selectableDates={this.getDateMoments()}
                setDatePickerVisible={isVisible => this.setState({ showDatePicker: isVisible })}
                setSelected={this.setSelected}
                {...this.state}
            />
        );
    }

    protected generateWeeks = () => {
        let intervalDate = moment(this.state.currentMonth)
            .startOf('month')
            .startOf('week');
        const endDate = moment(this.state.currentMonth)
            .endOf('month')
            .endOf('week');
        const isSunday = () => intervalDate.day() === 0;
        const weeks = [];
        while (!intervalDate.isAfter(endDate, 'day')) {
            if (isSunday()) {
                weeks.push([]);
            }
            weeks[weeks.length - 1].push({
                date: moment(intervalDate),
                isCurrentMonth: intervalDate.isSame(this.state.currentMonth, 'month'),
                isSelected: intervalDate.isSame(moment(this.props.date)),
            });
            intervalDate = intervalDate.add(1, 'day');
        }
        return weeks;
    };

    protected getDateMoments = (): Moment[] => {
        return this.props.dates.map(date => moment(date));
    };

    protected onCloseDatePicker = () => {
        this.setState({ showDatePicker: false });
    };

    protected onPressNextMonth = () => {
        this.setMonth(this.state.currentMonth.add(1, 'month'));
    };

    protected onPressPreviousMonth = () => {
        this.setMonth(this.state.currentMonth.subtract(1, 'month'));
    };

    protected setMonth = (currentMonth: Moment) => {
        this.setState({ currentMonth });
    };

    protected setSelected = (selectedDate: Moment, showDatePicker = false) => {
        this.setState({
            currentMonth: selectedDate,
            showDatePicker,
        });
        if (this.props.onSelectDate) {
            this.props.onSelectDate(selectedDate.format(this.props.dateFormat));
        }
    };
}
