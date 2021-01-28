import React from 'react';
import { AccessibilityStates, Platform, Text, TouchableOpacity } from 'react-native';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CheckBoxStyleSchema } from './checkBox.style';

interface Props extends StyleProps {
    accessibilityLabel?: string;
    iconSelected?: JSX.Element;
    iconUnselected?: JSX.Element;
    isChecked: boolean;
    label?: string;
    onPress: noop;
    style?: Partial<CheckBoxStyleSchema>;
}

const defaultProps: Partial<Props> = {
    isChecked: false,
};

export default class CheckBox extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'CheckBox';
    public style: CheckBoxStyleSchema;

    public IconSelected = () => {
        const { iconSelected } = this.props;
        if (iconSelected) {
            return iconSelected;
        }

        const isAndroid: boolean = Platform.OS === 'android';
        const iconName: IconNames = isAndroid
            ? IconNames.CHECKBOX_ANDROID_CHECKED_ICON
            : IconNames.CHECKBOX_IOS_CHECKED_ICON;
        return this.getIcon(iconName, { style: this.style.iconActiveStyle, accessible: false });
    };

    public IconUnselected = () => {
        const { iconUnselected } = this.props;
        if (iconUnselected) {
            return iconUnselected;
        }

        const isAndroid: boolean = Platform.OS === 'android';
        const iconName: IconNames = isAndroid
            ? IconNames.CHECKBOX_ANDROID_EMPTY_ICON
            : IconNames.CHECKBOX_IOS_EMPTY_ICON;
        return this.getIcon(iconName, { style: this.style.iconInactiveStyle, accessible: false });
    };

    public render() {
        const { isChecked } = this.props;
        const accessibilityStates: AccessibilityStates[] = isChecked ? ['checked'] : ['unchecked'];
        return (
            <TouchableOpacity
                accessible
                accessibilityLabel={this.props.accessibilityLabel || this.props.label}
                accessibilityStates={accessibilityStates}
                accessibilityRole="checkbox"
                onPress={this.props.onPress}
                style={this.style.rootContainer}
            >
                {isChecked ? <this.IconSelected /> : <this.IconUnselected />}
                {this.props.children || <Text style={this.style.checkboxTextLabel}>{this.props.label}</Text>}
            </TouchableOpacity>
        );
    }
}
