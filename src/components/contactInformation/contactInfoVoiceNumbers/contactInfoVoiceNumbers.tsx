import MemberPreferences from 'atlas-services/src/models/memberPreferences';
import { GET_MEMBER_PREFERENCES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { ProfileActions } from '../../../context/navigation/actions';
import {
    getMemberPreferencesVoiceNumber,
    MemberPreferenceVoiceNumberTypes,
} from '../../../utils/memberPreferencesVoiceNumber';
import { BottomDrawerHandler } from '../../bottomDrawer/bottomDrawerHandler';
import AppComponent from '../../common/appComponent';
import { ContactInfoVoiceNumbersView, ViewProps } from './';
import { PharmacyVoiceNumber } from './pharmacyVoiceNumber';
import EditPharmacyVoiceNumber from './pharmacyVoiceNumber/editPharmacyVoiceNumber/editPharmacyVoiceNumber';

interface State {
    gbdVoiceNumber: string;
    isSuccessAlertVisible: boolean;
    pharmacyVoiceNumber: string;
    screenLevelSuccessMessage: string;
}
interface Props extends ViewProps {}

const defaultProps = {};

export class ContactInfoVoiceNumbers extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {
            gbdVoiceNumber: '',
            isSuccessAlertVisible: false,
            pharmacyVoiceNumber: '',
            screenLevelSuccessMessage: '',
        };
    }

    public componentDidMount() {
        this.getMemberPreferences();
    }

    public render() {
        return (
            <>
                <ContactInfoVoiceNumbersView
                    {...this.props}
                    style={this.style}
                    onPressAddVoiceNumber={this.onPressAddVoiceNumber}
                    onPressEditVoiceNumber={this.onPressEditVoiceNumber}
                    onPressAddPharmacyNumber={this.onPressAddPharmacyNumber}
                    onPressEditPharmacyNumber={this.onPressEditPharmacyNumber}
                    pharmacyNumber={this.state.pharmacyVoiceNumber ?? ''}
                    getVoiceNumber={this.getVoiceNumber}
                />
                <NavigationEvents onDidFocus={this.getMemberPreferences} />
            </>
        );
    }

    protected getMemberPreferences = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_MEMBER_PREFERENCES)
            .then(response => {
                this.setMemberPreferences(response);
            });
    };

    protected getPharmacyNumber = () => {
        return this.state.pharmacyVoiceNumber;
    };

    protected getVoiceNumber = () => {
        return getMemberPreferencesVoiceNumber(MemberPreferenceVoiceNumberTypes.ACCOUNT, this.appState);
    };

    protected onAddPharmacyPhoneSaveSuccess = async () => {
        await this.getPharmacyNumber();
        BottomDrawerHandler.hide();
        this.setState({
            isSuccessAlertVisible: true,
            screenLevelSuccessMessage: this.labels.contactInfoVoiceNumbers.addPharmacyVoiceNumberView.success,
        });
    };

    protected onEditPharmacyPhoneSaveSuccess = async () => {
        await this.getPharmacyNumber();
        BottomDrawerHandler.hide();
        this.setState({
            isSuccessAlertVisible: true,
            screenLevelSuccessMessage: this.labels.contactInfoVoiceNumbers.editPharmacyVoiceNumberView.success,
        });
    };

    protected onPressAddPharmacyNumber = () => {
        this.trackEvent({ name: 'Add a pharmacy number' });
        BottomDrawerHandler.show({
            content: <PharmacyVoiceNumber onPharmacyPhoneSaveSuccess={this.onAddPharmacyPhoneSaveSuccess} />,
            hasInputFields: true,
        });
    };

    protected onPressAddVoiceNumber = () => {
        this.navigate(ProfileActions.ADD_VOICE_NUMBERS_PRESSED);
    };

    protected onPressEditPharmacyNumber = () => {
        this.trackEvent({ name: 'Edit a pharmacy number' });
        BottomDrawerHandler.show({
            content: (
                <EditPharmacyVoiceNumber
                    voiceInput={this.state.pharmacyVoiceNumber}
                    onPharmacyPhoneSaveSuccess={this.onEditPharmacyPhoneSaveSuccess}
                />
            ),
            hasInputFields: true,
        });
    };

    protected onPressEditVoiceNumber = () => {
        this.navigate(ProfileActions.EDIT_VOICE_NUMBERS_PRESSED);
    };

    protected setMemberPreferences = (response: MemberPreferences) => {
        this.setState({
            gbdVoiceNumber: response.gbdSettings?.phoneNumber,
            pharmacyVoiceNumber: response.commercialSettings?.phoneNumber,
        });
    };
}

export default ContactInfoVoiceNumbers;
