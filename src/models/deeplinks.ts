import { StateLob } from 'atlas-services/src/models';
import { PlanType } from '../utils/planType';

export default interface Deeplinks {
    appStore: string;
    changePcp: string;
    checkSymptoms: string;
    communityResources: string;
    contactInfoPortal: string;
    findDoctor: string;
    findPharmacy: string;
    managePharmacy?: string;
    messageUs: string;
    planSpecificLinks?: PlanSpecificLinks;
    playStore: string;
    requestCall?: string;
    visitWebsite: string;
    wasteFraudAbuse: string;
}

export type PlanSpecificLinks = {
    [planLink in PlanType]: string;
};

export type StateToPlanSpecificLinks = {
    [state in StateLob]: PlanSpecificLinks;
};
