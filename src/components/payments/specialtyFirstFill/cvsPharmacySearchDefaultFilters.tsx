import PharmacyInfo from 'atlas-services/src/models/pharmacyInfo';
import { Labels } from '../../../context/abstractAppContext';
import Filters from '../../filters';
import {
    getSpokenLanguages,
    languageFilters,
    storeHoursFilters,
} from '../../pharmacy/pharmacySearch/pharmacySearchFilters';

export default (pharmacies: PharmacyInfo[], labels: Labels) => {
    const spokenLanguages = getSpokenLanguages(pharmacies);
    return Filters.create<PharmacyInfo>({
        filters: [...languageFilters(spokenLanguages, labels), ...storeHoursFilters(labels)],
    });
};
