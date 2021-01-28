import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ListItemStyleSchema } from './listItem.style';

export interface Props extends StyleProps {
    accessible?: boolean;
    children?: React.ReactNode;
    componentRight?: React.ReactNode;
    iconLeft?: IconNames;
    iconRight?: IconNames;
    isSelfPressable?: boolean;
    onPress?: noop;
    onPressIconLeft?: noop;
    onPressIconRight?: noop;
    style?: Partial<ListItemStyleSchema>;
    title?: string;
}

export const defaultProps: Partial<Props> = {
    accessible: true,
    isSelfPressable: false,
};

export default class ListItem extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ListItem';
    public style: ListItemStyleSchema;

    public ContentContainer = () => {
        const { children } = this.props;
        return (
            <View style={this.style.contentContainer}>
                {this.renderLeftColumn()}
                <View style={this.style.mainContent}>
                    <Text style={this.style.title}>{this.props.title}</Text>
                    {children}
                </View>
                {this.renderRightColumn()}
            </View>
        );
    };

    public render() {
        const { isSelfPressable, onPress } = this.props;

        return (
            <SafeAreaView style={this.style.safeAreaViewContainer}>
                <TouchableOpacity
                    accessible={this.props.accessible}
                    disabled={!isSelfPressable}
                    onPress={onPress}
                    style={this.style.rootContainer}
                >
                    <this.ContentContainer />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    protected renderLeftColumn() {
        const { iconLeft, onPressIconLeft } = this.props;
        return (
            iconLeft &&
            this.getIcon(iconLeft, {
                onPress: () => onPressIconLeft(),
                style: this.style.leftIcon,
            })
        );
    }

    protected renderRightColumn() {
        const { componentRight, iconRight } = this.props;
        return (
            <View
                accessibilityLabel={this.labels.listItem.renderRightColumn.accessibilityLabel}
                style={this.style.rightColumn}
            >
                {iconRight
                    ? this.getIcon(iconRight, {
                          onPress: () => this.props.onPressIconRight(),
                          style: this.style.rightIcon,
                      })
                    : componentRight}
            </View>
        );
    }
}
