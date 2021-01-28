import React from 'react';
import { ProfileActions } from '../../../context/navigation/actions';
import AppComponent from '../../common/appComponent';
import { ContactInfoPhysicalAddressesView, ViewProps } from './';

interface State {}
interface Props extends ViewProps {}

const defaultProps = {};

class ContactInfoPhysicalAddresses<P extends Props = Props, S extends State = State> extends AppComponent<P, S> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {} as S;
    }

    public render() {
        return (
            <ContactInfoPhysicalAddressesView
                onPortalLinkPressed={this.onPortalLinkPressed}
                {...this.props}
                style={this.style}
            />
        );
    }

    protected onPortalLinkPressed = () => {
        this.trackEvent(ContactInfoPhysicalAddressesView, 'External link pressed');
        this.navigate(ProfileActions.CONTACT_INFO_PORTAL_PRESSED);
    };
}

export default ContactInfoPhysicalAddresses;
