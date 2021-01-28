import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { GeolocationOptions } from 'atlas-services/src/models';
import { Alert, Linking, Platform } from 'react-native';

const showLocationSettingsiOS = async (onFailure: noop): Promise<void> => {
    Alert.alert('Location Services Disabled', 'Please enable Location Services in Settings', [
        {
            onPress: () => {
                onFailure();
                return;
            },
            style: 'cancel',
            text: 'Cancel',
        },
        {
            onPress: () => {
                Linking.openURL('app-settings:');
                onFailure();
            },
            text: 'Settings',
        },
    ]);
};

export const currentLocation = (onSuccess: (position: GeolocationResponse) => void, onFailure: noop): void => {
    const options: GeolocationOptions =
        Platform.OS === 'android'
            ? { enableHighAccuracy: false, timeout: 200000 }
            : { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 };

    Geolocation.getCurrentPosition(
        position => {
            onSuccess(position);
        },
        error => {
            if (Platform.OS === 'ios') {
                showLocationSettingsiOS(onFailure);
            } else {
                onFailure();
            }
        },
        options
    );
};
