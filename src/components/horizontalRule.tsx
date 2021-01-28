import React from 'react';
import { View } from 'react-native';
import defaultStyle, { HorizontalRuleStyleSchema } from './horizontalRule.style';
import StyledComponent, { StyleProps } from './styledComponent';

interface Props extends StyleProps {
    style?: Partial<HorizontalRuleStyleSchema>;
}

export default class HorizontalRule extends StyledComponent<Props> {
    public defaultStyle = defaultStyle;
    public name = 'HorizontalRule';
    public style: HorizontalRuleStyleSchema;

    public render() {
        return <View style={this.style.horizontalRule} />;
    }
}
