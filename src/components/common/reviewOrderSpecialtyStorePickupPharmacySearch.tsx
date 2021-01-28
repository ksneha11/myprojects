import { PharmacyInfo } from 'atlas-services/src/models';
import { GET_PHARMACIES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { ReviewOrderActions } from '../../context/navigation/actions';
import { PharmacySearchContainer } from '../pharmacy/pharmacySearch/defaultpharmacySearch';

export default class ReviewOrderSpecialtyStorePickupPharmacySearch extends PharmacySearchContainer {
    public async componentDidMount() {
        const { latitude, longitude } = this.appState.currentPosition.coords;
        const pharmacies: PharmacyInfo[] = [
            ...(await this.appContext.getServiceExecutor().execute(GET_PHARMACIES, {
                payload: {
                    address: {
                        latitude,
                        longitude,
                    },
                    distance: 75, // The maximum distance that allows user to accesses in application
                },
            })),
        ].filter(pharmacy => pharmacy.name.toUpperCase().includes('CVS'));

        const filteredPharmacies = this.filterPharmacies(pharmacies);
        this.appStateActions.pharmacies.setFilteredPharmacies(filteredPharmacies);
        this.appStateActions.pharmacies.setPharmacies(pharmacies);
        this.setState({
            isUsingCurrentLocation: this.isCurrentPositionDefined(),
        });
    }

    public render() {
        return (
            <PharmacySearchContainer
                isSpecialtyStorePickup
                isCVSOnly
                {...this.props}
                onPressSelect={this.onPressSelect}
            />
        );
    }

    protected onPressSelect = () => {
        this.navigate(ReviewOrderActions.SELECT_STORE_BUTTON_PRESSED);
    };
}
