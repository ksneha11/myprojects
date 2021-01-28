import React from 'react';
import { SafeAreaView, View } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { ContactInfoTextNumbersStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInfoTextNumbersView) => React.ReactNode;
    style?: Partial<ContactInfoTextNumbersStyleSchema>;
}

export const defaultProps = {
    children: ({  }: ContactInfoTextNumbersView) => {
        return <></>;
    },
};

export default class ContactInfoTextNumbersView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoTextNumbers';
    public style: ContactInfoTextNumbersStyleSchema;

    // todo: remove this if you don't use State
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
}
