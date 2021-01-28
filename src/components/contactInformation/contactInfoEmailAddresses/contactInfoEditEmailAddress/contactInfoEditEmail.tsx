import React from 'react';
import { ContactInfoEmailAddressFields, Props as ParentProps } from '.';
import { getMemberPreferencesEmail, MemberPreferenceEmailTypes } from '../../../../utils';
import AppComponent from '../../../common/appComponent';

interface Props extends Partial<ParentProps> {}

export default class ContactInfoEditEmail extends AppComponent<Props> {
    public render() {
        return (
            <ContactInfoEmailAddressFields
                emailAddress={this.getMemberPreferencesEmail()}
                emailAddressScreenTitle={this.labels.contactInformation.emailAddress.editEmailAddress.screenTitle}
                validateConfirmEmailOnMount
            />
        );
    }

    protected getMemberPreferencesEmail() {
        return getMemberPreferencesEmail(MemberPreferenceEmailTypes.PHARMACY, this.appState);
    }
}
