import React from 'react';
import { AccessibilityProps, Platform, Switch, View } from 'react-native';
import { _omit } from '../../utils';
import StyledComponent, { ToggleSwitchProps } from '../styledComponent';
import defaultStyle, { ToggleSwitchStyleSchema } from './toggleSwitch.style';

export interface Props extends ToggleSwitchProps, AccessibilityProps {
    onChangeValue: noop;
    style?: Partial<ToggleSwitchStyleSchema>;
    value: boolean;
}

const defaultProps = {
    accessibilityLabel: '',
};

export default class ToggleSwitch extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ToggleSwitch';
    public style: ToggleSwitchStyleSchema;

    public render() {
        const { disabled } = this.props;
        let accessibilityStates = '';
        let accessibilityLabelProp = '';
        if (disabled) {
            accessibilityStates = this.labels.toggleSwitch.disabled;
        }
        if (this.props.accessibilityLabel) {
            accessibilityLabelProp = this.props.accessibilityLabel + ', ';
        }

        return (
            <View style={this.style.rootContainer}>
                <Switch
                    {..._omit(this.props, 'style', 'className')}
                    accessibilityLabel={accessibilityLabelProp + accessibilityStates}
                    accessibilityRole={this.props.disabled ? null : 'switch'}
                    ios_backgroundColor={this.props.disabled ? null : this.style.inactiveColor.color}
                    onValueChange={this.props.onChangeValue}
                    style={this.style.switchContainer}
                    thumbColor={this.ThumbColorPicker()}
                    trackColor={{
                        false: this.style.trackColorInactive.color,
                        true: this.style.activeTrackColor.color,
                    }}
                />
            </View>
        );
    }

    public ThumbColorPicker() {
        if (Platform.OS === 'android') {
            const thumbColor = !this.props.value
                ? this.style.inactiveButtonColor.color
                : this.style.activeButtonColor.color;

            return thumbColor;
        }
    }
}
