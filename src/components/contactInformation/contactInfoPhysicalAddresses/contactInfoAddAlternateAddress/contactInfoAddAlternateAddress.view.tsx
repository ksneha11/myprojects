import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { H1, P } from '../../../common';
import StyledComponent, { StyleProps } from '../../../styledComponent';
import { ContactInfoAddAlternateAddressStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInfoAddAlternateAddressView) => React.ReactNode;
    style?: Partial<ContactInfoAddAlternateAddressStyleSchema>;
}

export const defaultProps = {
    children: ({ Title }: ContactInfoAddAlternateAddressView) => {
        return <>
            <Title />
        </>;
    },
};

export default class ContactInfoAddAlternateAddressView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoAddAlternateAddress';
    public style: ContactInfoAddAlternateAddressStyleSchema;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public Title = () => {
        // FIXME - Pull this from labels 
        return (
            <H1> Add alternate address </H1>
        )
    }
}
