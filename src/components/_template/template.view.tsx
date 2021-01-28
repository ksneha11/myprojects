import React from 'react';
import { SafeAreaView, View } from 'react-native';
import StyledComponent, { StyleProps } from '../styledComponent';
import { ComponentTemplateStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ComponentTemplateView) => React.ReactNode;
    style?: Partial<ComponentTemplateStyleSchema>;
}

export const defaultProps = {
    children: ({  }: ComponentTemplateView) => {
        return <></>;
    },
};

export default class ComponentTemplateView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ComponentTemplate';
    public style: ComponentTemplateStyleSchema;

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
