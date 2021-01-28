import { AppData, MemberContext, MemberRestrictions } from 'atlas-services/src/models';
import { Subject } from 'rxjs';
import { AppContextInterface } from '../context';
import { Restriction } from './restriction';

export declare type FeatureMap = Map<FeatureNames, Feature>;
export class Feature {
    constructor(public isRendered: boolean = true, public restriction: Restriction = null) {}
}

export enum FeatureNames {
    ABOUT_APP = 'ABOUT_APP',
    ACCESSIBILITY = 'ACCESSIBILITY',
    ACCOUNT_PREFERENCES = 'ACCOUNT_PREFERENCES',
    APPTENTIVE = 'APPTENTIVE',
    BIOMETRIC_LOGIN = 'BIOMETRIC_LOGIN',
    BENEFITS_DENTAL_CARE = 'BENEFITS_DENTAL_CARE',
    BENEFITS_MEDICAL_CARE = 'BENEFITS_MEDICAL_CARE',
    BENEFITS_PHARMACY = 'BENEFITS_PHARMACY',
    BENEFITS_VISION = 'BENEFITS_VISION',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    CHANGE_PCP = 'CHANGE_PCP',
    CHANGE_SECURITY_QUESTIONS = 'CHANGE_SECURITY_QUESTIONS',
    CLAIMS = 'CLAIMS',
    COLD_STATE_MENU = 'COLD_STATE_MENU',
    COMMUNICATION_PREFERENCES = 'COMMUNICATION_PREFERENCES',
    COMMUNICATION_PREFERENCES_MATERIALS = 'COMMUNICATION_PREFERENCES_MATERIALS',
    COMMUNICATION_PREFERENCES_PHARMACY = 'COMMUNICATION_PREFERENCES_PHARMACY',
    COMMUNITY_RESOURCES = 'COMMUNITY_RESOURCES',
    CONTACT_INFO = 'CONTACT_INFO',
    CONTACT_US = 'CONTACT_US',
    DRUG_DISPLAY_OPTIONS = 'DRUG_DISPLAY_OPTIONS',
    EXPLANATION_OF_BENEFITS = 'EXPLANATION_OF_BENEFITS',
    FIND_A_DOCTOR = 'FIND_A_DOCTOR',
    FIND_CARE = 'FIND_CARE',
    FIND_PHARMACY = 'FIND_PHARMACY',
    FORESEE = 'FORESEE',
    FORGOT_USERNAME_PASSWORD = 'FORGOT_USERNAME_PASSWORD',
    GENERAL_ACCESSIBILITY = 'GENERAL_ACCESSIBILITY',
    ID_CARD = 'ID_CARD',
    IN_YOUR_COMMUNITY = 'IN_YOUR_COMUMNITY',
    LANGUAGES = 'LANGUAGES',
    LOGIN = 'LOGIN',
    LOGIN_AND_SECURITY = 'LOGIN_AND_SECURITY',
    MEDICAL_PROFILE = 'MEDICAL_PROFILE',
    MEMBER_INFORMATION = 'MEMBER_INFORMATION',
    MEMBER_MATERIALS = 'MEMBER_MATERIALS',
    MOBILE_ACCESSIBILITY = 'MOBILE_ACCESSIBILITY',
    MULTI_PLAN = 'MULTI_PLAN',
    MULTI_STATE = 'MULTI_STATE',
    OTHER_ACCESSIBILITY_FORMAT = 'OTHER_ACCESSIBILITY_FORMAT',
    PCP_INFO = 'PCP_INFO',
    PDF_ACCESSIBILITY = 'PDF_ACCESSIBILITY',
    PHARMACY = 'PHARMACY',
    PHARMACY_ADDRESS = 'PHARMACY_ADDRESS',
    PHARMACY_DEEPLINKED = 'PHARMACY_DEEPLINKED',
    PHARMACY_EMAIL = 'PHARMACY_EMAIL',
    PHARMACY_PAYMENT_METHODS = 'PHARMACY_PAYMENT_METHODS',
    PHARMACY_PBM = 'PHARMACY_PBM',
    PHARMACY_PREFERENCES_MEDICATION_ALERTS = 'PHARMACY_PREFERENCES_MEDICATION_ALERTS',
    PHARMACY_PREFERENCES_PAYMENT_NOTICES = 'PHARMACY_PREFERENCES_PAYMENT_NOTICES',
    PHARMACY_PREFERENCES_ORDER_STATUS = 'PHARMACY_PREFERENCES_ORDER_STATUS',
    PHARMACY_PREFERENCES_REFIL_REMINDER = 'PHARMACY_PREFERENCES_REFIL_REMINDER',
    PHARMACY_SPECIALTY = 'PHARMACY_SPECIALTY',
    PLAN_BENEFITS = 'PLAN_BENEFITS',
    PRIVACY_INGENIO_HOME_DELIVERY_NOTICE = 'PRIVACY_INGENIO_HOME_DELIVERY_NOTICE',
    PRIVACY_INGENIO_SPECIALTY_NOTICE = 'PRIVACY_INGENIO_SPECIALTY_NOTICE',
    PRIVACY_POLICY = 'PRIVACY_POLICY',
    PROFILE = 'PROFILE',
    PROFILE_EMAIL_ADDRESSES = 'PROFILE_EMAIL_ADDRESSES',
    PROFILE_PHYSICAL_ADDRESSES = 'PROFILE_PHYSICAL_ADDRESSES',
    PROFILE_VOICE_NUMBERS = 'PROFILE_VOICE_NUMBERS',
    PROFILE_TEXT_NUMBERS = 'PROFILE_TEXT_NUMBERS',
    REGISTRATION = 'REGISTRATION',
    RENEWAL_BENEFITS = 'RENEWAL_BENEFITS',
    SYMPTOM_CHECKER = 'SYMPTOM_CHECKER',
    SUPPORT = 'SUPPORT',
    SUPPORT_FREQUENT_QUESTIONS = 'SUPPORT_FREQUENT_QUESTIONS',
    SUPPORT_MESSAGE = 'SUPPORT_MESSAGE',
    SUPPORT_CALL = 'SUPPORT_CALL',
    TALK_TO_NURSE = 'TALK_TO_NURSE',
    TERMS_OF_USE = 'TERMS_OF_USE',
    TOUCH_ID = 'TOUCH_ID',

