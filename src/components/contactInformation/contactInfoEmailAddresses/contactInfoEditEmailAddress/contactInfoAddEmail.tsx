import React from 'react';
import { ContactInfoEmailAddressFields, Props as ParentProps } from '.';
import AppComponent from '../../../common/appComponent';

interface Props extends Partial<ParentProps> {}

export default class ContactInfoAddEmail extends AppComponent<Props> {
    public render() {
        const labels = this.labels.contactInformation.emailAddress.addEmailAddress;

        return (
            <ContactInfoEmailAddressFields
                emailAddressScreenTitle={labels.screenTitle}
                validateConfirmEmailOnMount={false}
            />
        );
    }
}
