import { PersonInfo } from 'atlas-services/src/models';

export const createIndexFromPersonInfo = (personInfo: PersonInfo): string => {
    const { firstName = '', lastName = '', dob = '' } = personInfo;
    return `${firstName}${lastName}${dob}`;
};
