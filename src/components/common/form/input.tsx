import React from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import Icon from '../icon';
import defaultStyle, { InputStyleSchema } from './input.style';

interface Props extends StyleProps {
    accessibilityLabel: string;
    height?: number;
    isEditable?: boolean;
    multiline: boolean;
    onBlur?: noop;
    onChangeText: (value: string) => void;
    onFocus?: noop;
    onPress?: noop;
    onPressRightIcon?: noop;
    placeholder?: string;
    rightIcon?: IconNames;
    rightIconAccessibilityLabel?: string;
    style?: Partial<InputStyleSchema>;
    value: string;
}

interface State {
    height: number;
}

const defaultProps = {
    accessibilityLabel: 'Text input',
    height: 40,
    isEditable: true,
    multiline: false,
    onPressRightIcon: () => {
        return;
    },
};

export default class Input extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Input';
    public style: InputStyleSchema;

    constructor(props) {
        super(props);
        this.state = {
            height: props.height,
        };
    }

    public render() {
        const rootContainerStyle = { ...this.style.rootContainer, ...{ height: this.state.height } };

        return (
            <View style={rootContainerStyle}>
                <this.TextInputField />
                {this.props.rightIcon && (
                    <View style={this.style.rightIconContainer}>
                        <TouchableWithoutFeedback
                            accessibilityLabel={this.props.rightIconAccessibilityLabel}
                            accessibilityRole="button"
                            onPress={this.props.onPressRightIcon}
                            style={this.style.rightIconTouchableContainer}
                        >
                            <Icon
                                name={this.props.rightIcon}
                                style={{
                                    rootItem: {
                                        ...(this.props.isEditable
                                            ? this.style.rightIcon
                                            : this.style.rightIconDisabled),
                                        // Needed because multiline gets its height from state, while non-multiline has a static height.
                                        // Icon height should grow with input height
                                        ...(this.props.multiline ? { height: this.state.height } : null),
                                    },
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </View>
        );
    }

    public TextInputField = () => {
        const initialHeight = Number(this.style.textInput.height);

        return (
            <TextInput
                accessibilityLabel={this.props.accessibilityLabel}
                multiline={this.props.multiline}
                onBlur={this.props.onBlur}
                onTouchEndCapture={this.props.onPress ? this.props.onPress : () => {}}
                onChangeText={this.props.onChangeText}
                onContentSizeChange={e =>
                    this.props.multiline &&
                    this.setState({
                        height: Math.max(
                            initialHeight,
                            e.nativeEvent.contentSize.height + (this.style.multilineHeight.height as number)
                        ),
                    })
                }
                onFocus={this.props.onFocus}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.style.placeholderText && this.style.placeholderText.color}
                returnKeyType="go"
                style={[
                    this.style.textInput,
                    this.style.textStyle,
                    this.props.multiline && this.style.multiline,
                    { height: this.state.height },
                ]}
                value={this.props.value}
                editable={this.props.isEditable}
            />
        );
    };
}
