import { IdCard } from 'atlas-services/src/models';
import { GET_ID_CARD_INFORMATION } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { Props, SpecialtyPaperPrescriptionView } from '.';
import { SpecialtyFirstFillActions } from '../../../context/navigation/actions/specialtyFirstFill.actions';
import { getPbmPhoneNumber } from '../../../utils/idCards';
import AppComponent from '../../common/appComponent';

export interface State {
    pbmPhoneNumber: string;
}

export class SpecialtyPaperPrescription extends AppComponent<Partial<Props>, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            pbmPhoneNumber: '',
        };
    }

    public componentDidMount() {
        this.getPbmPhoneNumber();
    }

    public render() {
        return (
            <SpecialtyPaperPrescriptionView
                {...this.props}
                onPressPharmacySearch={this.onCVSPharmacySearchPress} // TODO: shouldn't this be before {...props}?
                pbmPhoneNumber={this.state.pbmPhoneNumber}
            />
        );
    }

    protected getPbmPhoneNumber = () => {
        this.executeService(GET_ID_CARD_INFORMATION, (idCards: IdCard[] = []) => {
            const pbmPhoneNumber =
                getPbmPhoneNumber(idCards) || this.logger.warn('could not find the pbm phone number in idCards') || '';
            this.setState({ pbmPhoneNumber });
        });
    };

    protected onCVSPharmacySearchPress = () => {
        return this.navigate(SpecialtyFirstFillActions.PHARMACY_SEARCH_PRESSED);
    };
}

export default SpecialtyPaperPrescription;
