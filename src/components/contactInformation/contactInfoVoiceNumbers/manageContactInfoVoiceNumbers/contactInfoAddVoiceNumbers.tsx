import { Preferences } from 'atlas-services/src/models/memberPreferences';
import React from 'react';
import {
    getMemberPreferencesVoiceNumber,
    MemberPreferenceVoiceNumberTypes,
} from '../../../../utils/memberPreferencesVoiceNumber';
import AppComponent from '../../../common/appComponent';
import { AccountVoiceNumber } from '../accountVoiceNumber';
import ViewProps from '../contactInfoVoiceNumbers.view';

interface Props extends ViewProps {}

const defaultProps = {};

export class ContactInfoAddVoiceNumbers extends AppComponent<Props> {
    public static defaultProps = defaultProps;

    public render() {
        const labels = this.labels.contactInfoVoiceNumbers.addVoiceNumberView;
        return (
            <AccountVoiceNumber
                optIn={false}
                voiceNumberSubHeading={labels.subHeading}
                voiceNumberScreenTitle={labels.heading}
                voiceNumberLabel={labels.accountVoiceNumberInputFieldTitle}
                voiceNumberPrimaryButtonLabel={labels.save}
                voiceNumberSecondaryButtonLabel={labels.cancel}
                voiceNumberUpdateSuccessLabel={labels.success}
                getVoiceNumber={this.getMemberPreferenceVoiceNumber}
            />
        );
    }

    protected getMemberPreferenceVoiceNumber = () => {
        return getMemberPreferencesVoiceNumber(MemberPreferenceVoiceNumberTypes.PHARMACY, this.appState);
    };
}
export default ContactInfoAddVoiceNumbers;
