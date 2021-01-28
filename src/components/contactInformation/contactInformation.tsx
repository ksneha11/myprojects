import { GET_MEMBER_PREFERENCES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import AppComponent from '../common/appComponent';
import { ContactInformationView, ViewProps } from './';

export default class ContactInformation extends AppComponent<Partial<ViewProps>> {
    public componentDidMount() {
        this.getMemberPreferences();
    }

    public render() {
        return <ContactInformationView {...this.props} style={this.style} />;
    }

    protected getMemberPreferences = (): void => {
        this.appContext
            .getServiceExecutor()
            .execute(GET_MEMBER_PREFERENCES)
            .then(response => {
                this.appStateActions.memberCommunications.setMemberPreferences(response);
            });
    };
}
