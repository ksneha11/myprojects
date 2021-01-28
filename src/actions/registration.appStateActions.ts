import { RegistrationEligibility, SecurityQuestion } from 'atlas-services/src/models';
import { OtpSubType } from 'atlas-services/src/models/otpSubType';
import { OtpType } from 'atlas-services/src/models/otpType';
import { getInitialAppState } from '../context/initialAppState';
import { AppState } from '../models';
import AppStateActions from '../models/appStateActions';

export default interface RegistrationAppStateActions extends AppStateActions {
    registration: {
        clearRegistrationData: noop;
        setAccountRecoveryNumber: (phoneNumber: string, phoneType: OtpSubType, wasSetEarly?: boolean) => void;
        setDateOfBirth: (dateOfBirth: string) => void;
        setEmail: (email: string) => void;
        setPassword: (password: string) => void;
        setRegistrationEligibility: (eligibility: RegistrationEligibility) => void;
        setSecurityQuestions: (questions: SecurityQuestion[]) => void;
        setUsername: (username: string) => void;
    };
}

export class RegistrationReducers {
    public static clearRegistrationData = (previousState: AppState): Partial<AppState> => {
        return { registrationData: getInitialAppState().registrationData };
    };

    public static setAccountRecoveryNumber = (
        previousState: AppState,
        phoneNumber: string,
        phoneType: OtpSubType,
        wasSetEarly: boolean = false
    ): Partial<AppState> => {
        return {
            registrationData: {
                ...previousState.registrationData,
                accountRecovery: { phoneNumber, phoneType, wasSetEarly },
            },
        };
    };

    public static setDateOfBirth = (previousState: AppState, dateOfBirth: string): Partial<AppState> => {
        return { registrationData: { ...previousState.registrationData, dateOfBirth } };
    };

    public static setEmailAddress = (previousState: AppState, emailAddress: string): Partial<AppState> => {
        return { registrationData: { ...previousState.registrationData, emailAddress } };
    };

    public static setPassword = (previousState: AppState, password: string): Partial<AppState> => {
        return { registrationData: { ...previousState.registrationData, password } };
    };

    public static setRegistrationEligibility = (
        previousState: AppState,
        eligibility: RegistrationEligibility
    ): Partial<AppState> => {
        // If email isn't set, try to get it from eligibility
        let email: string = '';
        if (eligibility.email) {
            email = eligibility.email;
        } else {
            if (eligibility.twoFaContactInfo) {
                const twoFaEmailAddresses = eligibility.twoFaContactInfo.filter(
                    contactInfo => contactInfo.contactType === OtpType.EMAIL
                );
                if (twoFaEmailAddresses && twoFaEmailAddresses.length) {
                    email = twoFaEmailAddresses[0].contact;
                }
            }
        }

        return { registrationData: { ...previousState.registrationData, eligibility, emailAddress: email } };
    };

    public static setSecurityQuestions = (
        previousState: AppState,
        questions: SecurityQuestion[]
    ): Partial<AppState> => {
        return { registrationData: { ...previousState.registrationData, questions } };
    };

    public static setUsername = (previousState: AppState, username: string): Partial<AppState> => {
        return { registrationData: { ...previousState.registrationData, username } };
    };
}
