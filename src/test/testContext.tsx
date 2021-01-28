import {
    AccountTypes,
    AddressType,
    CreditCard,
    Languages,
    MemberPreferences,
    PharmacyInfo,
} from 'atlas-services/src/models';
import { AdobeService, AnalyticsService } from 'atlas-services/src/services';
import React from 'react';
import { View } from 'react-native';
import { NavigationState } from 'react-navigation';
import { Subject } from 'rxjs';
import { mockColorSchema } from '.';
import { AppContext } from '../App';
import { AppContextInterface } from '../context';
import labels from '../context/content/labels.json';
import { DefaultAppStateActions, Features, TwoFactorAuthenticationData } from '../models';
import deepClone from '../utils/deepClone';

export default class TestContext implements React.ContextType<typeof AppContext> {
    // Fill these out as need for testing
    public appContext: AppContextInterface = {
        _bind: null,
        colorSchema: mockColorSchema,
        _wrapApp: children => children,
        appStateActions: {
            accessRights: {
                setMyFamilyAccessRights: () => {},
            },
            accessibility: {
                setScreenReaderEnabled: () => {},
            },
            address: {
                setDefaultAddress: () => {},
                setMemberAddresses: () => {},
                setSelectedAddress: () => {},
            },
            cart: {
                clearCart: () => {},
                loadPrescriptions: () => {},
                setDeliveryAddress: () => {},
                setDeliveryAddressSpecialty: () => {},
                setOrderForDelivery: () => {},
                setPaymentMethod: () => {},
                setPickupAddress: () => {},
                setShippingDate: () => {},
                setSpecialtyQuestions: () => {},
                setStoreId: () => {},
                togglePrescription: () => {},
                updateSelectedShippingOption: () => {},
            },
            forceUpdate: {
                setForceUpdate: () => {},
            },
            fup: {
                setMemberInfo: () => {},
                setSecurityQuestion: () => {},
                setUsername: () => {},
            },
            idCard: {
                setIdCards: () => {},
            },
            languages: {
                updateSelectedLanguage: () => {},
            },
            location: {
                setCurrentLocation: () => {},
                setLocationRequestStatus: () => {},
            },
            login: {
                isLoggedIn: () => {},
            },
            loginSecurity: {
                isBiometricLogin: () => {},
            },
            logout: {
                clearAppState: () => {},
            },
            manageAuto: {
                clearManageAutoEnrollmentData: () => {},
                isRenew: () => {},
                setSelectedMedicalProfile: () => {},
                setSelectedPrescription: () => {},
                updatePrescriptionPreferences: () => {},
            },
            manageAutoCart: {
                clearCart: () => {},
                setDeliveryAddress: () => {},
                setOrderForDelivery: () => {},
                setPaymentMethod: () => {},
                setPickupAddress: () => {},
                setShippingDate: () => {},
                setStoreId: () => {},
                togglePrescription: () => {},
                toggleRefill: () => {},
                toggleRenew: () => {},
                updateSelectedShippingOption: () => {},
            },
            medicalProfiles: {
                setMedicalProfiles: () => {},
            },
            memberCommunications: {
                setMemberCommercialEmail: () => {},
                setMemberCommercialText: () => {},
                setMemberCommercialVoice: () => {},
                setMemberPreferences: () => {},
            },
            memberContext: {
                setMemberContext: () => new Promise(() => {}),
                setMemberInfo: () => new Promise(() => {}),
            },
            memberProfile: {
                setMemberProfile: () => {},
                setMemberTOUConsentStatus: (id, status) => {},
            },
            orders: {
                setSelectedOrder: () => {},
            },
            payAccountBalance: {
                setAmountDue: () => {},
                setPaymentAmount: () => {},
                setPbmAccountBalance: () => {},
                setPbmAccounts: pbmAccounts => {},
                setSelectedPbmPaymentMethod: () => {},
                setSelectedSpecialtyAccount: () => {},
                setSelectedSpecialtyPaymentMethod: () => {},
                setSpecialtyAccountBalance: () => {},
                setSpecialtyAccounts: specialtyAccounts => {},
                setTotalAccountBalance: totalAccountBalance => {},
            },
            payments: {
                setSelectedPaymentMethod: () => {},
                setSelectedSpecialtyPaymentMethod: () => {},
            },
            pharmacies: {
                setDefaultPharmacy: () => {},
                setFilteredPharmacies: () => {},
                setPharmacies: () => {},
                setSelectedPharmacy: () => {},
            },
            prescribers: {
                setApprovingPrescriber: () => {},
                setSearchedPrescribers: () => {},
            },
            registration: {
                clearRegistrationData: () => {},
                setAccountRecoveryNumber: () => {},
                setDateOfBirth: () => {},
                setEmail: () => {},
                setPassword: () => {},
                setRegistrationEligibility: () => {},
                setSecurityQuestions: () => {},
                setUsername: () => {},
            },
            savingOpportunity: {
                setOptedOutPrescriptionId: () => {},
                setProcessedPrescription: () => {},
                setSelectedPrescription: () => {},
                setSelectedRetailPrescription: () => {},
                updateSelectedShippingType: () => {},
            },
            twoFactorAuthenticationData: {
                clearTwoFactorData: () => new Promise(() => {}),
                setContactInfo: () => new Promise(() => {}),
                setSelectedContactInfo: () => new Promise(() => {}),
                setUsernamePassword: () => new Promise(() => {}),
            },
            userData: {
                changeUsername: () => {},
                setPassword: () => {},
            },
        },
        content: {
            deeplinks: null,
            endpoints: null,
            exceptions: null,
            supportedVersions: null,
        },
        features: new Features({ state: {} } as AppContextInterface, new Subject(), new Subject()),
        getAnalyticsService: (): AnalyticsService =>
            new AdobeService('adobeId', 'appId', 'env', new Promise(resolve => ''), '12.3'),

        getComponentOverride: (name: string) => null,
        getErrorModal: () => <View />,
        getIcon: (name, iconProps?) => <View />,
        getImage: (name, imageProps?) => <View />,
        getInjectedContent: () => <View />,
        getLoadingIndicator: () => <></>,
        getNavigationHandler: () => ({
            __provideNavigator: () => {},
            getCurrentRoute: () => ({} as Partial<NavigationState>),
            getParams: () => '',
            navigate: () => {},
            navigateBack: () => {},
            navigateToLandingScreen: () => {},
            setParams: () => {},
        }),
        getRootNavigator: () => null,
        getServiceExecutor: () => null,
        getSessionHandler: () => null,
        getSurveyService: () => null,
        inactivityWrapper: () => <View />,
        isCurrentLocationRequired: () => false,
        isMockMode: () => true,
        labels,
        logger: null,
        state: {
            actionablePrescriptions: [],
            defaultPharmacy: {} as PharmacyInfo,
            filteredPharmacies: [],
            idCards: [],
            isScreenReaderEnabled: false,
            manageAutoCart: deepClone({
                pharmacy: {
                    address: null,
                    paymentMethod: null,
                    prescriptionRefills: [],
                    prescriptionRenewals: [],
                    shippingOption: null,
                },
                specialty: {
                    address: null,
                    isSignatureRequiredForDelivery: false,
                    paymentMethod: null,
                    prescriptionRefills: [],
                    prescriptionRenewals: [],
                    shippingOption: null,
                },
            }),
            medicalProfiles: [
                {
                    allergies: [],
                    diagnoses: [],
                    isCompleted: true,
                    memberDetails: null,
                    memberUid: null,
                },
            ],
            memberAddresses: [],
            memberPreferences: new MemberPreferences([], {}, {}),
            nonActionablePrescriptions: [],
            optedOutPrescriptionId: '',
            payAccountBalanceCart: {
                amountDue: 0,
                paymentAmount: 0,
                selectedPbmPaymentMethod: null,
                selectedSpecialtyAccount: {
                    accountBalance: '0',
                    accountBalancePaymentInfo: {
                        achAuthorizationRequired: false,
                        recentPayment: false,
                        recentPaymentAmount: '0',
                    },
                    accountHolder: {
                        address: {
                            addressType: AddressType.HOME_ADDRESS,
                            city: '',
                            county: '',
                            id: '',
                            isDefaultAddress: false,
                            latitude: 0,
                            longitude: 0,
                            state: '',
                            storeName: '',
                            streetAddress1: '',
                            streetAddress2: '',
                            zipCode: '',
                            zipCodeSuffix: '',
                        },
                        dob: '',
                        emailAddress: '',
                        firstName: '',
                        lastName: '',
                        middleInitial: '',
                        middleName: '',
                        participantId: 0,
                        phoneExtension: '',
                        phoneNumber: '',
                    },
                    accountId: '',
                    accountType: AccountTypes.CREDIT,
                    isFlexSpendingAccount: false,
                    lastPaymentAmount: '',
                    memberUid: '',
                    paymentMethods: [],
                },
                selectedSpecialtyPaymentMethod: null,
            },
            pbmAccountBalance: 0,
            pharmacies: [],
            prescriptionCart: deepClone({
                pharmacy: {
                    address: null,
                    paymentMethod: null,
                    prescriptionRefills: [],
                    prescriptionRenewals: [],
                    shippingOption: null,
                },
                specialty: {
                    address: null,
                    isSignatureRequiredForDelivery: false,
                    paymentMethod: null,
                    prescriptionRefills: [],
                    prescriptionRenewals: [],
                    shippingOption: null,
                },
            }),
            selectedAddress: {
                addressType: AddressType.MAILING_ADDRESS,
                city: 'Norfolk',
                id: '11',
                isDefaultAddress: true,
                state: 'VA',
                streetAddress1: '1111 One St',
                zipCode: '11111',
            },
            selectedLanguage: Languages.EN,
            selectedPaymentMethod: {} as CreditCard,
            selectedPharmacy: null,
            specialtyAccountBalance: 0,
            twoFactorAuthenticationData: {} as TwoFactorAuthenticationData,
            userData: { userName: '', password: '', planInfo: null },
        },
        styleOverrides: {},
    };

    public get appState() {
        return this.appContext.state;
    }

    public get appStateActions(): DefaultAppStateActions {
        return this.appContext.appStateActions;
    }

    public get getIcon() {
        return this.appContext.getIcon;
    }

    public get getImage() {
        return this.appContext.getImage;
    }

    public get labels() {
        return this.appContext.labels;
    }

    public updateAppState = (appContext: AppContextInterface) => {};
}