    TOU_APPROPRIATENESS_OF_CONTENT = 'TOU_APPROPRIATENESS_OF_CONTENT',
    TOU_CAREGIVER_ACCESS = 'TOU_CAREGIVER_ACCESS',
    TOU_CHANGES_TO_THESE_TERMS = 'TOU_CHANGES_TO_THESE_TERMS',
    TOU_DIGITAL_MILLENNIUM_COPY_RIGHTACT = 'TOU_DIGITAL_MILLENNIUM_COPY_RIGHTACT',
    TOU_DISCLAIMER_OF_WARRANTY = 'TOU_DISCLAIMER_OF_WARRANTY',
    TOU_ENCRYPTION = 'TOU_ENCRYPTION',
    TOU_LEGAL = 'TOU_LEGAL',
    TOU_LIABILITY = 'TOU_LIABILITY',
    TOU_LIMITATION_OF_LIABILITY = 'TOU_LIMITATION_OF_LIABILITY',
    TOU_LIMITATIONS = 'TOU_LIMITATIONS',
    TOU_LINKING_TO_OTHER_APPLICATIONS = 'TOU_LINKING_TO_OTHER_APPLICATIONS',
    TOU_LINKING_TO_OTHER_SITES = 'TOU_LINKING_TO_OTHER_SITES',
    TOU_MATERIALS = 'TOU_MATERIALS',
    TOU_MEDICARE_PLANS = 'TOU_MEDICARE_PLANS',
    TOU_MISCELLANEOUS = 'TOU_MISCELLANEOUS',
    TOU_NOTICES = 'TOU_NOTICES',
    TOU_OUR_HEALTH_CONTENT = 'TOU_OUR_HEALTH_CONTENT',
    TOU_OUT_OF_NETWORK_REIMBURSEMENT = 'TOU_OUT_OF_NETWORK_REIMBURSEMENT',
    TOU_PASSWORDS_AND_ACCOUNT = 'TOU_PASSWORDS_AND_ACCOUNT',
    TOU_PHARMACY_BENEFIT_MANAGEMENT_SERVICES = 'TOU_PHARMACY_BENEFIT_MANAGEMENT_SERVICES',
    TOU_PRESCRIPTION_NOFICATIONS_PROGRAM = 'TOU_PRESCRIPTION_NOFICATIONS_PROGRAM',
    TOU_PRIVACY_AND_SECURITY = 'TOU_PRIVACY_AND_SECURITY',
    TOU_PRODUCTS_AND_TRANSACTIONS = 'TOU_PRODUCTS_AND_TRANSACTIONS',
    TOU_PROVIDER_FINDER = 'TOU_PROVIDER_FINDER',
    TOU_QUESTIONS = 'TOU_QUESTIONS',
    TOU_STATEMENT = 'TOU_STATEMENT',
    TOU_TERMINATION = 'TOU_TERMINATION',
    TOU_USE_OF_EMAIL_AND_FAX = 'TOU_USE_OF_EMAIL_AND_FAX',
    TOU_USE_OF_INFORMATION_AND_RESOURCES = 'TOU_USE_OF_INFORMATION_AND_RESOURCES',
    TOU_USE_OF_MATERIAL = 'TOU_USE_OF_MATERIAL',
    TOU_USE_OF_THIS_APPLICATION = 'TOU_USE_OF_THIS_APPLICATION',
    TOU_USE_OF_VOICE_ENABLED_DEVICES = 'TOU_USE_OF_VOICE_ENABLED_DEVICES',
    TOU_YOUR_SUBMISSIONS = 'TOU_YOUR_SUBMISSIONS',

