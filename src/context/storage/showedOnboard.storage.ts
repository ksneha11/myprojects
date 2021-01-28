import { getFromStorage, saveToStorage } from './storage';

const SHOW_ONBOARD_STORAGE_KEY = 'SHOW_ONBOARD'; // this key is already existed in localStorage if the user have already downloaded the app.
const SHOW_PHARMACY_ONBOARDING_STORAGE_KEY = 'SHOW_PHARMACY_ONBOARDING';

export const isMedicaidOnboardingRequired = async (): Promise<boolean> => {
    // If no key is there, user hasn't completed medicaid onboarding and they should show it
    return isOnboardingRequired(SHOW_ONBOARD_STORAGE_KEY);
};

const isOnboardingRequired = async (key: string): Promise<boolean> => {
    const fromStorage = await getFromStorage(key);
    // if no key has been set before, we want to immediately return true
    // the user has never gone through onboarding, so the result in storage will be null/undefined
    if (fromStorage === null || typeof fromStorage === 'undefined') {
        return true;
    }
    /*
     * if fromStroage was not null or undefined, that means the user has either gone through
     * onboarding, or started onboarding without completing it
     *
     * i don't think we ever set this to true explicitly, i believe we set it to false
     * after onboarding has been closed
     *
     * we can simply return the key from storage to tell us whether onboarding is required
     */
    return fromStorage as boolean;
};

export const setMedicaidOnboardingRequired = (medicaidOnboardingRequired: boolean): void => {
    saveToStorage(SHOW_ONBOARD_STORAGE_KEY, medicaidOnboardingRequired);
};
export const isPharmacyOnboardingRequired = async (): Promise<boolean> => {
    // If no key is there, user hasn't completed pharmacy onboarding and they should show it
    return isOnboardingRequired(SHOW_PHARMACY_ONBOARDING_STORAGE_KEY);
};

export const setPharmacyOnboardingRequired = (showPharmacyOnBoard: boolean): void => {
    saveToStorage(SHOW_PHARMACY_ONBOARDING_STORAGE_KEY, showPharmacyOnBoard);
};
