import React from 'react';
import { Linking } from 'react-native';
import { TextLink } from '..';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { TextLinkStyleSchema } from './textLink.style';

interface Props extends StyleProps {
    children: React.ReactNode;
    emailAddress: string;
    style?: Partial<TextLinkStyleSchema>;
}

export default class EmailLink extends StyledComponent<Props> {
    public defaultStyle = defaultStyle;
    public name = 'EmailLink';
    public style: TextLinkStyleSchema;

    public render() {
        return (
            <TextLink onPress={() => this.sendEmail()} style={this.style} {...this.props}>
                {this.props.children}
            </TextLink>
        );
    }

    // TODO: Additional props needed to create a subject or message
    protected sendEmail = () => {
        Linking.openURL(`mailto:${this.props.emailAddress}`);
    };
}
