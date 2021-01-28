import { TwoFactorAuthenticationContactInfo } from 'atlas-services/src/models';

export default interface TwoFactorAuthenticationData {
    contactInfo: TwoFactorAuthenticationContactInfo[];
    memberUid?: string;
    password?: string;
    selectedContactInfo?: TwoFactorAuthenticationContactInfo;
    username?: string;
}