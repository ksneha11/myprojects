import moment from 'moment';
import { getDateRangeFilterValue } from '../components/pharmacy/prescriptions/common/prescriptionsDefaultFilters';
import { inTheLast } from '../utils';

export const dateRangeFilter = (
    amount: moment.DurationInputArg1,
    unit: moment.unitOfTime.DurationConstructor,
    displayUnit: string
) => {
    return {
        label: amount + ' ' + displayUnit,
        method: () => {
            return inTheLast(amount, unit, null);
        },
        value: getDateRangeFilterValue(amount, unit),
    };
};
