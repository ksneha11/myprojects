import React from 'react';
import { Linking, Platform } from 'react-native';
import StyledComponent from '../styledComponent';
import TextLink, { Props as ParentProps } from './textLink';

interface Props extends Partial<ParentProps> {
    phoneNumber: string;
}

const defaultProps = {
    isDisabled: false,
    phoneNumber: '',
};

export default class PhoneLink extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public name = 'PhoneLink';

    public render() {
        return (
            <>
                <TextLink
                    accessibilityLabel={this.getAccessiblePhoneNumber()}
                    onPress={this.onPressLink}
                    style={this.style} // Usually don't want to do this, but the style type is TextStyleSchema
                    {...this.props}
                >
                    {this.props.children}
                </TextLink>
            </>
        );
    }

    protected getAccessiblePhoneNumber = () => {
        let accessiblePhoneNumber = this.props.phoneNumber || this.props.children.toString();
        accessiblePhoneNumber = accessiblePhoneNumber.replace(/[^0-9]/g, '');
        accessiblePhoneNumber = accessiblePhoneNumber.replace(/(.(?!$))/g, '$1 ');
        return accessiblePhoneNumber;
    };

    protected onPressLink = () => {
        if (this.props.isDisabled) {
            return;
        }
        const phoneNumber = this.props.phoneNumber || this.props.children.toString();
        const url = `${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${phoneNumber}`;
        // TODO: test this on a device as simulator will not open tel links
        // tslint:disable-next-line: no-console
        Linking.openURL(url).catch(console.log);
    };
}
