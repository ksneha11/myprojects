import { Preferences } from 'atlas-services/src/models/memberPreferences';
import { GET_MEMBER_PREFERENCES } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { ProfileActions } from '../../../context/navigation/actions';
import { getMemberPreferencesEmail, MemberPreferenceEmailTypes } from '../../../utils';
import AppComponent from '../../common/appComponent';
import { ContactInfoEmailAddressesView, ViewProps } from './';

export interface State {}
export interface Props extends ViewProps {}

const defaultProps = {};

class ContactInfoEmailAddresses<P extends Props = Props, S extends State = State> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;

    constructor(props: P) {
        super(props);

        this.state = {} as S;
    }

    public render() {
        return (
            <>
                <ContactInfoEmailAddressesView
                    onPressAddEmailAddress={this.onPressAddEmailAddress}
                    onPressEditEmailAddress={this.onPressEditEmailAddress}
                    emailAddress={this.getMemberPreferencesEmail()}
                    {...this.props}
                    style={this.style}
                />
                <NavigationEvents onDidFocus={this.getMemberPreferences} />
            </>
        );
    }

    protected getMemberPreferences = async (): Promise<void> => {
        return this.appContext
            .getServiceExecutor()
            .execute(GET_MEMBER_PREFERENCES)
            .then(response => {
                this.setMemberPreferences(response);
            });
    };

    protected getMemberPreferencesEmail() {
        return getMemberPreferencesEmail(MemberPreferenceEmailTypes.PHARMACY, this.appState);
    }

    protected onPressAddEmailAddress = () => {
        this.navigate(ProfileActions.ADD_ACCOUNT_EMAIL_PRESSED);
    };

    protected onPressEditEmailAddress = () => {
        this.navigate(ProfileActions.EDIT_EMAIL_ADDRESS_PRESSED);
    };

    protected setMemberPreferences = (response: any) => {
        this.appStateActions.memberCommunications.setMemberPreferences(response);
    };
}

export default ContactInfoEmailAddresses;
