import React from 'react';
import { AccessibilityRole, View } from 'react-native';
import { H2 } from '..';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { MenuSectionHeaderSchema } from './menuSectionHeader.style';

export interface Props extends StyleProps {
    accessibilityRole?: AccessibilityRole;
    style: Partial<MenuSectionHeaderSchema>;
    text: string;
}

const defaultProps: Partial<Props> = {};

export default class MenuSectionHeader extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MenuSectionHeader';
    public style: MenuSectionHeaderSchema;

    public render() {
        return (
            <View style={this.style.sectionHeaderContainer}>
                <H2 accessibilityRole={this.props.accessibilityRole} style={{ h2: this.style.sectionHeader }}>
                    {this.props.text}
                </H2>
            </View>
        );
    }
}
