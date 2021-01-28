import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { IconTextLinkStyleSchema } from './iconTextLink.style';

interface Props extends StyleProps {
    accessibilityLabel?: string;
    children: string;
    iconName: IconNames;
    isDisabled: boolean;
    isIconRight: boolean;
    onPress: noop;
    style?: Partial<IconTextLinkStyleSchema>;
}

const defaultProps = {
    accessibilityLabel: '',
    isDisabled: false,
    isIconRight: false,
};

export default class IconTextLink extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'IconTextLink';
    public style: IconTextLinkStyleSchema;

    public render() {
        const style = this.style;
        const Icon = this.getIcon(this.props.iconName, {
            style: [style.icon, this.props.isDisabled && style.disabledIcon],
        });
        return (
            <TouchableOpacity
                accessibilityLabel={this.props.accessibilityLabel}
                accessibilityRole={'button'}
                accessibilityStates={this.props.isDisabled ? ['disabled'] : []}
                onPress={this.props.onPress}
                style={style.rootContainer}
                disabled={this.props.isDisabled}
            >
                {!this.props.isIconRight && Icon}
                <View style={style.textContainer}>
                    <Text style={[style.text, this.props.isDisabled && style.disabledText]}>{this.props.children}</Text>
                </View>
                {this.props.isIconRight && Icon}
            </TouchableOpacity>
        );
    }
}
