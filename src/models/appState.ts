import {
    AccountInfo,
    Address,
    ClientClaim,
    FamilyAccessInformation,
    FupData,
    GeolocationPosition,
    IdCard,
    Languages,
    MedicalProfile,
    MemberContext,
    MemberPreferences,
    MemberProfile,
    MemberTOUStatus,
    OrderInfo,
    PayAccountBalanceCart,
    PaymentMethod,
    PharmacyInfo,
    PrescriberInfo,
    PrescriptionCart,
    PrescriptionInfo,
    RecurringPaymentMethod,
    RegistrationData,
    ShippingType,
} from 'atlas-services/src/models';
import { Preferences } from 'atlas-services/src/models/memberPreferences';
import UserData from 'atlas-services/src/models/userData';
import { TwoFactorAuthenticationData } from '.';

export default interface AppState {
    actionablePrescriptions?: PrescriptionInfo[];
    claims?: {
        clientClaims: ClientClaim[];
    };
    currentPosition?: GeolocationPosition;
    defaultAddress?: Address;
    defaultPharmacy?: PharmacyInfo;
    favoritePharmacyId?: string;
    filteredPharmacies?: PharmacyInfo[];
    fupData?: FupData;
    idCards: IdCard[];
    isBiometricLogin?: boolean;
    isCurrentLocationRequested?: boolean;
    isLoggedIn?: boolean;
    isRenew?: boolean;
    isScreenReaderEnabled: boolean;
    manageAutoCart: PrescriptionCart;
    manageAutoEnrollmentData?: {
        selectedMedicalProfile: MedicalProfile;
        selectedPrescription: PrescriptionInfo;
    };
    medicalProfiles?: MedicalProfile[];
    memberAddresses: Address[];
    memberContext?: MemberContext;
    memberPreferences?: Preferences;
    memberProfile?: MemberProfile;
    membersTOUStatus?: MemberTOUStatus[];
    myFamilyAccessRights?: FamilyAccessInformation;
    nonActionablePrescriptions?: PrescriptionInfo[];
    optedOutPrescriptionId: PrescriptionInfo['id'];
    payAccountBalanceCart: PayAccountBalanceCart;
    pbmAccountBalance?: number;
    pbmAccounts?: AccountInfo[];
    pharmacies?: PharmacyInfo[];
    pharmacy?: PharmacyInfo;
    prescribers?: PrescriberInfo[];
    prescriptionCart?: PrescriptionCart;
    processedPrescription?: PrescriptionInfo;
    registrationData?: RegistrationData;
    savingOpportunityPrescription?: PrescriptionInfo;
    selectedAddress?: Address;
    selectedLanguage: Languages;
    selectedOrder?: OrderInfo;
    selectedPaymentMethod?: PaymentMethod;
    selectedPharmacy?: PharmacyInfo;
    selectedRetailPrescription?: PrescriptionInfo; // current retail prescription item selected retailPrescriptionItem
    selectedShippingType?: ShippingType;
    selectedSpecialtyPaymentMethod?: RecurringPaymentMethod;
    sessionToken?: string;
    specialtyAccountBalance?: number;
    specialtyAccounts?: AccountInfo[];
    totalAccountBalance?: number;
    twoFactorAuthenticationData: TwoFactorAuthenticationData;
    userData?: UserData;
}
