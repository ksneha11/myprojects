import React from 'react';
import { PharmacyDetails } from '../../../pharmacy/pharmacySearch';

export default class SpecialtyFirstFillPharmacyDetails extends PharmacyDetails {
    public render() {
        return <PharmacyDetails {...this.props} />;
    }
}
