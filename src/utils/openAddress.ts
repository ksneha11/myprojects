import { Address, GeolocationCoordinates } from 'atlas-services/src/models';
import { Linking, Platform } from 'react-native';
import { trimZipCode } from './inputFormatters';

// Use this if you know the address but not lat/long
export const openAddress = async (
    address: Address,
    geocoeApiKey: string,
    onError: (error: string) => void = () => {}
) => {
    try {
        const { latitude, longitude } = await geocode(address, geocoeApiKey);
        openLatLong(address, latitude, longitude, onError);
    } catch (error) {
        onError(error);
    }
};

// Use this if you know the lat/long. Does one less API request
export const openLatLong = async (
    address: Address,
    latitude: number,
    longitude: number,
    onError: (error: string) => void = () => {}
) => {
    try {
        const mapUrl = await latLongToUrl(address, latitude, longitude);
        await Linking.openURL(mapUrl);
    } catch (error) {
        onError(error);
    }
};

const latLongToUrl = async (address: Address, latitude: number, longitude: number): Promise<string> => {
    return Platform.select({
        android: `geo:${latitude},${longitude}?q=${encodeURI(address.streetAddress1)}`,
        ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURI(address.streetAddress1)}`
    })
};

export const geocode = async (address: Address, apiKey: string): Promise<GeolocationCoordinates> => {
    const baseURL = 'https://maps.google.com/maps/api/geocode/json';
    const addressQueryParam = convertAddressToQueryParam(address);
    const fullURL = `${baseURL}?address=${encodeURI(addressQueryParam)}&key=${apiKey}`;

    const response = await fetch(fullURL);
    const data = await response.json();
    const coordinates = data.results[0].geometry.location;
    return {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
    };
};

const convertAddressToQueryParam = (address: Address): string => {
    return `${address.streetAddress1} ${address.city}, ${address.state} ${trimZipCode(address.zipCode)}`;
};