    TEMPORARY_PASSWORD_RESET = 'TEMPORARY_PASSWORD_RESET',
    TWO_FACTOR_AUTHENTICATION = 'TWO_FACTOR_AUTHENTICATION',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    UPDATE_SECURITY_QUESTIONS = 'UPDATE_SECURITY_QUESTIONS',
    VOICE_TEXT_PHONE_NUMBER = 'VOICE_TEXT_PHONE_NUMBER',
    VISIT_WEBSITE = 'VISIT_WEBSITE',
    WASTE_FRAUD_ABUSE = 'WASTE_FRAUD_ABUSE',
}

export default class Features {
    protected features: FeatureMap;

    constructor(
        private readonly appContext: AppContextInterface,
        appData: Subject<AppData>,
        appDataEs: Subject<AppData>
    ) {
        // Sets default features to all enabled
        this.features = new Map<FeatureNames, Feature>();
        for (const item of Object.values(FeatureNames)) {
            this.features.set(item as FeatureNames, new Feature());
        }
        this.features.set(FeatureNames.IN_YOUR_COMMUNITY, new Feature(false));
        // Most apps aren't multi-state, so default is false
        this.features.set(FeatureNames.MULTI_STATE, new Feature(false));
        this.features.set(FeatureNames.TWO_FACTOR_AUTHENTICATION, new Feature(false));

        // default for AppTentive is false
        this.features.set(FeatureNames.APPTENTIVE, new Feature(false));

        // This is a TOU Section for NY
        this.features.set(FeatureNames.TOU_USE_OF_VOICE_ENABLED_DEVICES, new Feature(false));

        appData.subscribe(this.onAppDataUpdate);
        appDataEs.subscribe(this.onAppDataUpdate);
    }

    public getRestriction = (feature: FeatureNames): Restriction => {
        return this.features.get(feature).restriction;
    };

    public isRendered = (feature: FeatureNames | FeatureNames[]): boolean => {
        if (Array.isArray(feature)) {
            return feature.every(featureName => this.features.get(featureName).isRendered);
        } else {
            return this.features.get(feature).isRendered;
        }
    };

    public isRestricted = (feature: FeatureNames): boolean => {
        return !!this.features.get(feature).restriction;
    };

    protected onAppDataUpdate = async (data: AppData) => {
        const memberContext: MemberContext = this.appContext.state.memberContext;
        // Shouldn't be async, but we need this to finish before the next line is called
        this.features = await this.setDisabledFeatures(memberContext, new Map(this.features));
        await this.setMemberRestrictedFeatures(memberContext, this.features);

        if (data.disabledFeatures) {
            (data.disabledFeatures as FeatureNames[]).forEach(featureName =>
                this.features.set(featureName, new Feature(false))
            );
        }
    };

    protected setDisabledFeatures(memberContext: MemberContext, features: FeatureMap): FeatureMap {
        /*
         * each app has hard limitations that we cannot override with feature flags
         *
         */

        return features;
    }

    protected setMemberRestrictedFeatures(memberContext: MemberContext, features: FeatureMap) {
        if (memberContext.restrictionInfo) {
            const restrictPhoneChange = memberContext.restrictionInfo.restrictions.includes(
                MemberRestrictions.TELEPHONE_CHANGE
            );
            features.set(FeatureNames.PROFILE_VOICE_NUMBERS, new Feature(!restrictPhoneChange));
        }
    }
}
