import moment from 'moment';
export const validateDOB = (date: string) => {
    const formattedDate = moment(date, 'MM/DD/YYYY', true);
    return formattedDate.isValid() && formattedDate.isBefore(moment());
};
