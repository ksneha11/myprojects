import React from 'react';
import { View } from 'react-native';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ComponentTemplateStyleSchema } from './_template.style';

interface Props extends StyleProps {
    style?: Partial<ComponentTemplateStyleSchema>;
}

const defaultProps = {};

export default class ComponentTemplate extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ComponentTemplate';
    public style: ComponentTemplateStyleSchema;

    public render() {
        return (
            <View style={this.style.rootContainer}>
                <></>
            </View>
        );
    }
}
