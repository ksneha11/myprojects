import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { MenuItemStyleSchema } from './menuItem.style';

export interface Props extends StyleProps {
    children: (parent: MenuItem) => React.ReactNode;
    iconLeft?: IconNames;
    iconRight: IconNames;
    onPress: noop;
    subtext?: string;
    title?: string;
}

export const defaultProps: Partial<Props> = {
    children: ({ props, style, Title, TitleContainer }) => {
        return (
            <SafeAreaView style={style.safeAreaViewWrapper}>
                <TouchableOpacity
                    accessible
                    accessibilityRole="button"
                    style={style.rootContainer}
                    onPress={props.onPress}
                >
                    <TitleContainer>
                        <Title />
                    </TitleContainer>
                </TouchableOpacity>
            </SafeAreaView>
        );
    },
    // TODO: during refactoring give this a unique IconNames ~ menu item not list item
    // iconRight: IconNames.LIST_ITEM_NAVIGATE_ICON,
};

export default class MenuItem extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MenuItem';
    public style: MenuItemStyleSchema;

    public render() {
        return this.props.children(this);
    }

    public Title = () => {
        const { subtext, title } = this.props;
        return (
            <>
                <Text style={this.style.title}>{title}</Text>
                {subtext ? <Text style={this.style.subtext}>{subtext}</Text> : null}
            </>
        );
    };

    public TitleContainer = ({ children }) => {
        const { iconLeft, iconRight } = this.props;
        return (
            <View style={this.style.titleContainer}>
                {iconLeft &&
                    this.getIcon(iconLeft, {
                        style: this.style.iconLeft,
                    })}
                <View style={this.style.textContainer}>{children}</View>
                {this.getIcon(iconRight, {
                    style: this.style.iconRight,
                })}
            </View>
        );
    };
}
