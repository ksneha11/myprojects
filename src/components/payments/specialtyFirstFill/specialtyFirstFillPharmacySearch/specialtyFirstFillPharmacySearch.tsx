import PharmacyInfo from 'atlas-services/src/models/pharmacyInfo';
import { GET_PHARMACIES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import PharmacySearchContainer from '../../../pharmacy/pharmacySearch/defaultpharmacySearch/pharmacySearchContainer';

export default class SpecialtyFirstFillPharmacySearch extends PharmacySearchContainer {
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
        ].filter(pharmacy => pharmacy.name.includes('CVS'));

        const filteredPharmacies = this.filterPharmacies(pharmacies);
        this.appStateActions.pharmacies.setFilteredPharmacies(filteredPharmacies);
        this.appStateActions.pharmacies.setPharmacies(pharmacies);
        this.setState({
            isUsingCurrentLocation: this.isCurrentPositionDefined(),
        });
    }

    public render() {
        return <PharmacySearchContainer isCVSOnly isSpecialtyScreen {...this.props} />;
    }
}
